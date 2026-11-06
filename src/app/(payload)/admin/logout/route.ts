import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// Logout endpoint that clears the session and redirects to the site index.
export async function GET() {
  // Clear the payload cookie
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')
  
  // Redirect to homepage
  redirect('/')
}
