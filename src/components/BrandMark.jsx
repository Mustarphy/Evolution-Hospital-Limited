import { brandMark } from '../data/media'
import { hospital } from '../data/site'

export default function BrandMark({ tone = 'dark' }) {
  const isLight = tone === 'light'

  return (
    <span className="flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white shadow-card ring-1 ring-ink-900/8">
        <img src={brandMark.src} width={brandMark.width} height={brandMark.height} alt="" className="h-auto w-8" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.3125rem] font-semibold tracking-[-0.01em] transition-colors duration-500 ${
            isLight ? 'text-white' : 'text-ink-900'
          }`}
        >
          {hospital.shortName}
        </span>
        <span
          className={`mt-1 text-xs font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-500 sm:tracking-[0.2em] ${
            isLight ? 'text-brand-200' : 'text-brand-700'
          }`}
        >
          {hospital.descriptor}
        </span>
      </span>
    </span>
  )
}
