import config from '@payload-config'
import { getPayload } from 'payload'

async function initDatabase() {
  console.log('🔧 Initializing Payload database...')
  
  try {
    const payload = await getPayload({ config })
    
    // This will trigger Payload to create the database tables
    console.log('✅ Database initialized successfully!')
    console.log('You can now visit /admin to access the Payload CMS')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

initDatabase()
