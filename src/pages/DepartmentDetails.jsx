import { ArrowRight, Check } from 'lucide-react'
import { useParams } from 'react-router'
import NotFound from './NotFound'
import Button from '../components/ui/Button'
import { BookingCard, InsuranceNote, RelatedLinks } from '../components/ui/DetailAside'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { departmentPath, departments, getDepartment } from '../data/departments'
import { servicePath, servicesInCategory } from '../data/services'
import { appointmentLink, routes } from '../data/site'

const supportingServices = servicesInCategory('diagnostics')

export default function DepartmentDetails() {
  const { departmentSlug } = useParams()
  const department = getDepartment(departmentSlug)

  usePageMeta({
    title: department?.name ?? 'Department not found',
    description: department?.description,
  })

  if (!department) return <NotFound />

  const Icon = department.icon
  const appointmentTo = appointmentLink({ department: department.slug })
  const otherDepartments = departments.filter((item) => item.slug !== department.slug)

  return (
    <>
      <PageHeader
        eyebrow="Department"
        title={department.name}
        description={department.description}
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Departments', to: routes.departments },
          { label: department.name },
        ]}
        aside={
          <div className="hidden justify-end lg:flex">
            <span className="grid size-40 place-items-center rounded-[2.5rem] bg-white text-brand-700 shadow-lift ring-1 ring-white">
              <Icon aria-hidden="true" className="size-16" strokeWidth={1.25} />
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to={appointmentTo} size="lg" icon={ArrowRight}>
            Book an appointment
          </Button>
          <Button to={routes.departments} size="lg" variant="secondary">
            All departments
          </Button>
        </div>
      </PageHeader>

      <section className="pb-14 sm:pb-24 lg:pb-32">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <Reveal className="rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 sm:p-9">
              <h2 className="font-display text-display-sm font-medium text-ink-900">
                Services in this department
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {department.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 rounded-2xl bg-canvas p-4 text-[0.9375rem] font-semibold text-ink-900 ring-1 ring-ink-900/5"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-700 text-white">
                      <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="pt-0.5">{service}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rounded-panel bg-sand p-6 sm:p-9">
              <h2 className="font-display text-display-sm font-medium text-ink-900">
                Supporting services at the hospital
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-ink-600">
                Laboratory tests and ultrasound scans are also available at Evolution Hospital.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {supportingServices.map((service) => {
                  const ServiceIcon = service.icon
                  return (
                    <li key={service.slug}>
                      <Button
                        to={servicePath(service.slug)}
                        variant="secondary"
                        icon={ArrowRight}
                        className="w-full justify-between! px-5"
                      >
                        <span className="flex items-center gap-2.5">
                          <ServiceIcon aria-hidden="true" className="size-4.5 text-brand-700" strokeWidth={1.75} />
                          {service.name}
                        </span>
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-4 lg:self-start lg:sticky lg:top-28">
            <BookingCard
              title={`Book with ${department.name}`}
              description="Send an appointment request to the hospital, or call to speak with our team."
              appointmentTo={appointmentTo}
            />
            <RelatedLinks
              title="Other departments"
              links={otherDepartments.map((item) => ({
                to: departmentPath(item.slug),
                label: item.name,
                icon: item.icon,
              }))}
            />
            <InsuranceNote />
          </aside>
        </div>
      </section>
    </>
  )
}
