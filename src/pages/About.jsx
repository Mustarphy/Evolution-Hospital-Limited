import { Activity, Ambulance, ArrowRight, MapPin, ShieldCheck, Stethoscope } from 'lucide-react'
import { Link } from 'react-router'
import StaffCard from '../components/team/StaffCard'
import Button from '../components/ui/Button'
import CtaBanner from '../components/ui/CtaBanner'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { departments } from '../data/departments'
import { staffMembers } from '../data/doctors'
import { hmoPartners } from '../data/insurance'
import { heroImage } from '../data/media'
import { getService, servicePath } from '../data/services'
import { hospital, routes } from '../data/site'

const leadership = staffMembers.filter((member) => member.group === 'leadership')
const checkups = getService('health-checkups')

const highlights = [
  { value: departments.length, label: 'Specialist departments', to: routes.departments, icon: Stethoscope },
  { value: '24/7', label: 'Emergency service', to: servicePath('emergency-care'), icon: Ambulance },
  { value: checkups.sections[0].items.length, label: 'Routine health check tests', to: servicePath(checkups.slug), icon: Activity },
  { value: hmoPartners.length, label: 'HMO partners, plus NHIA & Ilera Eko', to: routes.hmo, icon: ShieldCheck },
]

export default function About() {
  usePageMeta({
    title: 'About Us',
    description: `${hospital.name} is a hospital in ${hospital.locality} offering specialist care, diagnostics, health screening and a 24-hour emergency service.`,
  })

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={`Specialist care in ${hospital.locality}`}
        description={`${hospital.name} provides specialist medical and surgical care, laboratory diagnostics, health screening and a 24-hour emergency service from our hospital in ${hospital.locality}.`}
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'About Us' }]}
      />

      <section aria-labelledby="about-hospital-title" className="pb-14 sm:pb-24 lg:pb-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <figure className="rounded-4xl bg-white/60 p-2.5 shadow-lift ring-1 ring-white">
              <img
                src={heroImage.src}
                srcSet={heroImage.srcSet}
                sizes="(min-width: 1024px) 600px, 100vw"
                width={heroImage.width}
                height={heroImage.height}
                alt={heroImage.alt}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full rounded-3xl object-cover object-[60%_45%]"
              />
              <figcaption className="flex items-center gap-2 px-3 pt-3 pb-1 text-sm text-ink-600">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand-700" />
                {hospital.fullAddress}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6">
            <h2
              id="about-hospital-title"
              className="font-display text-display-lg font-medium tracking-[-0.02em] "
            >
              Care across specialities, under one roof
            </h2>
            <p className="mt-5 text-lead text-ink-600">
              Patients come to Evolution Hospital for fertility care, maternity and children&rsquo;s health, surgery,
              internal medicine, urology, orthopaedics and ENT. Our laboratory and ultrasound services support diagnosis,
              and our health check-up and screening programmes help detect concerns early.
            </p>
            <p className="mt-4 text-lead text-ink-600">
              Our emergency service is open 24 hours a day, supported by ambulance and medical transportation services,
              and our HMO department helps insured patients access care under their plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={routes.services} icon={ArrowRight}>
                Explore our services
              </Button>
              <Button to={routes.contact} variant="secondary">
                Visit or contact us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="At a glance" className="pb-14 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {highlights.map(({ value, label, to, icon: Icon }, position) => (
              <Reveal as="li" key={label} delay={position * 80}>
                <Link
                  to={to}
                  className="group flex h-full flex-col rounded-card bg-white p-4 shadow-card ring-1 ring-ink-900/6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:rounded-panel sm:p-7"
                >
                  <Icon aria-hidden="true" className="size-5 text-brand-700 sm:size-6" strokeWidth={1.75} />
                  <span className="mt-4 font-display text-[2rem] leading-none font-medium sm:mt-6 sm:text-[2.75rem] tracking-[-0.03em] text-ink-900">
                    {value}
                  </span>
                  <span className="mt-2 text-sm leading-snug text-ink-600 sm:text-[0.9375rem]">{label}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-700">
                    Learn more
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="leadership-title" className="border-t border-ink-900/6 bg-white py-14 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-alert-600" />
              Leadership
            </p>
            <h2
              id="leadership-title"
              className="mt-4 font-display text-display-lg font-medium tracking-[-0.02em] "
            >
              Our leadership
            </h2>
            <p className="mt-4 text-lead text-ink-600">
              Meet the leadership team, doctors and support staff who look after our patients.
            </p>
            <Button to={routes.doctors} icon={ArrowRight} className="mt-8">
              Meet our team
            </Button>
          </Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7 lg:gap-6">
            {leadership.map((member, position) => (
              <Reveal as="li" key={member.slug} delay={position * 100}>
                <StaffCard member={member} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-14 lg:pt-24">
        <CtaBanner />
      </div>
    </>
  )
}
