import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function FAQAccordion({ faqs = [], title = 'Frequently Asked Questions', subtitle = 'Quick, verified answers to common parent inquiries.' }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!faqs || faqs.length === 0) return null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="my-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
          FAQ & Quick Answers
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
      </div>

      <div className="mt-6 divide-y divide-slate-100">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={faq.question} className="py-4">
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-900 transition hover:text-emerald-700"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  <p className="border-l-2 border-emerald-500 pl-3.5">{faq.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
