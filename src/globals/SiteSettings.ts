import type { GlobalConfig } from 'payload'

/**
 * Editable marketing content for the public website.
 *
 * Every field is optional: leave it empty and the site falls back to the
 * built-in default in src/lib/site-defaults.ts. Read via getSiteContent().
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Content',
    description:
      'Global copy, navigation, contact details, and form options for the public website. Leave a field blank to keep the built-in default.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'topbar',
      label: 'Top bar',
      fields: [
        { name: 'left', type: 'text', label: 'Left text' },
        { name: 'right', type: 'text', label: 'Right text' },
      ],
    },
    {
      type: 'group',
      name: 'brand',
      label: 'Brand',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'tagline', type: 'text' },
      ],
    },
    {
      name: 'nav',
      type: 'array',
      label: 'Navigation links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      type: 'group',
      name: 'navCta',
      label: 'Navigation call-to-action',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'hero',
      label: 'Hero',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'titleLine1', type: 'text', label: 'Title line 1' },
        { name: 'titleLine2', type: 'text', label: 'Title line 2 (highlighted)' },
        { name: 'paragraph', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'primaryCta', type: 'group', label: 'Primary button', fields: [{ name: 'label', type: 'text' }, { name: 'href', type: 'text' }] },
            { name: 'secondaryCta', type: 'group', label: 'Secondary link', fields: [{ name: 'label', type: 'text' }, { name: 'href', type: 'text' }] },
          ],
        },
        { name: 'image', type: 'text', label: 'Background image URL' },
        { name: 'imageAlt', type: 'text', label: 'Background image alt text' },
        {
          name: 'stats',
          type: 'array',
          label: 'Hero stats',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'featured',
      label: 'Featured products section',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'titleLine1', type: 'text', label: 'Title line 1' },
        { name: 'titleLine2Prefix', type: 'text', label: 'Title line 2 prefix (plain text before the highlighted part)' },
        { name: 'titleLine2', type: 'text', label: 'Title line 2 (highlighted)' },
        { name: 'paragraph', type: 'textarea' },
        { name: 'badge', type: 'text', label: 'Placeholder badge' },
        { name: 'placeholderSmall', type: 'text' },
        { name: 'placeholderTitle', type: 'text' },
        { name: 'requestQuoteLabel', type: 'text' },
        { name: 'fallbackImages', type: 'text', hasMany: true, label: 'Fallback image URLs' },
        {
          name: 'productImages',
          type: 'array',
          label: 'Product images',
          admin: { description: 'Match a product slug to the photo shown for it in the rotating "What we export" carousel.' },
          fields: [
            { name: 'slug', type: 'text', required: true, label: 'Product slug (e.g. ginger)' },
            { name: 'image', type: 'text', required: true, label: 'Image URL' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'catalog',
      label: 'Catalog section',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'titleLine1', type: 'text', label: 'Title line 1' },
        { name: 'titleLine2', type: 'text', label: 'Title line 2 (highlighted)' },
        { name: 'paragraph', type: 'textarea' },
        { name: 'groupLabel', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'markets',
      label: 'Export markets',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'titleLine1', type: 'text', label: 'Title line 1' },
        { name: 'titleLine2', type: 'text', label: 'Title line 2 (highlighted)' },
        { name: 'paragraph', type: 'textarea' },
        { name: 'ctaLabel', type: 'text' },
        {
          name: 'cards',
          type: 'array',
          fields: [
            { name: 'region', type: 'text', required: true },
            { name: 'places', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'services',
      label: 'Services',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'titleLine1', type: 'text', label: 'Title line 1' },
        { name: 'titleLine2', type: 'text', label: 'Title line 2 (highlighted)' },
        { name: 'paragraph', type: 'textarea' },
        {
          name: 'cards',
          type: 'array',
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'copy', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'rfq',
      label: 'RFQ section',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'titleLine1', type: 'text', label: 'Title line 1' },
        { name: 'titleLine2', type: 'text', label: 'Title line 2' },
        { name: 'paragraph', type: 'textarea' },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact details',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp number' },
        { name: 'phone', type: 'text', label: 'Phone number' },
        { name: 'address', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'footer',
      label: 'Footer',
      fields: [
        { name: 'tagline', type: 'text' },
        { name: 'copyright', type: 'text' },
        { name: 'credit', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'legal',
      label: 'Legal pages',
      fields: [
        { name: 'lastUpdated', type: 'date', label: 'Last updated (Privacy & Terms)' },
      ],
    },
    {
      type: 'group',
      name: 'formOptions',
      label: 'RFQ form options',
      fields: [
        { name: 'packaging', type: 'text', hasMany: true },
        { name: 'deliveryTimeline', type: 'text', hasMany: true },
        { name: 'incoterms', type: 'text', hasMany: true },
        { name: 'shippingMethod', type: 'text', hasMany: true },
        { name: 'referralSource', type: 'text', hasMany: true },
        {
          name: 'units',
          type: 'array',
          label: 'Quantity units',
          fields: [
            { name: 'value', type: 'text', required: true, label: 'Value (e.g. metric-tons)' },
            { name: 'label', type: 'text', required: true, label: 'Label (e.g. Metric tons)' },
          ],
        },
      ],
    },
    {
      name: 'countries',
      type: 'text',
      hasMany: true,
      label: 'Country list (RFQ form)',
    },
    {
      type: 'group',
      name: 'productPage',
      label: 'Product detail page',
      fields: [
        { name: 'breadcrumb', type: 'text' },
        { name: 'specificationsLabel', type: 'text' },
        { name: 'priceLabel', type: 'text' },
        { name: 'moqLabel', type: 'text' },
        { name: 'requestQuoteLabel', type: 'text' },
        { name: 'relatedLabel', type: 'text' },
        { name: 'currency', type: 'text', admin: { description: 'Currency symbol shown before prices, e.g. ₦ or $' } },
        { name: 'fallbackOrigin', type: 'text' },
        { name: 'fallbackGrade', type: 'text' },
        { name: 'fallbackAvailability', type: 'text' },
        { name: 'fallbackSeason', type: 'text' },
        { name: 'fallbackPriceUnit', type: 'text' },
        { name: 'fallbackMoqUnit', type: 'text' },
        { name: 'fallbackIcon', type: 'text' },
      ],
    },
  ],
}
