import { ArrowRight, PhoneCall } from 'lucide-react'
import { Link } from 'react-router'
import CategoryHeader from './CategoryHeader'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { servicePath, servicesInCategory } from '../../data/services'
import { hospital, primaryPhone } from '../../data/site'

const emergencyServices = servicesInCategory('emergency').filter((service) => service.urgent)
const supportServices = servicesInCategory('emergency').filter((service) => !service.urgent)

export function EmergencyCallBar() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-white">Call the hospital</p>
        <p className="mt-1 text-sm text-white/60">
          {hospital.phones.slice(1).map((phone, position) => (
            <span key={phone.href}>
              {position > 0 && ' · '}
              <a href={phone.href} className="underline-offset-4 hover:text-white hover:underline">
                {phone.display}
              </a>
            </span>
          ))}
        </p>
      </div>
      <Button href={primaryPhone.href} variant="light" size="lg" icon={PhoneCall}>
        {primaryPhone.display}
      </Button>
    </div>
  )
}

export default function EmergencyPanel({ category, index }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-20">
      <div className="grid gap-5 lg:gap-6">
        <Reveal className="relative overflow-hidden rounded-panel bg-ink-900 p-6 sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-28 size-80 rounded-full bg-alert-600/25 blur-3xl"
          />
          <div className="relative">
            <CategoryHeader
              index={index}
              id={`${category.id}-title`}
              tone="light"
              title="Emergency care, day and night"
              description="When care cannot wait, our emergency team is ready to receive patients at any hour."
              aside={
                <p
                  aria-hidden="true"
                  className="font-display text-[3.5rem] leading-none font-medium tracking-[-0.04em] text-white/90 sm:text-[4.5rem] md:text-[5.5rem]"
                >
                  24<span className="text-alert-500">/</span>7
                </p>
              }
            />

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {emergencyServices.map(({ slug, name, summary, icon: Icon }) => (
                <li
                  key={slug}
                  className="group relative rounded-card bg-white/6 p-5 ring-1 ring-white/10 transition-colors hover:bg-white/10 sm:p-6"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-alert-600 text-white">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold text-white">
                    <Link to={servicePath(slug)} className="after:absolute after:inset-0 after:rounded-card">
                      {name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">{summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                    View service
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/10 pt-8">
              <EmergencyCallBar />
            </div>
          </div>
        </Reveal>

        {supportServices.map(({ slug, name, summary, icon: Icon }) => (
          <Reveal
            key={slug}
            delay={120}
            as="article"
            className="group relative flex flex-col gap-5 rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 transition-shadow duration-500 hover:shadow-lift sm:flex-row sm:items-center sm:gap-7 sm:p-9"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
                Support service
              </p>
              <h3 className="mt-2 font-display text-display-sm font-medium text-ink-900 ">
                <Link to={servicePath(slug)} className="after:absolute after:inset-0 after:rounded-panel">
                  {name}
                </Link>
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-ink-600">{summary}</p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="hidden size-5 shrink-0 text-brand-700 transition-transform group-hover:translate-x-1 sm:block"
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
