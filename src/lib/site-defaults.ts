// Single source of truth for the public site's editable content.
//
// DEFAULT_SITE_CONTENT mirrors the values that used to be hard-coded across the
// frontend. `getSiteContent()` (src/lib/site-settings.ts) overlays the Payload
// `site-settings` global on top of these, so the site renders identically even
// when the global is empty.

const env = (key: string, fallback: string) => {
  const value = process.env[key]
  return typeof value === 'string' && value.trim() !== '' ? value : fallback
}

const WHATSAPP_NUMBER = env('NEXT_PUBLIC_WHATSAPP_NUMBER', '+233 20 000 0000')

// Product imagery is generated from a descriptive prompt so each photo shows
// the actual product it is labelled with. Every web image is served through
// the text_to_image endpoint.
const productPhoto = (prompt: string, size = 'portrait_4_3') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

export type NavLink = { label: string; href: string }
export type Stat = { value: string; label: string }
export type MarketCard = { region: string; places: string }
export type ServiceCard = { number: string; title: string; copy: string }
export type SelectOption = { value: string; label: string }

export type SiteContent = {
  topbar: { left: string; right: string }
  brand: { name: string; tagline: string }
  nav: NavLink[]
  navCta: { label: string; href: string }
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    paragraph: string
    primaryCta: NavLink
    secondaryCta: NavLink
    image: string
    imageAlt: string
    stats: Stat[]
  }
  featured: {
    eyebrow: string
    titleLine1: string
    titleLine2Prefix: string
    titleLine2: string
    paragraph: string
    badge: string
    placeholderSmall: string
    placeholderTitle: string
    requestQuoteLabel: string
    fallbackImages: string[]
    productImages: { slug: string; image: string }[]
  }
  catalog: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    paragraph: string
    groupLabel: string
  }
  markets: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    paragraph: string
    ctaLabel: string
    cards: MarketCard[]
  }
  services: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    paragraph: string
    cards: ServiceCard[]
  }
  rfq: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    paragraph: string
  }
  contact: { email: string; whatsapp: string; phone: string; address: string }
  footer: { tagline: string; copyright: string; credit: string }
  legal: { lastUpdated: string }
  formOptions: {
    packaging: string[]
    deliveryTimeline: string[]
    incoterms: string[]
    shippingMethod: string[]
    referralSource: string[]
    units: SelectOption[]
  }
  countries: string[]
  productPage: {
    breadcrumb: string
    specificationsLabel: string
    priceLabel: string
    moqLabel: string
    requestQuoteLabel: string
    relatedLabel: string
    currency: string
    fallbackOrigin: string
    fallbackGrade: string
    fallbackAvailability: string
    fallbackSeason: string
    fallbackPriceUnit: string
    fallbackMoqUnit: string
    fallbackIcon: string
  }
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  topbar: {
    left: 'Nigeria · Serving global buyers',
    right: 'Available for 2025/26 contracts',
  },
  brand: { name: 'EXPORTDRIVETECH', tagline: 'AGRO TRADING' },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'Export markets', href: '#markets' },
  ],
  navCta: { label: 'Request a quote', href: '#rfq' },
  hero: {
    eyebrow: 'From West African soil to the world',
    titleLine1: 'Premium crops.',
    titleLine2: 'Global reach.',
    paragraph:
      'Sourcing, processing, and exporting traceable agricultural products for food manufacturers and distributors worldwide.',
    primaryCta: { label: 'Explore our products', href: '#products' },
    secondaryCta: { label: 'Our sourcing story →', href: '#about' },
    image:
      'https://images.unsplash.com/photo-1714830561799-8bb45bf4beb1?auto=format&fit=crop&w=1800&q=85',
    imageAlt: 'Green agricultural field at sunset',
    stats: [
      { value: '12+', label: 'Years of experience' },
      { value: '18', label: 'Export destinations' },
      { value: '100%', label: 'Traceable sourcing' },
      { value: '24–48h', label: 'RFQ response' },
    ],
  },
  featured: {
    eyebrow: 'What we export',
    titleLine1: 'Harvested with care.',
    titleLine2Prefix: 'Prepared for ',
    titleLine2: 'the world.',
    paragraph:
      'We bridge trusted local growers and international buyers. Every shipment is selected, graded, and packed to meet your market requirements.',
    badge: 'Coming Soon',
    placeholderSmall: 'Premium agricultural products sourced from West Africa',
    placeholderTitle: 'Featured Product',
    requestQuoteLabel: 'Request quote →',
    fallbackImages: [
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1714830561799-8bb45bf4beb1?auto=format&fit=crop&w=800&q=80',
    ],
    // One matched photo per product slug, so a card always pictures what it names.
    productImages: [
      { slug: 'chili-pepper', image: productPhoto('dried red chili peppers heaped in a burlap sack, warm natural light, agricultural export product photography') },
      { slug: 'black-pepper', image: productPhoto('whole black peppercorns in a wooden bowl on a rustic table, close up, export product photography') },
      { slug: 'ginger', image: productPhoto('fresh ginger rhizome roots arranged on a rustic wooden surface, natural light') },
      { slug: 'garlic', image: productPhoto('dried garlic bulbs with papery skins in a woven basket, close up') },
      { slug: 'turmeric', image: productPhoto('golden dried turmeric fingers and ground turmeric powder in a bowl') },
      { slug: 'hibiscus-flower', image: productPhoto('dried deep crimson hibiscus flowers in a bowl, natural light, export product photography') },
      { slug: 'cloves', image: productPhoto('aromatic dried cloves in a small wooden bowl, macro close up') },
      { slug: 'rice', image: productPhoto('white long grain rice spilling from a jute sack, top view, agricultural export') },
      { slug: 'maize', image: productPhoto('golden yellow maize corn kernels in a burlap sack, close up') },
      { slug: 'sorghum', image: productPhoto('red sorghum grain seeds in a wooden bowl, close up') },
      { slug: 'millet', image: productPhoto('pearl millet grains in a woven basket, close up') },
      { slug: 'wheat', image: productPhoto('golden wheat grains in a wooden bowl, close up, agricultural export') },
      { slug: 'guinea-corn', image: productPhoto('guinea corn sorghum grains in a woven basket, close up') },
      { slug: 'mango', image: productPhoto('ripe golden mangoes in a wooden crate, tropical fruit harvest') },
      { slug: 'pineapple', image: productPhoto('fresh ripe pineapples stacked in a crate on a farm') },
      { slug: 'banana', image: productPhoto('bunches of fresh ripe yellow bananas on a farm') },
      { slug: 'plantain', image: productPhoto('green plantain bunches stacked at a farm market') },
      { slug: 'papaya', image: productPhoto('ripe papaya fruits with orange flesh in a bowl, tropical fruit') },
      { slug: 'kola-nuts', image: productPhoto('dried kola nuts in a wooden bowl, West African export commodity') },
      { slug: 'citrus-oranges', image: productPhoto('fresh oranges stacked in a crate, citrus fruit harvest') },
      { slug: 'tomatoes', image: productPhoto('fresh red tomatoes in a wooden crate on farm soil') },
      { slug: 'onions', image: productPhoto('dried red onions in a woven basket, close up') },
      { slug: 'atarodo-peppers', image: productPhoto('fresh red atarodo chili peppers in a woven basket, Nigerian produce') },
      { slug: 'ugu', image: productPhoto('fresh ugu pumpkin leaves in a basket, Nigerian vegetable') },
      { slug: 'waterleaf', image: productPhoto('fresh waterleaf greens in a basket, Nigerian vegetable') },
      { slug: 'sesame-seeds', image: productPhoto('white sesame seeds in a small ceramic bowl, macro close up') },
      { slug: 'cashew-nuts', image: productPhoto('raw cashew nuts in a jute bag, export commodity photography') },
      { slug: 'peanut-groundnut', image: productPhoto('raw groundnuts peanuts in a woven basket, close up') },
      { slug: 'shea-nuts', image: productPhoto('raw shea nuts in a woven basket, West African export commodity') },
      { slug: 'melon-seeds-egusi', image: productPhoto('dried egusi melon seeds in a bowl, close up') },
      { slug: 'soybeans', image: productPhoto('dried soybeans in a burlap sack, close up') },
      { slug: 'castor-seeds', image: productPhoto('castor seeds in a wooden bowl, agricultural export commodity') },
      { slug: 'moringa-powder', image: productPhoto('green moringa leaf powder in a wooden bowl, close up') },
      { slug: 'bitter-leaf', image: productPhoto('dried bitter leaves in a basket, Nigerian medicinal herb') },
      { slug: 'scent-leaf', image: productPhoto('fresh scent leaves nchawu in a basket, Nigerian herb') },
      { slug: 'uziza-seeds', image: productPhoto('uziza seeds in a small bowl, Nigerian spice') },
      { slug: 'neem-seeds', image: productPhoto('neem seeds in a wooden bowl, medicinal plant seeds') },
      { slug: 'yam', image: productPhoto('fresh yam tubers stacked on a farm, West African produce') },
      { slug: 'cassava', image: productPhoto('fresh cassava roots with brown skin, tropical tuber harvest') },
      { slug: 'sweet-potato', image: productPhoto('fresh sweet potatoes in a woven basket, close up') },
      { slug: 'irish-potato', image: productPhoto('fresh irish potatoes in a woven basket, close up') },
      { slug: 'cocoyam', image: productPhoto('fresh cocoyam tubers in a basket, West African produce') },
      { slug: 'cowpea-beans', image: productPhoto('dried black eyed cowpea beans in a bowl, close up') },
      { slug: 'pigeon-pea', image: productPhoto('dried pigeon peas in a wooden bowl, legume export') },
      { slug: 'bambara-beans', image: productPhoto('bambara beans in a woven basket, African legume') },
      { slug: 'lima-beans', image: productPhoto('lima beans in a wooden bowl, legume export') },
      { slug: 'palm-kernel', image: productPhoto('palm kernels in a woven basket, West African export commodity') },
      { slug: 'palm-oil', image: productPhoto('red palm oil in a glass jar, West African export commodity') },
      { slug: 'soybean-oil', image: productPhoto('golden soybean oil in a glass bottle, product photography') },
      { slug: 'castor-oil', image: productPhoto('golden castor oil in a glass bottle, vegetable oil export') },
      { slug: 'soya-meal', image: productPhoto('soya meal animal feed in a burlap sack, close up') },
      { slug: 'groundnut-cake', image: productPhoto('groundnut cake animal feed in a burlap sack, close up') },
      { slug: 'cottonseed-cake', image: productPhoto('cottonseed cake animal feed in a burlap sack, close up') },
      { slug: 'palm-kernel-cake', image: productPhoto('palm kernel cake animal feed in a burlap sack, close up') },
    ],
  },
  catalog: {
    eyebrow: 'Our full catalog',
    titleLine1: 'One source.',
    titleLine2: 'Every harvest.',
    paragraph: 'Explore our export-ready selection by product group.',
    groupLabel: 'Product group',
  },
  markets: {
    eyebrow: 'Export markets',
    titleLine1: 'Rooted in Nigeria.',
    titleLine2: 'Requested globally.',
    paragraph:
      'From documentation to last-mile logistics, our export team keeps your consignment moving safely and on schedule.',
    ctaLabel: 'Discuss your destination',
    cards: [
      { region: 'Europe', places: 'Netherlands · Germany · UK' },
      { region: 'Middle East', places: 'UAE · Saudi Arabia · Qatar' },
      { region: 'Asia', places: 'India · China · Vietnam' },
      { region: 'North America', places: 'USA · Canada' },
    ],
  },
  services: {
    eyebrow: 'Beyond exports',
    titleLine1: 'Knowledge that helps',
    titleLine2: 'agriculture grow.',
    paragraph:
      'Practical expertise for farmers, agribusinesses, and international sourcing teams.',
    cards: [
      {
        number: '01',
        title: 'Training',
        copy: 'Quality control, post-harvest handling, and export readiness.',
      },
      {
        number: '02',
        title: 'Consulting',
        copy: 'Market-entry, sourcing, and supply-chain guidance.',
      },
      {
        number: '03',
        title: 'Mentorship',
        copy: 'Long-term support for growers and agribusiness founders.',
      },
    ],
  },
  rfq: {
    eyebrow: 'Request for quotation',
    titleLine1: 'Let’s plan your',
    titleLine2: 'next shipment.',
    paragraph:
      'Complete the form with as much detail as possible. Our export team will respond within 24–48 business hours with pricing, availability, and shipping options.',
  },
  contact: {
    email: env('NEXT_PUBLIC_CONTACT_EMAIL', 'trade@exportdrivetech.com'),
    whatsapp: WHATSAPP_NUMBER,
    phone: env('NEXT_PUBLIC_PHONE_NUMBER', WHATSAPP_NUMBER),
    address: env('NEXT_PUBLIC_COMPANY_ADDRESS', 'Nigeria'),
  },
  footer: {
    tagline: 'Quality from the source. Reliability to your door.',
    copyright: '© 2025 ExportDriveTech Agro Trading',
    credit: 'Designed by Greenleaves Nigeria',
  },
  legal: { lastUpdated: '2025-01-01' },
  formOptions: {
    packaging: ['25kg PP bags', '50kg PP bags', 'Bulk', 'Custom'],
    deliveryTimeline: ['Immediate', 'Within 30 days', 'Within 60 days', 'Flexible'],
    incoterms: ['FOB', 'CIF', 'EXW', 'CFR', 'DDP'],
    shippingMethod: ['Sea freight', 'Air freight', 'Courier', 'Not sure'],
    referralSource: ['Google', 'Referral', 'Trade fair', 'Social media', 'Other'],
    units: [
      { value: 'metric-tons', label: 'Metric tons' },
      { value: 'kilograms', label: 'Kilograms' },
      { value: 'containers', label: 'Containers' },
    ],
  },
  countries: [
    'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark',
    'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'India', 'Indonesia',
    'Ireland', 'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Morocco',
    'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Poland', 'Portugal',
    'Qatar', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain',
    'Sweden', 'Switzerland', 'Türkiye', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Vietnam',
  ],
  productPage: {
    breadcrumb: '← Back to Home',
    specificationsLabel: 'Specifications',
    priceLabel: 'Starting from',
    moqLabel: 'MOQ',
    requestQuoteLabel: 'Request Quote',
    relatedLabel: 'Related Products',
    currency: env('NEXT_PUBLIC_CURRENCY_SYMBOL', '₦'),
    fallbackOrigin: 'Nigeria',
    fallbackGrade: 'Premium',
    fallbackAvailability: 'Available',
    fallbackSeason: 'Year-round',
    fallbackPriceUnit: 'metric ton',
    fallbackMoqUnit: 'metric tons',
    fallbackIcon: '📦',
  },
}
