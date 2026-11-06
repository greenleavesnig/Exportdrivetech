import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

// Load .env.local explicitly
dotenvConfig({ path: resolve(process.cwd(), '.env.local') })

console.log('🔧 Environment check:')
console.log(`   POSTGRES_HOST: ${process.env.POSTGRES_HOST}`)
console.log(`   POSTGRES_URL: ${process.env.POSTGRES_URL ? '✅ Set' : '❌ Not set'}`)

import config from '@payload-config'
import { getPayload } from 'payload'

async function initDatabase() {
  console.log('\n🔧 Initializing Payload database...')
  
  try {
    const payload = await getPayload({ config })
    
    // This will trigger Payload to create the database tables
    console.log('✅ Database initialized successfully!')
    console.log('You can now visit /admin to access the Payload CMS')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

initDatabase()
