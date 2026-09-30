import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rawBlogPosts } from '../src/data/blogPostsData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')

const baseUrl = 'https://parmaacademy.com'

const staticRoutes = [
  {
    path: '',
    canonical: 'https://parmaacademy.com/icse-school-in-ayodhya',
    title: 'Parma Academy | Best ICSE School in Ayodhya',
    description:
      'Parma Academy is a leading ICSE school in Ayodhya offering quality education, modern science labs, sports facilities, and holistic growth from Pre-K to Grade 12.',
    h1: 'Best ICSE School in Ayodhya - Parma Academy',
    lead: 'Parma Academy is a premier ICSE affiliated educational institution situated on Parikrama Marg in Ayodhya, Uttar Pradesh. Offering admissions from Pre-School to Grade 12.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/icse-school-in-ayodhya',
    canonical: 'https://parmaacademy.com/icse-school-in-ayodhya',
    title: 'Best ICSE School in Ayodhya | Parma Academy',
    description:
      'Parma Academy is a leading ICSE school in Ayodhya offering quality education, modern science labs, sports facilities, and holistic growth from Pre-K to Grade 12.',
    h1: 'Best ICSE School in Ayodhya - Parma Academy',
    lead: 'Parma Academy is a premier ICSE affiliated educational institution situated on Parikrama Marg in Ayodhya, Uttar Pradesh. Offering admissions from Pre-School to Grade 12.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/admission-ayodhya',
    canonical: 'https://parmaacademy.com/admission-ayodhya',
    title: 'School Admissions 2026-27 | Parma Academy Ayodhya',
    description:
      'Apply to Parma Academy, a premier ICSE school in Ayodhya for session 2026-27. Admissions open from Pre-School to Grade 12. Submit the online application form today.',
    h1: 'Start Your Admission Journey at Parma Academy',
    lead: 'Admissions are open from Pre-School to Grade 12 for the 2026-27 session. Experience world-class ICSE curriculum and sports infrastructure.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/about',
    canonical: 'https://parmaacademy.com/about',
    title: 'About Us | Parma Academy - Top ICSE School in Ayodhya',
    description:
      'Discover Parma Academy in Ayodhya, established in 2004. Learn about our ICSE curriculum, leadership, vision, values, and holistic education approach.',
    h1: 'About Parma Academy Ayodhya',
    lead: 'Empowering future leaders through holistic ICSE education, ethical character building, and modern digital classrooms since 2004.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/facilities',
    canonical: 'https://parmaacademy.com/facilities',
    title: 'Campus Infrastructure & Facilities | Parma Academy Ayodhya',
    description:
      'Explore modern smart classrooms, STEM composite science laboratories, spacious sports grounds, and safe GPS transport at Parma Academy, premier ICSE school in Ayodhya.',
    h1: 'Campus Infrastructure & Modern Facilities at Parma Academy',
    lead: 'State-of-the-art computer labs, composite science laboratories, spacious sports grounds, and GPS-tracked transportation in Ayodhya.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/contact-ayodhya',
    canonical: 'https://parmaacademy.com/contact-ayodhya',
    title: 'Contact Us & Campus Location | Parma Academy Ayodhya',
    description:
      'Contact Parma Academy in Ayodhya. Visit our campus on Parikrama Marg or call +91 7007178570 for school admissions, fees, and campus tour bookings.',
    h1: 'Contact Parma Academy Ayodhya',
    lead: 'Visit our campus on Parikrama Marg, Parmapuram, Ayodhya, Uttar Pradesh 224123. Call +91 7007178570.',
    schemaType: 'LocalBusiness',
  },
  {
    path: '/events',
    canonical: 'https://parmaacademy.com/events',
    title: 'School Events & Campus Life | Parma Academy Ayodhya',
    description:
      'Explore recent student celebrations, educational tours, Independence Day, sports, and cultural festivals at Parma Academy, a leading ICSE school in Ayodhya.',
    h1: 'Campus Celebrations & Events at Parma Academy',
    lead: 'Our annual calendar highlights cultural festivals, national celebrations, and student achievements building confidence and community spirit.',
    schemaType: 'CollectionPage',
  },
  {
    path: '/gallery',
    canonical: 'https://parmaacademy.com/gallery',
    title: 'Campus Photo Gallery | Parma Academy Ayodhya',
    description:
      'Explore Parma Academy campus life, modern infrastructure, student achievements, and cultural celebrations in Ayodhya through our official photo gallery.',
    h1: 'Parma Academy Campus Photo Gallery',
    lead: 'Explore campus life, events, sports tournaments, and student achievements at Parma Academy in Ayodhya.',
    schemaType: 'CollectionPage',
  },
  {
    path: '/staff',
    canonical: 'https://parmaacademy.com/staff',
    title: 'Faculty & Academic Leadership | Parma Academy Ayodhya',
    description:
      'Meet the experienced educators, department faculty, and leadership team at Parma Academy, a trusted ICSE affiliated school in Ayodhya.',
    h1: 'Faculty & Academic Leadership at Parma Academy',
    lead: 'Dedicated educators and leadership team guiding students from Pre-School to Grade 12 at Parma Academy Ayodhya.',
    schemaType: 'AboutPage',
  },
  {
    path: '/student',
    canonical: 'https://parmaacademy.com/student',
    title: 'Student Life & Co-Curriculars | Parma Academy Ayodhya',
    description:
      'Student life at Parma Academy, a premier ICSE school in Ayodhya, features clubs, sports coaching, student council, cultural arts, and dedicated mentoring.',
    h1: 'Student Life & Holistic Development at Parma Academy',
    lead: 'Empowering students through academic mentoring, sports coaching, creative arts, and leadership activities in Ayodhya.',
    schemaType: 'WebPage',
  },
  {
    path: '/employee',
    canonical: 'https://parmaacademy.com/employee',
    title: 'Careers & Teaching Vacancies | Parma Academy Ayodhya',
    description:
      'Explore teaching and administrative career opportunities at Parma Academy in Ayodhya. Apply online to join our supportive, innovative educator community.',
    h1: 'Careers & Opportunities at Parma Academy Ayodhya',
    lead: 'Join our team of dedicated educators at Parma Academy. Submit applications for teaching and administrative career opportunities in Ayodhya.',
    schemaType: 'WebPage',
  },
  {
    path: '/blog',
    canonical: 'https://parmaacademy.com/blog',
    title: 'School Blog & ICSE Education Guides | Parma Academy Ayodhya',
    description:
      'Read educational insights, ICSE curriculum benefits, admission guides, and student achievements from Parma Academy, a top ICSE school in Ayodhya.',
    h1: 'Parma Academy Education Blog & Parent Guides',
    lead: 'Educational resources, ICSE curriculum comparisons, and parenting insights for families in Ayodhya and Uttar Pradesh.',
    schemaType: 'CollectionPage',
  },
]

