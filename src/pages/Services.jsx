import { ArrowRight, ShieldCheck } from 'lucide-react'
import DepartmentsGrid from '../components/services/DepartmentsGrid'
import DiagnosticsPanel from '../components/services/DiagnosticsPanel'
import EmergencyPanel from '../components/services/EmergencyPanel'
import ScreeningPanel from '../components/services/ScreeningPanel'
import ServiceCategoryNav from '../components/services/ServiceCategoryNav'
import Button from '../components/ui/Button'
import CtaBanner from '../components/ui/CtaBanner'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { hmoPartners, publicHealthSchemes } from '../data/insurance'
import { serviceCategories } from '../data/services'
import { routes } from '../data/site'

const categoryPanels = {
  departments: DepartmentsGrid,
  diagnostics: DiagnosticsPanel,
  screening: ScreeningPanel,
  emergency: EmergencyPanel,
}

export default function Services() {
  usePageMeta({
    title: 'Our Services',
    description:
      'Explore specialist departments, laboratory and ultrasound services, health check-ups, cancer screening, 24/7 emergency care and ambulance services at Evolution Hospital.',
  })

  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Comprehensive care, organised around your needs"
        description="Explore our specialist departments, laboratory and diagnostic services, health checks and screening, and emergency care."
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'Services' }]}
      />

      <section aria-label="Service catalogue" className="pb-14 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <ServiceCategoryNav />
          <div className="mt-8 flex flex-col gap-20 lg:mt-12 lg:gap-28">
            {serviceCategories.map((category, position) => {
              const Panel = categoryPanels[category.id]
              return <Panel key={category.id} category={category} index={position + 1} />
            })}

            <Reveal className="flex flex-col gap-6 rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 sm:p-10 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <ShieldCheck aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-display-sm font-medium text-ink-900">
                    Paying with health insurance?
                  </h2>
                  <p className="mt-2 max-w-xl leading-relaxed text-ink-600">
                    We work with {publicHealthSchemes.map((scheme) => scheme.shortName).join(', ')} and{' '}
                    {hmoPartners.length} private HMOs. Check whether your provider is listed.
                  </p>
                </div>
              </div>
              <Button to={routes.hmo} icon={ArrowRight} className="shrink-0">
                View HMO partners
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
