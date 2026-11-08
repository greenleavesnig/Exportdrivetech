import HomeClient from '@/components/HomeClient'
import { getSiteContent } from '@/lib/site-settings'

// Revalidate so content edited in the CMS global appears without a redeploy.
export const revalidate = 60

export default async function HomePage() {
  const content = await getSiteContent()
  return <HomeClient content={content} />
}
