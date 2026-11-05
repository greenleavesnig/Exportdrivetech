import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'productsCount'],
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
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Emoji or icon name for this category',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // Count products in this category
        const products = await req.payload.find({
          collection: 'products',
          where: {
            category: {
              equals: doc.id,
            },
          },
          depth: 0,
          limit: 0,
        })
        return {
          ...doc,
          productsCount: products.totalDocs,
        }
      },
    ],
  },
}
