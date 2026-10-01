import { useEffect, useState, lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import whatsappIcon from './assets/whatsapp.svg'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Agentation } from 'agentation'
import { SpeedInsights } from '@vercel/speed-insights/react'

const HomePage = lazy(() => import('./innercomponents/HomePage.jsx'))
const AboutPage = lazy(() => import('./innercomponents/AboutPage.jsx'))
const EventsPage = lazy(() => import('./innercomponents/EventsPage.jsx'))
const AdmissionPage = lazy(() => import('./innercomponents/AdmissionPage.jsx'))
const StudentPage = lazy(() => import('./innercomponents/StudentPage.jsx'))
const EmployeePage = lazy(() => import('./innercomponents/EmployeePage.jsx'))
const StaffPage = lazy(() => import('./innercomponents/StaffPage.jsx'))
const ContactPage = lazy(() => import('./innercomponents/ContactPage.jsx'))
const GalleryPage = lazy(() => import('./innercomponents/GalleryPage.jsx'))
const FacilitiesPage = lazy(() => import('./innercomponents/FacilitiesPage.jsx'))
const BlogPage = lazy(() => import('./innercomponents/BlogPage.jsx'))
const BlogPostPage = lazy(() => import('./innercomponents/BlogPostPage.jsx'))

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false
  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme) return storedTheme === 'dark'
  return false
}

function App() {
  const [isDark, setIsDark] = useState(getInitialTheme)

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

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/icse-school-in-ayodhya" element={<HomePage />} />
            <Route path="/admission-ayodhya" element={<AdmissionPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/contact-ayodhya" element={<ContactPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<Navigate to="/icse-school-in-ayodhya" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <a
        href="https://wa.me/918853810084"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-6 z-50 inline-flex items-center justify-center rounded-full bg-emerald-600 p-4 shadow-lg transition hover:bg-emerald-700"
        aria-label="Chat on WhatsApp"
      >
        <img src={whatsappIcon} alt="Chat on WhatsApp" width="28" height="28" className="h-7 w-7" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg transition hover:border-emerald-300 hover:text-emerald-700"
        aria-label="Toggle dark mode"
      >
        <span className="text-base">{isDark ? '☀️' : '🌙'}</span>
        {isDark ? 'Light mode' : 'Dark mode'}
      </button>
      {process.env.NODE_ENV === 'development' && <Agentation />}
      <SpeedInsights />
    </div>
  )
}

export default App
