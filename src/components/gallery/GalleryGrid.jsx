import { useMemo } from 'react'
import { Expand } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { useColumnCount } from '../../hooks/useColumnCount'
import { galleryCategories } from '../../data/gallery'

const categoryLabel = (id) => galleryCategories.find((category) => category.id === id)?.label

function GalleryTile({ item, onOpen, position }) {
  return (
    <Reveal delay={position * 70} className="mb-3 sm:mb-5">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full overflow-hidden rounded-2xl bg-ink-100 sm:rounded-card text-left shadow-card ring-1 ring-ink-900/6 focus-visible:outline-offset-4"
      >
        {item.isPoster ? (
          <span className="block bg-linear-to-br from-brand-50 to-mist p-2 sm:p-4">
            <img
              src={item.thumb}
              width={item.width}
              height={item.height}
              alt={item.caption}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full rounded-xl shadow-card transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
            />
          </span>
        ) : (
          <img
            src={item.thumb}
            width={item.width}
            height={item.height}
            alt={item.caption}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5">
          <span>
            <span className="block text-xs font-semibold tracking-[0.18em] text-brand-200 uppercase">
              {categoryLabel(item.category)}
            </span>
            <span className="mt-1 block text-sm leading-snug font-medium text-white">{item.caption}</span>
          </span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
            <Expand aria-hidden="true" className="size-4" />
          </span>
        </span>
      </button>
    </Reveal>
  )
}

function distribute(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => ({ height: 0, entries: [] }))
  items.forEach((item, position) => {
    const shortest = columns.reduce((best, column) => (column.height < best.height ? column : best))
    shortest.entries.push({ item, position })
    shortest.height += item.height / item.width + (item.isPoster ? 0.08 : 0)
  })
  return columns.map((column) => column.entries)
}

export default function GalleryGrid({ items, onOpen }) {
  const columnCount = useColumnCount()
  const columns = useMemo(() => distribute(items, columnCount), [items, columnCount])

  return (
    <div className="flex items-start gap-3 sm:gap-5">
      {columns.map((entries, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-1 flex-col">
          {entries.map(({ item, position }) => (
            <GalleryTile key={item.id} item={item} position={columnIndex} onOpen={() => onOpen(items, position)} />
          ))}
        </div>
      ))}
    </div>
  )
}
