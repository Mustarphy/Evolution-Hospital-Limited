import { ArrowRight, Quote } from 'lucide-react'
import StaffCard from './StaffCard'
import StaffPhoto from './StaffPhoto'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { doctorPath, staffMembers } from '../../data/doctors'
import { appointmentCta, primaryPhone } from '../../data/site'

const featuredMember = staffMembers.find((member) => member.featured)
const teamMembers = staffMembers.filter((member) => member !== featuredMember)

function FeaturedLeader({ member }) {
  return (
    <article className="group relative grid overflow-hidden rounded-panel bg-ink-900 md:grid-cols-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-brand-600/30 blur-3xl"
      />
      <StaffPhoto
        member={member}
        eager
        className="aspect-square w-full md:col-span-5 md:aspect-auto md:h-full md:max-h-none md:min-h-112"
      />
      <div className="relative flex flex-col justify-center p-6 sm:p-10 md:col-span-7 lg:p-14">
        <Quote aria-hidden="true" className="size-9 text-brand-400" strokeWidth={1.5} />
        <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-brand-200 uppercase">Leadership</p>
        <h2 className="mt-3 font-display text-display-md font-medium tracking-[-0.02em] text-white ">
          {member.name}
        </h2>
        <p className="mt-3 text-lead font-medium text-brand-200">{member.position}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button to={doctorPath(member.slug)} variant="light" icon={ArrowRight}>
            View profile
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function TeamDirectory() {
  return (
    <div>
      {featuredMember && (
        <Reveal>
          <FeaturedLeader member={featuredMember} />
        </Reveal>
      )}

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-5 lg:mt-8 lg:grid-cols-4 lg:gap-6">
        {teamMembers.map((member, position) => (
          <Reveal as="li" key={member.slug} delay={(position % 4) * 80}>
            <StaffCard member={member} />
          </Reveal>
        ))}
        <Reveal as="li" delay={240} className="col-span-2 sm:col-span-1">
          <div className="flex h-full flex-col justify-between rounded-card bg-brand-800 p-6 text-white sm:p-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-brand-200 uppercase">See a doctor</p>
              <p className="mt-3 font-display text-display-sm font-medium">
                Book a consultation with our team
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button to={appointmentCta.to} variant="light" icon={ArrowRight} className="w-full">
                {appointmentCta.label}
              </Button>
              <a
                href={primaryPhone.href}
                className="text-center text-sm font-semibold text-brand-100 underline-offset-4 hover:text-white hover:underline"
              >
                or call {primaryPhone.display}
              </a>
            </div>
          </div>
        </Reveal>
      </ul>
    </div>
  )
}
