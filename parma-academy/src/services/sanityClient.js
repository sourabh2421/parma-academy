import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01'

export const isSanityConfigured = Boolean(projectId && projectId.trim() !== '')

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null

const builder = isSanityConfigured ? imageUrlBuilder(sanityClient) : null

export function urlForImage(source) {
  if (!builder || !source) return ''
  return builder.image(source).auto('format').fit('max').url()
}
