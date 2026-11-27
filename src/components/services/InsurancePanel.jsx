import { useId, useMemo, useState } from 'react'
import { Landmark, Search, ShieldCheck, X } from 'lucide-react'
import CategoryHeader from './CategoryHeader'
import Reveal from '../ui/Reveal'
import { hmoPartners, publicHealthSchemes } from '../../data/insurance'

const normalise = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

export default function InsurancePanel({
  id = 'insurance',
  title = 'Health insurance & HMO',
  description = 'Our HMO department works with public health insurance schemes and private HMOs, helping enrolees access care under their plan.',
}) {
  const [query, setQuery] = useState('')
  const searchId = useId()

  const matchingPartners = useMemo(() => {
    const term = normalise(query)
    if (!term) return hmoPartners
    return hmoPartners.filter((partner) => normalise(partner).includes(term))
  }, [query])

  const schemeMatches = publicHealthSchemes.filter(
    (scheme) => query && normalise(`${scheme.shortName}${scheme.name}`).includes(normalise(query)),
  )

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 sm:p-10 lg:p-12"
    >
      <CategoryHeader
        id={`${id}-title`}
        title={title}
        description={description}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h3 className="text-sm font-semibold tracking-[0.12em] text-ink-500 uppercase">Public health insurance</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {publicHealthSchemes.map((scheme, position) => (
              <Reveal as="li" key={scheme.id} delay={position * 80}>
                <div className="flex items-center gap-4 rounded-card bg-brand-50 p-5 ring-1 ring-brand-100">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand-700 shadow-card">
                    <Landmark aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-medium text-ink-900">{scheme.shortName}</span>
                    <span className="block text-sm text-ink-600">{scheme.name}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-ink-500 uppercase">
              HMO partners <span className="text-ink-300">({hmoPartners.length})</span>
            </h3>
            <div className="relative sm:w-72">
              <label htmlFor={searchId} className="sr-only">
                Search for your HMO
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-500"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for your HMO"
                autoComplete="off"
                className="h-12 w-full rounded-full bg-canvas pr-12 pl-10 text-base text-ink-900 ring-1 ring-ink-200 transition-shadow outline-none placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-600 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {query ? `${matchingPartners.length + schemeMatches.length} matching results` : ''}
          </p>

          {matchingPartners.length > 0 ? (
            <ul className="mt-5 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 md:grid-cols-3">
              {matchingPartners.map((partner) => (
                <li
                  key={partner}
                  className="flex min-h-12 items-center gap-2.5 rounded-xl bg-canvas px-4 py-3 text-[0.9375rem] font-medium text-ink-800 ring-1 ring-ink-900/5 transition-colors hover:bg-brand-50 hover:ring-brand-100"
                >
                  <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-brand-600" strokeWidth={2} />
                  {partner}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 rounded-card border border-dashed border-ink-200 px-6 py-10 text-center">
              <p className="font-semibold text-ink-900">
                {schemeMatches.length > 0
                  ? `${schemeMatches.map((scheme) => scheme.shortName).join(', ')} is listed under public health insurance.`
                  : `No HMO partner matches “${query}”.`}
              </p>
              {schemeMatches.length === 0 && (
                <p className="mt-2 text-sm text-ink-600">
                  Our HMO department can confirm whether your plan is accepted before your visit.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
