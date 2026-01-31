const staffGroups = [
  {
    title: 'Management Staff',
    names: ['Principal - Mrs. Suneeta', 'Managing Director - Shri Narayan Rai'],
  },
  {
    title: 'Hindi Staff',
    names: [
      'Pooja Singh',
      'Poonam Jaiswal',
      'Khusboo Gupta',
      'Indu Chaudhary',
      'Shreya Shukla',
    ],
  },
  {
    title: 'Maths Staff',
    names: [
      'Ajay Kumar',
      'Utkarsh Mishra',
      'Rajesh Sharma',
      'Sanjay Verma',
      'Rajesh Kumar',
    ],
  },
  {
    title: 'Science Staff',
    names: [
      'Neha Pandey',
      'Rahul',
      'Sandhya Tiwari',
      'Shalini Singh',
      'Rajesh Yadav',
    ],
  },
  {
    title: 'English Staff',
    names: [
      'Sonam',
      'Sandeep',
      'Komal Mishra',
      'Saurabh Singh',
      'Snchalata',
    ],
  },
  {
    title: 'S.ST Staff',
    names: [
      'Saurabh Nigam',
      'Utkarsh',
      'Shikha',
      'Mani Shankar Ojha',
      'Rashmi Mishra',
    ],
  },
  {
    title: 'Music Staff',
    names: ['Chavi', 'Divya Sharma', 'Saurabh'],
  },
  {
    title: 'Game Staff',
    names: ['Taran Chawla', 'Ankur Gupta', 'Rajesh Kumar'],
  },
  {
    title: 'Computer Staff',
    names: ['Shikha Pandey', 'Sankalp', 'Shiv Lal Gupta'],
  },
  {
    title: 'Library Staff',
    names: ['Anpurna', 'Pooja', 'Neha Mishra'],
  },
  {
    title: 'Counselor Staff',
    names: ['Dr. Smriti Rai', 'Dr. Pooja',] ,
  },
  {
    title: 'Infirmary Staff',
    names: ['Pradeep Rai', 'Shreya Singh', ],
  },
]

function StaffPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
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
                  {group.names.length} members
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.names.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-slate-200 bg-white text-[11px] font-semibold text-slate-500">
                      Photo
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {name}
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
