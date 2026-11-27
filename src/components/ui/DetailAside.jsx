import { ArrowRight, ArrowUpRight, CalendarCheck, Phone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import Button from './Button'
import { hmoPartners, publicHealthSchemes } from '../../data/insurance'
import { appointmentCta, hospital, routes } from '../../data/site'

export function BookingCard({ title, description, appointmentTo }) {
  return (
    <div className="rounded-panel bg-brand-800 p-6 text-white shadow-lift sm:p-7">
      <CalendarCheck aria-hidden="true" className="size-6 text-brand-200" strokeWidth={1.75} />
      <h2 className="mt-4 font-display text-display-sm font-medium text-white">{title}</h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">{description}</p>
      <Button to={appointmentTo} variant="light" icon={ArrowRight} className="mt-6 w-full">
        {appointmentCta.label}
      </Button>
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-xs font-semibold tracking-[0.14em] text-brand-200 uppercase">Or call the hospital</p>
        <ul className="mt-2 flex flex-col">
          {hospital.phones.map((phone) => (
            <li key={phone.href}>
              <a href={phone.href} className="inline-flex items-center gap-2 py-2 font-semibold text-white hover:text-brand-100">
                <Phone aria-hidden="true" className="size-4 text-brand-200" />
                {phone.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function RelatedLinks({ title, links }) {
  if (links.length === 0) return null

  return (
    <nav aria-label={title} className="rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 sm:p-7">
      <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">{title}</h2>
      <ul className="mt-4 flex flex-col">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="group flex items-center gap-3 border-b border-ink-100 py-3 text-[0.9375rem] font-medium text-ink-800 last:border-0 hover:text-brand-700"
            >
              {Icon && <Icon aria-hidden="true" className="size-4.5 shrink-0 text-brand-600" strokeWidth={1.75} />}
              <span className="flex-1">{label}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function InsuranceNote() {
  return (
    <Link
      to={routes.hmo}
      className="group flex items-start gap-4 rounded-panel bg-brand-50 p-6 ring-1 ring-brand-100 transition-shadow hover:shadow-card sm:p-7"
    >
      <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700" strokeWidth={1.85} />
      <span>
        <span className="block font-semibold text-ink-900">Health insurance accepted</span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-600">
          {publicHealthSchemes.map((scheme) => scheme.shortName).join(', ')} and {hmoPartners.length} HMO partners.
        </span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          See all partners
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  )
}
