import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  // Auto-close mobile drawer on route change
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setIsMenuOpen(false)
  }

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
    <>
      <header
        className={`sticky top-0 z-[100] w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-transparent border-transparent pt-2 sm:pt-3 pb-1 px-2 sm:px-4 md:px-6 pointer-events-none'
            : 'bg-white/95 py-3 sm:py-3.5 xl:py-4 border-b border-slate-200/50 backdrop-blur-md dark:bg-slate-950/95 dark:border-slate-800/50'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-1.5 sm:gap-3 transition-all duration-300 ease-out ${
            isScrolled
              ? 'pointer-events-auto max-w-5xl rounded-full bg-white/35 px-3 py-1.5 shadow-lg shadow-slate-900/5 backdrop-blur-xl border border-white/60 dark:bg-slate-950/40 dark:border-white/10 sm:px-4 md:px-5'
              : 'max-w-7xl px-3 sm:px-6 lg:px-8'
          }`}
        >
          {/* Brand Logo & Name */}
          <Link
            to="/icse-school-in-ayodhya"
            onClick={() => setIsMenuOpen(false)}
            className="group flex shrink-0 items-center gap-2 sm:gap-2.5 xl:gap-3 transition-transform duration-200 active:scale-98"
            aria-label="Parma Academy Home"
          >
            <div className="relative">
              <img
                src={logo}
                alt="Parma Academy logo"
                width="48"
                height="48"
                className={`rounded-full object-contain ring-2 ring-emerald-500/30 transition-all duration-300 group-hover:ring-emerald-500/60 shadow-sm ${
                  isScrolled
                    ? 'h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 p-0.5 bg-white/60 backdrop-blur-sm'
                    : 'h-9 w-9 sm:h-10 sm:w-10 xl:h-12 xl:w-12 p-1 bg-white'
                }`}
              />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950 sm:h-2.5 sm:w-2.5" />
            </div>
            <div className="whitespace-nowrap transition-all duration-300">
              <p
                className={`font-black tracking-tight text-slate-900 dark:text-white transition-all duration-300 ${
                  isScrolled
                    ? 'text-xs sm:text-sm md:text-base'
                    : 'text-sm sm:text-base xl:text-xl'
                }`}
              >
                Parma <span className="text-emerald-600 dark:text-emerald-400">Academy</span>
              </p>
              <p
                className={`font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 transition-all duration-300 ${
                  isScrolled
                    ? 'max-h-0 opacity-0 overflow-hidden text-[0px]'
                    : 'hidden xl:block max-h-6 opacity-100 text-[9px] xl:text-[10px]'
                }`}
              >
                The Future Begins Here
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden lg:flex items-center rounded-full border backdrop-blur-md transition-all duration-300 ${
              isScrolled
                ? 'gap-0.5 bg-transparent p-0.5 xl:p-1 border-transparent shadow-none'
                : 'gap-0.5 xl:gap-1 bg-slate-100/90 p-1 xl:p-1.5 border-slate-200/70 shadow-inner dark:bg-slate-900/90 dark:border-slate-800'
            }`}
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `rounded-full font-semibold transition-all duration-200 whitespace-nowrap ${
                    isScrolled
                      ? 'px-2 xl:px-2.5 py-1 text-[11px] xl:text-xs'
                      : 'px-2.5 xl:px-3.5 py-1 xl:py-1.5 text-xs xl:text-[13px]'
                  } ${
                    isActive
                      ? isScrolled
                        ? 'bg-emerald-600/15 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300'
                        : 'bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA and Mobile Toggle */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:gap-3">
            <Link
              to="/admission-ayodhya"
              onClick={() => setIsMenuOpen(false)}
              className={`group inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold text-white shadow-md shadow-emerald-600/25 transition-all duration-200 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-600/40 active:scale-95 ${
                isScrolled
                  ? 'px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs'
                  : 'px-2.5 sm:px-3.5 xl:px-4 py-1.5 xl:py-2 text-xs sm:text-sm'
              }`}
            >
              <span className="hidden sm:inline">Get </span>
              <span className="hidden min-[360px]:inline">Admission</span>
              <span className="min-[360px]:hidden">Apply</span>
              <svg
                className={`transition-transform duration-200 group-hover:translate-x-0.5 ${
                  isScrolled ? 'h-3 w-3' : 'h-3.5 w-3.5'
                }`}
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
              className={`inline-flex items-center justify-center rounded-full border transition hover:border-emerald-300 hover:text-emerald-700 lg:hidden ${
                isScrolled
                  ? 'p-1.5 border-slate-200/60 bg-white/40 text-slate-700 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/40 dark:text-slate-200'
                  : 'p-1.5 sm:p-2 border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
              }`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className={isScrolled ? 'h-4 w-4' : 'h-4.5 w-4.5 sm:h-5 sm:w-5'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className={isScrolled ? 'h-4 w-4' : 'h-4.5 w-4.5 sm:h-5 sm:w-5'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Dropdown */}
        {isMenuOpen && (
          <div
            className={`mx-auto px-3 sm:px-4 pt-2 pb-4 lg:hidden pointer-events-auto transition-all duration-300 ${
              isScrolled ? 'max-w-md' : 'max-w-7xl'
            }`}
          >
            <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
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
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Ayodhya, Uttar Pradesh</span>
                <a href="tel:+918853810084" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  +91 88538 10084
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for outside click to dismiss mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[90] bg-slate-900/30 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Header

