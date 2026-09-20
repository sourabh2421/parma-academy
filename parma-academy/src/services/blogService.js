import { sanityClient, isSanityConfigured, urlForImage } from './sanityClient'
import { initialBlogPosts, blogCategories } from '../data/blogPosts'

function mapSanityPost(doc) {
  if (!doc) return null
  return {
    id: doc._id || doc.id,
    title: doc.title,
    slug: doc.slug?.current || doc.slug,
    excerpt: doc.excerpt,
    coverImage: doc.coverImage
      ? urlForImage(doc.coverImage)
      : doc.mainImage
        ? urlForImage(doc.mainImage)
        : doc.coverImage,
    category: doc.category?.title || doc.category || 'General',
    tags: doc.tags || [],
    readTime: doc.readTime || `${Math.max(3, Math.ceil((doc.body?.length || 500) / 200))} min read`,
    publishedAt: doc.publishedAt || doc._createdAt || new Date().toISOString(),
    updatedAt: doc.updatedAt || doc._updatedAt || doc.publishedAt,
    author: {
      name: doc.author?.name || 'Parma Academy Faculty',
      role: doc.author?.role || 'Editorial Team',
      avatar: doc.author?.image ? urlForImage(doc.author.image) : doc.author?.avatar,
    },
    metaTitle: doc.metaTitle || doc.title,
    metaDescription: doc.metaDescription || doc.excerpt,
    focusKeyword: doc.focusKeyword || 'ICSE school Ayodhya',
    leadSummary: doc.leadSummary || doc.excerpt,
    body: Array.isArray(doc.body)
      ? doc.body
      : typeof doc.body === 'string'
        ? [{ type: 'paragraph', text: doc.body }]
        : [],
    faqs: doc.faqs || [],
  }
}

export async function fetchAllPosts() {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        coverImage,
        mainImage,
        category->{title},
        tags,
        readTime,
        publishedAt,
        _updatedAt,
        author->{name, role, image},
        metaTitle,
        metaDescription,
        focusKeyword,
        leadSummary,
        body,
        faqs
      }`
      const posts = await sanityClient.fetch(query)
      if (posts && posts.length > 0) {
        return posts.map(mapSanityPost)
      }
    } catch (error) {
      console.warn('Error fetching posts from Sanity, falling back to local data:', error)
    }
  }

  // Fallback to local posts
  return [...initialBlogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export async function fetchPostBySlug(slug) {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        coverImage,
        mainImage,
        category->{title},
        tags,
        readTime,
        publishedAt,
        _updatedAt,
        author->{name, role, image},
        metaTitle,
        metaDescription,
        focusKeyword,
        leadSummary,
        body,
        faqs
      }`
      const post = await sanityClient.fetch(query, { slug })
      if (post) {
        return mapSanityPost(post)
      }
    } catch (error) {
      console.warn(`Error fetching post ${slug} from Sanity, falling back to local:`, error)
    }
  }

  const localPost = initialBlogPosts.find((p) => p.slug === slug)
  return localPost ? { ...localPost } : null
}

export async function fetchRelatedPosts(currentSlug, category, limit = 2) {
  const allPosts = await fetchAllPosts()
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1
      if (b.category === category && a.category !== category) return 1
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
    .slice(0, limit)
}

export function getCategories() {
  return blogCategories
}
