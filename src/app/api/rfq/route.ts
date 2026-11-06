import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * POST /api/rfq - Create a new RFQ submission
 * 
 * This endpoint provides a REST API for RFQ submissions.
 * For form submissions from the website, use the Server Action in actions.ts instead.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'buyerName',
      'company',
      'country',
      'destination',
      'email',
      'phone',
      'category',
      'product',
      'quantity',
      'unit',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate quantity and unit
    if (!Number.isFinite(body.quantity) || body.quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid quantity' },
        { status: 400 }
      )
    }

    const validUnits = ['metric-tons', 'kilograms', 'containers']
    if (!validUnits.includes(body.unit)) {
      return NextResponse.json(
        { error: 'Invalid unit. Must be one of: metric-tons, kilograms, containers' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Verify product exists
    try {
      await payload.findByID({
        collection: 'products',
        id: body.product,
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Verify category exists
    try {
      await payload.findByID({
        collection: 'product-categories',
        id: body.category,
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Create the submission
    const submission = await payload.create({
      collection: 'rfq-submissions',
      data: {
        buyerName: body.buyerName,
        company: body.company,
        country: body.country,
        destination: body.destination,
        email: body.email,
        phone: body.phone,
        preferredContact: body.preferredContact || 'email',
        category: body.category,
        product: body.product,
        quantity: body.quantity,
        unit: body.unit,
        packaging: body.packaging || '',
        deliveryTimeline: body.deliveryTimeline || '',
        qualityRequirement: body.qualityRequirement || '',
        targetPrice: body.targetPrice || '',
        incoterms: body.incoterms || '',
        shippingMethod: body.shippingMethod || '',
        hasFreightForwarder: body.hasFreightForwarder || '',
        specialRequirements: body.specialRequirements || '',
        message: body.message || '',
        referralSource: body.referralSource || '',
      },
    })

    return NextResponse.json(
      {
        success: true,
        referenceNumber: submission.referenceNumber,
        id: submission.id,
        message: 'RFQ submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('RFQ submission error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to submit RFQ',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/rfq?id=xxx - Retrieve an RFQ submission (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    const submission = await payload.findByID({
      collection: 'rfq-submissions',
      id,
      depth: 2,
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error('RFQ retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve RFQ' },
      { status: 500 }
    )
  }
}
