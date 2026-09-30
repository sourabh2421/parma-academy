import { Helmet } from 'react-helmet-async'
import { seoConfig } from '../seo/seoConfig.js'

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  schema,
  keywords,
  publishedTime,
  modifiedTime,
  author,
}) {
  const fullTitle = title
    ? title.includes(seoConfig.schoolName)
      ? title
      : `${title} | ${seoConfig.schoolName} Ayodhya`
    : `${seoConfig.schoolName} | Best ICSE School in Ayodhya`

  const metaDesc =
    description ||
    'Parma Academy is a premier ICSE school in Ayodhya, Uttar Pradesh, offering quality academics, modern science & computer labs, sports coaching, and holistic development.'

  const url = canonicalUrl || seoConfig.siteUrl
  const image = ogImage || `${seoConfig.siteUrl}/og-image.jpg`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={seoConfig.schoolName} />
      <meta property="og:locale" content="en_IN" />

      {/* Article Specific Open Graph */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
