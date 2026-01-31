import gpayImage from '../assets/gpay.webp'
import pnbImage from '../assets/pnb.webp'
import sbiImage from '../assets/sbi.webp'

const paymentOptions = [
  {
    title: 'GPay',
    detail: 'Copy UPI details',
    description: 'UPI ID: 9473812000@okbizaxis',
    image: gpayImage,
    accountNumber: '9473812000@okbizaxis',
  },
  {
    title: 'PNB',
    detail: 'Copy Account No',
    description: 'Account No: 3865002100004650',
    image: pnbImage,
    accountNumber: '3865002100004650',
  },
  {
    title: 'SBI',
    detail: 'Copy Account No',
    description: 'Account No: 31151279024',
    image: sbiImage,
    accountNumber: '31151279024',
  },
]

const instructions = [
  {
    title: 'Paying through UPI',
    detail:
      'Upon scanning the QR code, please confirm that the name displayed is Parma Academy and the UPI ID is 9473812000@okbizaxis. Only then should the payment be processed.',
  },
  {
    title: 'Paying through Account Details',
    detail:
      'Please ensure that the correct account details are provided, including the account number and IFSC code.',
  },
  {
    title: 'Contact Information',
    detail:
      'If you encounter any issues during the payment process or require assistance, please contact our support team at +91 7007178570, 7905601642.',
  },
  {
    title: 'Payment Confirmation',
    detail:
      'Please confirm that the payment has been successfully processed with respected staff members.',
  },
  {
    title: 'Payment Responsibility',
    detail:
      "We don't take any responsibility for any errors or issues during the payment process.",
  },
]

function FeesPage() {
  const handleCopy = async (value) => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      window.prompt('Copy account number:', value)
    }
  }

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Fees Payment
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Secure fee payment options
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          Choose a payment method and review the instructions carefully before
          submitting your fee payment.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {paymentOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">
                  {option.title}
                </h2>
                {option.accountNumber ? (
                  <button
                    type="button"
                    onClick={() => handleCopy(option.accountNumber)}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                    aria-label={`Copy ${option.title} account number`}
                  >
                    {option.detail}
                  </button>
                ) : (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {option.detail}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm text-slate-600">{option.description}</p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  className="h-96 w-full object-contain p-4"
                  src={option.image}
                  alt={`${option.title} payment details`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Payment Instructions
            </h2>
            <div className="mt-6 space-y-5">
              {instructions.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-semibold text-emerald-700">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
            <h3 className="text-xl font-semibold text-emerald-900">
              Need help?
            </h3>
            <p className="mt-3 text-sm text-emerald-900/80">
              Our support team is available to guide you through payment steps.
            </p>
            <div className="mt-6 space-y-3 text-sm text-emerald-900">
              <p>Phone: +91 7007178570, 7905601642</p>
              <p>Email: Parma.academy.2004@gmail.com</p>
              <p>Primary Branch - Ramghat, Ayodhya - 224123 U.P.</p>
              <p>Secondary Branch - Parikrama Marg, Ayodhya - 224123 U.P.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FeesPage
