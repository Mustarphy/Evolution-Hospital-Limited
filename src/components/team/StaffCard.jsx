import { Link } from 'react-router'
import StaffPhoto from './StaffPhoto'
import { doctorPath, staffGroups } from '../../data/doctors'

export default function StaffCard({ member, headingLevel: Heading = 'h3' }) {
  return (
    <article className="group relative flex h-full flex-col rounded-card bg-white p-2.5 shadow-card ring-1 ring-ink-900/6 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift">
      <StaffPhoto member={member} className="aspect-4/5 rounded-[0.875rem]" />
      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-2 sm:px-3 sm:pt-4 sm:pb-3">
        <p className="text-xs font-semibold tracking-[0.06em] text-ink-500 uppercase sm:tracking-[0.14em]">
          {staffGroups[member.group]}
        </p>
        <Heading className="mt-1.5 font-display text-[1.0625rem] leading-snug font-medium text-ink-900 sm:text-[1.1875rem]">
          <Link
            to={doctorPath(member.slug)}
            className="transition-colors after:absolute after:inset-0 after:rounded-card group-hover:text-brand-800"
          >
            {member.name}
          </Link>
        </Heading>
        {member.position && <p className="mt-1 text-sm font-medium text-brand-700">{member.position}</p>}
        {member.department && <p className="mt-0.5 text-sm text-ink-500">{member.department}</p>}
      </div>
    </article>
  )
}
