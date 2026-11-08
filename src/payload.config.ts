import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { en as adminLanguage } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { RFQSubmissions } from './collections/RFQSubmissions'
import { Products } from './collections/Products'
import { ProductCategories } from './collections/ProductCategories'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Use pooled connection string to avoid connection limit issues
const connectionString = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING

// Append SSL mode to connection string for Supabase compatibility
const sslConnectionString = connectionString
  ? `${connectionString}${connectionString.includes('?') ? '&' : '?'}sslmode=no-verify`
  : connectionString

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: sslConnectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  }),
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'trade@exportdrivetech.com',
    defaultFromName: 'ExportDriveTech',
  }),
  admin: {
    user: Admins.slug,
    meta: {
      titleSuffix: ' | ExportDriveTech Admin',
    },
    dateFormat: 'dd/MM/yyyy',
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['/components/admin/Dashboard#Dashboard'],
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { 'en': adminLanguage },
  },
  collections: [Admins, Media, Folders, Tags, RFQSubmissions, Products, ProductCategories],
  globals: [SiteSettings],
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
