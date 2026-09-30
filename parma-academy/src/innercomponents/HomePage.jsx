import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero.jsx'
import News from '../components/News.jsx'
import About from '../components/About.jsx'
import Events from '../components/Events.jsx'
import Infrastructure from '../components/Infrastructure.jsx'
import Gallery from '../components/Gallery.jsx'
import Leadership from '../components/Leadership.jsx'
import Inquiry from '../components/Inquiry.jsx'
import BlogPreview from '../components/BlogPreview.jsx'
import FAQAccordion from '../components/ui/FAQAccordion.jsx'
import { seoConfig } from '../seo/seoConfig.js'

const homeFAQs = [
  {
    question: 'Why is Parma Academy considered one of the best ICSE schools in Ayodhya?',
    answer:
      'Parma Academy combines rigorous ICSE academic curriculum with modern science and computer laboratories, dedicated sports coaching, English fluency focus, and holistic character mentorship on Parikrama Marg, Ayodhya.',
  },
  {
    question: 'Which grades are admissions available for at Parma Academy Ayodhya?',
    answer:
      'Admissions are open annually from Pre-School (Nursery / Kindergarten) through Grade 12. Parents can apply online or visit our admissions office in Ayodhya.',
  },
  {
    question: 'What facilities are available on the Parma Academy Ayodhya campus?',
    answer:
      'Our campus features smart digital classrooms, advanced STEM laboratories, outdoor sports grounds, arts and music studios, and GPS-enabled school transport across Ayodhya and Faizabad.',
  },
  {
    question: 'How can parents contact the Parma Academy admissions desk?',
    answer:
      'Parents can reach us by phone at +91 7007178570 or +91 7905601642, email Parma.academy.2004@gmail.com, or visit our campus at Parikrama Marg, Parmapuram, Ayodhya, Uttar Pradesh - 224123.',
  },
]

function HomePage() {
  const canonicalUrl = `${seoConfig.siteUrl}/icse-school-in-ayodhya`
  const ogImage = `${seoConfig.siteUrl}/og-image.jpg`

  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'School', 'LocalBusiness'],
    name: seoConfig.schoolName,
    alternateName: 'Parma Academy Ayodhya',
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/assets/logo1.webp`,
    image: ogImage,
    description:
      'Parma Academy is a premier ICSE affiliated school in Ayodhya, Uttar Pradesh, offering quality academics, sports, modern infrastructure, and holistic development for Pre-School to Grade 12.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Parikrama Marg, Parmapuram',
      addressLocality: 'Ayodhya',
      addressRegion: 'Uttar Pradesh',
      postalCode: '224123',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.7922,
      longitude: 82.1998,
    },
    telephone: seoConfig.phone,
    email: seoConfig.email,
    openingHours: 'Mo-Sa 08:00-16:00',
    priceRange: '$$',
    sameAs: [
      'https://www.instagram.com/parmaacademy',
      'https://wa.me/918853810084',
    ],
  }

  return (
    <>
      <Helmet>
        <title>Best ICSE School in Ayodhya | {seoConfig.schoolName}</title>
        <meta
          name="description"
          content="Parma Academy is a leading ICSE school in Ayodhya offering quality education, modern facilities, experienced faculty, and holistic development for every student."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Best ICSE School in Ayodhya | ${seoConfig.schoolName}`} />
        <meta name="twitter:description" content="Discover Parma Academy, a top ICSE affiliated school in Ayodhya focused on academic excellence and holistic growth." />
        <meta name="twitter:image" content={ogImage} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json">{JSON.stringify(educationalOrgSchema)}</script>
      </Helmet>
      <Hero />
      <News />
      <About />
      <Events />
      <Infrastructure />
      <Gallery />
      <Leadership />
      <BlogPreview />
      <div className="mx-auto max-w-6xl px-6">
        <FAQAccordion
          title="Frequently Asked Questions About Parma Academy Ayodhya"
          subtitle="Everything you need to know about admissions, ICSE curriculum, and campus life."
          faqs={homeFAQs}
        />
      </div>
      <Inquiry />
    </>
  )
}

export default HomePage
