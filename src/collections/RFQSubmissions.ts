import type { Access, CollectionBeforeValidateHook, CollectionConfig, FieldAccess } from 'payload'

const isAdmin: Access = ({ req }) => req.user?.collection === 'admins'
const adminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'

const assignReference: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (operation === 'create' && data && !data.referenceNumber) {
    const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
    data.referenceNumber = `RFQ-${date}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
  }
  return data
}

export const RFQSubmissions: CollectionConfig = {
  slug: 'rfq-submissions',
  admin: {
    group: 'Sales',
    useAsTitle: 'referenceNumber',
    defaultColumns: ['referenceNumber', 'buyerName', 'company', 'product', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [assignReference],
  },
  fields: [
    {
      name: 'referenceNumber',
      type: 'text',
      unique: true,
      index: true,
      access: { create: () => false, update: () => false },
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Negotiating', value: 'negotiating' },
        { label: 'Closed — Won', value: 'closed-won' },
        { label: 'Closed — Lost', value: 'closed-lost' },
      ],
      access: { create: () => false, update: adminField },
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'buyerName', type: 'text', required: true },
        { name: 'company', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'country', type: 'text', required: true },
        { name: 'destination', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
      ],
    },
    {
      name: 'preferredContact',
      type: 'select',
      required: true,
      defaultValue: 'email',
      options: ['email', 'phone', 'whatsapp'],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'product-categories',
          required: true,
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'quantity', type: 'number', required: true, min: 1 },
        {
          name: 'unit',
          type: 'select',
          required: true,
          options: ['metric-tons', 'kilograms', 'containers'],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'packaging', type: 'text' },
        { name: 'deliveryTimeline', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'qualityRequirement', type: 'text' },
        { name: 'targetPrice', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'incoterms', type: 'text' },
        { name: 'shippingMethod', type: 'text' },
      ],
    },
    { name: 'hasFreightForwarder', type: 'text' },
    { name: 'specialRequirements', type: 'textarea' },
    { name: 'message', type: 'textarea' },
    { name: 'referralSource', type: 'text' },
    {
      name: 'quoteSentDate',
      type: 'date',
      access: { create: () => false, update: adminField },
      admin: { position: 'sidebar' },
    },
    {
      name: 'followUpDate',
      type: 'date',
      access: { create: () => false, update: adminField },
      admin: { position: 'sidebar' },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      access: { create: () => false, read: adminField, update: adminField },
    },
  ],
  timestamps: true,
  versions: false,
}
