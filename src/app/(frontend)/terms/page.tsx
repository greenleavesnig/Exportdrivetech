import Link from 'next/link'
import { getSiteContent } from '@/lib/site-settings'

// Revalidate so content edited in the CMS global appears without a redeploy.
export const revalidate = 60

export default async function TermsOfService() {
  const { legal, contact } = await getSiteContent()
  const lastUpdated = new Date(legal.lastUpdated).toLocaleDateString()
  return (
    <main className="mx-auto max-w-4xl px-8 py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mb-4 text-zinc-600">Last updated: {lastUpdated}</p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p className="mb-4 text-zinc-700">
          By accessing or using ExportDriveTech Agro Trading&apos;s website and services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. Description of Services</h2>
        <p className="mb-4 text-zinc-700">
          ExportDriveTech Agro Trading provides agricultural product sourcing, processing, and export services including:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Product sourcing and procurement</li>
          <li>Quality control and processing</li>
          <li>Export documentation and logistics</li>
          <li>Request for Quotation (RFQ) processing</li>
          <li>Consulting and training services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. User Responsibilities</h2>
        <p className="mb-4 text-zinc-700">As a user of our services, you agree to:</p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Provide accurate, complete, and current information</li>
          <li>Maintain the confidentiality of your account credentials</li>
          <li>Notify us immediately of any unauthorized use</li>
          <li>Comply with all applicable laws and regulations</li>
          <li>Not use our services for fraudulent or illegal purposes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Request for Quotation (RFQ)</h2>
        <h3 className="mb-2 text-xl font-medium">4.1 RFQ Submission</h3>
        <p className="mb-4 text-zinc-700">
          When you submit an RFQ, you provide product specifications, quantities, and delivery requirements. We will respond within 24-48 business hours with pricing, availability, and shipping options.
        </p>

        <h3 className="mb-2 text-xl font-medium">4.2 Quotation Validity</h3>
        <p className="mb-4 text-zinc-700">
          Quotations are valid for the period specified in the quote, typically 7-14 days from the quote date. Prices are subject to change based on market conditions, exchange rates, and availability.
        </p>

        <h3 className="mb-2 text-xl font-medium">4.3 Non-Binding Nature</h3>
        <p className="mb-4 text-zinc-700">
          RFQ submissions and quotations do not constitute a binding contract. A binding agreement is formed only upon execution of a written purchase order or sales agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. Orders and Payment</h2>
        <h3 className="mb-2 text-xl font-medium">5.1 Order Acceptance</h3>
        <p className="mb-4 text-zinc-700">
          All orders are subject to acceptance by ExportDriveTech. We reserve the right to refuse or cancel any order for any reason, including product unavailability or errors in pricing.
        </p>

        <h3 className="mb-2 text-xl font-medium">5.2 Payment Terms</h3>
        <p className="mb-4 text-zinc-700">
          Payment terms are specified in each quotation and sales agreement. Common terms include:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Letter of Credit (L/C)</li>
          <li>Telegraphic Transfer (T/T) - advance payment</li>
          <li>Documentary Collection</li>
        </ul>

        <h3 className="mb-2 text-xl font-medium">5.3 Price Adjustments</h3>
        <p className="mb-4 text-zinc-700">
          Prices may be adjusted for changes in raw material costs, exchange rates, shipping fees, or taxes. Significant changes will be communicated before order confirmation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">6. Product Specifications and Quality</h2>
        <h3 className="mb-2 text-xl font-medium">6.1 Specifications</h3>
        <p className="mb-4 text-zinc-700">
          Product specifications are provided as guidelines. Actual products may vary slightly due to natural variations in agricultural products. We strive to meet or exceed industry standards.
        </p>

        <h3 className="mb-2 text-xl font-medium">6.2 Quality Assurance</h3>
        <p className="mb-4 text-zinc-700">
          We implement quality control measures including inspection, grading, and testing. However, we cannot guarantee absolute uniformity in natural products.
        </p>

        <h3 className="mb-2 text-xl font-medium">6.3 Certifications</h3>
        <p className="mb-4 text-zinc-700">
          We provide requested certifications (phytosanitary, origin, quality) as available. Additional certifications may incur extra costs and require advance notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">7. Shipping and Delivery</h2>
        <h3 className="mb-2 text-xl font-medium">7.1 Incoterms</h3>
        <p className="mb-4 text-zinc-700">
          Shipping terms are governed by the Incoterms specified in the agreement (FOB, CIF, CFR, etc.). Each term defines responsibilities for costs, insurance, and risk transfer.
        </p>

        <h3 className="mb-2 text-xl font-medium">7.2 Delivery Times</h3>
        <p className="mb-4 text-zinc-700">
          Delivery estimates are provided based on current conditions. We are not liable for delays caused by circumstances beyond our control, including weather, customs, port congestion, or force majeure events.
        </p>

        <h3 className="mb-2 text-xl font-medium">7.3 Risk of Loss</h3>
        <p className="mb-4 text-zinc-700">
          Risk of loss transfers to the buyer at the point specified by the agreed Incoterms. We recommend appropriate marine cargo insurance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">8. Limitation of Liability</h2>
        <p className="mb-4 text-zinc-700">
          To the maximum extent permitted by law, ExportDriveTech shall not be liable for:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Indirect, incidental, special, or consequential damages</li>
          <li>Loss of profits, revenue, or business opportunities</li>
          <li>Damages exceeding the total value of the relevant order</li>
        </ul>
        <p className="text-zinc-700">
          Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so the above limitations may not apply to you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Intellectual Property</h2>
        <p className="mb-4 text-zinc-700">
          All content on this website, including text, images, logos, and design, is owned by ExportDriveTech and protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute our content without prior written permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">10. Force Majeure</h2>
        <p className="mb-4 text-zinc-700">
          We are not liable for failure to perform our obligations due to events beyond our reasonable control, including natural disasters, war, strikes, government actions, or other force majeure events.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">11. Dispute Resolution</h2>
        <p className="mb-4 text-zinc-700">
          Any disputes arising from these Terms or our services shall be resolved through good faith negotiations. If negotiations fail, disputes shall be resolved through arbitration in accordance with the rules of the Nigerian Arbitration Centre.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">12. Governing Law</h2>
        <p className="mb-4 text-zinc-700">
          These Terms are governed by the laws of the Federal Republic of Nigeria. Any legal action shall be brought in the courts of Nigeria.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">13. Indemnification</h2>
        <p className="mb-4 text-zinc-700">
          You agree to indemnify and hold ExportDriveTech harmless from any claims, damages, or expenses arising from your use of our services, violation of these Terms, or infringement of third-party rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">14. Modifications to Terms</h2>
        <p className="mb-4 text-zinc-700">
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">15. Severability</h2>
        <p className="mb-4 text-zinc-700">
          If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">16. Contact Information</h2>
        <p className="mb-4 text-zinc-700">
          For questions about these Terms of Service, please contact us:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Email: <a href={`mailto:${contact.email}`} className="text-blue-600 underline">{contact.email}</a></li>
          <li>Phone: {contact.phone}</li>
          <li>Address: {contact.address}</li>
        </ul>
      </section>

      <div className="mt-12 border-t pt-8">
        <Link
          className="font-medium text-blue-600 underline-offset-4 hover:underline"
          href="/"
        >
          &larr; Back to Home
        </Link>
      </div>
    </main>
  )
}
