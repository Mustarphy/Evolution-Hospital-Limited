import { useEffect, useRef } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { serviceCategories } from '../../data/services'

const categoryIds = serviceCategories.map((category) => category.id)

function scrollToCategory(event, id) {
  const target = document.getElementById(id)
  if (!target) return
  event.preventDefault()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

export default function ServiceCategoryNav() {
  const activeId = useActiveSection(categoryIds, 0.45)
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    const activeLink = list?.querySelector('[aria-current="location"]')
    if (!list || !activeLink || list.scrollWidth <= list.clientWidth) return

    const targetLeft = activeLink.offsetLeft - (list.clientWidth - activeLink.offsetWidth) / 2
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list.scrollTo({ left: targetLeft, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [activeId])

  return (
    <nav aria-label="Service categories" className="pointer-events-none sticky top-18 z-30 py-3 lg:top-20">
      <ul
        ref={listRef}
        className="pointer-events-auto relative flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-white/90 p-1.5 shadow-lift ring-1 ring-ink-900/6 backdrop-blur-xl scrollbar-none"
      >
        {serviceCategories.map(({ id, label, icon: Icon }) => {
          const isActive = activeId === id
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                onClick={(event) => scrollToCategory(event, id)}
                aria-current={isActive ? 'location' : undefined}
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-canvas hover:text-ink-900'
                }`}
              >
                <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
