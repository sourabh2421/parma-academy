import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

/* ---------------- WordsPullUp ---------------- */
export const WordsPullUp = ({ text, className = '', showAsterisk = false, style }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-emerald-400">*</span>
            )}
          </motion.span>
        )
      })}
    </div>
  )
}

/* ---------------- WordsPullUpMultiStyle ---------------- */
export const WordsPullUpMultiStyle = ({ segments, className = '', style }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const words = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className })
    })
  })

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  )
}

/* ---------------- PrismaHero (Parma Academy Hero) ---------------- */
const PrismaHero = () => {
  return (
    <section className="relative min-h-[90vh] w-full p-2 sm:p-4 md:p-6">
      <div className="relative h-full min-h-[85vh] w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover bg-slate-950"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

        {/* Floating Quick Badge */}
        <div className="absolute left-6 top-6 z-20 hidden items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-4 py-2 text-xs font-medium text-emerald-400 border border-emerald-500/30 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          ICSE Affiliated • Ayodhya since 2004
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8 md:px-12 md:pb-12 z-20">
          <div className="grid grid-cols-12 items-end gap-6">
            
            <div className="col-span-12 lg:col-span-8">
              <p className="text-xs uppercase tracking-widest font-semibold text-emerald-400 mb-2">
                Nurturing Minds • Shaping Futures
              </p>
              <h1
                className="font-bold leading-[0.88] tracking-[-0.05em] text-[18vw] sm:text-[16vw] md:text-[13vw] lg:text-[10vw] xl:text-[9.5vw] text-slate-100"
              >
                <WordsPullUp text="Parma Academy" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-4 lg:pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-slate-300 sm:text-base leading-relaxed"
              >
                Ayodhya&apos;s premier ICSE institution blending modern academic excellence with timeless values, state-of-the-art facilities, and holistic character building.
              </motion.p>

              <div className="flex flex-wrap items-center gap-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to="/admission-ayodhya"
                    className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 py-1.5 pl-6 pr-1.5 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:gap-3 sm:text-base"
                  >
                    Apply for Admission
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                      <ArrowRight className="h-4 w-4 text-emerald-400" />
                    </span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to="/contact-ayodhya"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-400"
                  >
                    Schedule Visit
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export { PrismaHero }
