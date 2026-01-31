function StudentPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Student
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        A joyful and supportive student life
      </h1>
      <p className="mt-6 text-base text-slate-600">
        Students benefit from clubs, mentoring, and enrichment programs that
        encourage curiosity, creativity, and leadership.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {['Clubs and societies', 'Academic mentoring', 'Sports and wellness'].map(
          (item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm"
            >
              {item}
            </div>
          ),
        )}
      </div>
    </section>
  )
}

export default StudentPage
