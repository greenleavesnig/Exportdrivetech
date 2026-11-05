import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

// Logout endpoint that clears the session and redirects to the site index.
export function GET(request: NextRequest) {
  const host = request.headers.get('host')
  const origin = host ? `${request.nextUrl.protocol}//${host}` : undefined
  const logoutRedirect = new URL('/', origin).toString()

  // Logout is a collection endpoint, so its path uses the Admins collection slug.
  redirect(`/api/admins/sso/logout?redirect=${encodeURIComponent(logoutRedirect)}`)
}
