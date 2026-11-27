import { ArrowRight, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router'
import StaffPhoto from '../components/team/StaffPhoto'
import InsurancePanel from '../components/services/InsurancePanel'
import CtaBanner from '../components/ui/CtaBanner'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { doctorPath, staffMembers } from '../data/doctors'
import { hmoPartners, publicHealthSchemes } from '../data/insurance'
import { hospital, primaryPhone, routes } from '../data/site'

const hmoCoordinator = staffMembers.find((member) => member.position === 'HMO Coordinator')

export default function HMO() {
  const schemeNames = publicHealthSchemes.map((scheme) => scheme.shortName).join(' and ')

  usePageMeta({
    title: 'HMO & Insurance Partners',
    description: `Evolution Hospital works with ${schemeNames} and ${hmoPartners.length} private HMOs. Find your health insurance provider.`,
  })

  return (
    <>
      <PageHeader
        eyebrow="HMO & Insurance"
        title="Use your health insurance at Evolution Hospital"
        description={`Our HMO department works with ${schemeNames}, and with ${hmoPartners.length} private HMOs, helping enrolees access care under their plan.`}
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'HMO' }]}
      />

      <section aria-label="Insurance partners" className="pb-14 sm:pb-24 lg:pb-28">
        <div className="container-page flex flex-col gap-6 lg:gap-8">
          <div>
            <InsurancePanel
              id="partners"
              title="Find your insurance provider"
              description="Search the public schemes and private HMOs we work with."
            />
          </div>

          <aside aria-label="HMO support" className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {hmoCoordinator && (
              <Reveal className="group relative grid overflow-hidden rounded-panel bg-white p-2.5 shadow-card ring-1 ring-ink-900/6 sm:grid-cols-5 sm:items-center">
                <StaffPhoto member={hmoCoordinator} className="aspect-4/3 rounded-[1.25rem] sm:col-span-2 sm:aspect-square" />
                <div className="p-4 sm:col-span-3 sm:p-6">
                  <p className="text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">
                    Your HMO contact
                  </p>
                  <h2 className="mt-2 font-display text-display-sm font-medium text-ink-900">
                    <Link to={doctorPath(hmoCoordinator.slug)} className="after:absolute after:inset-0">
                      {hmoCoordinator.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm font-medium text-ink-600">{hmoCoordinator.position}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    View profile
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Reveal>
            )}

            <Reveal delay={100} className="flex flex-col justify-center rounded-panel bg-brand-800 p-6 text-white sm:p-9">
              <h2 className="font-display text-display-sm font-medium text-white">Questions about your cover?</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">
                Contact the hospital with your HMO details before your visit.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={primaryPhone.href}
                  className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-brand-100"
                >
                  <Phone aria-hidden="true" className="size-4 text-brand-200" />
                  {primaryPhone.display}
                </a>
                <a
                  href={`mailto:${hospital.email}?subject=${encodeURIComponent('HMO enquiry')}`}
                  className="inline-flex items-center gap-2.5 font-semibold break-all text-white hover:text-brand-100"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-brand-200" />
                  {hospital.email}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
