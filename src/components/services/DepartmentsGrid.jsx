import { ArrowRight, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router'
import CategoryHeader from './CategoryHeader'
import ServiceCard from './ServiceCard'
import Reveal from '../ui/Reveal'
import { departmentPath, departments } from '../../data/departments'
import { appointmentCta } from '../../data/site'

export function DepartmentCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {departments.map((department, position) => (
        <Reveal
          key={department.slug}
          delay={(position % 3) * 80}
          className={department.featured ? 'sm:col-span-2' : ''}
        >
          <ServiceCard
            {...department}
            id={`department-${department.slug}`}
            to={departmentPath(department.slug)}
          />
        </Reveal>
      ))}

      <Reveal delay={160}>
        <div className="flex h-full flex-col justify-between rounded-card border border-dashed border-brand-300 bg-brand-50/60 p-6 sm:p-7">
          <div>
            <CalendarCheck aria-hidden="true" className="size-6 text-brand-700" strokeWidth={1.75} />
            <p className="mt-5 font-display text-display-sm font-medium text-ink-900">Not sure where to start?</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
              Book a consultation and we will guide you to the right department for your needs.
            </p>
          </div>
          <Link
            to={appointmentCta.to}
            className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-800 hover:text-brand-900"
          >
            {appointmentCta.label}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

export default function DepartmentsGrid({ category, index }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-20">
      <CategoryHeader
        index={index}
        id={`${category.id}-title`}
        title="Specialist departments"
        description="Our medical and surgical services are organised into departments, so you are seen by the team best placed to care for you."
      />
      <div className="mt-10">
        <DepartmentCards />
      </div>
    </section>
  )
}
