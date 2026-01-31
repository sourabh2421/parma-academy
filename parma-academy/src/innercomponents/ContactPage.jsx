function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
        Contact
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        We are here to help
      </h1>
      <p className="mt-6 text-base text-slate-600">
        Connect with our team for admissions, campus visits, and general
        inquiries. We look forward to hearing from you.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          'Primary Branch - Ramghat, Ayodhya - 224123 U.P.',
          'Secondary Branch - Parikrama Marg, Ayodhya - 224123 U.P.',
          'Phone: +91 7007178570, 7905601642',
          'Email: Parma.academy.2004@gmail.com',
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ContactPage
