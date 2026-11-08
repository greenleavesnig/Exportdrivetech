import config from '@payload-config'
import { getPayload } from 'payload'
import { DEFAULT_SITE_CONTENT, type SiteContent } from './site-defaults'

/**
 * Overlays the Payload `site-settings` global on top of the built-in defaults.
 *
 * - Objects are merged key by key.
 * - Non-empty arrays replace the default array.
 * - Blank strings / null / undefined fall back to the default.
 *
 * If the global cannot be read (e.g. the table has not been created yet), the
 * defaults are returned so the public site always renders.
 */
function mergeDeep(base: any, override: any): any {
  if (override === undefined || override === null) return base
  if (Array.isArray(base)) {
    return Array.isArray(override) && override.length > 0 ? override : base
  }
  if (base !== null && typeof base === 'object') {
    if (typeof override !== 'object' || override === null || Array.isArray(override)) return base
    const out: any = { ...base }
    for (const key of Object.keys(base)) {
      out[key] = mergeDeep(base[key], override[key])
    }
    return out
  }
  if (typeof base === 'string') {
    return typeof override === 'string' && override.trim() !== '' ? override : base
  }
  return base
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const payload = await getPayload({ config })
    const raw = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    return mergeDeep(DEFAULT_SITE_CONTENT, raw) as SiteContent
  } catch (error) {
    console.error('Failed to load site settings – using built-in defaults:', error)
    return DEFAULT_SITE_CONTENT
  }
}
