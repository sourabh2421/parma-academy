function Events() {
  return (
    <section id="events" className="bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Events
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Celebrations that build confidence and character
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Cultural programs, annual days, and academic fairs help students
            explore creativity, teamwork, and leadership.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            'Annual function and cultural fest',
            'Science and innovation fair',
            'Sports day and wellness drives',
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-base text-slate-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
