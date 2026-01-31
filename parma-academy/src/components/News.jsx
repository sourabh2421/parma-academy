const newsItems = [
  {
    title: 'Vacancy',
    date: '2025-02-01',
    detail: 'We have openings for subject teachers.',
  },
  {
    title: 'New Session',
    date: '2025-02-10',
    detail: 'New batch starts this April. Admissions now open.',
  },
  {
    title: 'Admission Open',
    date: '2025-02-10',
    detail: 'Admissions open from pre-school to grade 12.',
  },
]

function News() {
  return (
    <section id="news" className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Latest News
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Stay updated with what is new
          </h2>
        </div>
        <a
          href="#/events"
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
        >
          View all updates
        </a>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {newsItems.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              {item.title}
            </p>
            <p className="mt-2 text-sm text-slate-500">{item.date}</p>
            <p className="mt-4 text-base text-slate-700">{item.detail}</p>
            <div className="mt-auto pt-6 text-sm font-semibold text-emerald-700">
              Read more →
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default News
