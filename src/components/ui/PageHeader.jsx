import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

export default function PageHeader({ eyebrow, title, description, breadcrumbs = [], aside, children }) {
  return (
    <header className="relative isolate overflow-hidden pt-26 pb-10 sm:pt-32 sm:pb-14 md:pt-44 md:pb-20 lg:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-brand-50 via-mist to-canvas" />
        <div className="absolute -top-40 -right-40 size-120 rounded-full bg-brand-100/70 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-104 rounded-full bg-brand-200/40 blur-3xl" />
      </div>

      <div className="container-page">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="animate-rise">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {isLast || !crumb.to ? (
                      <span aria-current={isLast ? 'page' : undefined} className="font-medium text-ink-800">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link to={crumb.to} className="-my-2.5 inline-block py-2.5 transition-colors hover:text-brand-700">
                        {crumb.label}
                      </Link>
                    )}
                    {!isLast && <ChevronRight aria-hidden="true" className="size-3.5 text-ink-300" />}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
            {eyebrow && (
              <p className="eyebrow animate-rise [animation-delay:60ms]">
                <span aria-hidden="true" className="h-px w-6 bg-alert-600" />
                {eyebrow}
              </p>
            )}
            <h1 className="mt-4 animate-rise font-display text-display-xl font-medium tracking-[-0.03em] [animation-delay:120ms] ">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl animate-rise text-lead text-ink-600 [animation-delay:180ms]">
                {description}
              </p>
            )}
            {children && <div className="mt-8 animate-rise [animation-delay:240ms]">{children}</div>}
          </div>
          {aside && <div className="animate-rise [animation-delay:240ms] lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </header>
  )
}
