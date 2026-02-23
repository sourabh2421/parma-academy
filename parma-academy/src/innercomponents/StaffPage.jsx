import { Helmet } from 'react-helmet-async'
import { seoConfig } from '../seo/seoConfig.js'
import shriNarayanRai from '../assets/ShriNarayanRai.jpeg'
import sudhirRai from '../assets/SudhirRai.jpeg'
import sunitaRai from '../assets/SunitaRai.jpeg'

const staffGroups = [
  {
    title: 'Management Staff',
    members: [
      {
        name: 'Principal - Mrs. Suneeta',
        image: sunitaRai,
      },
      {
        name: 'Managing Director - Shri Narayan Rai',
        image: shriNarayanRai,
      },
      {
        name: 'Dr. Sudhir Rai',
        image: sudhirRai,
      },
    ],
  },
  {
    title: 'Hindi Staff',
    members: [
      { name: 'Pooja Singh' },
      { name: 'Poonam Jaiswal' },
      { name: 'Khusboo Gupta' },
      { name: 'Indu Chaudhary' },
      { name: 'Shreya Shukla' },
    ],
  },
  {
    title: 'Maths Staff',
    members: [
      { name: 'Ajay Kumar' },
      { name: 'Utkarsh Mishra' },
      { name: 'Rajesh Sharma' },
      { name: 'Sanjay Verma' },
      { name: 'Rajesh Kumar' },
    ],
  },
  {
    title: 'Science Staff',
    members: [
      { name: 'Neha Pandey' },
      { name: 'Rahul' },
      { name: 'Sandhya Tiwari' },
      { name: 'Shalini Singh' },
      { name: 'Rajesh Yadav' },
    ],
  },
  {
    title: 'English Staff',
    members: [
      { name: 'Sonam' },
      { name: 'Sandeep' },
      { name: 'Komal Mishra' },
      { name: 'Saurabh Singh' },
      { name: 'Snchalata' },
    ],
  },
  {
    title: 'S.ST Staff',
    members: [
      { name: 'Saurabh Nigam' },
      { name: 'Utkarsh' },
      { name: 'Shikha' },
      { name: 'Mani Shankar Ojha' },
      { name: 'Rashmi Mishra' },
    ],
  },
  {
    title: 'Music Staff',
    members: [{ name: 'Chavi' }, { name: 'Divya Sharma' }, { name: 'Saurabh' }],
  },
  {
    title: 'Game Staff',
    members: [
      { name: 'Taran Chawla' },
      { name: 'Ankur Gupta' },
      { name: 'Rajesh Kumar' },
    ],
  },
  {
    title: 'Computer Staff',
    members: [
      { name: 'Shikha Pandey' },
      { name: 'Sankalp' },
      { name: 'Shiv Lal Gupta' },
    ],
  },
  {
    title: 'Library Staff',
    members: [{ name: 'Anpurna' }, { name: 'Pooja' }, { name: 'Neha Mishra' }],
  },
  {
    title: 'Counselor Staff',
    members: [{ name: 'Dr. Smriti Rai' }, { name: 'Dr. Pooja' }],
  },
  {
    title: 'Infirmary Staff',
    members: [{ name: 'Pradeep Rai' }, { name: 'Shreya Singh' }],
  },
]

function StaffPage() {
  const canonicalUrl = `${seoConfig.siteUrl}/staff`

  return (
    <main className="bg-slate-50 text-slate-900">
      <Helmet>
        <title>Faculty & Staff | {seoConfig.schoolName} Ayodhya</title>
        <meta
          name="description"
          content="Meet the leadership and faculty at Parma Academy, a trusted ICSE school in Ayodhya committed to student success."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Faculty | ${seoConfig.schoolName}`} />
        <meta
          property="og:description"
          content="Faculty profiles from Parma Academy, an ICSE affiliated school in Ayodhya."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Our Faculty
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Dedicated educators for every learner
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          Our team brings expertise, care, and enthusiasm to every classroom.
          Each department works together to support academic success and overall
          well-being.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8">
          {staffGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  {group.title}
                </h2>
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  {group.members.length} members
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    {member.image ? (
                      <img
                        className="h-12 w-12 rounded-full border border-slate-200 bg-white object-cover"
                        src={member.image}
                        alt={`${member.name} - ICSE school in Ayodhya leadership`}
                        loading="lazy"
                      />
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-500">Parma Academy</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default StaffPage
