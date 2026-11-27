import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { getGalleryItem } from '../../data/gallery'
import { routes } from '../../data/site'

const tiles = [
  { id: 'anniversary-cake-cutting-team', className: 'col-span-2 row-span-2', category: 'anniversary' },
  { id: 'outreach-blood-pressure-check', className: 'col-span-2 lg:col-span-1', category: 'outreach' },
  { id: 'laboratory-microscopy', className: 'row-span-2 hidden lg:block', category: 'care' },
  { id: 'anniversary-evening-celebration', className: 'col-span-1', category: 'anniversary' },
  { id: 'theatre-team', className: 'col-span-1 lg:hidden', category: 'care' },
].map((tile) => ({ ...tile, item: getGalleryItem(tile.id) }))

export default function GalleryTeaser() {
  return (
    <section aria-labelledby="gallery-teaser-title" className="overflow-hidden border-t border-ink-900/6 bg-white py-14 sm:py-24 lg:pt-32 lg:pb-36">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-alert-50 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-alert-700 uppercase ring-1 ring-alert-100">
              5th Anniversary · November 2026
            </p>
            <h2
              id="gallery-teaser-title"
              className="mt-5 font-display text-display-lg font-medium tracking-[-0.02em] "
            >
              Five years of care, captured
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:pb-2">
            <p className="text-lead text-ink-600">
              Moments from our anniversary celebrations, free medical outreach and our team at work.
            </p>
            <Button to={routes.gallery} icon={ArrowRight} className="self-start">
              View the gallery
            </Button>
          </div>
        </Reveal>

        <ul className="mt-12 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:mt-16 lg:auto-rows-[13.5rem] lg:grid-cols-4 lg:gap-5">
          {tiles.map(({ id, className, category, item }, position) => (
            <Reveal as="li" key={id} delay={position * 80} className={className}>
              <Link
                to={`${routes.gallery}?category=${category}`}
                className="group relative block size-full overflow-hidden rounded-card bg-ink-100"
              >
                <img
                  src={position === 0 ? item.src : item.thumb}
                  width={item.width}
                  height={item.height}
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
