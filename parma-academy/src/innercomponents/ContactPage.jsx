import { Helmet } from 'react-helmet-async'
import { seoConfig } from '../seo/seoConfig.js'
import instagramIcon from '../assets/instagram.svg'

function ContactPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/contact-ayodhya`

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Helmet>
        <title>Contact | {seoConfig.schoolName} Ayodhya</title>
        <meta
          name="description"
          content="Contact Parma Academy, a leading ICSE school in Ayodhya. Get admissions and campus visit assistance from our team."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Contact | ${seoConfig.schoolName}`} />
        <meta
          property="og:description"
          content="Reach Parma Academy, an ICSE affiliated school in Ayodhya."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Contact
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        We are here to help
      </h1>
      <p className="mt-6 text-base text-slate-600">
        Connect with our team for admissions, campus visits, and general
        inquiries. We look forward to hearing from you.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          'Secondary Branch - Parikrama Marg, Ayodhya - 224123 U.P.',
          'Phone: +91 7007178570, 7905601642',
          'Email: Parma.academy.2004@gmail.com',
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
      <a
        href="https://www.instagram.com/parmaacademy?igsh=MWFleW03NDRvN2l3Yg=="
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
        style={{
          background:
            'linear-gradient(90deg, #405DE6 0%, #833AB4 25%, #C13584 50%, #FD1D1D 75%, #F58529 100%)',
        }}
      >
        <img src={instagramIcon} alt="" className="mr-2 h-5 w-5" aria-hidden="true" />
        Follow us on Instagram
      </a>
    </section>
  )
}

export default ContactPage
