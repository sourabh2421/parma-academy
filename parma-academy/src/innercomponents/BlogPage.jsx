import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import FAQAccordion from '../components/ui/FAQAccordion'
import { fetchAllPosts, getCategories } from '../services/blogService'
import { seoConfig } from '../seo/seoConfig'

const POSTS_PER_PAGE = 6

const blogPageFAQs = [
  {
    question: 'What topics are covered on the Parma Academy Ayodhya blog?',
    answer:
      'The Parma Academy blog provides verified parent guides on ICSE syllabus advantages, admission procedures, school curriculum comparisons, campus facilities, and student development insights in Ayodhya.',
  },
  {
    question: 'How often is the Parma Academy school blog updated?',
    answer:
      'Our academic and editorial team publishes regular updates on academic schedules, event highlights, curriculum guides, and seasonal admission notifications for Ayodhya parents.',
  },
  {
    question: 'Can prospective parents submit admission queries through the blog?',
    answer:
      'Yes, every blog post links directly to our online admission application and campus tour booking page on parmaacademy.com.',
  },
]

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = getCategories()

  useEffect(() => {
    let isMounted = true
    fetchAllPosts()
      .then((data) => {
        if (isMounted) {
          setPosts(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  const featuredPost = posts[0]
  const canonicalUrl = `${seoConfig.siteUrl}/blog`

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'School Blog & ICSE Education Guides | Parma Academy Ayodhya',
    url: canonicalUrl,
    description:
      'Read educational insights, ICSE curriculum benefits, admission guides, and student achievements from Parma Academy, a top ICSE school in Ayodhya.',
    publisher: {
      '@type': ['EducationalOrganization', 'School'],
      name: seoConfig.schoolName,
      url: seoConfig.siteUrl,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seoConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: canonicalUrl,
      },
    ],
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <SEO
        title="School Blog & ICSE Education Guides | Parma Academy Ayodhya"
        description="Read educational insights, ICSE curriculum benefits, admission guides, and student achievements from Parma Academy, a top ICSE school in Ayodhya."
        canonicalUrl={canonicalUrl}
        ogImage={`${seoConfig.siteUrl}/og-image.jpg`}
        keywords="ICSE school Ayodhya blog, Parma Academy news, Ayodhya education guides, school admissions Ayodhya"
        schema={[blogSchema, breadcrumbSchema]}
      />

      <section className="mx-auto max-w-6xl px-6 pt-12 pb-6">
        <Breadcrumbs items={[{ label: 'Blog' }]} />
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
          Knowledge Hub & Insights
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Parma Academy Education Blog
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Expert insights on ICSE schooling, academic excellence, student life, and parenting guides from educators at Parma Academy in Ayodhya, Uttar Pradesh.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post Hero (shown when All is selected and on page 1) */}
      {selectedCategory === 'All' && currentPage === 1 && featuredPost && (
        <section className="mx-auto max-w-6xl px-6 py-6">
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative h-64 overflow-hidden bg-slate-100 sm:h-80 lg:h-full">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 rounded-full bg-emerald-600 px-3.5 py-1 text-xs font-semibold text-white shadow">
                Featured Article
              </span>
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  {featuredPost.category}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 group-hover:text-emerald-700 sm:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">
                    {featuredPost.author?.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Main Articles Grid */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : displayedPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
            <p className="text-lg font-semibold">No articles found in this category.</p>
            <p className="mt-2 text-sm">Please select another category or check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
              <article
                key={post.id || post.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <div>
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
                        {post.category}
                      </span>
                      <span className="text-slate-500">{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 px-6 py-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate font-medium text-slate-700">
                      {post.author?.name}
                    </span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                className={`h-8 w-8 rounded-full text-xs font-semibold transition ${
                  currentPage === pageNumber
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* AEO FAQ Section for Blog Hub */}
        <FAQAccordion
          title="Ayodhya School Blog FAQs"
          subtitle="Answers to frequent questions about school curriculum, admissions, and academic life in Ayodhya."
          faqs={blogPageFAQs}
        />
      </section>
    </div>
  )
}

export default BlogPage
