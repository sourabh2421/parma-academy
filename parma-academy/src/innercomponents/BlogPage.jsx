import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { seoConfig } from '../seo/seoConfig.js'

function BlogPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/blog`

  return (
    <main className="bg-slate-50 text-slate-900">
      <Helmet>
        <title>School Blog | {seoConfig.schoolName} Ayodhya</title>
        <meta
          name="description"
          content="Read insights about ICSE education, campus life, and learning excellence at Parma Academy, a leading ICSE school in Ayodhya."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`School Blog | ${seoConfig.schoolName}`} />
        <meta
          property="og:description"
          content="Insights and updates from Parma Academy, an ICSE affiliated school in Ayodhya."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Blog
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          School insights and ICSE guidance
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          Learn about ICSE curriculum benefits, campus life, and student success
          stories from Parma Academy in Ayodhya.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Link
          to="/blog/why-choose-icse-school-in-ayodhya"
          className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Featured Article
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            Why choose an ICSE school in Ayodhya
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Understand the advantages of ICSE education and how Parma Academy
            supports holistic learning in Ayodhya.
          </p>
        </Link>
      </section>
    </main>
  )
}

export default BlogPage
