import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import CategoryHeader from './CategoryHeader'
import Reveal from '../ui/Reveal'
import { servicePath, servicesInCategory } from '../../data/services'

const diagnosticServices = servicesInCategory('diagnostics')

export default function DiagnosticsPanel({ category, index }) {
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="grid scroll-mt-20 gap-10 rounded-panel bg-sand p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12"
    >
      <div className="lg:col-span-4">
        <CategoryHeader
          index={index}
          id={`${category.id}-title`}
          title="Laboratory & diagnostic services"
          description="Laboratory investigations and ultrasound imaging that help our clinicians reach an accurate diagnosis."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:col-span-8 lg:gap-5">
        {diagnosticServices.map(({ slug, name, summary, icon: Icon, sections }, position) => (
          <Reveal key={slug} delay={position * 90} className="h-full">
            <article
              aria-labelledby={`diagnostics-${slug}`}
              className="group relative flex h-full flex-col rounded-card bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <h3 id={`diagnostics-${slug}`} className="mt-5 font-display text-display-sm font-medium text-ink-900">
                <Link to={servicePath(slug)} className="after:absolute after:inset-0 after:rounded-card">
                  {name}
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-ink-100 pt-5">
                {sections[0].items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-canvas px-3.5 py-1.5 text-sm font-medium text-ink-800 ring-1 ring-ink-900/6"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-700">
                View service
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
