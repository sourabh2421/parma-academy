import logo from '../assets/logo1.webp'

const navLinks = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Events', href: '#/events' },
  { label: 'Admission', href: '#/admission' },
  { label: 'Student', href: '#/student' },
  { label: 'Employee', href: '#/employee' },
  { label: 'Staff', href: '#/staff' },
  { label: 'Fees', href: '#/fees' },
  { label: 'Contact', href: '#/contact' },
]

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Parma Academy logo"
            className="h-16 w-16 rounded-full border border-slate-200 bg-white object-contain p-1 dark:border-slate-700"
          />
          <div>
            <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
              Parma Academy
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              The Future Begins Here
            </p>
          </div>
        </div>
        <nav
          className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-100 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-emerald-600 dark:hover:text-emerald-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#/admission"
          className="rounded-full bg-emerald-600 px-2 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Get Admission
        </a>
      </div>
    </header>
  )
}

export default Header
