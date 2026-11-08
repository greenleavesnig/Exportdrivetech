import type { Metadata } from 'next'
import { getProductBySlug, getProducts } from '@/lib/products'
import { getSiteContent } from '@/lib/site-settings'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductPageClient from './ProductPageClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.meta?.title || product.name,
    description: product.meta?.description || product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getProducts({
    limit: 4,
    category: product.category.id.toString(),
  })

  const content = await getSiteContent()

  return (
    <ProductPageClient product={product} relatedProducts={relatedProducts.filter(p => p.id !== product.id)} content={content.productPage} />
  )
}
