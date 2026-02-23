import infraImage from '../assets/infraimage1.jpeg'
import infraImageTwo from '../assets/infraimage2jpeg.jpeg'

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <img
            className="h-56 w-full rounded-3xl object-cover shadow-lg sm:h-64 lg:h-56"
            src={infraImage}
            alt="ICSE school in Ayodhya campus building"
            loading="lazy"
          />
          <img
            className="h-56 w-full rounded-3xl object-cover shadow-lg sm:h-64 lg:h-56"
            src={infraImageTwo}
            alt="ICSE school in Ayodhya classroom"
            loading="lazy"
          />
        </div>
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
