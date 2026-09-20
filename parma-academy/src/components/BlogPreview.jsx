import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllPosts } from '../services/blogService'

function BlogPreview() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let isMounted = true
    fetchAllPosts().then((data) => {
      if (isMounted) setPosts(data.slice(0, 3))
    })
    return () => {
      isMounted = false
    }
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Insights & Guides
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Latest From Our School Blog
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Explore parenting guides, ICSE curriculum advantages, and student life updates from Parma Academy educators in Ayodhya.
            </p>
          </div>
          <Link
            to="/blog"
            className="rounded-full border border-emerald-600 bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm transition hover:bg-emerald-600 hover:text-white"
          >
            View All Articles →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id || post.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <div>
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
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

              <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate font-medium text-slate-700">
                  {post.author?.name}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
