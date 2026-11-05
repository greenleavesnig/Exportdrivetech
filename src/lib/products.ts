import config from '@payload-config'
import { getPayload } from 'payload'

export type Product = {
  id: string
  name: string
  slug: string
  category: {
    id: string
    name: string
    description?: string
    icon?: string
  }
  description: string
  fullDescription?: any
  images?: Array<{
    image: {
      id: string
      url: string
      alt?: string
    }
    alt: string
  }>
  featuredImage?: {
    id: string
    url: string
    alt?: string
  }
  specifications?: Array<{
    label: string
    value: string
  }>
  price?: number
  priceUnit?: string
  moq?: number
  moqUnit?: string
  availability?: string
  season?: string
  certifications?: Array<{
    name: string
    issuer?: string
  }>
  packagingOptions?: Array<{
    type: string
    weight?: string
  }>
  origin?: string
  grade?: string
  status: string
  featured: boolean
  meta?: {
    title?: string
    description?: string
  }
  createdAt: string
  updatedAt: string
}

export type ProductCategory = {
  id: string
  name: string
  description?: string
  icon?: string
  order: number
  productsCount?: number
}

export async function getProducts(options?: {
  limit?: number
  category?: string
  featured?: boolean
  status?: string
}): Promise<Product[]> {
  const payload = await getPayload({ config })

  const where: any = {}
  
  if (options?.category) {
    where.category = {
      equals: options.category,
    }
  }
  
  if (options?.featured) {
    where.featured = {
      equals: true,
    }
  }
  
  if (options?.status) {
    where.status = {
      equals: options.status,
    }
  } else {
    where.status = {
      equals: 'published',
    }
  }

  const result = await payload.find({
    collection: 'products',
    where,
    limit: options?.limit || 100,
    depth: 2,
    sort: '-createdAt',
  })

  return result.docs as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] as Product || null
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'product-categories',
    depth: 0,
    sort: 'order',
  })

  return result.docs as ProductCategory[]
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return getProducts({ category: categoryId })
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  return getProducts({ featured: true, limit })
}
