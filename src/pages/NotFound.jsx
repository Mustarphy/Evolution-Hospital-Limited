import { ArrowRight, Compass } from 'lucide-react'
import { Link } from 'react-router'
import Button from '../components/ui/Button'
import { usePageMeta } from '../hooks/usePageMeta'
import { navigationLinks, routes } from '../data/site'

export default function NotFound({
  title = 'We couldn’t find that page',
  description = 'The page you are looking for may have moved, or the address may be mistyped.',
}) {
  usePageMeta({ title: 'Page not found' })

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 md:pt-48 lg:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-brand-50 via-mist to-canvas" />
        <div className="absolute -top-40 -right-40 size-120 rounded-full bg-brand-100/70 blur-3xl" />
      </div>
      <div className="container-page mx-auto max-w-2xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white text-brand-700 shadow-card">
          <Compass aria-hidden="true" className="size-7" strokeWidth={1.75} />
        </span>
        <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Error 404</p>
        <h1 className="mt-3 font-display text-display-xl font-medium tracking-[-0.03em] ">
          {title}
        </h1>
        <p className="mt-4 text-lead text-ink-600">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to={routes.home} size="lg" icon={ArrowRight}>
            Back to home
          </Button>
          <Button to={routes.contact} size="lg" variant="secondary">
            Contact us
          </Button>
        </div>
        <nav aria-label="Popular pages" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2">
            {navigationLinks
              .filter((link) => link.to !== routes.home)
              .map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-200 transition-colors hover:text-brand-700 hover:ring-brand-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
