import SEO from '../components/SEO.jsx'
import About from '../components/About.jsx'
import Infrastructure from '../components/Infrastructure.jsx'
import Gallery from '../components/Gallery.jsx'
import { seoConfig } from '../seo/seoConfig.js'

function FacilitiesPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/facilities`

  const facilitiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Campus Infrastructure & Facilities | Parma Academy Ayodhya',
    url: canonicalUrl,
    description:
      'Explore state-of-the-art smart classrooms, STEM composite science laboratories, sports grounds, and GPS transport at Parma Academy in Ayodhya.',
    mainEntity: {
      '@type': ['EducationalOrganization', 'School'],
      name: seoConfig.schoolName,
      url: seoConfig.siteUrl,
    },
  }

  return (
    <div className="bg-slate-50 text-slate-900">
      <SEO
        title="Campus Infrastructure & Facilities | Parma Academy Ayodhya"
        description="Explore modern smart classrooms, STEM composite science laboratories, spacious sports grounds, and safe GPS transport at Parma Academy, premier ICSE school in Ayodhya."
        canonicalUrl={canonicalUrl}
        ogImage={`${seoConfig.siteUrl}/og-image.jpg`}
        schema={facilitiesSchema}
      />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Facilities
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Campus Infrastructure & Modern Facilities at Parma Academy
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          Explore classrooms, labs, activity zones, and campus infrastructure
          designed to support holistic learning at Parma Academy.
        </p>
      </section>
      <About />
      <Infrastructure />
      <Gallery />
    </div>
  )
}

export default FacilitiesPage
