import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo1.webp'
import { SlideTabs } from './ui/slide-tabs'

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

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/icse-school-in-ayodhya" className="flex shrink-0 items-center gap-3">
          <img
            src={logo}
            alt="Parma Academy logo"
            className="h-11 w-11 rounded-full border border-slate-200 object-contain p-1 dark:border-slate-700 sm:h-13 sm:w-13"
            style={{ backgroundColor: '#ffffff' }}
          />
          <div className="whitespace-nowrap">
            <p className="text-base font-bold leading-tight text-emerald-700 dark:text-emerald-300 sm:text-lg">
              Parma Academy
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 sm:text-xs">
              The Future Begins Here
            </p>
          </div>
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">
            <SlideTabs tabs={navLinks} />
          </div>
          <Link
            to="/admission-ayodhya"
            className="whitespace-nowrap rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:px-4 sm:text-sm"
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
