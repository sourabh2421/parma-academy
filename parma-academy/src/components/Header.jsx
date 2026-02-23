import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo1.webp'

const navLinks = [
  { label: 'Home', href: '/icse-school-in-ayodhya' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Admission', href: '/admission-ayodhya' },
  { label: 'Employee', href: '/employee' },
  { label: 'Staff', href: '/staff' },
  { label: 'Fees', href: '/fees' },
  { label: 'Contact', href: '/contact-ayodhya' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Parma Academy ICSE school in Ayodhya logo"
            className="h-12 w-12 rounded-full border border-slate-200 bg-white object-contain p-1 dark:border-slate-700 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          />
          <div>
            <p className="text-base font-semibold text-emerald-700 dark:text-emerald-300 sm:text-lg">
              Parma Academy
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 sm:text-xs sm:tracking-[0.3em]">
              The Future Begins Here
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <nav
            className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-100 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `hover:text-emerald-600 dark:hover:text-emerald-300 ${
                    isActive ? 'text-emerald-700 dark:text-emerald-300' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/admission-ayodhya"
            className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:px-4 sm:text-sm lg:px-5"
          >
            Get Admission
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <div className="border-t border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:hidden">
          <nav className="grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800 ${
                    isActive ? 'bg-emerald-50 text-emerald-700 dark:bg-slate-800' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Header
