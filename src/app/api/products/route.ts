import { NextResponse } from 'next/server'
import { getProducts, getProductCategories, getFeaturedProducts } from '@/lib/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  const limit = searchParams.get('limit')

  try {
    if (featured === 'true') {
      const products = await getFeaturedProducts(limit ? parseInt(limit) : 3)
      return NextResponse.json(products)
    }

    if (category) {
      const products = await getProducts({ category, limit: limit ? parseInt(limit) : undefined })
      return NextResponse.json(products)
    }

    const products = await getProducts({ limit: limit ? parseInt(limit) : undefined })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
