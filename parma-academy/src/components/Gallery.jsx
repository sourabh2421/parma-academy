import galleryOne from '../assets/Gallery1.avif'
import galleryTwo from '../assets/Gallery2.avif'
import galleryThree from '../assets/Gallery3.avif'
import galleryWide from '../assets/Galleryelongatedphoto.avif'

function Gallery() {
  return (
    <section id="gallery" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Gallery
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Moments from campus life
            </h2>
          </div>
          <a
            href="#/gallery"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
          >
            View full gallery
          </a>
        </div>
        <div className="mt-8 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[galleryOne, galleryTwo, galleryThree].map((image, index) => (
              <div key={`${image}-${index}`} className="overflow-hidden rounded-2xl">
                <img
                  className="h-48 w-full object-cover transition duration-300 hover:scale-105"
                  src={image}
                  alt="School gallery"
                />
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              className="h-56 w-full object-cover transition duration-300 hover:scale-105 sm:h-64"
              src={galleryWide}
              alt="School campus"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
