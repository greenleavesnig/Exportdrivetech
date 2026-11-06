# ExportDriveTech - Agricultural Export Website

A professional Next.js website for agricultural product exports, built with Payload CMS and PostgreSQL.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment variables (REQUIRED!)
# Edit .env.local with your database credentials
# See IMMEDIATE_ACTION_REQUIRED.md for detailed setup

# Start development server
npm run dev

# Visit http://localhost:3000
```

## ⚠️ First Time Setup

**The website will show a yellow warning banner until you configure the database.**

### 5-Minute Setup:

1. **Get Supabase Credentials** (or use any PostgreSQL database)
   - Sign up at https://supabase.com (free tier available)
   - Create a new project
   - Go to Settings → Database
   - Copy the connection string

2. **Update `.env.local`**
   - Replace placeholder values with your real credentials
   - See `IMMEDIATE_ACTION_REQUIRED.md` for step-by-step guide

3. **Restart Server**
   ```bash
   npm run dev
   ```

4. **Verify It Works**
   - Yellow banner should disappear
   - Products should load
   - /admin panel should work

**Detailed Setup:** See [`IMMEDIATE_ACTION_REQUIRED.md`](./IMMEDIATE_ACTION_REQUIRED.md)

## 📚 Documentation

- **[IMMEDIATE_ACTION_REQUIRED.md](./IMMEDIATE_ACTION_REQUIRED.md)** - 5-minute database setup
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Complete environment variable guide
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Common commands and tasks
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Deployment guide
- **[verify-fixes.md](./verify-fixes.md)** - Testing procedures
- **[AGENTS.md](./AGENTS.md)** - Technical architecture

## 🏗️ Tech Stack

- **Framework:** Next.js 16.4.2 with React 19
- **CMS:** Payload CMS 3.93
- **Database:** PostgreSQL (Supabase recommended)
- **Styling:** Tailwind CSS v4
- **Email:** Resend
- **Hosting:** Vercel

## 📋 Project Status

✅ **All 18 bugs fixed** (November 2026 audit)
- Critical: 3/3 fixed
- High: 4/4 fixed
- Medium: 7/7 fixed
- Low: 4/4 fixed

✅ **Security hardened**
- Rate limiting (5 req/hour per IP)
- XSS protection
- Disposable email detection
- Honeypot spam protection

✅ **Production ready** (after database configuration)

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (frontend)/        # Public website
│   │   ├── page.tsx       # Homepage
│   │   ├── actions.ts     # Server Actions (RFQ)
│   │   ├── products/      # Product pages
│   │   ├── privacy/       # Privacy policy
│   │   └── terms/         # Terms of service
│   ├── (payload)/         # CMS admin panel
│   │   └── admin/         # Admin routes
│   └── api/               # REST API
│       ├── products/      # GET products
│       ├── categories/    # GET categories
│       └── rfq/          # POST/GET RFQs
├── collections/           # Payload collections
│   ├── Products.ts
│   ├── ProductCategories.ts
│   ├── RFQSubmissions.ts
│   ├── Media.ts
│   └── Admins.ts
├── components/            # React components
│   ├── HomeClient.tsx
│   ├── FeaturedProducts.tsx
│   └── ProductCatalog.tsx
└── lib/                   # Utilities
    ├── products.ts        # Product helpers
    ├── rateLimit.ts       # Rate limiting
    └── payload.ts         # Payload helpers
```

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run init-db          # Initialize database
npm run seed             # Seed sample data

# Code Quality
npm run format           # Format code
```

## 🌐 Key URLs

**Local Development:**
- Homepage: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- API: http://localhost:3000/api/products

**Production:**
- Website: https://exportdrivetech.com.ng
- Admin: https://exportdrivetech.com.ng/admin

## 🔐 Environment Variables

Required variables (see `.env.local`):

```bash
# Database (from Supabase)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# Email (from Resend)
RESEND_API_KEY=
RESEND_FROM_EMAIL=
SALES_NOTIFICATION_EMAIL=

# Site Config
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=

# CMS
PAYLOAD_SECRET=  # Already configured
```

## 🚀 Deployment

### Deploy to Vercel

1. **Configure Environment Variables**
   - Add all variables to Vercel dashboard
   - Settings → Environment Variables

2. **Deploy**
   ```bash
   git push origin main
   # Vercel auto-deploys
   ```

3. **Verify**
   - Check deployment logs
   - Test production URL
   - Verify database connection

See [`PRODUCTION_CHECKLIST.md`](./PRODUCTION_CHECKLIST.md) for complete guide.

## 🆘 Troubleshooting

### Yellow Warning Banner
**Cause:** Database not configured  
**Fix:** See `IMMEDIATE_ACTION_REQUIRED.md`

### Empty Product Sections
**Cause:** No data in database  
**Fix:** Run `npm run seed` after database is connected

### Admin Panel Won't Load
**Cause:** Database connection failed  
**Fix:** Check connection string in `.env.local`

### Emails Not Sending
**Cause:** Resend not configured  
**Fix:** Add `RESEND_API_KEY` to `.env.local`

## 🔒 Security Features

- ✅ Rate limiting (5 submissions/hour per IP)
- ✅ Disposable email detection
- ✅ Honeypot spam protection
- ✅ XSS protection with HTML escaping
- ✅ Restricted image domains
- ✅ Input validation and sanitization

## 📊 Performance

- ✅ Optimized images with Next.js
- ✅ Skeleton loading states
- ✅ Small bundle size (~505KB gzipped)
- ✅ Server-side rendering
- ✅ Static generation where possible

## 🧪 Testing

```bash
# Manual testing
npm run dev
# Follow checklist in verify-fixes.md

# Build test
npm run build
npm start

# API test
curl http://localhost:3000/api/products
curl http://localhost:3000/api/categories
```

## 📝 Recent Updates (November 2026)

- ✅ Fixed all 18 identified bugs
- ✅ Added comprehensive documentation
- ✅ Implemented rate limiting
- ✅ Enhanced security measures
- ✅ Improved error handling
- ✅ Created REST API endpoints
- ✅ Removed unused dependencies

## 🤝 Contributing

1. Read the documentation
2. Follow existing code patterns
3. Test changes locally
4. Update documentation if needed

## 📧 Support

**Documentation:** See docs listed above  
**Email:** trade@exportdrivetech.com  
**Issues:** Check troubleshooting sections first  

## 📄 License

Proprietary - ExportDriveTech Agro Trading

---

**Next Step:** Configure your database credentials in `.env.local` - See [`IMMEDIATE_ACTION_REQUIRED.md`](./IMMEDIATE_ACTION_REQUIRED.md)

**Need Help?** All documentation files are in the project root directory.

**Ready to Deploy?** See [`PRODUCTION_CHECKLIST.md`](./PRODUCTION_CHECKLIST.md)
