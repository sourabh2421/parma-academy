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
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Gallery
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Campus moments and celebrations
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
                alt="Gallery highlight"
              />
            </div>
          ))}
          <div className="overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-3">
            <img
              className="h-64 w-full object-cover transition duration-300 hover:scale-105 sm:h-72 lg:h-80"
              src={galleryWide}
              alt="Campus panorama"
            />
          </div>
          {galleryImages.slice(6).map((image, index) => (
            <div key={`${image}-${index}-after`} className="overflow-hidden rounded-2xl">
              <img
                className="h-56 w-full object-cover transition duration-300 hover:scale-105 sm:h-60"
                src={image}
                alt="Gallery highlight"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default GalleryPage
