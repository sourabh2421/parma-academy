import admissionContest from '../assets/Admissioncontest.jpeg'
import holi2025 from '../assets/Holi2025-1.jpeg'
import independence2025One from '../assets/Independence2025-1.jpeg'
import independence2025Two from '../assets/Independence2025-2.jpeg'
import independence2025Three from '../assets/Independence2025-3.jpeg'
import independence2025Four from '../assets/Independence2025-4.jpeg'
import janmashtami2025 from '../assets/Janmasthami2025-1.jpeg'
import juniorWingTourOne from '../assets/Juniorwingtour2026-1.jpeg'
import juniorWingTourTwo from '../assets/Juniorwingtour2026-2.jpeg'
import juniorWingTourThree from '../assets/Juniorwingtour2026-3.jpeg'
import juniorWingTourFour from '../assets/Juniorwingtour2026-4.jpeg'
import juniorWingTourFive from '../assets/Juniorwingtour2026-5.jpeg'
import rakshabandhan2025 from '../assets/Rakshabandhan-2025.jpeg'
import rangoli2025 from '../assets/Rangolicompetition2025-1.jpeg'
import seniorWingTourOne from '../assets/Seniourwingtour2025-1.jpeg'
import seniorWingTourTwo from '../assets/Seniourwingtour2025-2.jpeg'
import seniorWingTourThree from '../assets/Seniourwingtour2025-3.jpeg'

const events = [
  {
    date: '2026-01-10',
    title: 'Junior Wing Tour 2026',
    description:
      'A joyful educational tour for our junior wing, filled with exploration and learning.',
    images: [
      juniorWingTourOne,
      juniorWingTourTwo,
      juniorWingTourThree,
      juniorWingTourFour,
      juniorWingTourFive,
    ],
  },
  {
    date: '2025-12-05',
    title: 'Senior Wing Tour 2025',
    description:
      'Senior students explored historical and cultural landmarks together.',
    images: [seniorWingTourOne, seniorWingTourTwo, seniorWingTourThree],
  },
  {
    date: '2025-11-02',
    title: 'Rangoli Competition 2025',
    description:
      'Creative rangoli artistry celebrating festivals and traditions.',
    images: [rangoli2025],
  },
  {
    date: '2025-10-12',
    title: 'Admission Contest 2025',
    description: 'Knowledge is the coolest money.',
    images: [admissionContest],
  },
  {
    date: '2025-08-15',
    title: 'Independence Day 2025',
    description: 'The glorious celebration of Independence Day.',
    images: [
      independence2025One,
      independence2025Two,
      independence2025Three,
      independence2025Four,
    ],
  },
  {
    date: '2025-08-19',
    title: 'Raksha Bandhan 2025',
    description:
      'Celebrating the bond of care and protection with traditional rituals.',
    images: [rakshabandhan2025],
  },
  {
    date: '2025-08-26',
    title: 'Shree Krishna Janmashtami 2025',
    description:
      "Little hearts dressed up as Shree Krishna and enjoyed the Dahi Handi ceremony.",
    images: [janmashtami2025],
  },
  {
    date: '2025-03-14',
    title: 'Holi 2025',
    description: 'Festival of colours celebrated with joy, music, and laughter.',
    images: [holi2025],
  },
]

function EventsPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Events
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Campus celebrations and milestones
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          Our annual calendar highlights cultural festivals, national
          celebrations, and student achievements. Each event builds confidence,
          creativity, and community spirit.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8">
          {events.map((event) => (
            <article
              key={`${event.title}-${event.date}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  {event.date ? (
                    <p className="text-sm font-semibold text-emerald-600">
                      {event.date}
                    </p>
                  ) : null}
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    {event.title}
                  </h2>
                </div>
                <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-600 hover:text-emerald-700">
                  View More
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {event.description}
              </p>
              {event.images?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {event.images.map((image, index) => (
                    <div
                      key={`${event.title}-${index}`}
                      className="overflow-hidden rounded-2xl"
                    >
                      <img
                        className="h-40 w-full object-cover transition duration-300 hover:scale-105 sm:h-44"
                        src={image}
                        alt={`${event.title} photo`}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default EventsPage
