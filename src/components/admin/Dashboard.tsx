import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  quoted: 'Quoted',
  negotiating: 'Negotiating',
  'closed-won': 'Won',
  'closed-lost': 'Lost',
}

const numberFormat = new Intl.NumberFormat('en-US')

function formatDate(value?: string) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export async function Dashboard() {
  const payload = await getPayload({ config })

  let counts = {
    products: 0,
    published: 0,
    categories: 0,
    media: 0,
    rfqs: 0,
    newRfqs: 0,
  }
  let recent: any[] = []

  try {
    const [products, published, categories, media, rfqs, newRfqs, recentRfqs] = await Promise.all([
      payload.count({ collection: 'products', overrideAccess: true }),
      payload.count({ collection: 'products', where: { status: { equals: 'published' } }, overrideAccess: true }),
      payload.count({ collection: 'product-categories', overrideAccess: true }),
      payload.count({ collection: 'media', overrideAccess: true }),
      payload.count({ collection: 'rfq-submissions', overrideAccess: true }),
      payload.count({ collection: 'rfq-submissions', where: { status: { equals: 'new' } }, overrideAccess: true }),
      payload.find({ collection: 'rfq-submissions', limit: 5, sort: '-createdAt', depth: 1, overrideAccess: true }),
    ])

    counts = {
      products: products.totalDocs,
      published: published.totalDocs,
      categories: categories.totalDocs,
      media: media.totalDocs,
      rfqs: rfqs.totalDocs,
      newRfqs: newRfqs.totalDocs,
    }
    recent = recentRfqs.docs
  } catch (error) {
    console.error('[admin dashboard] failed to load stats:', error)
  }

  const tiles = [
    { label: 'Products', value: counts.products, hint: `${counts.published} published`, href: '/admin/collections/products' },
    { label: 'Categories', value: counts.categories, hint: 'product groups', href: '/admin/collections/product-categories' },
    {
      label: 'RFQ submissions',
      value: counts.rfqs,
      hint: counts.newRfqs > 0 ? `${counts.newRfqs} awaiting reply` : 'all replied',
      href: '/admin/collections/rfq-submissions',
      accent: counts.newRfqs > 0,
    },
    { label: 'Media', value: counts.media, hint: 'files & images', href: '/admin/collections/media' },
  ]

  const actions = [
    { label: 'Review RFQ submissions', href: '/admin/collections/rfq-submissions' },
    { label: 'Browse product catalog', href: '/admin/collections/products' },
    { label: 'Product categories', href: '/admin/collections/product-categories' },
    { label: 'Edit site content', href: '/admin/globals/site-settings' },
    { label: 'Media library', href: '/admin/collections/media' },
  ]

  return (
    <section className="edt-dashboard">
      <div className="edt-hero">
        <div>
          <p className="edt-hero-eyebrow">ExportDriveTech Agro Trading</p>
          <h1>Welcome back</h1>
          <p className="edt-hero-copy">
            This is your control room for the export operation — track buyer quotes, keep the product
            catalog current, and edit the public website content.
          </p>
        </div>
        <div className="edt-hero-actions">
          <a className="edt-btn edt-btn--primary" href="/admin/collections/rfq-submissions">
            View RFQs
          </a>
          <a className="edt-btn" href="/" target="_blank" rel="noreferrer">
            View live site
          </a>
        </div>
      </div>

      <div className="edt-stats">
        {tiles.map((tile) => (
          <a className={`edt-stat${tile.accent ? ' edt-stat--accent' : ''}`} href={tile.href} key={tile.label}>
            <span className="edt-stat-value">{numberFormat.format(tile.value)}</span>
            <span className="edt-stat-label">{tile.label}</span>
            <span className="edt-stat-hint">{tile.hint}</span>
          </a>
        ))}
      </div>

      <div className="edt-grid">
        <div className="edt-panel">
          <div className="edt-panel-head">
            <h2>Latest RFQ submissions</h2>
            <a href="/admin/collections/rfq-submissions">View all</a>
          </div>
          {recent.length > 0 ? (
            <ul className="edt-list">
              {recent.map((rfq) => (
                <li key={rfq.id}>
                  <a href={`/admin/collections/rfq-submissions/${rfq.id}`}>
                    <span className="edt-list-main">
                      <strong>{rfq.buyerName || 'Unnamed buyer'}</strong>
                      <small>
                        {[rfq.company, rfq.country].filter(Boolean).join(' · ') || 'No company details'}
                      </small>
                    </span>
                    <span className="edt-list-meta">
                      <span className="edt-ref">{rfq.referenceNumber || `#${rfq.id}`}</span>
                      <time>{formatDate(rfq.createdAt)}</time>
                    </span>
                    <span className={`edt-badge edt-badge--${rfq.status || 'new'}`}>
                      {STATUS_LABELS[rfq.status] || 'New'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="edt-empty">
              No RFQ submissions yet. New quote requests from the website will appear here.
            </p>
          )}
        </div>

        <div className="edt-panel">
          <div className="edt-panel-head">
            <h2>Quick actions</h2>
          </div>
          <div className="edt-actions">
            {actions.map((action) => (
              <a className="edt-action" href={action.href} key={action.href}>
                {action.label}
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
