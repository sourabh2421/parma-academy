function EmployeePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Employee
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Empowering our employee community
          </h1>
          <p className="mt-6 text-base text-slate-600">
            We foster a supportive environment for our staff with continuous
            professional development and a strong team culture.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              'Professional development workshops',
              'Collaborative teaching culture',
              'Wellness and engagement programs',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Employee Form
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Employment details
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Full Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                type="text"
                placeholder="Employee full name"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Role Applying For
              </label>
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none">
                <option>Teacher</option>
                <option>Administrative Staff</option>
                <option>Support Staff</option>
                <option>Coordinator</option>
              </select>
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
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Email
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                type="email"
                placeholder="name@email.com"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Experience
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              type="text"
              placeholder="Years of experience"
            />
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Message
            </label>
            <textarea
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              rows="4"
              placeholder="Tell us about your profile"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Submit Employee Form
          </button>
        </form>
      </div>
    </section>
  )
}

export default EmployeePage
