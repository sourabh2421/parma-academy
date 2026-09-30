import infraImage from '../assets/infraimage1.jpeg'
import infraImageTwo from '../assets/infraimage2jpeg.jpeg'
import { BentoGrid, BentoCard, BentoTitle, BentoDescription } from './ui/bento-grid'

function Infrastructure() {
  return (
    <section id="infrastructure" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Infrastructure & Facilities
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Built for safe and inspiring learning
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            State-of-the-art campus infrastructure in Ayodhya designed to foster curiosity, safety, and holistic student growth.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <BentoGrid>
          {/* Card 1: Smart Classrooms (Wide with side-by-side layout) */}
          <BentoCard className="md:col-span-2 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Digital Learning
                </div>
                <BentoTitle className="mt-3">Spacious Smart Classrooms</BentoTitle>
                <BentoDescription className="mt-2">
                  Ergonomically designed classrooms equipped with digital interactive panels, high-velocity natural ventilation, and child-safe furnishings.
                </BentoDescription>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-sm">
                <img
                  className="w-full aspect-[4/3] object-cover rounded-2xl transition duration-300 group-hover:scale-103"
                  src={infraImageTwo}
                  alt="ICSE school in Ayodhya classroom"
                  width="1170"
                  height="926"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Earthquake Safe Architecture */}
          <BentoCard className="md:col-span-1 lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Structural Safety
              </div>
              <BentoTitle className="mt-3">Earthquake-Safe Building</BentoTitle>
              <BentoDescription className="mt-2">
                Engineered with certified structural integrity, emergency evacuation protocols, and round-the-clock CCTV surveillance across all wings.
              </BentoDescription>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Safety & Fire Compliance Certified</p>
            </div>
          </BentoCard>

          {/* Card 3: Advanced STEM Labs */}
          <BentoCard className="md:col-span-1 lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                Hands-on STEM
              </div>
              <BentoTitle className="mt-3">Composite Science & Tech Labs</BentoTitle>
              <BentoDescription className="mt-2">
                Fully equipped Physics, Chemistry, Biology, and modern Computer science laboratories for hands-on experimentation.
              </BentoDescription>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">Pre-K → 12</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Integrated ICSE Science Practical Modules</p>
            </div>
          </BentoCard>

          {/* Card 4: Green Eco-Campus & Amenities (Wide with side-by-side layout) */}
          <BentoCard className="md:col-span-2 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="overflow-hidden rounded-2xl shadow-sm order-2 md:order-1">
                <img
                  className="w-full aspect-[3/2] object-cover rounded-2xl transition duration-300 group-hover:scale-103"
                  src={infraImage}
                  alt="ICSE school in Ayodhya campus building"
                  width="1536"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col justify-center order-1 md:order-2">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  Eco-Friendly Campus
                </div>
                <BentoTitle className="mt-3">Rainwater Harvesting & Green Spaces</BentoTitle>
                <BentoDescription className="mt-2">
                  Sustainable campus infrastructure with rainwater harvesting, proper cross-ventilation, expansive sports turf, and GPS-enabled transport across Ayodhya and Faizabad.
                </BentoDescription>
              </div>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  )
}

export default Infrastructure

