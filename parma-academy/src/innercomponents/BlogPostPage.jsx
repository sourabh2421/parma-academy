import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import FAQAccordion from '../components/ui/FAQAccordion'
import { fetchPostBySlug, fetchRelatedPosts } from '../services/blogService'
import { seoConfig } from '../seo/seoConfig'

function BlogPostPage() {
  const { slug } = useParams()
  const effectiveSlug = slug || 'why-choose-icse-school-in-ayodhya'

  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchPostBySlug(effectiveSlug)
      .then(async (data) => {
        if (!isMounted) return
        setPost(data)
        if (data) {
          const related = await fetchRelatedPosts(data.slug, data.category, 2)
          if (isMounted) setRelatedPosts(related)
        }
        setLoading(false)
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [effectiveSlug])

  if (loading) {
    return (
      <main className="bg-slate-50 min-h-screen py-20">
        <div className="mx-auto max-w-4xl px-6 animate-pulse space-y-6">
          <div className="h-6 w-32 rounded bg-slate-200" />
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-64 rounded-3xl bg-slate-200" />
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="bg-slate-50 min-h-screen py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-3xl font-bold text-slate-900">Article Not Found</h1>
          <p className="mt-4 text-slate-600">
            The article you are looking for might have been moved or updated.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  const canonicalUrl = `${seoConfig.siteUrl}/blog/${post.slug}`

  // Article JSON-LD Structured Data Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author?.name || seoConfig.schoolName,
      url: seoConfig.siteUrl,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: seoConfig.schoolName,
      url: seoConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/assets/logo1.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: post.tags?.join(', ') || post.focusKeyword,
    articleSection: post.category,
  }

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogImage={post.coverImage}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        author={post.author?.name}
        keywords={post.focusKeyword || post.tags?.join(', ')}
        schema={articleSchema}
      />

      <article className="mx-auto max-w-4xl px-6 pt-12 pb-16">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        {/* Article Meta Header */}
        <header className="mt-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              {post.category}
            </span>
            <span className="text-xs text-slate-500">{post.readTime}</span>
            {post.updatedAt && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                ✓ Last Updated:{' '}
                {new Date(post.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Author Snippet */}
          <div className="mt-6 flex items-center gap-4 border-b border-slate-200 pb-6">
            {post.author?.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-12 w-12 rounded-full border border-slate-200 object-cover"
              />
            )}
            <div>
              <p className="text-sm font-bold text-slate-900">{post.author?.name}</p>
              <p className="text-xs text-slate-500">
                {post.author?.role} • Published{' '}
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        {post.coverImage && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <img
              src={post.coverImage}
              alt={`${post.title} - Parma Academy Ayodhya`}
              className="h-80 w-full object-cover sm:h-96"
            />
          </div>
        )}

        {/* AEO Direct Lead Answer Box */}
        {post.leadSummary && (
          <aside
            aria-label="Direct Answer Summary"
            className="mt-8 rounded-2xl border-l-4 border-emerald-600 bg-emerald-50/70 p-5 text-sm leading-relaxed text-emerald-950 sm:text-base"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Key Summary & Direct Answer:
            </p>
            <p>{post.leadSummary}</p>
          </aside>
        )}

        {/* Rich Body Content with AEO Question Headers */}
        <section className="mt-10 space-y-8 text-base leading-relaxed text-slate-700 sm:text-lg">
          {Array.isArray(post.body) &&
            post.body.map((block, idx) => {
              if (block.type === 'heading') {
                const Tag = block.level === 3 ? 'h3' : 'h2'
                return (
                  <Tag
                    key={idx}
                    className="pt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                  >
                    {block.text}
                  </Tag>
                )
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="text-slate-700">
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'list') {
                return (
                  <ul key={idx} className="space-y-2.5 pl-6 list-disc text-slate-700">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                )
              }
              return null
            })}
        </section>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
            <span className="text-xs font-semibold uppercase text-slate-500">Related Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post-Specific FAQ Accordion (with FAQPage Schema) */}
        {post.faqs && post.faqs.length > 0 && (
          <FAQAccordion
            title={`Questions About: ${post.title}`}
            subtitle="Verified answers on this topic from Parma Academy faculty."
            faqs={post.faqs}
          />
        )}

        {/* Call to Action Banner */}
        <section className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 p-8 text-white shadow-md">
          <h3 className="text-2xl font-bold sm:text-3xl">
            Give Your Child the ICSE Advantage in Ayodhya
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-emerald-100 sm:text-base">
            Parma Academy admissions are currently open from Pre-School to Grade 12. Book a guided campus visit or apply online today.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/admission-ayodhya"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow transition hover:bg-emerald-50"
            >
              Apply for Admission →
            </Link>
            <Link
              to="/contact-ayodhya"
              className="rounded-full border border-emerald-400 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Contact Admissions Helpdesk
            </Link>
          </div>
        </section>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h3 className="text-2xl font-bold text-slate-900">Related Articles</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    {rel.category}
                  </span>
                  <h4 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                    {rel.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">{rel.excerpt}</p>
                  <p className="mt-3 text-xs font-semibold text-emerald-700">Read more →</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}

export default BlogPostPage
