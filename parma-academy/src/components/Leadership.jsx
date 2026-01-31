const leadership = [
  {
    name: 'Mrs. Suneeta',
    role: 'Principal',
    quote:
      'We believe home and school must work in unison to shape confident, responsible learners.',
  },
  {
    name: 'Shri Narayan Rai',
    role: 'Managing Director',
    quote:
      'Our mission is to provide global standards in education grounded in values and discipline.',
  },
  {
    name: 'Dr. Sudhir Rai',
    role: 'Professor, Saket PG College',
    quote:
      'Join us to experience a new perspective on learning and personal growth.',
  },
]

function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Leadership
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Voices guiding our community
          </h2>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {leadership.map((leader) => (
          <article
            key={leader.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-base text-slate-700">"{leader.quote}"</p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">{leader.name}</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                {leader.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leadership
