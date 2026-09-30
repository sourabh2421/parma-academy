import SEO from '../components/SEO.jsx'
import { seoConfig } from '../seo/seoConfig.js'
import galleryOne from '../assets/Gallery1.avif'
import galleryTwo from '../assets/Gallery2.avif'
import galleryThree from '../assets/Gallery3.avif'
import galleryFive from '../assets/Gallery5.jpeg'
import gallerySeven from '../assets/Gallery7.jpeg'
import galleryEight from '../assets/Gallery8.jpeg'
import galleryNine from '../assets/Gallery9.jpeg'
import galleryTen from '../assets/Gallery10.jpeg'
import galleryEleven from '../assets/Gallery11.jpeg'
import galleryTwelve from '../assets/Gallery12.jpeg'
import galleryThirteen from '../assets/Gallery13.jpeg'
import galleryFourteen from '../assets/Gallery14.jpeg'
import galleryWide from '../assets/Galleryelongatedphoto.avif'

const galleryImages = [
  galleryOne,
  galleryTwo,
  galleryThree,
  galleryFive,
  gallerySeven,
  galleryEight,
  galleryNine,
  galleryTen,
  galleryEleven,
  galleryTwelve,
  galleryThirteen,
  galleryFourteen,
]

function GalleryPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/gallery`

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Campus Moments & Photo Gallery | Parma Academy Ayodhya',
    url: canonicalUrl,
    description:
      'Campus life, student activities, sports, cultural events, and celebrations at Parma Academy in Ayodhya.',
    publisher: {
      '@type': ['EducationalOrganization', 'School'],
      name: seoConfig.schoolName,
      url: seoConfig.siteUrl,
    },
  }

  return (
    <div className="bg-slate-50 text-slate-900">
      <SEO
        title="Campus Photo Gallery | Parma Academy Ayodhya"
        description="Explore Parma Academy campus life, modern infrastructure, student achievements, and cultural celebrations in Ayodhya through our official photo gallery."
        canonicalUrl={canonicalUrl}
        ogImage={`${seoConfig.siteUrl}/og-image.jpg`}
        schema={gallerySchema}
      />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Gallery
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Parma Academy Campus Photo Gallery
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          Explore campus life, events, and achievements. Share your gallery
          photos and we will add them here.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.slice(0, 6).map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-2xl">
              <img
                className="h-56 w-full object-cover transition duration-300 hover:scale-105 sm:h-60"
                src={image}
                alt={`Parma Academy campus moments in Ayodhya - photo ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
          <div className="overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-3">
            <img
              className="h-64 w-full object-cover transition duration-300 hover:scale-105 sm:h-72 lg:h-80"
              src={galleryWide}
              alt="Parma Academy panoramic campus view in Ayodhya"
              loading="lazy"
            />
          </div>
          {galleryImages.slice(6).map((image, index) => (
            <div key={`${image}-${index}-after`} className="overflow-hidden rounded-2xl">
              <img
                className="h-56 w-full object-cover transition duration-300 hover:scale-105 sm:h-60"
                src={image}
                alt={`Parma Academy campus activities and student life in Ayodhya - photo ${index + 7}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default GalleryPage
