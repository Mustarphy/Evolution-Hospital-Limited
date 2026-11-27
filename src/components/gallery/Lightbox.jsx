import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryCategories } from '../../data/gallery'

const categoryLabel = (id) => galleryCategories.find((category) => category.id === id)?.label

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const pointerStartX = useRef(null)
  const item = items[index]
  const hasMultiple = items.length > 1

  const showPrevious = () => onNavigate((index - 1 + items.length) % items.length)
  const showNext = () => onNavigate((index + 1) % items.length)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    dialog?.showModal()
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = previousOverflow
      if (dialog?.open) dialog.close()
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    ;[items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]].forEach((neighbour) => {
      if (!neighbour) return
      const preload = new Image()
      preload.src = neighbour.src
    })
  }, [index, items])

  const handleKeyDown = (event) => {
    if (!hasMultiple) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    }
  }

  const handlePointerDown = (event) => {
    pointerStartX.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (pointerStartX.current === null || !hasMultiple) return
    const distance = event.clientX - pointerStartX.current
    pointerStartX.current = null
    if (Math.abs(distance) < 50) return
    if (distance < 0) showNext()
    else showPrevious()
  }

  if (!item) return null

  return (
    <dialog
      ref={dialogRef}
      aria-label="Image viewer"
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-ink-950/92 backdrop:backdrop-blur-sm"
    >
      <div className="flex size-full flex-col">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p className="text-sm font-medium text-white/70 tabular-nums" aria-live="polite">
            {index + 1} / {items.length}
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close image viewer"
            autoFocus
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 sm:px-20"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close()
          }}
        >
          <figure key={item.id} className="flex max-h-full max-w-full animate-fade flex-col items-center">
            <img
              src={item.src}
              srcSet={item.srcSet}
              sizes="100vw"
              width={item.width}
              height={item.height}
              alt={item.caption}
              draggable={false}
              className="max-h-[calc(100dvh-11rem)] w-auto max-w-full rounded-2xl object-contain shadow-float select-none"
            />
            <figcaption className="mt-4 max-w-2xl text-center">
              <span className="block text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
                {categoryLabel(item.category)}
              </span>
              <span className="mt-1 block text-[0.9375rem] font-medium text-white sm:text-base">{item.caption}</span>
            </figcaption>
          </figure>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 sm:grid"
              >
                <ChevronLeft aria-hidden="true" className="size-6" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 sm:grid"
              >
                <ChevronRight aria-hidden="true" className="size-6" />
              </button>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="flex items-center justify-center gap-3 px-4 py-4 sm:hidden">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/15"
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/15"
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
