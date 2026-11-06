import ProductPageClient from './ProductPageClient'
import type { Metadata } from 'next'
import { getProductBySlug } from '@/lib/products'

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
  return <ProductPageClient slug={slug} />
}
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [menu, setMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadProduct() {
      try {
        const prod = await getProductBySlug(slug)
        if (!prod) {
          notFound()
        }
        setProduct(prod)
        setSelectedImage(prod.featuredImage?.url || null)
        
        const related = await getProducts({
          category: prod.category.id,
          limit: 4,
        })
        setRelatedProducts(related)
      } catch (error) {
        console.error('Failed to load product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [slug])

  if (loading) {
    return (
      <main>
        <div className="topbar"><div className="shell"><span>Accra, Ghana · Serving global buyers</span><span>Available for 2025/26 contracts</span></div></div>
        <header>
          <div className="shell nav">
            <Link href="/" className="brand"><i><Mark /></i><span><strong>EXPORTDRIVETECH</strong><small>AGRO TRADING</small></span></Link>
            <nav className="desktop-nav"><Link href="/">Home</Link><Link href="/#products">Products</Link><Link href="/#services">Services</Link><Link href="/#rfq">Request quote</Link></nav>
          </div>
        </header>
        <section className="section">
          <div className="shell">
            <div className="product-loading">
              <div className="skeleton-box" />
              <div className="skeleton-text" />
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <main>
      <div className="topbar"><div className="shell"><span>Accra, Ghana · Serving global buyers</span><span>Available for 2025/26 contracts</span></div></div>
      
      <header>
        <div className="shell nav">
          <Link href="/" className="brand"><i><Mark /></i><span><strong>EXPORTDRIVETECH</strong><small>AGRO TRADING</small></span></Link>
          <nav className="desktop-nav"><Link href="/">Home</Link><Link href="/#products">Products</Link><Link href="/#services">Services</Link><Link href="/#rfq">Request quote</Link></nav>
          <Link className="nav-cta" href="/#rfq">Request a quote <Arrow /></Link>
          <button type="button" className="menu-button" aria-label="Toggle menu" onClick={() => setMenu(!menu)}><span /><span /></button>
        </div>
        {menu && <nav className="mobile-nav"><Link href="/">Home</Link><Link href="/#products">Products</Link><Link href="/#services">Services</Link><Link href="/#rfq">Request quote</Link></nav>}
      </header>

      <section className="section product-detail">
        <div className="shell">
          <Link href="/#products" className="breadcrumb">← Back to Products</Link>
          
          <div className="product-grid">
            <div className="product-gallery">
              <div className="main-image">
                {selectedImage && (
                  <img src={selectedImage} alt={product.name} />
                )}
              </div>
              {product.images && product.images.length > 0 && (
                <div className="thumbnail-grid">
                  {product.featuredImage && (
                    <button
                      type="button"
                      className={selectedImage === product.featuredImage.url ? 'active' : ''}
                      onClick={() => setSelectedImage(product.featuredImage!.url)}
                    >
                      <img src={product.featuredImage.url} alt={product.featuredImage.alt || product.name} />
                    </button>
                  )}
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      className={selectedImage === img.image.url ? 'active' : ''}
                      onClick={() => setSelectedImage(img.image.url)}
                    >
                      <img src={img.image.url} alt={img.alt} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-info">
              <div className="product-category">{product.category.name}</div>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-description">{product.description}</p>

              <div className="product-stats">
                {product.price && (
                  <div className="stat">
                    <small>Price</small>
                    <strong>${product.price} / {product.priceUnit === 'metric-ton' ? 'MT' : product.priceUnit === 'kilogram' ? 'kg' : product.priceUnit || 'unit'}</strong>
                  </div>
                )}
                {product.moq && (
                  <div className="stat">
                    <small>Minimum Order</small>
                    <strong>{product.moq} {product.moqUnit === 'metric-tons' ? 'MT' : product.moqUnit === 'kilograms' ? 'kg' : product.moqUnit || 'units'}</strong>
                  </div>
                )}
                {product.availability && (
                  <div className="stat">
                    <small>Availability</small>
                    <strong className="capitalize">{product.availability.replace('-', ' ')}</strong>
                  </div>
                )}
                {product.origin && (
                  <div className="stat">
                    <small>Origin</small>
                    <strong>{product.origin}</strong>
                  </div>
                )}
              </div>

              {product.specifications && product.specifications.length > 0 && (
                <div className="product-specs">
                  <h3>Specifications</h3>
                  <dl>
                    {product.specifications.map((spec, i) => (
                      <div key={i}>
                        <dt>{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {product.season && (
                <div className="product-season">
                  <strong>Season:</strong> {product.season}
                </div>
              )}

              {product.packagingOptions && product.packagingOptions.length > 0 && (
                <div className="product-packaging">
                  <h3>Packaging Options</h3>
                  <ul>
                    {product.packagingOptions.map((pkg, i) => (
                      <li key={i}>{pkg.type} {pkg.weight && `(${pkg.weight})`}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.certifications && product.certifications.length > 0 && (
                <div className="product-certifications">
                  <h3>Certifications</h3>
                  <ul>
                    {product.certifications.map((cert, i) => (
                      <li key={i}>{cert.name} {cert.issuer && `(${cert.issuer})`}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href="/#rfq" className="button lime product-cta">Request a Quote <Arrow /></Link>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="related-products">
              <h2>Related Products</h2>
              <div className="related-grid">
                {relatedProducts
                  .filter((p) => p.id !== product.id)
                  .slice(0, 4)
                  .map((related) => (
                    <Link key={related.id} href={`/products/${related.slug}`} className="related-card">
                      {related.featuredImage && (
                        <img src={related.featuredImage.url} alt={related.featuredImage.alt || related.name} />
                      )}
                      <div>
                        <small>{related.category.name}</small>
                        <h3>{related.name}</h3>
                      </div>
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
            <a href="/" className="brand inverse"><i><Mark /></i><span><strong>EXPORTDRIVETECH</strong><small>AGRO TRADING</small></span></a>
            <p>Quality from the source. Reliability to your door.</p>
          </div>
          <div><a href="/#about">About</a><a href="/#products">Products</a><a href="/#services">Services</a><a href="/#rfq">Request quote</a></div>
          <div><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a></div>
        </div>
        <div className="shell copyright"><span>© 2025 ExportDriveTech Agro Trading</span><span>Accra · Ghana</span></div>
      </footer>
    </main>
  )
}
