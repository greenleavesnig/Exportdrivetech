'use client'

import type { Product } from '@/lib/products'
import Image from 'next/image'
import { DEFAULT_SITE_CONTENT, type SiteContent } from '@/lib/site-defaults'

interface FeaturedProductsProps {
  products: Product[]
  loading: boolean
  content?: SiteContent['featured']
}

export default function FeaturedProducts({ products, loading, content = DEFAULT_SITE_CONTENT.featured }: FeaturedProductsProps) {
  // Rotate through every featured product so more of the range is shown.
  const items = products.filter((product) => product.featured)

  // Prefer the product's own uploaded image, then the slug-matched photo,
  // then a generic fallback — so a card always pictures what it names.
  const imageFor = (product: Product, index: number) => {
    if (product.featuredImage?.url) {
      return { src: product.featuredImage.url, alt: product.featuredImage.alt || product.name }
    }
    const matched = content.productImages?.find((entry) => entry.slug === product.slug)?.image
    return {
      src: matched || content.fallbackImages[index % content.fallbackImages.length],
      alt: product.name,
    }
  }

  const scrollToRfq = () => {
    document.getElementById('rfq')?.scrollIntoView({ behavior: 'smooth' })
  }

  const heading = (
    <div className="shell split-heading">
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.titleLine1}<br />{content.titleLine2Prefix}<em>{content.titleLine2}</em></h2>
      </div>
      <p>{content.paragraph}</p>
    </div>
  )

  if (loading) {
    return (
      <section id="about" className="section">
        {heading}
        <div className="shell feature-grid">
          {[1, 2, 3].map((i) => (
            <article className="feature-card" key={i}>
              <div className="skeleton-box" style={{ height: '475px' }} />
            </article>
          ))}
        </div>
      </section>
    )
  }

  // No featured products yet — rotate the generic fallback photos instead.
  if (items.length === 0) {
    const placeholders = [...content.fallbackImages, ...content.fallbackImages]
    return (
      <section id="about" className="section">
        {heading}
        <div className="shell feature-rail">
          <div className="feature-track">
            {placeholders.map((imgUrl, i) => {
              const n = (i % content.fallbackImages.length) + 1
              return (
                <article className="feature-card" key={`placeholder-${i}`} aria-hidden={i >= content.fallbackImages.length}>
                  <Image
                    src={imgUrl}
                    alt={`${content.placeholderTitle} ${n}`}
                    fill
                    sizes="(max-width: 760px) 280px, 360px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-shade" />
                  <span>{content.badge}</span>
                  <div>
                    <small>{content.placeholderSmall}</small>
                    <h3>{content.placeholderTitle} {n}</h3>
                    <button type="button" onClick={scrollToRfq}>{content.requestQuoteLabel}</button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Duplicate the list once for a seamless, endlessly looping rotation.
  const loop = [
    ...items.map((product) => ({ product, duplicate: false })),
    ...items.map((product) => ({ product, duplicate: true })),
  ]

  return (
    <section id="about" className="section">
      {heading}
      <div className="shell feature-rail">
        <div className="feature-track">
          {loop.map(({ product, duplicate }, index) => {
            const { src, alt } = imageFor(product, index)
            return (
              <article className="feature-card" key={`${product.id}-${index}`} aria-hidden={duplicate}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 760px) 280px, 360px"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-shade" />
                <span>{product.category?.name || 'Products'}</span>
                <div>
                  <small>{product.description}</small>
                  <h3>{product.name}</h3>
                  <button type="button" onClick={scrollToRfq}>{content.requestQuoteLabel}</button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
