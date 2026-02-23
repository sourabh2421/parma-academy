import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import emailjs from '@emailjs/browser'
import { seoConfig } from '../seo/seoConfig.js'

function AdmissionPage() {
  const form = useRef()
  const canonicalUrl = `${seoConfig.siteUrl}/admission-ayodhya`

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_ADMISSION_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY,
      )
      .then(() => {
        alert('Admission form submitted successfully!')
        e.target.reset()
      })
      .catch((error) => {
        console.error(error)
        alert('Failed to submit form.')
      })
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Helmet>
        <title>Admissions | {seoConfig.schoolName} Ayodhya</title>
        <meta
          name="description"
          content="Apply to Parma Academy, a top ICSE school in Ayodhya. Submit the admission form to start your child's learning journey."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Admissions | ${seoConfig.schoolName}`} />
        <meta
          property="og:description"
          content="Admissions open at Parma Academy, an ICSE affiliated school in Ayodhya."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
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

        <form
          ref={form}
          onSubmit={sendEmail}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
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
                name="student_name"
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
                name="dob"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Grade Applying For
              </label>
              <select
                name="grade"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
              >
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
                name="previous_school"
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
              name="parent_name"
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
                name="phone"
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
                name="email"
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
              name="message"
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
