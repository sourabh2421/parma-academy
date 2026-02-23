import { Link } from 'react-router-dom'
import { seoConfig } from '../seo/seoConfig.js'

function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">{seoConfig.schoolName}</p>
          <p className="text-sm text-slate-400">
            A perfect blend of modern infrastructure and traditional values,
            shaping tomorrow's responsible leaders.
          </p>
          <p className="text-sm text-slate-400">
            ICSE School in Ayodhya, Uttar Pradesh
          </p>
        </div>
        <div className="space-y-2 text-sm text-slate-400">
          <p className="font-semibold text-white">Quick Links</p>
          <Link to="/about" className="block hover:text-emerald-300">
            About Us
          </Link>
          <Link to="/events" className="block hover:text-emerald-300">
            Events
          </Link>
          <Link to="/admission-ayodhya" className="block hover:text-emerald-300">
            Admission
          </Link>
          <Link to="/contact-ayodhya" className="block hover:text-emerald-300">
            Contact
          </Link>
        </div>
        <div className="space-y-2 text-sm text-slate-400">
          <p className="font-semibold text-white">Contact</p>
          <p>{seoConfig.address}</p>
          <p>Phone: {seoConfig.phone}</p>
          <p>Email: {seoConfig.email}</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 Parma Academy. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
