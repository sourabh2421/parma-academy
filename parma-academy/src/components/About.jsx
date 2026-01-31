const facilities = [
  'Interactive sessions',
  'Smart class enabled',
  'Visual learning emphasis',
  'One-on-one interaction',
  'Mental and physical growth',
  'Rooted in values',
]

function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            About Us
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            A learning community rooted in values and excellence
          </h2>
          <p className="text-base text-slate-600">
            Established under the aegis of Narayan Dharmarth Swasth Sansthan,
            Parma Academy is committed to academic brilliance and personality
            development. We blend modern learning methods with timeless wisdom
            to help every child flourish.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-8 dark:border-emerald-900/60 dark:bg-emerald-950/60">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-200">
              Our Vision
            </h3>
            <p className="mt-3 text-sm text-emerald-900/80 dark:text-emerald-100/80">
              To make learning joyful and prepare responsible citizens who
              contribute to the prosperity and well-being of society.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-amber-50 p-8 dark:border-amber-900/60 dark:bg-amber-950/60">
            <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-200">
              Our Mission
            </h3>
            <p className="mt-3 text-sm text-amber-900/80 dark:text-amber-100/80">
              Provide a safe, nurturing environment where curiosity,
              collaboration, and character are celebrated every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
