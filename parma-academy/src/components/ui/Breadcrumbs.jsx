import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { seoConfig } from '../../seo/seoConfig'

export default function Breadcrumbs({ items = [] }) {
  // Always start with Home
  const allItems = [{ label: 'Home', href: '/icse-school-in-ayodhya' }, ...items]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${seoConfig.siteUrl}${item.href}` : undefined,
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1
          return (
            <span key={item.label + idx} className="flex items-center gap-2">
              {idx > 0 && <span className="text-slate-300">/</span>}
              {isLast || !item.href ? (
                <span className="truncate font-semibold text-emerald-700" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="transition hover:text-emerald-700 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
