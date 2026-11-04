import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/db'
import { rfqSubmissions } from '@/db/schema'
import { eq } from 'drizzle-orm'

export type RFQActionState = {
  ok: boolean
  message: string
  reference?: string
  buyerName?: string
  email?: string
  emailSent?: boolean
}

const text = (formData: FormData, name: string, max = 500) =>
  String(formData.get(name) ?? '').trim().slice(0, max)

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

async function sendEmail(to: string[], subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from || to.length === 0) return false

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  })
  return response.ok
}

function generateReference(): string {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  const random = Math.random().toString(36).substring(2, 10).toUpperCase()
  return `RFQ-${date}-${random}`
}

export async function submitRFQ(
  _previousState: RFQActionState,
  formData: FormData,
): Promise<RFQActionState> {
  const honeypot = text(formData, 'website', 100)
  if (honeypot) return { ok: true, message: 'Request received.' }

  const buyerName = text(formData, 'buyerName', 120)
  const company = text(formData, 'company', 160)
  const country = text(formData, 'country', 100)
  const destination = text(formData, 'destination', 160)
  const email = text(formData, 'email', 180).toLowerCase()
  const phone = text(formData, 'phone', 80)
  const category = text(formData, 'category', 80)
  const product = text(formData, 'product', 120)
  const quantity = Number(text(formData, 'quantity', 30))
  const unit = text(formData, 'unit', 40)
  const requestedContact = text(formData, 'preferredContact', 20)
  const preferredContact = ['email', 'phone', 'whatsapp'].includes(requestedContact)
    ? (requestedContact as 'email' | 'phone' | 'whatsapp')
    : 'email'
  const consent = formData.get('consent') === 'on'

  if (!buyerName || !company || !country || !destination || !email || !phone || !category || !product) {
    return { ok: false, message: 'Please complete every required field.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'Please enter a valid business email address.' }
  }
  if (!Number.isFinite(quantity) || quantity <= 0 || !['metric-tons', 'kilograms', 'containers'].includes(unit)) {
    return { ok: false, message: 'Please enter a valid quantity and unit.' }
  }
  if (!consent) return { ok: false, message: 'Please accept the privacy consent to continue.' }

  try {
    // Get D1 binding from request (for Cloudflare Pages Functions)
    const d1 = (formData as any).env?.DB
    if (!d1) {
      return { ok: false, message: 'Database not available. Please try again.' }
    }

    const db = getDB(d1)
    const referenceNumber = generateReference()
    
    const result = await db.insert(rfqSubmissions).values({
      referenceNumber,
      status: 'new',
      buyerName,
      company,
      country,
      destination,
      email,
      phone,
      preferredContact,
      category,
      product,
      quantity,
      unit,
      packaging: text(formData, 'packaging', 100),
      deliveryTimeline: text(formData, 'deliveryTimeline', 100),
      qualityRequirement: text(formData, 'qualityRequirement', 300),
      targetPrice: text(formData, 'targetPrice', 120),
      incoterms: text(formData, 'incoterms', 40),
      shippingMethod: text(formData, 'shippingMethod', 40),
      hasFreightForwarder: text(formData, 'hasFreightForwarder', 20),
      specialRequirements: text(formData, 'specialRequirements', 1200),
      message: text(formData, 'message', 1200),
      referralSource: text(formData, 'referralSource', 80),
    }).returning()

    const safe = {
      name: escapeHtml(buyerName),
      product: escapeHtml(product),
      quantity: `${quantity} ${escapeHtml(unit.replaceAll('-', ' '))}`,
      destination: `${escapeHtml(destination)}, ${escapeHtml(country)}`,
      incoterms: escapeHtml(text(formData, 'incoterms', 40) || 'To be confirmed'),
      reference: escapeHtml(referenceNumber),
    }
    const buyerHtml = `
      <div style="font-family:Arial,sans-serif;color:#14231b;line-height:1.6;max-width:620px">
        <h2 style="color:#123c2b">Thank you for your inquiry</h2>
        <p>Dear ${safe.name},</p>
        <p>Thank you for contacting <strong>ExportDriveTech</strong>. We have received your quote request and our export team is reviewing it. You can expect a detailed response within <strong>24–48 business hours</strong>.</p>
        <h3>Inquiry summary</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>Reference</strong></td><td>${safe.reference}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>Product</strong></td><td>${safe.product}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>Quantity</strong></td><td>${safe.quantity}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>Destination</strong></td><td>${safe.destination}</td></tr>
          <tr><td style="padding:8px"><strong>Incoterms</strong></td><td>${safe.incoterms}</td></tr>
        </table>
        <p>Our team will confirm availability, pricing, packaging, and shipping options. For urgent questions, contact trade@exportdrivetech.com or WhatsApp +233 20 000 0000.</p>
        <p>Warm regards,<br><strong>ExportDriveTech</strong></p>
        <p style="font-size:12px;color:#66746c">This is an automated confirmation. Please use the contact details above for follow-up.</p>
      </div>`

    const emailSent = await sendEmail(
      [email],
      'Thank you for your inquiry – ExportDriveTech will respond within 24–48 hours',
      buyerHtml,
    )

    const recipients = [process.env.SALES_NOTIFICATION_EMAIL, process.env.BACKUP_NOTIFICATION_EMAIL]
      .filter((value): value is string => Boolean(value))
    await sendEmail(
      recipients,
      `New ${referenceNumber}: ${product} inquiry from ${company}`,
      `<h2>New RFQ received</h2><p><strong>${safe.reference}</strong></p><p>${safe.name} at ${escapeHtml(company)} requested ${safe.quantity} of ${safe.product} for ${safe.destination}.</p><p>Open the database to review and follow up.</p>`,
    )

    return {
      ok: true,
      message: 'Your quote request has been received.',
      reference: referenceNumber,
      buyerName,
      email,
      emailSent,
    }
  } catch (error) {
    console.error('RFQ submission error:', error)
    return { ok: false, message: 'We could not submit your request. Please try again or contact us directly.' }
  }
}
