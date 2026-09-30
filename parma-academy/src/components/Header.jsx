import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo1.webp'

const navLinks = [
  { label: 'Home', href: '/icse-school-in-ayodhya' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Admission', href: '/admission-ayodhya' },
  { label: 'Blog', href: '/blog' },
  { label: 'Employee', href: '/employee' },
  { label: 'Staff', href: '/staff' },
  { label: 'Contact', href: '/contact-ayodhya' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to shrink navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/90 py-2 shadow-md shadow-slate-900/5 backdrop-blur-xl border-b border-slate-200/80 dark:bg-slate-950/90 dark:border-slate-800/80'
          : 'bg-white/95 py-3.5 sm:py-4 border-b border-slate-200/50 backdrop-blur-md dark:bg-slate-950/95 dark:border-slate-800/50'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <Link
          to="/icse-school-in-ayodhya"
          className="group flex shrink-0 items-center gap-3 transition-transform duration-200 active:scale-98"
          aria-label="Parma Academy Home"
        >
          <div className="relative">
            <img
              src={logo}
              alt="Parma Academy logo"
              width="48"
              height="48"
              className={`rounded-full bg-white object-contain p-1 ring-2 ring-emerald-500/30 transition-all duration-300 group-hover:ring-emerald-500/60 shadow-sm ${
                isScrolled ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-11 w-11 sm:h-12 sm:w-12'
              }`}
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
          </div>
          <div className="whitespace-nowrap transition-all duration-300">
            <p
              className={`font-black tracking-tight text-slate-900 dark:text-white transition-all duration-300 ${
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}
            >
              Parma <span className="text-emerald-600 dark:text-emerald-400">Academy</span>
            </p>
            <p
              className={`font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 transition-all duration-300 ${
                isScrolled
                  ? 'text-[9px] hidden sm:block text-emerald-600/80 dark:text-emerald-400/80'
                  : 'text-[10px] text-slate-500 dark:text-slate-400'
              }`}
            >
              The Future Begins Here
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 rounded-full bg-slate-100/90 p-1.5 border border-slate-200/70 shadow-inner backdrop-blur-md dark:bg-slate-900/90 dark:border-slate-800"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA and Mobile Toggle */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Link
            to="/admission-ayodhya"
            className={`group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold text-white shadow-md shadow-emerald-600/25 transition-all duration-200 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-600/40 active:scale-95 ${
              isScrolled ? 'px-3.5 py-1.5 text-xs sm:text-sm' : 'px-4 py-2 text-xs sm:text-sm'
            }`}
          >
            <span>Get Admission</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMenuOpen && (
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-4 lg:hidden">
          <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
            <nav className="grid gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Ayodhya, Uttar Pradesh</span>
              <a href="tel:+918853810084" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                +91 88538 10084
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

