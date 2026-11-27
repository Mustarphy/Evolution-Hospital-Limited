import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import CategoryHeader from './CategoryHeader'
import Reveal from '../ui/Reveal'
import { getService, servicePath } from '../../data/services'

const checkups = getService('health-checkups')
const cancerScreening = getService('cancer-screening')
const occupational = getService('occupational-medicals')

const cancerSite = (item) => item.replace('Cancer of the ', '')

function PanelTitle({ service, tone = 'brand' }) {
  const Icon = service.icon
  return (
    <div className="flex items-start gap-4">
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl ${
          tone === 'light' ? 'bg-white text-brand-700 shadow-card' : 'bg-brand-50 text-brand-700'
        }`}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="font-display text-display-sm font-medium text-ink-900">
          <Link to={servicePath(service.slug)} className="after:absolute after:inset-0 after:rounded-panel">
            {service.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{service.summary}</p>
      </div>
    </div>
  )
}

function ViewLink({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-semibold text-brand-700 ${className}`}>
      View service
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
    </span>
  )
}

export default function ScreeningPanel({ category, index }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-20">
      <CategoryHeader
        index={index}
        id={`${category.id}-title`}
        title="Health checks & screening"
        description="Routine check-ups and screening tests that help detect health concerns early, before symptoms appear."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
        <Reveal
          as="article"
          className="group relative flex flex-col rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 transition-shadow duration-500 hover:shadow-lift sm:p-9 lg:col-span-7"
        >
          <PanelTitle service={checkups} />
          <ol className="mt-7 grid gap-x-8 sm:grid-cols-2">
            {checkups.sections[0].items.map((test, position) => (
              <li
                key={test}
                className="flex items-baseline gap-3.5 border-b border-ink-100 py-3 text-[0.9375rem] font-medium text-ink-800"
              >
                <span aria-hidden="true" className="w-5 shrink-0 text-xs font-semibold text-brand-600 tabular-nums">
                  {String(position + 1).padStart(2, '0')}
                </span>
                {test}
              </li>
            ))}
          </ol>
          <ViewLink className="mt-auto pt-8" />
        </Reveal>

        <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
          <Reveal
            as="article"
            delay={100}
            className="group relative rounded-panel bg-brand-50 p-6 ring-1 ring-brand-100 transition-shadow duration-500 hover:shadow-lift sm:p-9"
          >
            <PanelTitle service={cancerScreening} tone="light" />
            <div className="mt-7 grid grid-cols-2 gap-5">
              {cancerScreening.sections.map((group) => (
                <div key={group.title}>
                  <h4 className="text-xs font-semibold tracking-[0.14em] text-brand-800 uppercase">{group.title}</h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-[0.9375rem] text-ink-800">
                        <span className="sr-only">Cancer of the </span>
                        <span className="font-medium">{cancerSite(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ViewLink className="mt-7" />
          </Reveal>

          <Reveal
            as="article"
            delay={180}
            className="group relative rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 transition-shadow duration-500 hover:shadow-lift sm:p-9"
          >
            <PanelTitle service={occupational} />
            <ul className="mt-6 flex flex-wrap gap-2">
              {occupational.sections[0].items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-canvas px-3.5 py-1.5 text-sm font-medium text-ink-800 ring-1 ring-ink-900/6"
                >
                  {item}
                </li>
              ))}
            </ul>
            <ViewLink className="mt-6" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
