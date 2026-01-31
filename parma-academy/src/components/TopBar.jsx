function TopBar() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3 text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <span>Call: +91 9451205855</span>
          <span>Email: Parma.academy.2004@gmail.com</span>
          <span>Ayodhya, Uttar Pradesh</span>
        </div>
        <div className="flex items-center gap-3 font-medium">
          <a
            href="#/admission"
            className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-100"
          >
            Admission Open
          </a>
          <a href="#/contact" className="text-slate-500 hover:text-emerald-600">
            Follow Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
