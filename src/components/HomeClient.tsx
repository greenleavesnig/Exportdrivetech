'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { submitRFQ } from '@/app/(frontend)/actions'
import ProductCatalog from './ProductCatalog'
import FeaturedProducts from './FeaturedProducts'

type RFQActionState = {
  ok: boolean
  message: string
  reference?: string
  buyerName?: string
  email?: string
  emailSent?: boolean
}

const countries = ['Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'India', 'Indonesia', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Poland', 'Portugal', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Türkiye', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam']

const initialState: RFQActionState = { ok: false, message: '' }

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>
}

function Mark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M40 8C26 8 13 13 9 27c7 3 14 1 19-5" /><path d="M8 41c3-13 11-21 25-27" /><path d="M28 35c6-2 9-7 9-14-8 0-13 4-14 10" /></svg>
}

export default function HomeClient() {
  const [menu, setMenu] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [rfqCategory, setRfqCategory] = useState('')
  const [rfqProduct, setRfqProduct] = useState('')
  const [state, setState] = useState<RFQActionState>(initialState)
  const [pending, setPending] = useState(false)
  
  // SPA Enhancement state
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    async function loadDropdownData() {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products'),
        ])

        const [cats, prods] = await Promise.all([
          catsRes.json(),
          prodsRes.json(),
        ])

        // Validate response is an array
        const validCats = Array.isArray(cats) ? cats : []
        const validProds = Array.isArray(prods) ? prods : []

        setCategories(validCats)
        setProducts(validProds)

        if (validCats.length > 0) {
          setRfqCategory(validCats[0].id)
          const categoryProducts = validProds.filter((p: any) => p.category.id === validCats[0].id)
          if (categoryProducts.length > 0) {
            setRfqProduct(categoryProducts[0].id)
          }
        }
      } catch (error) {
        console.error('Failed to load dropdown data:', error)
        setCategories([])
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadDropdownData()
  }, [])

  // Scroll progress and sticky nav tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
      
      setScrollProgress(Math.min(scrollPercentage, 100))
      setShowBackToTop(scrollTop > windowHeight)
      setIsSticky(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section tracking with Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    
    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }



  const chooseProduct = (productId: string, categoryId: string) => {
    setRfqCategory(categoryId)
    setRfqProduct(productId)
    document.getElementById('rfq')?.scrollIntoView({ behavior: 'smooth' })
  }

  const changeCategory = (categoryId: string) => {
    setRfqCategory(categoryId)
    const categoryProducts = Array.isArray(products) 
      ? products.filter((p) => p.category.id === categoryId)
      : []
    if (categoryProducts.length > 0) {
      setRfqProduct(categoryProducts[0].id)
    }
  }

  // Show error message if data failed to load (not just empty database)
  const hasLoadError = false

  return (
    <main>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {hasLoadError && (
        <div className="db-warning">
          <div className="db-warning-content">
            <p>
              <strong>⚠️ Database Configuration Required:</strong> The site is running in demo mode. 
              Configure your database credentials in <code>.env.local</code> to enable full functionality. 
              See <code>IMMEDIATE_ACTION_REQUIRED.md</code> for a 5-minute setup guide.
            </p>
          </div>
        </div>
      )}
      <div className="topbar"><div className="shell"><span>Accra, Ghana · Serving global buyers</span><span>Available for 2025/26 contracts</span></div></div>
      
      <header className={isSticky ? 'sticky' : ''}>
        <div className="shell nav">
          <a href="#" className="brand"><i><Mark /></i><span><strong>EXPORTDRIVETECH</strong><small>AGRO TRADING</small></span></a>
          <nav className="desktop-nav">
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#products" className={activeSection === 'products' ? 'active' : ''}>Products</a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''}>Services</a>
            <a href="#markets" className={activeSection === 'markets' ? 'active' : ''}>Export markets</a>
          </nav>
          <a className="nav-cta" href="#rfq">Request a quote <Arrow /></a>
          <button type="button" className="menu-button" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><span /><span /></button>
        </div>
        {menu && <nav className="mobile-nav"><a href="#about">About</a><a href="#products">Products</a><a href="#services">Services</a><a href="#markets">Export markets</a><a href="#rfq">Request a quote</a></nav>}
      </header>

      <section className="hero" id="main-content">
        <Image src="https://images.unsplash.com/photo-1714830561799-8bb45bf4beb1?auto=format&fit=crop&w=1800&q=85" alt="Green agricultural field at sunset" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="eyebrow light">From West African soil to the world</p>
          <h1>Premium crops.<br /><em>Global reach.</em></h1>
          <p>Sourcing, processing, and exporting traceable agricultural products for food manufacturers and distributors worldwide.</p>
          <div className="hero-actions"><a className="button lime" href="#products">Explore our products <Arrow /></a><a href="#about">Our sourcing story →</a></div>
        </div>
        <div className="shell stats">{[['12+', 'Years of experience'], ['18', 'Export destinations'], ['100%', 'Traceable sourcing'], ['24–48h', 'RFQ response']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        <button 
          className="hero-scroll-indicator" 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to about section"
        >
          <span>Scroll</span>
          <div className="hero-scroll-icon" />
        </button>
      </section>

      <FeaturedProducts products={products} loading={loading} />

      <ProductCatalog categories={categories} products={products} loading={loading} />

      <section id="markets" className="markets"><div className="shell market-grid"><div><p className="eyebrow light">Export markets</p><h2>Rooted locally.<br /><em>Connected globally.</em></h2><p>From documentation to last-mile logistics, our export team keeps your consignment moving safely and on schedule.</p><a className="button outline" href="#rfq">Discuss your destination <Arrow /></a></div><div className="market-card">{[['Europe', 'Netherlands · Germany · UK'], ['Middle East', 'UAE · Saudi Arabia · Qatar'], ['Asia', 'India · China · Vietnam'], ['North America', 'USA · Canada']].map(([region, places]) => <div key={region}><strong>{region}</strong><span>{places}</span></div>)}</div></div></section>

      <section id="services" className="section"><div className="shell split-heading"><div><p className="eyebrow">Beyond exports</p><h2>Knowledge that helps<br /><em>agriculture grow.</em></h2></div><p>Practical expertise for farmers, agribusinesses, and international sourcing teams.</p></div><div className="shell services">{[['01', 'Training', 'Quality control, post-harvest handling, and export readiness.'], ['02', 'Consulting', 'Market-entry, sourcing, and supply-chain guidance.'], ['03', 'Mentorship', 'Long-term support for growers and agribusiness founders.']].map(([number, title, copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section id="rfq" className="rfq">
        <div className="shell rfq-grid">
          <div className="rfq-copy"><p className="eyebrow">Request for quotation</p><h2>Let’s plan your<br />next shipment.</h2><p>Complete the form with as much detail as possible. Our export team will respond within 24–48 business hours with pricing, availability, and shipping options.</p><div className="contact"><small>Email</small><a href="mailto:trade@exportdrivetech.com">trade@exportdrivetech.com</a><small>WhatsApp</small><a href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+233200000000'}`}>{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+233 20 000 0000'}</a></div></div>
          <form action={async (formData: FormData) => {
            setPending(true)
            try {
              const result = await submitRFQ(state, formData)
              setState(result)
            } catch (error) {
              setState({ ok: false, message: 'Failed to submit. Please try again.' })
            } finally {
              setPending(false)
            }
          }} className="rfq-form">
            <div className="form-title"><b>RFQ</b><span><strong>Request a quote</strong><small>Fields marked with * are required.</small></span></div>
            <fieldset><legend><span>01</span> Buyer information</legend><div className="field-row"><label>Full name *<input name="buyerName" required placeholder="John Smith" /></label><label>Company name *<input name="company" required placeholder="ABC Imports Ltd." /></label></div><div className="field-row"><label>Country *<select name="country" required defaultValue=""><option value="" disabled>Select country</option>{countries.map(country => <option key={country}>{country}</option>)}</select></label><label>Destination port *<input name="destination" required placeholder="Port of Rotterdam" /></label></div><div className="field-row"><label>Email *<input name="email" type="email" required placeholder="john@abcimports.com" /></label><label>Phone / WhatsApp *<input name="phone" type="tel" required placeholder="+31 6 1234 5678" /></label></div><label>Preferred contact<select name="preferredContact" defaultValue="email"><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></label></fieldset>
            <fieldset><legend><span>02</span> Product inquiry</legend><div className="field-row"><label>Category *<select name="category" value={rfqCategory} onChange={e => changeCategory(e.target.value)}>{Array.isArray(categories) && categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}</select></label><label>Specific product *<select name="product" value={rfqProduct} onChange={e => setRfqProduct(e.target.value)}>{Array.isArray(products) && products.filter(p => p.category.id === rfqCategory).map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label></div><div className="field-row"><label>Quantity *<input name="quantity" type="number" min="1" required placeholder="20" /></label><label>Unit *<select name="unit" defaultValue="metric-tons"><option value="metric-tons">Metric tons</option><option value="kilograms">Kilograms</option><option>Containers</option></select></label></div><div className="field-row"><label>Packaging<select name="packaging"><option value="">Select packaging</option><option>25kg PP bags</option><option>50kg PP bags</option><option>Bulk</option><option>Custom</option></select></label><label>Delivery timeline<select name="deliveryTimeline"><option value="">Select timeline</option><option>Immediate</option><option>Within 30 days</option><option>Within 60 days</option><option>Flexible</option></select></label></div><div className="field-row"><label>Quality / grade<input name="qualityRequirement" placeholder="Export Grade A, 99% purity" /></label><label>Target price<input name="targetPrice" placeholder="USD 500 / MT" /></label></div></fieldset>
            <fieldset><legend><span>03</span> Shipping & logistics</legend><div className="field-row"><label>Incoterms<select name="incoterms"><option value="">Select term</option><option>FOB</option><option>CIF</option><option>EXW</option><option>CFR</option><option>DDP</option></select></label><label>Shipping method<select name="shippingMethod"><option value="">Select method</option><option>Sea freight</option><option>Air freight</option><option>Courier</option><option>Not sure</option></select></label></div><label>Freight forwarder<select name="hasFreightForwarder"><option value="">Select answer</option><option>Yes</option><option>No</option></select></label><label>Special requirements<textarea name="specialRequirements" rows={3} placeholder="Phytosanitary certificate, fumigation, inspection..." /></label></fieldset>
            <fieldset><legend><span>04</span> Additional information</legend><label>Message<textarea name="message" rows={3} placeholder="Any additional order details or questions." /></label><label>How did you find us?<select name="referralSource"><option value="">Select option</option><option>Google</option><option>Referral</option><option>Trade fair</option><option>Social media</option><option>Other</option></select></label><label className="honeypot">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><label className="consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted regarding this inquiry and accept the <a href="/privacy" className="underline" target="_blank">Privacy Policy</a>. *</span></label></fieldset>
            <button className="button dark submit" type="submit" disabled={pending}>{pending ? 'Submitting…' : 'Submit quote request'} <Arrow /></button>
            {state.message && <div className={state.ok ? 'form-message success' : 'form-message error'} role="status">{state.ok ? <><strong>Request received — {state.reference}</strong><span>Thank you, {state.buyerName}. We’ll contact you at {state.email} within 24–48 business hours.{state.emailSent === false && ' Email confirmation is pending setup.'}</span></> : state.message}</div>}
          </form>
        </div>
      </section>
      <footer><div className="shell footer"><div><a href="#" className="brand inverse"><i><Mark /></i><span><strong>EXPORTDRIVETECH</strong><small>AGRO TRADING</small></span></a><p>Quality from the source. Reliability to your door.</p></div><div><a href="#about">About</a><a href="#products">Products</a><a href="#services">Services</a><a href="#rfq">Request a quote</a></div><div><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/admin">Admin Panel</a></div></div><div className="shell copyright"><span>© 2025 ExportDriveTech Agro Trading</span><span>Accra · Ghana</span></div></footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </main>
  )
}
