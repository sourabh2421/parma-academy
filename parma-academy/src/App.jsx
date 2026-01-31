import { useEffect, useState } from 'react'
import TopBar from './components/TopBar.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './innercomponents/HomePage.jsx'
import AboutPage from './innercomponents/AboutPage.jsx'
import EventsPage from './innercomponents/EventsPage.jsx'
import AdmissionPage from './innercomponents/AdmissionPage.jsx'
import StudentPage from './innercomponents/StudentPage.jsx'
import EmployeePage from './innercomponents/EmployeePage.jsx'
import StaffPage from './innercomponents/StaffPage.jsx'
import FeesPage from './innercomponents/FeesPage.jsx'
import ContactPage from './innercomponents/ContactPage.jsx'

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/events': EventsPage,
  '/admission': AdmissionPage,
  '/student': StudentPage,
  '/employee': EmployeePage,
  '/staff': StaffPage,
  '/fees': FeesPage,
  '/contact': ContactPage,
}

const getRouteFromHash = () => {
  const hash = window.location.hash || '#/'
  const path = hash.replace('#', '')
  return routes[path] ? path : '/'
}

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false
  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme) return storedTheme === 'dark'
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
}

function App() {
  const [isDark, setIsDark] = useState(getInitialTheme)
  const [route, setRoute] = useState(getRouteFromHash)

  useEffect(() => {
    const handleChange = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      window.localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      window.localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const CurrentPage = routes[route] || HomePage

  return (
    <div className="bg-slate-50 text-slate-900">
      <TopBar />
      <Header />
      <main>
        <CurrentPage />
      </main>
      <Footer />
      <button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg transition hover:border-emerald-300 hover:text-emerald-700"
        aria-label="Toggle dark mode"
      >
        <span className="text-base">{isDark ? '☀️' : '🌙'}</span>
        {isDark ? 'Light mode' : 'Dark mode'}
      </button>
    </div>
  )
}

export default App
