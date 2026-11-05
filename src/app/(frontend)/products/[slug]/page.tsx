import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/products'
import type { Metadata } from 'next'

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
    category: product.category.id,
    limit: 4,
  })

  return (
    <main>
      <div className="topbar">
        <div className="shell">
          <span>Accra, Ghana · Serving global buyers</span>
          <span>Available for 2025/26 contracts</span>
        </div>
      </div>

      <header>
        <div className="shell nav">
          <Link href="/" className="brand">
            <span>EXPORTDRIVETECH</span>
            <small>AGRO TRADING</small>
          </Link>
          <nav className="desktop-nav">
            <Link href="/">Home</Link>
            <Link href="/#products">Products</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#rfq">Request a quote</Link>
          </nav>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <Link href="/#products" className="mb-8 inline-block text-blue-600 hover:underline">
            ← Back to Products
          </Link>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              {product.featuredImage && (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.alt || product.name}
                  className="w-full rounded-lg"
                />
              )}
              {product.images && product.images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.image.url}
                      alt={img.alt}
                      className="h-20 w-full rounded object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-zinc-600">
                {product.category.name}
              </p>
              <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
              <p className="mb-6 text-lg text-zinc-700">{product.description}</p>

              {product.specifications && product.specifications.length > 0 && (
                <div className="mb-6 rounded-lg bg-zinc-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Specifications</h3>
                  <dl className="space-y-2">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="flex">
                        <dt className="w-1/3 font-medium text-zinc-600">{spec.label}</dt>
                        <dd className="w-2/3 text-zinc-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mb-6 grid grid-cols-2 gap-4">
                {product.price && (
                  <div>
                    <p className="text-sm text-zinc-600">Price</p>
                    <p className="text-lg font-semibold">
                      ${product.price} / {product.priceUnit === 'metric-ton' ? 'MT' : product.priceUnit}
                    </p>
                  </div>
                )}
                {product.moq && (
                  <div>
                    <p className="text-sm text-zinc-600">Minimum Order</p>
                    <p className="text-lg font-semibold">
                      {product.moq} {product.moqUnit}
                    </p>
                  </div>
                )}
                {product.availability && (
                  <div>
                    <p className="text-sm text-zinc-600">Availability</p>
                    <p className="text-lg font-semibold capitalize">{product.availability}</p>
                  </div>
                )}
                {product.origin && (
                  <div>
                    <p className="text-sm text-zinc-600">Origin</p>
                    <p className="text-lg font-semibold">{product.origin}</p>
                  </div>
                )}
              </div>

              {product.season && (
                <p className="mb-6 text-sm text-zinc-600">
                  <strong>Season:</strong> {product.season}
                </p>
              )}

              {product.packagingOptions && product.packagingOptions.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold">Packaging Options</h3>
                  <ul className="list-inside list-disc text-zinc-700">
                    {product.packagingOptions.map((pkg, i) => (
                      <li key={i}>
                        {pkg.type} {pkg.weight && `(${pkg.weight})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.certifications && product.certifications.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold">Certifications</h3>
                  <ul className="list-inside list-disc text-zinc-700">
                    {product.certifications.map((cert, i) => (
                      <li key={i}>
                        {cert.name} {cert.issuer && `(${cert.issuer})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href="/#rfq"
                className="inline-block rounded bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          {product.fullDescription && (
            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold">Product Details</h2>
              <div className="prose max-w-none text-zinc-700">
                {/* Render rich text content */}
                <p>{product.description}</p>
              </div>
            </div>
          )}

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts
                  .filter((p) => p.id !== product.id)
                  .slice(0, 4)
                  .map((related) => (
                    <Link
                      key={related.id}
                      href={`/products/${related.slug}`}
                      className="rounded-lg border p-4 hover:border-green-600"
                    >
                      {related.featuredImage && (
                        <img
                          src={related.featuredImage.url}
                          alt={related.featuredImage.alt || related.name}
                          className="mb-2 h-32 w-full rounded object-cover"
                        />
                      )}
                      <h3 className="font-semibold">{related.name}</h3>
                      <p className="text-sm text-zinc-600">{related.category.name}</p>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="shell footer">
          <div>
            <a href="#" className="brand inverse">
              <span>EXPORTDRIVETECH</span>
              <small>AGRO TRADING</small>
            </a>
            <p>Quality from the source. Reliability to your door.</p>
          </div>
          <div>
            <a href="/#about">About</a>
            <a href="/#products">Products</a>
            <a href="/#services">Services</a>
            <a href="/#rfq">Request a quote</a>
          </div>
          <div>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
        <div className="shell copyright">
          <span>© 2025 ExportDriveTech Agro Trading</span>
          <span>Accra · Ghana</span>
        </div>
      </footer>
    </main>
  )
}
