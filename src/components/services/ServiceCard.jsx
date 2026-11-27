import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router'

export default function ServiceCard({ id, to, name, description, services, icon: Icon, featured = false, className = '' }) {
  return (
    <article
      aria-labelledby={`${id}-title`}
      className={`group relative flex h-full flex-col rounded-card p-6 transition-all duration-500 ease-out-soft hover:-translate-y-1 sm:p-7 ${
        featured
          ? 'bg-brand-800 text-white shadow-lift lg:flex-row lg:gap-10 lg:p-9'
          : 'bg-white shadow-card ring-1 ring-ink-900/6 hover:shadow-lift hover:ring-brand-200'
      } ${className}`}
    >
      <div className={featured ? 'lg:flex lg:w-1/2 lg:flex-col' : ''}>
        <span
          className={`grid size-12 place-items-center rounded-2xl transition-colors duration-500 ${
            featured
              ? 'bg-white/10 text-brand-200'
              : 'bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white'
          }`}
        >
          <Icon aria-hidden="true" className="size-5.5" strokeWidth={1.75} />
        </span>

        {featured && (
          <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-brand-200 uppercase">
            Featured department
          </p>
        )}

        <h3
          id={`${id}-title`}
          className={`font-display font-medium tracking-[-0.015em] ${
            featured ? 'mt-2 text-display-md text-white' : 'mt-5 text-display-sm text-ink-900'
          }`}
        >
          {to ? (
            <Link to={to} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        <p className={`mt-3 leading-relaxed ${featured ? 'text-white/75 sm:text-[1.0625rem]' : 'text-[0.9375rem] text-ink-600'}`}>
          {description}
        </p>
        {to && featured && (
          <span className="mt-auto hidden items-center gap-2 pt-8 text-sm font-semibold text-brand-100 lg:inline-flex">
            View department
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>

      <ul
        className={`flex flex-col gap-2.5 ${
          featured
            ? 'mt-7 rounded-2xl bg-white/7 p-5 ring-1 ring-white/10 lg:mt-0 lg:w-1/2 lg:self-center lg:p-6'
            : 'mt-6 border-t border-ink-100 pt-5'
        }`}
      >
        {services.map((service) => (
          <li key={service} className="flex items-start gap-2.5">
            <Check
              aria-hidden="true"
              strokeWidth={2.5}
              className={`mt-0.75 size-4 shrink-0 ${featured ? 'text-brand-300' : 'text-brand-600'}`}
            />
            <span className={`text-[0.9375rem] font-medium ${featured ? 'text-white' : 'text-ink-800'}`}>{service}</span>
          </li>
        ))}
      </ul>

      {to && !featured && (
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-700">
          View department
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
      {to && featured && (
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-100 lg:hidden">
          View department
          <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      )}
    </article>
  )
}
