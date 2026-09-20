import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const baseUrl = 'https://parmaacademy.com'
const currentDate = new Date().toISOString().split('T')[0]

// Core Static Routes
const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/icse-school-in-ayodhya', priority: '1.0', changefreq: 'daily' },
  { path: '/admission-ayodhya', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/facilities', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-ayodhya', priority: '0.8', changefreq: 'monthly' },
  { path: '/events', priority: '0.7', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.7', changefreq: 'monthly' },
  { path: '/staff', priority: '0.7', changefreq: 'monthly' },
  { path: '/student', priority: '0.7', changefreq: 'monthly' },
  { path: '/employee', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
]

async function generateSitemap() {
  console.log('Generating dynamic XML sitemap...')

  // Import blog posts
  const blogPostsFile = path.resolve(rootDir, 'src/data/blogPosts.js')
  let blogSlugs = [
    'why-choose-icse-school-in-ayodhya',
    'icse-vs-cbse-board-school-ayodhya',
    'parma-academy-admission-guide-ayodhya',
    'student-life-co-curriculars-parma-academy-ayodhya',
  ]

  try {
    const fileContent = fs.readFileSync(blogPostsFile, 'utf8')
    const matchSlugs = [...fileContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
    if (matchSlugs.length > 0) {
      blogSlugs = Array.from(new Set(matchSlugs))
    }
  } catch (err) {
    console.warn('Could not parse blog posts file, using default slugs:', err.message)
  }

  const urls = [
    ...staticRoutes.map((route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`),
    ...blogSlugs.map((slug) => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`),
  ]

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`

  // Write to public/sitemap.xml
  const publicPath = path.resolve(rootDir, 'public/sitemap.xml')
  fs.writeFileSync(publicPath, sitemapContent, 'utf8')
  console.log(`✓ Sitemap written to ${publicPath}`)

  // Write to dist/sitemap.xml if dist exists
  const distPath = path.resolve(rootDir, 'dist/sitemap.xml')
  if (fs.existsSync(path.resolve(rootDir, 'dist'))) {
    fs.writeFileSync(distPath, sitemapContent, 'utf8')
    console.log(`✓ Sitemap written to ${distPath}`)
  }
}

generateSitemap()
