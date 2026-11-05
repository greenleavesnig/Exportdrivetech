'use client'

import type { Product } from '@/lib/products'
import Link from 'next/link'

interface FeaturedProductsProps {
  products: Product[]
  loading: boolean
}

export default function FeaturedProducts({ products, loading }: FeaturedProductsProps) {

  const chooseProduct = (productName: string, categoryName: string) => {
    const rfqSection = document.getElementById('rfq')
    rfqSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const featuredProducts = products.filter(p => p.featured).slice(0, 3)

  if (loading) {
    return (
      <section id="about" className="section">
        <div className="shell">
          <p>Loading featured products...</p>
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
        {featuredProducts.map((product) => (
          <article className="feature-card" key={product.id}>
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.alt || product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="card-shade" />
            <span>{product.category.name}</span>
            <div>
              <small>{product.description}</small>
              <h3>{product.name}</h3>
              <button
                type="button"
                onClick={() => chooseProduct(product.name, product.category.name)}
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
