import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mb-4 text-zinc-600">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
        <p className="mb-4 text-zinc-700">
          ExportDriveTech Agro Trading (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
        <h3 className="mb-2 text-xl font-medium">2.1 Personal Information</h3>
        <p className="mb-4 text-zinc-700">
          We collect information you provide directly to us, including:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Name and company name</li>
          <li>Email address and phone number</li>
          <li>Country and destination port</li>
          <li>Product inquiries and RFQ details</li>
          <li>Shipping and logistics preferences</li>
        </ul>

        <h3 className="mb-2 text-xl font-medium">2.2 Technical Information</h3>
        <p className="mb-4 text-zinc-700">
          We automatically collect technical data when you visit our site:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>IP address and browser type</li>
          <li>Device information and operating system</li>
          <li>Referring website and pages visited</li>
          <li>Time and duration of visits</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
        <p className="mb-4 text-zinc-700">We use your information to:</p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Process and respond to your RFQ requests</li>
          <li>Provide pricing, availability, and shipping quotes</li>
          <li>Communicate with you about orders and inquiries</li>
          <li>Improve our services and website functionality</li>
          <li>Comply with legal obligations</li>
          <li>Prevent fraud and ensure security</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Information Sharing</h2>
        <p className="mb-4 text-zinc-700">
          We do not sell your personal information. We may share your information with:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Service providers who assist in our operations (e.g., email services, logistics partners)</li>
          <li>Business partners as necessary to fulfill your requests</li>
          <li>Legal authorities when required by law</li>
        </ul>
        <p className="text-zinc-700">
          All third parties are required to protect your information and are prohibited from using it for other purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. International Data Transfers</h2>
        <p className="mb-4 text-zinc-700">
          Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">6. Data Security</h2>
        <p className="mb-4 text-zinc-700">
          We implement appropriate technical and organizational measures to protect your information, including:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Secure servers and encryption</li>
          <li>Access controls and authentication</li>
          <li>Regular security assessments</li>
          <li>Employee training on data protection</li>
        </ul>
        <p className="text-zinc-700">
          However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">7. Your Rights</h2>
        <p className="mb-4 text-zinc-700">You have the right to:</p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your information</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p className="text-zinc-700">
          To exercise these rights, contact us at <a href="mailto:trade@exportdrivetech.com" className="text-blue-600 underline">trade@exportdrivetech.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">8. Data Retention</h2>
        <p className="mb-4 text-zinc-700">
          We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Business inquiries may be retained for business purposes unless you request deletion.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Cookies and Tracking</h2>
        <p className="mb-4 text-zinc-700">
          We use cookies and similar technologies to improve your experience, analyze traffic, and personalize content. You can control cookies through your browser settings. Disabling cookies may affect website functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">10. Children&apos;s Privacy</h2>
        <p className="mb-4 text-zinc-700">
          Our services are not intended for individuals under 18. We do not knowingly collect information from children. If we become aware of such collection, we will take steps to delete it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">11. Changes to This Policy</h2>
        <p className="mb-4 text-zinc-700">
          We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">12. Contact Us</h2>
        <p className="mb-4 text-zinc-700">
          If you have questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <ul className="mb-4 list-inside list-disc text-zinc-700">
          <li>Email: <a href="mailto:trade@exportdrivetech.com" className="text-blue-600 underline">trade@exportdrivetech.com</a></li>
          <li>Phone: +233 20 000 0000</li>
          <li>Address: Accra, Ghana</li>
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
