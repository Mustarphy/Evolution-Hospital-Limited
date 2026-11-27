import { DepartmentCards } from '../components/services/DepartmentsGrid'
import CtaBanner from '../components/ui/CtaBanner'
import PageHeader from '../components/ui/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import { departments } from '../data/departments'
import { routes } from '../data/site'

export default function Departments() {
  usePageMeta({
    title: 'Medical Departments',
    description:
      'Fertility care, women and child health, surgery, internal medicine, urology, orthopaedics and ENT at Evolution Hospital, Ikorodu.',
  })

  return (
    <>
      <PageHeader
        eyebrow="Departments"
        title="Specialist departments"
        description={`Our medical and surgical services are organised into ${departments.length} departments, so you are seen by the team best placed to care for you.`}
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'Departments' }]}
      />
      <section aria-label="All departments" className="pb-14 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <DepartmentCards />
        </div>
      </section>
      <CtaBanner
        title="Not sure which department you need?"
        description="Book a consultation and we will guide you to the right specialist, or call the hospital to speak with our team."
      />
    </>
  )
}
