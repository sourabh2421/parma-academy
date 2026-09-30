import SEO from '../components/SEO'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import { seoConfig } from '../seo/seoConfig.js'
import instagramIcon from '../assets/instagram.svg'

function ContactPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/contact-ayodhya`

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'School', 'LocalBusiness'],
    name: seoConfig.schoolName,
    url: canonicalUrl,
    telephone: seoConfig.phone,
    email: seoConfig.email,
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seoConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: canonicalUrl,
      },
    ],
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <SEO
        title="Contact Us & Campus Location | Parma Academy Ayodhya"
        description="Contact Parma Academy in Ayodhya. Visit our campus on Parikrama Marg or call +91 7007178570 for school admissions, fees, and campus tour bookings."
        canonicalUrl={canonicalUrl}
        ogImage={`${seoConfig.siteUrl}/og-image.jpg`}
        keywords="Parma Academy contact number, Parma Academy address, school in Ayodhya address, ICSE school Ayodhya phone"
        schema={[contactSchema, breadcrumbSchema]}
      />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Get in Touch
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Contact Parma Academy Ayodhya
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Connect with our admissions team for campus tours, enrollment guidance, student counseling, and general school inquiries.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Campus Address (NAP)
                </p>
                <p className="mt-1 font-semibold text-slate-900">Parma Academy</p>
                <p className="text-sm text-slate-600">
                  Parikrama Marg, Parmapuram, Ayodhya, Uttar Pradesh - 224123, India
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Phone Numbers
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    <a href="tel:+917007178570" className="hover:text-emerald-700">
                      +91 7007178570
                    </a>
                  </p>
                  <p className="text-sm text-slate-600">
                    <a href="tel:+917905601642" className="hover:text-emerald-700">
                      +91 7905601642
                    </a>
                  </p>
                  <p className="text-sm text-slate-600">
                    <a href="tel:+919451205855" className="hover:text-emerald-700">
                      +91 9451205855
                    </a>
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Email & Timings
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    <a
                      href="mailto:Parma.academy.2004@gmail.com"
                      className="font-medium text-slate-900 hover:text-emerald-700"
                    >
                      Parma.academy.2004@gmail.com
                    </a>
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Office Hours: Mon – Sat, 8:00 AM – 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/parmaacademy?igsh=MWFleW03NDRvN2l3Yg=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full px-6 py-2.5 text-xs font-semibold text-white shadow transition hover:opacity-90"
                style={{
                  background:
                    'linear-gradient(90deg, #405DE6 0%, #833AB4 25%, #C13584 50%, #FD1D1D 75%, #F58529 100%)',
                }}
              >
                <img src={instagramIcon} alt="" className="mr-2 h-4 w-4" aria-hidden="true" />
                Follow on Instagram
              </a>
              <a
                href="https://wa.me/918853810084"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-emerald-700"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Campus Location
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">Find Us on Google Maps</h2>
            <div className="mt-4 flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm min-h-[340px]">
              <iframe
                title="Parma Academy Ayodhya Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113994.47545922312!2d82.11582299863896!3d26.792160100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07b7b159bb89%3A0xe54cb8eefd2d2a45!2sAyodhya%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
