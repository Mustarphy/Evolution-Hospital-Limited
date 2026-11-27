import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { departmentPath, getDepartment } from '../../data/departments'
import { getService, servicePath } from '../../data/services'
import { routes } from '../../data/site'

const fertility = getDepartment('fertility')
const womenAndChildren = getDepartment('women-and-child-health')
const laboratory = getService('laboratory')
const checkups = getService('health-checkups')
const emergency = getService('emergency-care')

const previewItems = [
  {
    key: 'fertility',
    to: departmentPath(fertility.slug),
    label: 'Department',
    title: fertility.name,
    summary: fertility.description,
    details: fertility.services,
    icon: fertility.icon,
    variant: 'featured',
    className: 'lg:col-span-2',
  },
  {
    key: 'women-and-children',
    to: departmentPath(womenAndChildren.slug),
    label: 'Department',
    title: womenAndChildren.name,
    summary: womenAndChildren.description,
    icon: womenAndChildren.icon,
  },
  {
    key: 'laboratory',
    to: servicePath(laboratory.slug),
    label: 'Diagnostics',
    title: laboratory.name,
    summary: laboratory.summary,
    icon: laboratory.icon,
  },
  {
    key: 'checkups',
    to: servicePath(checkups.slug),
    label: 'Health checks',
    title: checkups.name,
    summary: `${checkups.sections[0].items.length} tests, from kidney and liver function to blood sugar and ECG.`,
    icon: checkups.icon,
  },
  {
    key: 'emergency',
    to: servicePath(emergency.slug),
    label: 'Emergency',
    title: emergency.name,
    summary: emergency.summary,
    icon: emergency.icon,
    variant: 'urgent',
  },
]

const variantStyles = {
  default: {
    card: 'bg-white shadow-card ring-1 ring-ink-900/6 hover:shadow-lift hover:ring-brand-200',
    icon: 'bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white',
    label: 'text-ink-500',
    title: 'text-ink-900',
    summary: 'text-ink-600',
    arrow: 'text-ink-300 group-hover:text-brand-700',
  },
  featured: {
    card: 'bg-brand-800 text-white shadow-lift',
    icon: 'bg-white/10 text-brand-200',
    label: 'text-brand-200',
    title: 'text-white',
    summary: 'text-white/75',
    arrow: 'text-white/60 group-hover:text-white',
  },
  urgent: {
    card: 'bg-ink-900 text-white shadow-lift',
    icon: 'bg-alert-600 text-white',
    label: 'text-alert-500',
    title: 'text-white',
    summary: 'text-white/70',
    arrow: 'text-white/60 group-hover:text-white',
  },
}

function PreviewCard({ item }) {
  const styles = variantStyles[item.variant ?? 'default']
  const Icon = item.icon

  return (
    <article
      className={`group relative flex h-full flex-col rounded-card p-6 transition-all duration-500 ease-out-soft hover:-translate-y-1 sm:p-7 ${styles.card}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-12 place-items-center rounded-2xl transition-colors duration-500 ${styles.icon}`}>
          <Icon aria-hidden="true" className="size-5.5" strokeWidth={1.75} />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className={`size-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${styles.arrow}`}
        />
      </div>
      <p className={`mt-6 text-xs font-semibold tracking-[0.16em] uppercase ${styles.label}`}>{item.label}</p>
      <h3 className={`mt-2 font-display text-display-sm font-medium tracking-[-0.015em] ${styles.title}`}>
        <Link to={item.to} className="after:absolute after:inset-0 after:rounded-card">
          {item.title}
        </Link>
      </h3>
      <p className={`mt-3 text-[0.9375rem] leading-relaxed ${styles.summary}`}>{item.summary}</p>
      {item.details && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.details.map((detail) => (
            <li key={detail} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/10">
              {detail}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function ServicesPreview() {
  return (
    <section aria-labelledby="services-preview-title" className="border-t border-ink-900/6 bg-canvas py-14 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="services-preview-title"
              eyebrow="Our Services"
              title="Comprehensive care, organised around your needs"
            />
          </div>
          <p className="text-lead text-ink-600 lg:col-span-5 lg:pb-2">
            A selection of the care available at Evolution Hospital, from specialist departments to diagnostics, health
            checks and round-the-clock emergency services.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {previewItems.map((item, position) => (
            <Reveal as="li" key={item.key} delay={(position % 3) * 80} className={item.className ?? ''}>
              <PreviewCard item={item} />
            </Reveal>
          ))}
          <Reveal as="li" delay={160}>
            <div className="flex h-full flex-col justify-between rounded-card border border-dashed border-brand-300 bg-brand-50/60 p-6 sm:p-7">
              <div>
                <p className="font-display text-display-sm font-medium text-ink-900">
                  And much more across our hospital
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  Surgery, urology, orthopaedics, ENT, ultrasound scans, cancer screening, ambulance services and more.
                </p>
              </div>
              <Link
                to={routes.departments}
                className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-800 hover:text-brand-900"
              >
                Browse all departments
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </ul>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to={routes.services} size="lg" icon={ArrowRight}>
            Explore All Services
          </Button>
          <Button to={routes.hmo} size="lg" variant="secondary">
            HMO &amp; Insurance Partners
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
