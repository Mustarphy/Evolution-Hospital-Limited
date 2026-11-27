import { ArrowLeft, ArrowRight, Building2, Mail, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router'
import NotFound from './NotFound'
import StaffCard from '../components/team/StaffCard'
import StaffPhoto from '../components/team/StaffPhoto'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { getStaffMember, isClinician, staffGroups, staffMembers } from '../data/doctors'
import { appointmentLink, hospital, primaryPhone, routes } from '../data/site'

export default function DoctorProfile() {
  const { doctorSlug } = useParams()
  const member = getStaffMember(doctorSlug)

  usePageMeta({
    title: member?.name ?? 'Team member not found',
    description: member ? `${member.name}${member.position ? `, ${member.position}` : ''} at ${hospital.name}.` : undefined,
  })

  if (!member) return <NotFound />

  const colleagues = staffMembers.filter((item) => item.slug !== member.slug).slice(0, 4)

  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 md:pt-44 lg:pt-48 lg:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-b from-brand-50 via-mist to-canvas" />
          <div className="absolute -top-40 -right-40 size-120 rounded-full bg-brand-100/70 blur-3xl" />
        </div>

        <div className="container-page">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
              <li>
                <Link to={routes.home} className="-my-2.5 inline-block py-2.5 hover:text-brand-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={routes.doctors} className="-my-2.5 inline-block py-2.5 hover:text-brand-700">
                  Our Doctors
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-ink-800">
                {member.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="mx-auto w-full max-w-80 animate-rise sm:max-w-sm lg:col-span-5 lg:max-w-none">
              <div className="rounded-4xl bg-white/60 p-2.5 shadow-lift ring-1 ring-white">
                <StaffPhoto member={member} eager className="aspect-4/5 rounded-3xl" />
              </div>
            </div>

            <div className="animate-rise [animation-delay:120ms] lg:col-span-7">
              <p className="eyebrow">
                <span aria-hidden="true" className="h-px w-6 bg-alert-600" />
                {staffGroups[member.group]}
              </p>
              <h1 className="mt-4 font-display text-display-xl font-medium tracking-[-0.03em] ">
                {member.name}
              </h1>
              {member.position && <p className="mt-3 text-lead font-medium text-brand-700 sm:text-xl">{member.position}</p>}

              <dl className="mt-8 grid gap-4 border-y border-ink-200/70 py-6 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Building2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700" strokeWidth={1.75} />
                  <div>
                    <dt className="text-sm text-ink-500">{member.department ? 'Department' : 'Hospital'}</dt>
                    <dd className="mt-0.5 font-semibold text-ink-900">{member.department ?? hospital.name}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700" strokeWidth={1.75} />
                  <div>
                    <dt className="text-sm text-ink-500">Hospital line</dt>
                    <dd className="mt-0.5 font-semibold text-ink-900">
                      <a href={primaryPhone.href} className="hover:text-brand-700">
                        {primaryPhone.display}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {isClinician(member) ? (
                  <Button to={appointmentLink({ doctor: member.slug })} size="lg" icon={ArrowRight}>
                    Book with {member.name}
                  </Button>
                ) : (
                  <Button href={`mailto:${hospital.email}`} size="lg" icon={Mail}>
                    Email the hospital
                  </Button>
                )}
                <Button to={routes.doctors} size="lg" variant="secondary">
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  All team members
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="colleagues-title" className="border-t border-ink-900/6 bg-white py-14 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="colleagues-title" className="font-display text-display-lg font-medium tracking-[-0.02em]">
              More from our team
            </h2>
            <Link
              to={routes.doctors}
              className="group inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
            >
              View everyone
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {colleagues.map((colleague, position) => (
              <Reveal as="li" key={colleague.slug} delay={position * 80}>
                <StaffCard member={colleague} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
