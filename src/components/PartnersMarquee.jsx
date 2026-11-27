import { ShieldCheck } from 'lucide-react'
import { hmoPartners, publicHealthSchemes } from '../data/insurance'

const allPartners = [...publicHealthSchemes.map((scheme) => scheme.shortName), ...hmoPartners]
const midpoint = Math.ceil(allPartners.length / 2)
const rows = [
  { id: 'first', names: allPartners.slice(0, midpoint), animation: 'animate-marquee' },
  { id: 'second', names: allPartners.slice(midpoint), animation: 'animate-marquee-reverse' },
]

function PartnerChip({ name, isDuplicate }) {
  return (
    <li
      className={`${isDuplicate ? 'motion-reduce:hidden ' : ''}flex h-12 shrink-0 items-center gap-2.5 rounded-2xl bg-white px-5 text-[0.9375rem] sm:h-14 sm:px-6 sm:text-base font-semibold tracking-[-0.01em] whitespace-nowrap text-ink-700 shadow-card ring-1 ring-ink-900/5 transition-colors hover:text-brand-800`}
    >
      <ShieldCheck aria-hidden="true" className="size-4 text-brand-500" strokeWidth={2} />
      {name}
    </li>
  )
}

export default function PartnersMarquee() {
  return (
    <div className="relative">
      <p className="text-center text-sm font-medium text-ink-500">
        Accepted at Evolution Hospital &mdash;{' '}
        <span className="font-semibold text-ink-800">
          {publicHealthSchemes.map((scheme) => scheme.shortName).join(', ')} and {hmoPartners.length} HMO partners
        </span>
      </p>

      <ul className="sr-only">
        {allPartners.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="group mt-7 flex flex-col gap-3 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        {rows.map((row) => (
          <div key={row.id} className="flex overflow-hidden py-1.5">
            <ul
              className={`flex w-max shrink-0 gap-3 pr-3 ${row.animation} group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center`}
            >
              {[...row.names, ...row.names].map((name, position) => (
                <PartnerChip key={`${name}-${position}`} name={name} isDuplicate={position >= row.names.length} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
