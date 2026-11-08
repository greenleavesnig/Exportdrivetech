'use client'

import { useState } from 'react'
import type { Product, ProductCategory } from '@/lib/products'
import Link from 'next/link'
import { DEFAULT_SITE_CONTENT, type SiteContent } from '@/lib/site-defaults'

interface ProductCatalogProps {
  categories: ProductCategory[]
  products: Product[]
  loading: boolean
  content?: SiteContent['catalog']
}

export default function ProductCatalog({ categories, products, loading, content = DEFAULT_SITE_CONTENT.catalog }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState(0)

  const activeCategoryData = categories[activeCategory]
  const categoryProducts = activeCategoryData
    ? products.filter((p) => p.category.id === activeCategoryData.id)
    : []

  return (
    <section id="products" className="section catalog">
      <div className="shell split-heading">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.titleLine1} <em>{content.titleLine2}</em></h2>
        </div>
        <p>{content.paragraph}</p>
      </div>
      <div className="shell catalog-box">
        <div className="group-tabs">
          {categories.map((category, index) => (
            <button
              type="button"
              className={index === activeCategory ? 'active' : ''}
              onClick={() => setActiveCategory(index)}
              key={category.id}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {category.icon && <span className="ml-1">{category.icon}</span>}
              {category.name}
              <small>
                {
                  products.filter((p) => p.category.id === category.id)
                    .length
                }
              </small>
            </button>
          ))}
        </div>
        <div className="group-products">
          <small>{content.groupLabel}</small>
          <h3>{activeCategoryData?.name}</h3>
          <div>
            {categoryProducts.map((product) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="product-item"
              >
                <div className="product-item-info">
                  <div className="product-item-name">{product.name}</div>
                  {product.description && (
                    <div className="product-item-desc">
                      {product.description.length > 80
                        ? `${product.description.slice(0, 80)}...`
                        : product.description}
                    </div>
                  )}
                </div>
                <span className="product-item-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
