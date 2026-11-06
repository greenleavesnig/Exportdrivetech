import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { en as adminLanguage } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { RFQSubmissions } from './collections/RFQSubmissions'
import { Products } from './collections/Products'
import { ProductCategories } from './collections/ProductCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Use pooled connection string to avoid connection limit issues
const connectionString = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  admin: {
    user: Admins.slug,
    dashboard: {
      widgets: [],
      defaultLayout: [
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { 'en': adminLanguage },
  },
  collections: [Admins, Media, Folders, Tags, RFQSubmissions, Products, ProductCategories],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',
})
