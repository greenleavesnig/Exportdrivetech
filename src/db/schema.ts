import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const rfqSubmissions = sqliteTable('rfq_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  referenceNumber: text('reference_number').notNull().unique(),
  status: text('status').notNull().default('new'),
  buyerName: text('buyer_name').notNull(),
  company: text('company').notNull(),
  country: text('country').notNull(),
  destination: text('destination').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  preferredContact: text('preferred_contact').notNull().default('email'),
  category: text('category').notNull(),
  product: text('product').notNull(),
  quantity: integer('quantity').notNull(),
  unit: text('unit').notNull(),
  packaging: text('packaging'),
  deliveryTimeline: text('delivery_timeline'),
  qualityRequirement: text('quality_requirement'),
  targetPrice: text('target_price'),
  incoterms: text('incoterms'),
  shippingMethod: text('shipping_method'),
  hasFreightForwarder: text('has_freight_forwarder'),
  specialRequirements: text('special_requirements'),
  message: text('message'),
  referralSource: text('referral_source'),
  quoteSentDate: integer('quote_sent_date'),
  followUpDate: integer('follow_up_date'),
  internalNotes: text('internal_notes'),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').notNull().default(sql`(unixepoch())`),
})

export const media = sqliteTable('media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  alt: text('alt').notNull(),
  folderId: integer('folder_id').references(() => folders.id),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
})

export const folders = sqliteTable('folders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
})

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
})

export const mediaTags = sqliteTable('media_tags', {
  mediaId: integer('media_id').references(() => media.id).notNull(),
  tagId: integer('tag_id').references(() => tags.id).notNull(),
})
