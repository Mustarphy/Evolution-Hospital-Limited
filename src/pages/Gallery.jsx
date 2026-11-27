import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import AnniversaryShowcase from '../components/gallery/AnniversaryShowcase'
import GalleryGrid from '../components/gallery/GalleryGrid'
import Lightbox from '../components/gallery/Lightbox'
import CtaBanner from '../components/ui/CtaBanner'
import PageHeader from '../components/ui/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import { galleryCategories, galleryItems } from '../data/gallery'
import { routes } from '../data/site'

const ALL = 'all'
const photos = galleryItems.filter((item) => !item.isPoster)
const filters = [
  { id: ALL, label: 'All photos', count: photos.length },
  ...galleryCategories.map((category) => ({
    ...category,
    count: galleryItems.filter((item) => item.category === category.id).length,
  })),
]

export default function Gallery() {
  usePageMeta({
    title: 'Gallery',
    description:
      'Photos from Evolution Hospital: our 5th anniversary celebration, free medical outreach, and our team at work in Ikorodu, Lagos.',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('category')
  const activeFilter = filters.some((filter) => filter.id === requested) ? requested : ALL
  const [viewer, setViewer] = useState(null)
  const gridRef = useRef(null)

  const visibleItems = useMemo(
    () => (activeFilter === ALL ? photos : galleryItems.filter((item) => item.category === activeFilter)),
    [activeFilter],
  )

  const selectFilter = (id, { scroll = false } = {}) => {
    setSearchParams(id === ALL ? {} : { category: id }, { replace: true, preventScrollReset: true })
    if (scroll) gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openViewer = (items, index) => setViewer({ items, index })

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from five years of care"
        description="Our 5th anniversary celebrations, community outreach and the everyday work of the Evolution Hospital team."
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'Gallery' }]}
      />

      <AnniversaryShowcase onOpen={openViewer} onShowPhotos={(category) => selectFilter(category, { scroll: true })} />

      <section ref={gridRef} aria-labelledby="gallery-grid-title" className="scroll-mt-24 pb-14 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <div className="flex flex-col gap-6">
            <div>
              <h2
                id="gallery-grid-title"
                className="font-display text-display-lg font-medium tracking-[-0.02em] "
              >
                Photo gallery
              </h2>
              <p className="mt-2 text-ink-600" aria-live="polite">
                Showing {visibleItems.length} {visibleItems.length === 1 ? 'image' : 'images'}
                {activeFilter !== ALL && ` in ${filters.find((filter) => filter.id === activeFilter)?.label}`}
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter gallery"
              className="-mx-5 flex gap-2 overflow-x-auto border-b border-ink-200/70 px-5 pb-6 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {filters.map((filter) => {
                const isActive = filter.id === activeFilter
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectFilter(filter.id)}
                    className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-ink-900 text-white shadow-card'
                        : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:text-ink-900 hover:ring-ink-300'
                    }`}
                  >
                    {filter.label}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                        isActive ? 'bg-white/15 text-white' : 'bg-canvas text-ink-500'
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-10">
            <GalleryGrid key={activeFilter} items={visibleItems} onOpen={openViewer} />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Be part of our next five years"
        description="Book an appointment or call the hospital to speak with our team."
      />

      {viewer && (
        <Lightbox
          items={viewer.items}
          index={viewer.index}
          onClose={() => setViewer(null)}
          onNavigate={(index) => setViewer((current) => ({ ...current, index }))}
        />
      )}
    </>
  )
}
