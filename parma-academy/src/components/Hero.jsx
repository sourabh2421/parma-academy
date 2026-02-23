import { Link } from 'react-router-dom'
import heroImage from '../assets/Heroimageparmaacademy.jpeg'

const quickFacts = [
  { label: 'Established', value: '2004' },
  { label: 'Students', value: '1,200+' },
  { label: 'Faculty', value: '50+' },
]

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Holistic Education since 2004
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
            Best ICSE School in Ayodhya
          </h1>
          <p className="text-lg text-slate-600">
            Parma Academy blends modern infrastructure with timeless wisdom. Our
            focus on academics, character, and creativity empowers every learner
            to build a meaningful future.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admission-ayodhya"
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Explore Admissions
            </Link>
            <Link
              to="/contact-ayodhya"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
            >
              Schedule a Visit
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center"
              >
                <p className="text-2xl font-semibold text-slate-900">{fact.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-emerald-100" />
          <div className="absolute -bottom-10 -right-6 h-24 w-24 rounded-full bg-amber-100" />
          <img
            className="relative z-10 w-full rounded-3xl object-cover shadow-xl"
            src={heroImage}
            alt="ICSE school in Ayodhya campus classroom"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
