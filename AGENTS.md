# Agricultural Export Website - Vercel Deployment

This project has been migrated from Figma Make to Vercel with Payload CMS and Supabase PostgreSQL.

## Tech Stack
- **Hosting**: Vercel
- **Database**: Supabase PostgreSQL with Payload CMS
- **Storage**: Payload Media collection (PostgreSQL-backed)
- **Email**: Resend for RFQ notifications
- **Frontend**: Next.js 16, React 19, Tailwind CSS v4
- **Backend**: Payload CMS 3.93

## Migration Status
- [x] Migrated from Figma Make to standard Payload CMS
- [x] Configured Vercel deployment
- [x] Set up Supabase PostgreSQL database
- [x] Created Products and ProductCategories collections
- [x] Added API routes for products and categories
- [x] Created product detail pages
- [x] Configured Resend email notifications
- [x] Added Privacy Policy and Terms of Service pages
- [x] Removed Figma Make branding and dependencies

## Environment Variables

### Vercel Environment Variables
- `PAYLOAD_SECRET` - Payload CMS secret key
- `POSTGRES_URL` - Supabase PostgreSQL connection string
- `POSTGRES_PRISMA_URL` - Prisma-compatible connection string
- `POSTGRES_URL_NON_POOLING` - Non-pooled connection string
- `POSTGRES_HOST` - Supabase host
- `POSTGRES_DATABASE` - Database name
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `RESEND_API_KEY` - Resend API key for email notifications
- `RESEND_FROM_EMAIL` - Verified sender email (trade@exportdrivetech.com)
- `SALES_NOTIFICATION_EMAIL` - Email for RFQ notifications

## Project Structure

- `src/app/(frontend)/` - Public-facing pages
- `src/app/(payload)/` - Payload CMS admin panel
- `src/collections/` - Payload data collection definitions
- `src/payload.config.ts` - Payload configuration
- `src/payload-types.ts` - Auto-generated TypeScript types
- `src/seed.ts` - Database seed script for initial products
- `src/init-db.ts` - Database initialization helper

## Collections

### Products
Full product catalog with:
- Basic info (name, slug, description)
- Specifications (origin, grade, MOQ, certifications)
- Pricing and availability
- Packaging options
- Seasonality information
- SEO metadata
- Featured and gallery images

### ProductCategories
Organized categories with:
- Name and slug
- Icon (emoji)
- Display order
- SEO metadata

### RFQSubmissions
Request for Quote submissions linked to:
- Product and category references
- Buyer information
- Shipping and logistics details
- Special requirements
- Status tracking

### Media
Media library for images and documents.

### Tags
Tag system for media organization.

## API Routes

- `/api/products` - Fetch products (supports category filtering and featured flag)
- `/api/categories` - Fetch all product categories
- `/products/[slug]` - Product detail pages

## Build Commands

- `npm run build` - Build for production
- `npm run dev` - Start development server
- `npm run seed` - Seed database with initial products
- `npm run init-db` - Initialize database tables

## Deployment

### Vercel Deployment
```bash
vercel --prod
```

### View Logs
```bash
vercel logs
```

## Development Notes

### Payload CMS
- Use standard `buildConfig()` (not `buildFigmaConfig`)
- PostgreSQL adapter via `@payloadcms/db-postgres`
- Admin panel at `/admin`
- Database tables auto-create on first admin visit

### Client Components
- Do not import Payload directly into client components
- Use API routes for data fetching
- Server Actions for form submissions

### Images
- Use Payload Media collection for uploads
- Pass `media.url` to `next/image`
- Custom image loader configured in `next.config.ts`

## Current Website Architecture

**Frontend**: Next.js 16 with Tailwind CSS  
**Backend**: Payload CMS with PostgreSQL (Supabase)  
**Email**: Resend  
**Hosting**: Vercel  
**Database**: Supabase PostgreSQL  

**Live URL**: https://exportdrivetech.com.ng
**GitHub**: https://github.com/greenleavesnig/Exportdrivetech
**Vercel**: greenleavesapps/exportdrivetech
