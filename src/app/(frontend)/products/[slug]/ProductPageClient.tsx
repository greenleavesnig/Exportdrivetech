'use client'

import type { Product } from '@/lib/products'
import Link from 'next/link'

interface ProductPageClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  return (
    <div className="product-detail">
      <div className="shell">
        <Link href="/" className="breadcrumb">
          ← Back to Home
        </Link>

        <div className="product-grid">
          <div className="product-gallery">
            <div className="main-image">
              {product.featuredImage?.url ? (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.alt || product.name}
                />
              ) : (
                <div className="product-item-placeholder" style={{ fontSize: '64px' }}>
                  {product.category?.icon || '📦'}
                </div>
              )}
            </div>
          </div>

          <div className="product-info">
            <span className="product-category">{product.category?.name}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">
              {product.fullDescription || product.description}
            </p>

            <div className="product-stats">
              <div className="stat">
                <small>Origin</small>
                <strong>{product.origin || 'Nigeria'}</strong>
              </div>
              <div className="stat">
                <small>Grade</small>
                <strong>{product.grade || 'Premium'}</strong>
              </div>
              <div className="stat">
                <small>Availability</small>
                <strong>{product.availability || 'Available'}</strong>
              </div>
              <div className="stat">
                <small>Season</small>
                <strong>{product.season || 'Year-round'}</strong>
              </div>
            </div>

            {product.specifications && product.specifications.length > 0 && (
              <div className="product-specs">
                <h3>Specifications</h3>
                <dl>
                  {product.specifications.map((spec, index) => (
                    <div key={index}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.price && (
              <div className="product-price">
                <div className="price-info">
                  <span className="price-label">Starting from</span>
                  <span className="price-value">
                    ₦{product.price.toLocaleString()} / {product.priceUnit || 'metric ton'}
                  </span>
                </div>
                {product.moq && (
                  <span className="moq-info">
                    MOQ: {product.moq} {product.moqUnit || 'metric tons'}
                  </span>
                )}
              </div>
            )}

            <div className="product-cta">
              <Link href="/#rfq" className="button lime">
                Request Quote
              </Link>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="related-card"
                >
                  <div className="related-card-image">
                    {related.featuredImage?.url ? (
                      <img src={related.featuredImage.url} alt={related.name} />
                    ) : (
                      <div className="product-item-placeholder">
                        {related.category?.icon || '📦'}
                      </div>
                    )}
                  </div>
                  <div>
                    <small>{related.category?.name}</small>
                    <h3>{related.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
