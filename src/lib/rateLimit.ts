/**
 * Simple in-memory rate limiter for RFQ submissions
 * 
 * For production, consider using:
 * - @vercel/kv for Redis-based rate limiting
 * - Upstash Rate Limit
 * - Cloudflare Rate Limiting
 */

interface RateLimitStore {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitStore>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of store.entries()) {
    if (now > value.resetTime) {
      store.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  /** Maximum requests allowed in the time window */
  maxRequests: number
  /** Time window in seconds */
  windowSeconds: number
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Rate limit check based on IP address or identifier
 * 
 * @param identifier - IP address or unique identifier
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and metadata
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowSeconds: 3600 }
): RateLimitResult {
  const now = Date.now()
  const key = `ratelimit:${identifier}`
  
  const existing = store.get(key)
  
  // Create new entry if doesn't exist or expired
  if (!existing || now > existing.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + config.windowSeconds * 1000,
    })
    
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: now + config.windowSeconds * 1000,
    }
  }
  
  // Check if limit exceeded
  if (existing.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: existing.resetTime,
    }
  }
  
  // Increment count
  existing.count++
  store.set(key, existing)
  
  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - existing.count,
    reset: existing.resetTime,
  }
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  // Vercel provides the real IP in x-forwarded-for
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  // Fallback headers
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  if (cfConnectingIp) return cfConnectingIp
  
  // Fallback to localhost (for development)
  return '127.0.0.1'
}

/**
 * Honeypot field validation
 * Returns true if this appears to be a bot
 */
export function isHoneypotTriggered(honeypotValue: string | null): boolean {
  return honeypotValue !== null && honeypotValue !== ''
}

/**
 * Simple email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Check if email is from a disposable email provider
 */
const disposableDomains = [
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'mailinator.com',
  'throwaway.email',
  'temp-mail.org',
]

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return disposableDomains.some(d => domain === d)
}
