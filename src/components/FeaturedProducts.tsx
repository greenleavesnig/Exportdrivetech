'use client'

import type { Product } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'

interface FeaturedProductsProps {
  products: Product[]
  loading: boolean
}

// Fallback images for featured products
const fallbackImages = [
  'https://images.unsplash.com/photo-1592797913307-1f696cf2f5a7?auto=format&fit=crop&w=800&q=80', // Ginger
  'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=800&q=80', // Cashews
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80', // Hibiscus
]

export default function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  const featuredProducts = products.filter(p => p.featured).slice(0, 3)

  if (loading) {
    return (
      <section id="about" className="section">
        <div className="shell split-heading">
          <div>
            <p className="eyebrow">What we export</p>
            <h2>Harvested with care.<br />Prepared for <em>the world.</em></h2>
          </div>
          <p>We bridge trusted local growers and international buyers. Every shipment is selected, graded, and packed to meet your market requirements.</p>
        </div>
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

  // If no featured products, show placeholder with fallback images
  if (featuredProducts.length === 0) {
    return (
      <section id="about" className="section">
        <div className="shell split-heading">
          <div>
            <p className="eyebrow">What we export</p>
            <h2>Harvested with care.<br />Prepared for <em>the world.</em></h2>
          </div>
          <p>We bridge trusted local growers and international buyers. Every shipment is selected, graded, and packed to meet your market requirements.</p>
        </div>
        <div className="shell feature-grid">
          {fallbackImages.map((imgUrl, i) => (
            <article className="feature-card" key={i}>
              <Image
                src={imgUrl}
                alt={`Featured product ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-shade" />
              <span>Coming Soon</span>
              <div>
                <small>Premium agricultural products sourced from West Africa</small>
                <h3>Featured Product {i + 1}</h3>
                <button
                  type="button"
                  onClick={() => {
                    const rfqSection = document.getElementById('rfq')
                    rfqSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Request quote →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="section">
      <div className="shell split-heading">
        <div>
          <p className="eyebrow">What we export</p>
          <h2>Harvested with care.<br />Prepared for <em>the world.</em></h2>
        </div>
        <p>We bridge trusted local growers and international buyers. Every shipment is selected, graded, and packed to meet your market requirements.</p>
      </div>
      <div className="shell feature-grid">
        {featuredProducts.map((product, i) => (
          <article className="feature-card" key={product.id}>
            {product.featuredImage?.url ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.alt || product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Image
                src={fallbackImages[i % fallbackImages.length]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            )}
            <div className="card-shade" />
            <span>{product.category?.name || 'Products'}</span>
            <div>
              <small>{product.description}</small>
              <h3>{product.name}</h3>
              <button
                type="button"
                onClick={() => {
                  const rfqSection = document.getElementById('rfq')
                  rfqSection?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Request quote →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
