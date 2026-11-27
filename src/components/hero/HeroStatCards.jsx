import { departments } from '../../data/departments'

const featuredDepartments = departments.slice(0, 4)

export function EmergencyCard({ className = '' }) {
  return (
    <div className={`rounded-card bg-white/85 p-4 shadow-float sm:p-5 ring-1 ring-white backdrop-blur-xl ${className}`}>
      <div className="flex items-center gap-3">
        <span className="relative grid size-10 place-items-center rounded-xl bg-alert-50">
          <span aria-hidden="true" className="absolute size-2.5 animate-pulse-ring rounded-full bg-alert-500" />
          <span aria-hidden="true" className="relative size-2.5 rounded-full bg-alert-600" />
        </span>
        <p className="text-sm font-semibold text-ink-900">Emergency care</p>
      </div>
      <p className="mt-4 font-display text-display-lg font-medium tracking-[-0.03em] text-ink-900">
        24<span className="text-alert-600">/</span>7
      </p>
      <p className="mt-1.5 text-[0.8125rem] text-ink-500">Open every day of the year</p>
      <svg aria-hidden="true" viewBox="0 0 200 40" className="mt-3 h-9 w-full" fill="none">
        <path
          d="M0 22h48l8-12 10 26 10-30 9 22 7-6h108"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-alert-100"
        />
        <path
          d="M0 22h48l8-12 10 26 10-30 9 22 7-6h108"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="260"
          className="animate-trace text-alert-500"
        />
      </svg>
    </div>
  )
}

export function DepartmentsCard({ className = '' }) {
  return (
    <div className={`rounded-card bg-white/85 p-4 shadow-float sm:p-5 ring-1 ring-white backdrop-blur-xl ${className}`}>
      <p className="text-sm font-semibold text-ink-900">Specialist departments</p>
      <p className="mt-4 font-display text-display-lg font-medium tracking-[-0.03em] text-ink-900">
        {departments.length}
      </p>
      <p className="mt-1.5 text-[0.8125rem] text-ink-500">From fertility care to ENT</p>
      <ul className="mt-4 flex -space-x-2">
        {featuredDepartments.map(({ slug, name, icon: Icon }) => (
          <li
            key={slug}
            title={name}
            className="grid size-8 place-items-center rounded-full bg-brand-50 sm:size-10 text-brand-700 ring-[3px] ring-white"
          >
            <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.75} />
            <span className="sr-only">{name}</span>
          </li>
        ))}
        <li className="grid size-8 place-items-center rounded-full bg-brand-700 sm:size-10 text-xs font-semibold text-white ring-[3px] ring-white">
          +{departments.length - featuredDepartments.length}
          <span className="sr-only"> more departments</span>
        </li>
      </ul>
    </div>
  )
}
