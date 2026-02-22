function StudentPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Student
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        Student life at Parma Academy
      </h1>
      <p className="mt-6 text-base text-slate-600">
        Our students grow through academics, clubs, sports, and mentorship
        programs that encourage creativity, leadership, and confidence.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          'Academic mentoring and counseling',
          'Clubs, arts, and cultural activities',
          'Sports, wellness, and leadership',
          'Safe, supportive learning environment',
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default StudentPage
