import { Helmet } from 'react-helmet-async'
import { seoConfig } from '../seo/seoConfig.js'

function BlogPostPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/blog/why-choose-icse-school-in-ayodhya`

  return (
    <main className="bg-slate-50 text-slate-900">
      <Helmet>
        <title>Why Choose an ICSE School in Ayodhya | {seoConfig.schoolName}</title>
        <meta
          name="description"
          content="Discover why Parma Academy is a top ICSE school in Ayodhya, offering strong academics, holistic growth, and a caring learning environment."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:title"
          content={`Why Choose an ICSE School in Ayodhya | ${seoConfig.schoolName}`}
        />
        <meta
          property="og:description"
          content="Learn the key benefits of ICSE education and how Parma Academy supports student success in Ayodhya."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Blog
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Why choose an ICSE school in Ayodhya
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Selecting the right school is one of the most important decisions for
          your child. Here is why ICSE education at Parma Academy in Ayodhya is a
          strong choice for academic excellence and holistic growth.
        </p>

        <div className="mt-10 space-y-6 text-base text-slate-700">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">
              Strong academic foundation
            </h2>
            <p className="mt-2">
              The ICSE curriculum emphasizes clarity of concepts, application,
              and language proficiency. Our teachers focus on core understanding
              that prepares students for future competitive pathways.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">
              Holistic development
            </h2>
            <p className="mt-2">
              Beyond academics, Parma Academy promotes leadership, creativity,
              and character building through clubs, sports, and cultural
              programs.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">
              Supportive learning environment
            </h2>
            <p className="mt-2">
              Our classrooms, counseling support, and mentoring ensure every
              learner receives attention and guidance tailored to their needs.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

export default BlogPostPage
