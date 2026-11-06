import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'moq', 'status'],
    group: 'Products',
  },
  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (auto-generated from name if empty)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
      admin: {
        description: 'Product category grouping',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short product description for listings',
      },
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      admin: {
        description: 'Detailed product description for detail page',
      },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Main image for listings',
      },
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Product specifications (e.g., Purity: 99.5%, Moisture: 8%)',
      },
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'Price per metric ton (USD)',
      },
    },
    {
      name: 'priceUnit',
      type: 'select',
      defaultValue: 'metric-ton',
      options: [
        { label: 'Per Metric Ton', value: 'metric-ton' },
        { label: 'Per Kilogram', value: 'kilogram' },
        { label: 'Per Container', value: 'container' },
      ],
    },
    {
      name: 'moq',
      type: 'number',
      admin: {
        description: 'Minimum Order Quantity (metric tons)',
      },
    },
    {
      name: 'moqUnit',
      type: 'select',
      defaultValue: 'metric-tons',
      options: [
        { label: 'Metric Tons', value: 'metric-tons' },
        { label: 'Kilograms', value: 'kilograms' },
        { label: 'Containers', value: 'containers' },
      ],
    },
    {
      name: 'availability',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Limited', value: 'limited' },
        { label: 'Out of Stock', value: 'out-of-stock' },
        { label: 'Seasonal', value: 'seasonal' },
      ],
    },
    {
      name: 'season',
      type: 'text',
      admin: {
        description: 'Harvest season (e.g., October - February)',
      },
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
        },
      ],
      admin: {
        description: 'Product certifications (Organic, ISO, Fair Trade, etc.)',
      },
    },
    {
      name: 'packagingOptions',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'text',
          required: true,
        },
        {
          name: 'weight',
          type: 'text',
        },
      ],
      admin: {
        description: 'Available packaging (e.g., 25kg PP bags, 50kg PP bags, Bulk)',
      },
    },
    {
      name: 'origin',
      type: 'text',
      admin: {
        description: 'Country or region of origin',
      },
    },
    {
      name: 'grade',
      type: 'text',
      admin: {
        description: 'Product grade (e.g., Grade A, Premium, Standard)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        description: 'Only published products appear on the website',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in featured products section',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title (defaults to product name)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO description',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from name if not provided
        if (operation === 'create' && data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation, previousDoc }) => {
        // Update category productsCount when product is created, updated, or deleted
        const categoryId = doc.category?.id || doc.category
        const previousCategoryId = previousDoc?.category?.id || previousDoc?.category

        const updateCategoryCount = async (catId: string) => {
          if (!catId) return
          
          const products = await req.payload.find({
            collection: 'products',
            where: {
              category: { equals: catId },
              status: { equals: 'published' },
            },
            limit: 0,
          })
          
          await req.payload.update({
            collection: 'product-categories',
            id: catId,
            data: {
              productsCount: products.totalDocs,
            },
          })
        }

        // Update current category
        if (categoryId) {
          await updateCategoryCount(categoryId)
        }

        // Update previous category if it changed
        if (previousCategoryId && previousCategoryId !== categoryId) {
          await updateCategoryCount(previousCategoryId)
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        // Update category count when product is deleted
        const categoryId = doc.category?.id || doc.category
        if (!categoryId) return

        const products = await req.payload.find({
          collection: 'products',
          where: {
            category: { equals: categoryId },
            status: { equals: 'published' },
          },
          limit: 0,
        })

        await req.payload.update({
          collection: 'product-categories',
          id: categoryId,
          data: {
            productsCount: products.totalDocs,
          },
        })
      },
    ],
  },
}
