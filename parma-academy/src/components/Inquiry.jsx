function Inquiry() {
  return (
    <section id="admission" className="bg-emerald-700 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
            Inquiry Form
          </p>
          <h2 className="text-3xl font-semibold">Talk to our admissions team</h2>
          <p className="mt-4 text-base text-emerald-100">
            Fill out the form and we will reach out with the details you need
            about admissions, curriculum, and campus facilities.
          </p>
          <div className="mt-8 space-y-4 text-sm text-emerald-100">
            <p>Primary Branch - Ramghat, Ayodhya - 224123 U.P.</p>
            <p>Secondary Branch - Parikrama Marg, Ayodhya - 224123 U.P.</p>
            <p>Phone: +91 7007178570, 7905601642</p>
            <p>Email: Parma.academy.2004@gmail.com</p>
          </div>
        </div>
        <form className="rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Full Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Phone
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                type="tel"
                placeholder="+91 00000 00000"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Email
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              type="email"
              placeholder="name@email.com"
            />
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Message
            </label>
            <textarea
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              rows="4"
              placeholder="Tell us about your query"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </section>
  )
}

export default Inquiry
