import { Activity, ArrowUpRight, Microscope, Siren, Stethoscope } from 'lucide-react'
import { Link } from 'react-router'
import { servicePath } from '../../data/services'
import { routes } from '../../data/site'

const features = [
  {
    to: routes.departments,
    icon: Stethoscope,
    title: 'Specialist care',
    detail: 'Seven departments',
    tint: 'bg-brand-50 text-brand-700',
  },
  {
    to: servicePath('laboratory'),
    icon: Microscope,
    title: 'Laboratory & scans',
    detail: 'Tests and ultrasound',
    tint: 'bg-brand-50 text-brand-700',
  },
  {
    to: servicePath('health-checkups'),
    icon: Activity,
    title: 'Health checks',
    detail: 'Check-ups & screening',
    tint: 'bg-brand-50 text-brand-700',
  },
  {
    to: servicePath('emergency-care'),
    icon: Siren,
    title: 'Emergency care',
    detail: 'Open 24 hours',
    tint: 'bg-alert-50 text-alert-700',
  },
]

export default function HeroFeatures() {
  return (
    <nav
      aria-label="Explore our care"
      className="relative z-10 mx-auto max-w-7xl rounded-panel bg-white p-2 shadow-float ring-1 ring-ink-900/5"
    >
      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {features.map(({ to, icon: Icon, title, detail, tint }, position) => (
          <li key={to} className="relative">
            {position > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-0 hidden h-10 w-px -translate-y-1/2 bg-ink-200/70 lg:block"
              />
            )}
            <Link
              to={to}
              className="group flex h-full flex-col items-start gap-3 rounded-[1.25rem] p-4 transition-colors duration-300 hover:bg-canvas sm:flex-row sm:items-center sm:gap-4 sm:p-5"
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full sm:size-12 ${tint} transition-transform duration-500 ease-out-soft group-hover:scale-110`}
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.85} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-semibold text-ink-900">{title}</span>
                <span className="mt-0.5 block text-[0.8125rem] text-ink-500">{detail}</span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700 max-sm:hidden lg:hidden xl:block"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
