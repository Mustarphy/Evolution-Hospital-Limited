import { ArrowRight, Check, Clock, MapPin, PhoneCall } from 'lucide-react'
import { useParams } from 'react-router'
import NotFound from './NotFound'
import Button from '../components/ui/Button'
import { BookingCard, InsuranceNote, RelatedLinks } from '../components/ui/DetailAside'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { getService, serviceCategories, servicePath, servicesInCategory } from '../data/services'
import { appointmentLink, hospital, primaryPhone, routes } from '../data/site'

function ServiceSection({ section }) {
  const ListTag = section.numbered ? 'ol' : 'ul'

  return (
    <Reveal className="rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 sm:p-9">
      <h2 className="font-display text-display-sm font-medium text-ink-900">{section.title}</h2>
      <ListTag className="mt-6 grid gap-x-8 sm:grid-cols-2">
        {section.items.map((item, position) => (
          <li
            key={item}
            className="flex items-baseline gap-3.5 border-b border-ink-100 py-3.5 text-[0.9375rem] font-medium text-ink-800"
          >
            {section.numbered ? (
              <span aria-hidden="true" className="w-5 shrink-0 text-xs font-semibold text-brand-600 tabular-nums">
                {String(position + 1).padStart(2, '0')}
              </span>
            ) : (
              <Check aria-hidden="true" strokeWidth={2.5} className="size-4 shrink-0 translate-y-0.5 text-brand-600" />
            )}
            {item}
          </li>
        ))}
      </ListTag>
    </Reveal>
  )
}

function UrgentCareDetails() {
  return (
    <Reveal className="relative overflow-hidden rounded-panel bg-ink-900 p-6 text-white sm:p-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-28 size-80 rounded-full bg-alert-600/25 blur-3xl"
      />
      <div className="relative">
        <h2 className="font-display text-display-md font-medium text-white">In an emergency</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-white/70">
          Call the hospital or come straight to our emergency service. It is open 24 hours a day, every day.
        </p>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="flex gap-3">
            <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-alert-500" />
            <div>
              <dt className="text-sm font-semibold text-white">Opening hours</dt>
              <dd className="mt-1 text-sm text-white/65">24 hours, every day of the year</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-alert-500" />
            <div>
              <dt className="text-sm font-semibold text-white">Address</dt>
              <dd className="mt-1 text-sm text-white/65">
                <a href={hospital.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  {hospital.fullAddress}
                </a>
              </dd>
            </div>
          </div>
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={primaryPhone.href} variant="light" size="lg" icon={PhoneCall}>
            Call {primaryPhone.display}
          </Button>
          <Button href={hospital.mapsUrl} target="_blank" rel="noreferrer" variant="ghostLight" size="lg" icon={ArrowRight}>
            Get directions
          </Button>
        </div>
      </div>
    </Reveal>
  )
}

export default function ServiceDetails() {
  const { serviceSlug } = useParams()
  const service = getService(serviceSlug)

  usePageMeta({
    title: service?.name ?? 'Service not found',
    description: service?.summary,
  })

  if (!service) return <NotFound />

  const category = serviceCategories.find((item) => item.id === service.category)
  const relatedServices = servicesInCategory(service.category).filter((item) => item.slug !== service.slug)
  const appointmentTo = appointmentLink({ service: service.slug })

  return (
    <>
      <PageHeader
        eyebrow={category?.label}
        title={service.name}
        description={service.summary}
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Services', to: routes.services },
          { label: service.shortName ?? service.name },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {service.urgent ? (
            <Button href={primaryPhone.href} size="lg" icon={PhoneCall}>
              Call {primaryPhone.display}
            </Button>
          ) : (
            <Button to={appointmentTo} size="lg" icon={ArrowRight}>
              Book this service
            </Button>
          )}
          <Button to={routes.services} size="lg" variant="secondary">
            All services
          </Button>
        </div>
      </PageHeader>

      <section className="pb-14 sm:pb-24 lg:pb-32">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-8">
            {service.urgent && <UrgentCareDetails />}
            {service.sections?.map((section) => (
              <ServiceSection key={section.title} section={section} />
            ))}
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-4 lg:self-start lg:sticky lg:top-28">
            <BookingCard
              title={service.urgent ? 'Need non-urgent care?' : 'Book this service'}
              description={
                service.urgent
                  ? 'For routine, non-urgent care, send the hospital an appointment request.'
                  : `Request an appointment for ${service.shortName ?? service.name.toLowerCase()} at Evolution Hospital.`
              }
              appointmentTo={appointmentTo}
            />
            <RelatedLinks
              title={`More in ${category?.label ?? 'this category'}`}
              links={relatedServices.map((item) => ({ to: servicePath(item.slug), label: item.name, icon: item.icon }))}
            />
            <InsuranceNote />
          </aside>
        </div>
      </section>
    </>
  )
}
