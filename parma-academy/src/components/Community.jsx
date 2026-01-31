function Community() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 lg:grid-cols-3">
        <div
          id="student"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Student
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Student Life
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Counseling, clubs, and mentorship for holistic growth.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Learn more →
          </a>
        </div>
        <div
          id="employee"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Employee
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Employee Services
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Supportive workplace policies and growth opportunities.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Learn more →
          </a>
        </div>
        <div
          id="staff"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Staff
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Staff Directory
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Dedicated educators guiding every classroom.
          </p>
          <a
            href="#leadership"
            className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Meet our leaders →
          </a>
        </div>
        <div
          id="fees"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-3"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Fees
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Transparent fee structure
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Detailed fee schedules are available on request. Our team can guide
            you on admission charges and payment timelines.
          </p>
          <a
            href="#admission"
            className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Request fee details →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Community
