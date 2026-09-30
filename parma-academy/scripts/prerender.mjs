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
      'Parma Academy is a premier ICSE school in Ayodhya, Uttar Pradesh, offering quality academics, modern science & computer labs, sports coaching, and holistic development from Pre-School to Grade 12.',
    h1: 'Best ICSE School in Ayodhya - Parma Academy',
    lead: 'Parma Academy is a premier ICSE affiliated educational institution situated on Parikrama Marg in Ayodhya, Uttar Pradesh. Offering admissions from Pre-School to Grade 12.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/icse-school-in-ayodhya',
    canonical: 'https://parmaacademy.com/icse-school-in-ayodhya',
    title: 'Best ICSE School in Ayodhya | Parma Academy',
    description:
      'Parma Academy is a premier ICSE school in Ayodhya, Uttar Pradesh, offering quality academics, modern science & computer labs, sports coaching, and holistic development from Pre-School to Grade 12.',
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
  telephone: '+91 7007178570, 7905601642',
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

    // Inject Head Meta Tags & Canonical
    const headInjection = `
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
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

    // Inject Pre-rendered Body Content inside root
    const bodyContent = `
    <div id="prerendered-content" class="bg-slate-50 text-slate-900 px-6 py-12 max-w-5xl mx-auto">
      <header>
        <p class="text-xs font-semibold uppercase tracking-widest text-emerald-600">Parma Academy Ayodhya</p>
        <h1 class="text-3xl font-bold mt-2 sm:text-4xl text-slate-900">${page.h1}</h1>
        <p class="mt-4 text-base text-slate-700 leading-relaxed">${page.lead}</p>
      </header>
      <main class="mt-8">
        <p class="text-slate-600">Explore comprehensive ICSE curriculum, faculty excellence, and student development at Parma Academy, Parikrama Marg, Ayodhya, Uttar Pradesh.</p>
        <div class="mt-6 flex flex-wrap gap-4">
          <a href="/admission-ayodhya" class="font-semibold text-emerald-700 underline">Apply for Admission</a>
          <a href="/contact-ayodhya" class="font-semibold text-emerald-700 underline">Contact School Office</a>
          <a href="/blog" class="font-semibold text-emerald-700 underline">Read Education Blog</a>
        </div>
      </main>
    </div>
`
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
    <link rel="canonical" href="${postUrl}" />
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
