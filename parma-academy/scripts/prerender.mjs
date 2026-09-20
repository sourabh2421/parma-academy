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
    path: '/icse-school-in-ayodhya',
    title: 'Best ICSE School in Ayodhya | Parma Academy',
    description:
      'Parma Academy is an ICSE school in Ayodhya offering quality education, modern facilities, experienced faculty, and holistic development for every student.',
    h1: 'Best ICSE School in Ayodhya - Parma Academy',
    lead: 'Parma Academy is a premier ICSE affiliated educational institution situated on Parikrama Marg in Ayodhya, Uttar Pradesh. Offering admissions from Pre-School to Grade 12.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/admission-ayodhya',
    title: 'Admissions 2026-27 | Parma Academy Ayodhya',
    description:
      'Apply to Parma Academy, a top ICSE school in Ayodhya. Submit the online admission form to start your child’s learning journey.',
    h1: 'Start Your Admission Journey at Parma Academy Ayodhya',
    lead: 'Admissions are open from Pre-School to Grade 12 for the 2026-27 session. Experience world-class ICSE curriculum and sports infrastructure.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/about',
    title: 'About Us | Parma Academy Ayodhya',
    description:
      'Discover Parma Academy history, leadership, vision, and core educational values in Ayodhya, Uttar Pradesh.',
    h1: 'About Parma Academy Ayodhya',
    lead: 'Empowering future leaders through holistic ICSE education, ethical character building, and modern digital classrooms.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/facilities',
    title: 'Campus Infrastructure & Facilities | Parma Academy Ayodhya',
    description:
      'Explore state-of-the-art classrooms, STEM labs, library, sports fields, and smart campus facilities at Parma Academy in Ayodhya.',
    h1: 'World-Class Infrastructure and Facilities',
    lead: 'State-of-the-art computer labs, composite science laboratories, spacious sports grounds, and GPS-tracked transportation in Ayodhya.',
    schemaType: 'EducationalOrganization',
  },
  {
    path: '/contact-ayodhya',
    title: 'Contact Us | Parma Academy Ayodhya',
    description:
      'Reach Parma Academy in Ayodhya for admissions, campus tours, and support. Phone: +91 7007178570, Email: Parma.academy.2004@gmail.com.',
    h1: 'Contact Parma Academy Ayodhya',
    lead: 'Visit our campus on Parikrama Marg, Parmapuram, Ayodhya, Uttar Pradesh 224123. Call +91 7007178570.',
    schemaType: 'LocalBusiness',
  },
  {
    path: '/blog',
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

  // 1. Pre-render Static Pages
  for (const page of staticRoutes) {
    const pageUrl = `${baseUrl}${page.path}`
    let html = templateHtml

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)

    // Inject Head Meta Tags & Canonical
    const headInjection = `
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${pageUrl}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
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
        <div class="mt-6 flex gap-4">
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
    console.log(`✓ Pre-rendered: ${page.path}/index.html`)
  }

  // 2. Pre-render All Blog Posts
  const posts = rawBlogPosts || []

  for (const post of posts) {
    const postUrl = `${baseUrl}/blog/${post.slug}`
    let html = templateHtml

    const metaTitle = post.metaTitle || `${post.title} | Parma Academy Ayodhya`
    const metaDescription = post.metaDescription || post.excerpt

    html = html.replace(/<title>.*?<\/title>/, `<title>${metaTitle}</title>`)

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
    <meta property="article:published_time" content="${post.publishedAt}" />
    <meta property="article:modified_time" content="${post.updatedAt || post.publishedAt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metaTitle}" />
    <meta name="twitter:description" content="${metaDescription}" />
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
