import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero.jsx'
import News from '../components/News.jsx'
import About from '../components/About.jsx'
import Events from '../components/Events.jsx'
import Community from '../components/Community.jsx'
import Infrastructure from '../components/Infrastructure.jsx'
import Gallery from '../components/Gallery.jsx'
import Leadership from '../components/Leadership.jsx'
import Inquiry from '../components/Inquiry.jsx'
import heroImage from '../assets/Heroimageparmaacademy.jpeg'
import { seoConfig } from '../seo/seoConfig.js'

function HomePage() {
  const canonicalUrl = `${seoConfig.siteUrl}/icse-school-in-ayodhya`
  const ogImage = `${seoConfig.siteUrl}${heroImage}`
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: seoConfig.schoolName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ayodhya',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'India',
    },
    telephone: seoConfig.phone,
    url: seoConfig.siteUrl,
  }

  return (
    <>
      <Helmet>
        <title>Best ICSE School in Ayodhya | {seoConfig.schoolName}</title>
        <meta
          name="description"
          content="Parma Academy is an ICSE school in Ayodhya offering quality education, modern facilities, experienced faculty, and holistic development for every student."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:title"
          content={`Best ICSE School in Ayodhya | ${seoConfig.schoolName}`}
        />
        <meta
          property="og:description"
          content="Discover Parma Academy, a top ICSE affiliated school in Ayodhya focused on academic excellence and holistic growth."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <Hero />
      <News />
      <About />
      <Events />
      <Community />
      <Infrastructure />
      <Gallery />
      <Leadership />
      <Inquiry />
    </>
  )
}

export default HomePage
