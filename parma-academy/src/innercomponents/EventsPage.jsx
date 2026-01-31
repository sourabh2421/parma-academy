const events = [
  {
    date: '2022-07-04',
    title: 'Diwali',
    description:
      "Diwali is India's biggest and most important holiday of the year. The festival symbolizes the inner light that protects from spiritual darkness.",
    images: 4,
  },
  {
    date: '2022-07-22',
    title: 'Christmas',
    description:
      'Christmas is celebrated with joy, music, and lights, bringing together students, parents, and staff for a warm community gathering.',
    images: 1,
  },
  {
    date: '2022-07-03',
    title: 'Holi',
    description:
      'Also known as the festival of colours, Holi is celebrated with vibrant hues, music, and joyful togetherness.',
    images: 0,
  },
  {
    date: '2022-06-26',
    title: 'Raksha Bandhan',
    description:
      'Signifying the brother-sister bond, Raksha Bandhan includes aarti, tilak, and a promise of protection and care.',
    images: 0,
  },
  {
    date: '2023-05-10',
    title: 'Admission Contest',
    description: 'Knowledge is the coolest money.',
    images: 1,
  },
  {
    date: '2023-08-15',
    title: 'Independence Day 2023',
    description:
      'The Parma Pyramid shows the undeniable strength of new India. Jai Hind.',
    images: 1,
  },
  {
    date: '',
    title: 'Shree Krishna Janmashtmi',
    description:
      "Little hearts dressed up as Shree Krishna and enjoyed the Dahi Handi ceremony. Here are a few glimpses.",
    images: 3,
  },
  {
    date: '2025-08-18',
    title: 'Independence Day - 2025',
    description: 'The glorious celebration of Independence Day.',
    images: 4,
  },
]

const renderPlaceholders = (count) => {
  if (!count) return null
  return Array.from({ length: count }, (_, index) => (
    <div
      key={`photo-${count}-${index}`}
      className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white text-xs font-semibold text-slate-400"
    >
      Photo placeholder
    </div>
  ))
}

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
              {event.images ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {renderPlaceholders(event.images)}
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
