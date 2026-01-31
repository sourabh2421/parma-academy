function AdmissionPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Admission
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Start your admission journey
          </h1>
          <p className="mt-6 text-base text-slate-600">
            Admissions are open from pre-school to grade 12. Our team guides
            parents through the application process, required documents, and
            campus visits.
          </p>
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-sm text-emerald-900">
            Contact our admissions team at +91 7007178570 or visit the campus for
            a personalized tour.
          </div>
        </div>

        <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Student Admission Form
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Student details
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Student Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                type="text"
                placeholder="Student full name"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Date of Birth
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                type="date"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Grade Applying For
              </label>
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none">
                <option>Pre-School</option>
                <option>Grade 1</option>
                <option>Grade 2</option>
                <option>Grade 3</option>
                <option>Grade 4</option>
                <option>Grade 5</option>
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Previous School
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                type="text"
                placeholder="Current/previous school"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Parent/Guardian Name
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              type="text"
              placeholder="Parent or guardian name"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                placeholder="parent@email.com"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Message
            </label>
            <textarea
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              rows="4"
              placeholder="Tell us about the student"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Submit Admission Form
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdmissionPage
