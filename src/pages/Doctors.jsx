import TeamDirectory from '../components/team/TeamDirectory'
import PageHeader from '../components/ui/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import { routes } from '../data/site'

export default function Doctors() {
  usePageMeta({
    title: 'Our Doctors & Team',
    description: 'Meet the doctors, managers and support staff of Evolution Hospital Limited in Ikorodu, Lagos.',
  })

  return (
    <>
      <PageHeader
        eyebrow="Our Doctors & Team"
        title="The people behind your care"
        description="Meet the doctors, managers and support staff who look after our patients and keep the hospital running every day."
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'Our Doctors' }]}
      />
      <section aria-label="Our team" className="pb-14 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <TeamDirectory />
        </div>
      </section>
    </>
  )
}
