const infrastructure = [
  'Spacious classrooms',
  'Proper ventilation facilities',
  'Earthquake-safe building',
  'Rainwater harvesting',
]

function Infrastructure() {
  return (
    <section id="infrastructure" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Infrastructure
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Built for safe and inspiring learning
          </h2>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <img
          className="h-full w-full rounded-3xl object-cover shadow-lg"
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
          alt="School infrastructure"
        />
        <div className="grid gap-4">
          {infrastructure.map((item) => (
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

export default Infrastructure
