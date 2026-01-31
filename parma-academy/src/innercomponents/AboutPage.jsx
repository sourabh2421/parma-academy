const testimonials = [
  {
    name: 'Mrs. Suneeta',
    role: 'Principal',
    quote:
      'We strongly believe in educating children as opposed to just schooling them. We believe home and school must work in unison and a positive partnership with parents play a vital role.',
  },
  {
    name: 'Shri Narayan Rai',
    role: 'Managing Director',
    quote:
      "We are deeply committed to impart quality education of global standards, so that our students are able to deal with life's everyday challenges.",
  },
  {
    name: 'Dr. Sudhir Rai',
    role: 'Professor, Saket PG College',
    quote:
      "Come join us to see the world through a new perspective. Join us and see how co-operation and competition frames your child into tomorrow's responsible citizen.",
  },
  {
    name: 'Harish Chandra',
    role: 'Principal, GSSS, A&N',
    quote:
      'A plethora of academic and co-curricular activities offer the opportunity to all students to discover and enhance various facets of their personality.',
  },
  {
    name: 'Ashok Rai',
    role: 'Advocate, FZD',
    quote:
      'We strive to make the school experience safe, secure, purposeful and fun. The stress free and motivating environment creates the right ambience.',
  },
  {
    name: 'Rajendra Prasad',
    role: 'Dogra Regiment, FZD',
    quote:
      'We strongly believe home and school must work in unison and a positive partnership with parents play a vital role.',
  },
  {
    name: 'Shekhar Rai',
    role: 'BDO, A&N',
    quote:
      "Our vision is to become an institution where learning is a joy. Our mission is to prepare responsible citizens for the prosperity and well-being of our society.",
  },
]

const contactCards = [
  'Email: Parma.academy.2004@gmail.com',
  'Phone: +91 7007178570, 7905601642',
  'Primary Branch - Parma Academy Ramghat, Ayodhya - 224123 U.P.',
  'Secondary Branch - Parma Academy Parikrama Marg, Parmapuram, Ayodhya - 224123 U.P.',
]

function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              About Us
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Parma Academy
            </h1>
            <p className="mt-6 text-base text-slate-600">
              Amalgamated in the year 2004, Parma Academy, established under the
              aegis of Narayan Dharmarth Swasth Sansthan, stands for academic
              excellence and personality development, based on the ideologies of
              Vedas and Epics. A perfect blend of modern infrastructure and
              learning methodology with traditional values and wisdom will help
              transform today's youth into tomorrow's successful leaders. Parma
              Academy considers holistic education as the most powerful, relevant
              and highly effective means for complete renovation of our society.
            </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Voices From Our Leaders
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Shared vision, collective care
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-slate-200 bg-white text-[11px] font-semibold text-slate-500">
                    Photo
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-slate-700">"{item.quote}"</p>
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-emerald-900">
              Let us help you plan your visit
            </h2>
            <p className="mt-3 text-sm text-emerald-900/80">
              Reach out with your questions, and our team will respond with
              admissions and campus details.
            </p>
          </div>
          <div className="grid gap-4">
            {contactCards.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm">
              Follow Us: Instagram
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <a href="#/about" className="font-semibold text-emerald-700">
            About Us
          </a>
          <a href="#/events" className="hover:text-emerald-700">
            Events
          </a>
          <a href="#/contact" className="hover:text-emerald-700">
            Contact
          </a>
          <a href="#/admission" className="hover:text-emerald-700">
            Admission
          </a>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
