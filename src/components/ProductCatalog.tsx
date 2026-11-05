'use client'

import { useState } from 'react'
import type { Product, ProductCategory } from '@/lib/products'
import Link from 'next/link'

interface ProductCatalogProps {
  categories: ProductCategory[]
  products: Product[]
  loading: boolean
}

export default function ProductCatalog({ categories, products, loading }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState(0)

  const activeCategoryData = categories[activeCategory]
  const categoryProducts = activeCategoryData
    ? products.filter((p) => p.category.id === activeCategoryData.id)
    : []



  return (
    <section id="products" className="section catalog">
      <div className="shell split-heading">
        <div>
          <p className="eyebrow">Our full catalog</p>
          <h2>One source. <em>Every harvest.</em></h2>
        </div>
        <p>Explore our export-ready selection by product group.</p>
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
          <small>Product group</small>
          <h3>{activeCategoryData?.name}</h3>
          <div>
            {categoryProducts.map((product) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
              >
                {product.name}
                <span>↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
