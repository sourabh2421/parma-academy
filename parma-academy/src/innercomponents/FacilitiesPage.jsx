import { Helmet } from 'react-helmet-async'
import About from '../components/About.jsx'
import Infrastructure from '../components/Infrastructure.jsx'
import Gallery from '../components/Gallery.jsx'
import { seoConfig } from '../seo/seoConfig.js'

function FacilitiesPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/facilities`

  return (
    <main className="bg-slate-50 text-slate-900">
      <Helmet>
        <title>Facilities | {seoConfig.schoolName} Ayodhya</title>
        <meta
          name="description"
          content="Explore modern classrooms, labs, sports, and holistic learning spaces at Parma Academy, an ICSE school in Ayodhya focused on student growth."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Facilities | ${seoConfig.schoolName}`} />
        <meta
          property="og:description"
          content="Discover facilities and learning spaces at Parma Academy, an ICSE affiliated school in Ayodhya."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Facilities
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Modern facilities at an ICSE school in Ayodhya
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          Explore classrooms, labs, activity zones, and campus infrastructure
          designed to support holistic learning at Parma Academy.
        </p>
      </section>
      <About />
      <Infrastructure />
      <Gallery />
    </main>
  )
}

export default FacilitiesPage
