import { ArrowDown, Clock, Expand, MapPin } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { anniversaryEvents, getGalleryItem } from '../../data/gallery'

const eventPosters = anniversaryEvents.map((event) => getGalleryItem(event.poster))

function EventCard({ event, position, onOpenPoster, onShowPhotos }) {
  const Icon = event.icon
  const poster = getGalleryItem(event.poster)

  return (
    <Reveal
      as="li"
      delay={position * 110}
      className="group flex flex-col overflow-hidden rounded-panel sm:flex-row lg:flex-col bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={() => onOpenPoster(position)}
        aria-label={`View poster: ${event.title}`}
        className="relative block shrink-0 overflow-hidden sm:w-2/5 lg:w-full"
      >
        <img
          src={poster.thumb}
          width={poster.width}
          height={poster.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-5/4 w-full object-cover object-top sm:aspect-auto sm:h-full lg:aspect-square transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 flex flex-col items-center rounded-2xl bg-white px-3.5 py-2 text-ink-900 shadow-float">
          <span className="font-display text-2xl leading-none font-semibold">{event.day}</span>
          <span className="mt-0.5 text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">
            {event.month}
          </span>
        </span>
        <span className="absolute right-4 bottom-4 grid size-10 place-items-center rounded-full bg-ink-950/60 text-white ring-1 ring-white/25 backdrop-blur transition-colors group-hover:bg-ink-950/80">
          <Expand aria-hidden="true" className="size-4" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
          <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
          Day {position + 1}
        </p>
        <h3 className="mt-3 font-display text-display-sm font-medium text-white">{event.title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">{event.tagline}</p>

        {event.highlights && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {event.highlights.map((highlight) => (
              <li key={highlight} className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/85 ring-1 ring-white/10">
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5 text-sm">
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Date and time</dt>
            <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
            <dd className="text-white/80">
              {event.date} · {event.time}
            </dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Venue</dt>
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
            <dd className="text-white/80">{event.venue}</dd>
          </div>
        </dl>

        {event.photosCategory && (
          <button
            type="button"
            onClick={() => onShowPhotos(event.photosCategory)}
            className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-brand-50"
          >
            See photos
            <ArrowDown aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
    </Reveal>
  )
}

export default function AnniversaryShowcase({ onOpen, onShowPhotos }) {
  return (
    <section aria-labelledby="anniversary-title" className="pb-14 sm:pb-24 lg:pb-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl bg-ink-950 px-4 py-10 sm:rounded-4xl sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -left-32 size-112 rounded-full bg-brand-600/35 blur-3xl" />
            <div className="absolute -right-40 -bottom-40 size-128 rounded-full bg-alert-600/20 blur-3xl" />
            <span className="absolute -top-10 right-2 font-display text-[18rem] leading-none font-semibold text-white/[0.035] select-none sm:text-[26rem] lg:-top-24 lg:right-10 lg:text-[34rem]">
              5
            </span>
          </div>

          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-alert-600/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-alert-100 uppercase ring-1 ring-alert-500/35">
                November 2026
              </p>
              <h2
                id="anniversary-title"
                className="mt-6 font-display text-display-xl font-medium tracking-[-0.03em] text-white "
              >
                Celebrating{' '}
                <span className="text-brand-200 italic">
                  five years
                </span>{' '}
                of care
              </h2>
            </div>
            <p className="text-lead text-white/70 lg:col-span-5 lg:pb-2">
              Evolution Hospital marked its 5th anniversary with three days of events for our staff and community: an
              exercise walkout, a free medical outreach and an anniversary celebration at the hospital.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {anniversaryEvents.map((event, position) => (
              <EventCard
                key={event.id}
                event={event}
                position={position}
                onOpenPoster={(index) => onOpen(eventPosters, index)}
                onShowPhotos={onShowPhotos}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
