'use client'

import { useEffect, useState } from 'react'
import type { Product, ProductCategory } from '@/lib/products'
import Link from 'next/link'

export default function ProductCatalog() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products'),
        ])
        const [cats, prods] = await Promise.all([
          catsRes.json(),
          prodsRes.json(),
        ])
        setCategories(cats)
        setProducts(prods)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const activeCategoryData = categories[activeCategory]
  const categoryProducts = activeCategoryData
    ? products.filter((p) => p.category.id === activeCategoryData.id)
    : []

  if (loading) {
    return (
      <section id="products" className="section catalog">
        <div className="shell">
          <p>Loading products...</p>
        </div>
      </section>
    )
  }

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
