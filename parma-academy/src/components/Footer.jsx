function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">Parma Academy</p>
          <p className="text-sm text-slate-400">
            A perfect blend of modern infrastructure and traditional values,
            shaping tomorrow's responsible leaders.
          </p>
        </div>
        <div className="space-y-2 text-sm text-slate-400">
          <p className="font-semibold text-white">Quick Links</p>
          <a href="#/about" className="block hover:text-emerald-300">
            About Us
          </a>
          <a href="#/events" className="block hover:text-emerald-300">
            Events
          </a>
          <a href="#/admission" className="block hover:text-emerald-300">
            Admission
          </a>
          <a href="#/contact" className="block hover:text-emerald-300">
            Contact
          </a>
        </div>
        <div className="space-y-2 text-sm text-slate-400">
          <p className="font-semibold text-white">Contact</p>
          <p>Parma Academy Ramghat, Ayodhya</p>
          <p>Parikrama Marg, Ayodhya</p>
          <p>Phone: +91 7007178570</p>
          <p>Email: Parma.academy.2004@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 Parma Academy. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