// Educational Organization sitewide schema
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'School', 'LocalBusiness'],
  name: 'Parma Academy',
  alternateName: 'Parma Academy Ayodhya',
  url: 'https://parmaacademy.com',
  logo: 'https://parmaacademy.com/assets/logo1.webp',
  description:
    'Parma Academy is a premier ICSE affiliated school in Ayodhya, Uttar Pradesh, providing holistic education from Pre-School to Grade 12.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Parikrama Marg, Parmapuram',
    addressLocality: 'Ayodhya',
    addressRegion: 'Uttar Pradesh',
    postalCode: '224123',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.7922,
    longitude: 82.1998,
  },
  telephone: ['+91 7007178570', '+91 7905601642'],
  email: 'Parma.academy.2004@gmail.com',
  openingHours: 'Mo-Sa 08:00-16:00',
  sameAs: [
    'https://www.instagram.com/parmaacademy',
    'https://wa.me/918853810084',
  ],
}

async function prerender() {
  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Please run vite build first.')
    process.exit(1)
  }

  const templateHtml = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf8')
  console.log('Starting static HTML pre-rendering for AI & search crawlers...')

  // Create clean base template by removing fallback meta/schema tags from index.html
  const baseTemplate = templateHtml
    .replace(/<title>.*?<\/title>/, '<!--TITLE-->')
    .replace(/<meta\s+name="description"[^>]*\/?>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*\/?>\s*/gi, '')
    .replace(/<meta\s+property="og:[^>]*\/?>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^>]*\/?>\s*/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')

  // 1. Pre-render Static Pages
  for (const page of staticRoutes) {
    const canonicalUrl = page.canonical || `${baseUrl}${page.path}`
    let html = baseTemplate

    // Replace Title
    html = html.replace('<!--TITLE-->', `<title>${page.title}</title>`)

    const headInjection = `
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${canonicalUrl}" data-rh="true" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Parma Academy" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${baseUrl}/og-image.jpg" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${baseUrl}/og-image.jpg" />
    <script type="application/ld+json">${JSON.stringify(orgSchema)}</script>
`
    html = html.replace('</head>', `${headInjection}\n</head>`)

    // Inject Pre-rendered Body Content matching layout to prevent CLS and provide complete SEO indexable text
    const isHomePage = page.path === '' || page.path === '/icse-school-in-ayodhya'
    
    let bodyContent = ''
    if (isHomePage) {
      bodyContent = `
    <div class="bg-slate-50 text-slate-900">
      <header class="sticky top-0 z-[100] w-full bg-white/95 py-3.5 border-b border-slate-200/50 backdrop-blur-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <a href="/icse-school-in-ayodhya" class="flex shrink-0 items-center gap-3">
            <img src="/assets/logo1.webp" alt="Parma Academy logo" width="48" height="48" class="h-11 w-11 rounded-full bg-white object-contain p-1 ring-2 ring-emerald-500/30" />
            <div>
              <p class="text-lg font-black tracking-tight text-slate-900">Parma <span class="text-emerald-600">Academy</span></p>
              <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">The Future Begins Here</p>
            </div>
          </a>
          <nav class="hidden lg:flex items-center gap-1 rounded-full bg-slate-100/90 p-1.5 border border-slate-200/70" aria-label="Main Navigation">
            <a href="/icse-school-in-ayodhya" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold bg-white text-emerald-700 shadow-sm">Home</a>
            <a href="/about" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600">About</a>
            <a href="/events" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600">Events</a>
            <a href="/admission-ayodhya" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600">Admission</a>
            <a href="/blog" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600">Blog</a>
            <a href="/employee" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600">Employee</a>
            <a href="/staff" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600">Staff</a>
            <a href="/contact-ayodhya" class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600">Contact</a>
          </nav>
          <a href="/admission-ayodhya" class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md">Get Admission →</a>
        </div>
      </header>

      <main>
        <section class="relative min-h-[90vh] w-full p-2 sm:p-4 md:p-6">
          <div class="relative h-full min-h-[85vh] w-full overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-950">
            <picture>
              <source media="(max-width: 768px)" srcset="/og-image-mobile.webp" type="image/webp" />
              <source srcset="/og-image.webp" type="image/webp" />
              <img src="/og-image.jpg" alt="Parma Academy campus in Ayodhya" width="1536" height="1024" class="absolute inset-0 h-full w-full object-cover bg-slate-950" />
            </picture>
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
            <div class="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8 md:px-12 md:pb-12 z-20">
              <div class="grid grid-cols-12 items-end gap-6">
                <div class="col-span-12 lg:col-span-8">
                  <p class="text-xs uppercase tracking-widest font-semibold text-emerald-400 mb-2">Nurturing Minds • Shaping Futures</p>
                  <h1 class="font-bold leading-[0.88] tracking-[-0.05em] text-[18vw] sm:text-[16vw] md:text-[13vw] lg:text-[10vw] xl:text-[9.5vw] text-slate-100">Parma Academy</h1>
                </div>
                <div class="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-4 lg:pb-4">
                  <p class="text-sm text-slate-300 sm:text-base leading-relaxed">Ayodhya's premier ICSE institution blending modern academic excellence with timeless values, state-of-the-art facilities, and holistic character building.</p>
                  <div class="flex flex-wrap items-center gap-4">
                    <a href="/admission-ayodhya" class="inline-flex items-center gap-2 rounded-full bg-emerald-500 py-2.5 px-6 text-sm font-semibold text-slate-950">Apply for Admission →</a>
                    <a href="/contact-ayodhya" class="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-6 py-2.5 text-sm font-semibold text-white">Schedule Visit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mx-auto max-w-6xl px-6 py-12">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-widest text-emerald-600">Latest News</p>
              <h2 class="text-3xl font-semibold text-slate-900">Stay updated with what is new</h2>
            </div>
          </div>
          <div class="mt-8 grid gap-6 md:grid-cols-3">
            <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-widest text-emerald-600">Vacancy</p>
              <p class="text-sm font-semibold text-slate-900 mt-2">Openings for subject teachers across secondary and senior wings.</p>
            </article>
            <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-widest text-emerald-600">New Session</p>
              <p class="text-sm font-semibold text-slate-900 mt-2">New academic batch starts this April. Admissions now open.</p>
            </article>
            <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-widest text-emerald-600">Admission Open</p>
              <p class="text-sm font-semibold text-slate-900 mt-2">Admissions open from Pre-School to Grade 12 for 2026-27 session.</p>
            </article>
          </div>
        </section>

        <section class="bg-white">
          <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
            <div class="space-y-4">
              <p class="text-sm font-semibold uppercase tracking-widest text-emerald-600">About Us</p>
              <h2 class="text-3xl font-semibold text-slate-900">A learning community rooted in values and excellence</h2>
              <p class="text-base text-slate-600 leading-relaxed">Established under the aegis of Narayan Dharmarth Swasth Sansthan, Parma Academy is a premier ICSE school in Ayodhya committed to academic brilliance and character development. We blend modern ICSE learning methodologies with timeless values to help every child flourish from Pre-School to Grade 12.</p>
            </div>
            <div class="grid gap-6">
              <div class="rounded-3xl border border-slate-200 bg-emerald-50 p-8">
                <h3 class="text-xl font-semibold text-emerald-900">Our Vision</h3>
                <p class="mt-3 text-sm text-emerald-900/80">To make learning joyful and prepare responsible citizens who contribute to the prosperity and well-being of society.</p>
              </div>
              <div class="rounded-3xl border border-slate-200 bg-amber-50 p-8">
                <h3 class="text-xl font-semibold text-amber-900">Our Mission</h3>
                <p class="mt-3 text-sm text-amber-900/80">Provide a safe, nurturing environment where curiosity, collaboration, and character are celebrated every day.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="mx-auto max-w-6xl px-6 py-14">
          <p class="text-sm font-semibold uppercase tracking-widest text-emerald-600">Infrastructure</p>
          <h2 class="text-3xl font-semibold text-slate-900">Built for safe and inspiring learning</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div class="rounded-2xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-900">Spacious smart classrooms</p></div>
            <div class="rounded-2xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-900">Advanced STEM science labs</p></div>
            <div class="rounded-2xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-900">Safe GPS-enabled transport</p></div>
            <div class="rounded-2xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-900">Dedicated sports grounds</p></div>
          </div>
        </section>

        <section class="mx-auto max-w-6xl px-6 py-12">
          <h2 class="text-2xl font-bold text-slate-900">Frequently Asked Questions About Parma Academy Ayodhya</h2>
          <dl class="mt-6 space-y-4">
            <div class="rounded-2xl border border-slate-200 bg-white p-6">
              <dt class="text-lg font-bold text-slate-900">Why is Parma Academy considered one of the best ICSE schools in Ayodhya?</dt>
              <dd class="mt-2 text-slate-600 leading-relaxed">Parma Academy combines the rigorous CISCE curriculum with experiential learning, individual mentorship, modern STEM science and computer labs, vibrant co-curricular clubs, and values-based character development since 2004.</dd>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-6">
              <dt class="text-lg font-bold text-slate-900">What classes and grades are offered at Parma Academy?</dt>
              <dd class="mt-2 text-slate-600 leading-relaxed">We offer comprehensive admissions from Pre-School (Nursery, LKG, UKG) through Primary and Middle School up to Grade 12 (Senior Secondary) following the ICSE curriculum.</dd>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-6">
              <dt class="text-lg font-bold text-slate-900">How can parents contact the Parma Academy admissions desk?</dt>
              <dd class="mt-2 text-slate-600 leading-relaxed">Parents can reach us by phone at +91 7007178570 or +91 7905601642, email Parma.academy.2004@gmail.com, or visit our campus at Parikrama Marg, Parmapuram, Ayodhya, Uttar Pradesh - 224123.</dd>
            </div>
          </dl>
        </section>
      </main>

      <footer class="border-t border-slate-200 bg-slate-950 text-slate-200 py-12 px-6">
        <div class="mx-auto max-w-6xl flex flex-wrap justify-between gap-8">
          <div>
            <p class="text-lg font-bold text-white">Parma Academy</p>
            <p class="text-xs uppercase tracking-widest text-emerald-400">The Future Begins Here</p>
            <p class="text-sm text-slate-400 mt-2 max-w-sm">Premier ICSE affiliated school in Ayodhya fostering academic brilliance and ethical leadership since 2004.</p>
          </div>
          <address class="not-italic space-y-1 text-sm text-slate-400">
            <p class="font-semibold text-white">Campus Address & Contact</p>
            <p>Parikrama Marg, Parmapuram, Ayodhya, Uttar Pradesh - 224123, India</p>
            <p>Phone: +91 7007178570, +91 7905601642</p>
            <p>Email: Parma.academy.2004@gmail.com</p>
          </address>
        </div>
      </footer>
    </div>
`
    } else {
      bodyContent = `
    <div class="bg-slate-50 text-slate-900">
      <header class="sticky top-0 z-[100] w-full bg-white/95 py-3.5 border-b border-slate-200/50 backdrop-blur-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <a href="/icse-school-in-ayodhya" class="flex shrink-0 items-center gap-3">
            <img src="/assets/logo1.webp" alt="Parma Academy logo" width="48" height="48" class="h-11 w-11 rounded-full bg-white object-contain p-1 ring-2 ring-emerald-500/30" />
            <div>
              <p class="text-lg font-black tracking-tight text-slate-900">Parma <span class="text-emerald-600">Academy</span></p>
              <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">The Future Begins Here</p>
            </div>
          </a>
          <a href="/admission-ayodhya" class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md">Get Admission →</a>
        </div>
      </header>
      <main class="mx-auto max-w-5xl px-6 py-12">
        <p class="text-xs font-semibold uppercase tracking-widest text-emerald-600">Parma Academy Ayodhya</p>
        <h1 class="text-3xl font-bold mt-2 sm:text-4xl text-slate-900">${page.h1}</h1>
        <p class="mt-4 text-base text-slate-700 leading-relaxed">${page.lead}</p>
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="/admission-ayodhya" class="font-semibold text-emerald-700 underline">Apply for Admission</a>
          <a href="/contact-ayodhya" class="font-semibold text-emerald-700 underline">Contact School Office</a>
          <a href="/blog" class="font-semibold text-emerald-700 underline">Read Education Blog</a>
        </div>
      </main>
      <footer class="border-t border-slate-200 bg-slate-950 text-slate-200 py-8 px-6 text-center text-xs text-slate-400">
        <p>Parma Academy • Parikrama Marg, Parmapuram, Ayodhya, Uttar Pradesh - 224123 • Phone: +91 7007178570</p>
      </footer>
    </div>
`
    }

    html = html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`)

    // Write file
    const targetDir = path.resolve(distDir, page.path.replace(/^\//, ''))
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.resolve(targetDir, 'index.html'), html, 'utf8')
    console.log(`✓ Pre-rendered: ${page.path || '/'}/index.html`)
  }

  // 2. Pre-render All Blog Posts
  const posts = rawBlogPosts || []

  for (const post of posts) {
    const postUrl = `${baseUrl}/blog/${post.slug}`
    let html = baseTemplate

    const metaTitle = post.metaTitle || `${post.title} | Parma Academy Ayodhya`
    const metaDescription = post.metaDescription || post.excerpt

    html = html.replace('<!--TITLE-->', `<title>${metaTitle}</title>`)

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        '@type': 'Organization',
        name: post.author?.name || 'Parma Academy',
        url: baseUrl,
      },
      publisher: orgSchema,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      keywords: post.tags?.join(', ') || post.focusKeyword,
      articleSection: post.category,
    }

    const faqSchema = post.faqs && post.faqs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    } : null

    const headInjection = `
    <meta name="description" content="${metaDescription}" />
    <meta name="keywords" content="${post.focusKeyword || ''}" />
    <link rel="canonical" href="${postUrl}" data-rh="true" />
    <meta property="og:title" content="${metaTitle}" />
    <meta property="og:description" content="${metaDescription}" />
    <meta property="og:url" content="${postUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="${baseUrl}/og-image.jpg" />
    <meta property="article:published_time" content="${post.publishedAt}" />
    <meta property="article:modified_time" content="${post.updatedAt || post.publishedAt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metaTitle}" />
    <meta name="twitter:description" content="${metaDescription}" />
    <meta name="twitter:image" content="${baseUrl}/og-image.jpg" />
    <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
    ${faqSchema ? `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : ''}
`
    html = html.replace('</head>', `${headInjection}\n</head>`)

    // Pre-rendered Body for AI Bots
    const bodyHtml = (post.body || []).map((b) => {
      if (b.type === 'heading') return `<h2 class="text-2xl font-bold mt-6 mb-3 text-slate-900">${b.text}</h2>`
      if (b.type === 'paragraph') return `<p class="mt-3 text-slate-700 leading-relaxed">${b.text}</p>`
      if (b.type === 'list') return `<ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`
      return ''
    }).join('\n')

    const faqsHtml = post.faqs ? `
      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
        <dl class="mt-4 space-y-4">
          ${post.faqs.map((f) => `<div class="bg-white p-4 rounded-xl border border-slate-200"><dt class="font-bold text-emerald-800">${f.question}</dt><dd class="mt-2 text-slate-600">${f.answer}</dd></div>`).join('\n')}
        </dl>
      </section>
    ` : ''

    const postContent = `
    <article class="bg-slate-50 text-slate-900 px-6 py-12 max-w-4xl mx-auto">
      <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-4">
        <a href="/icse-school-in-ayodhya">Home</a> / <a href="/blog">Blog</a> / <span class="font-semibold text-emerald-700">${post.title}</span>
      </nav>
      <header>
        <span class="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">${post.category}</span>
        <span class="text-xs text-slate-500 ml-3">Last Updated: ${post.updatedAt?.split('T')[0] || post.publishedAt?.split('T')[0]}</span>
        <h1 class="text-3xl font-bold mt-3 sm:text-4xl text-slate-900">${post.title}</h1>
        <div class="mt-4 p-4 rounded-xl bg-emerald-50 border-l-4 border-emerald-600 text-emerald-950 font-medium">
          <strong>Key Summary:</strong> ${post.leadSummary || post.excerpt}
        </div>
      </header>
      <main class="mt-6">
        ${bodyHtml}
        ${faqsHtml}
      </main>
      <footer class="mt-10 border-t border-slate-200 pt-6">
        <p class="text-sm text-slate-600">Published by <strong>${post.author?.name}</strong> at Parma Academy, Parikrama Marg, Ayodhya, Uttar Pradesh.</p>
        <p class="mt-2"><a href="/admission-ayodhya" class="text-emerald-700 font-semibold underline">Apply for Parma Academy Ayodhya Admissions 2026-27 →</a></p>
      </footer>
    </article>
`
    html = html.replace('<div id="root"></div>', `<div id="root">${postContent}</div>`)

    const targetDir = path.resolve(distDir, 'blog', post.slug)
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.resolve(targetDir, 'index.html'), html, 'utf8')
    console.log(`✓ Pre-rendered Blog Post: /blog/${post.slug}/index.html`)
  }

  console.log('✓ All routes successfully pre-rendered for AI and Search Crawlers!')
}

prerender()
