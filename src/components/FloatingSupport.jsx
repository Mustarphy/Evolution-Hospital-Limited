import { useEffect, useId, useRef, useState } from 'react'
import { Mail, MessageCircleMore, Phone, X } from 'lucide-react'
import { useLocation } from 'react-router'
import { supportContacts } from '../data/site'

const options = [
  {
    id: 'email',
    label: 'Email Us',
    detail: supportContacts.email,
    href: `mailto:${supportContacts.email}`,
    icon: Mail,
  },
  {
    id: 'call',
    label: 'Call Us',
    detail: supportContacts.phone.display,
    href: supportContacts.phone.href,
    icon: Phone,
  },
]

export default function FloatingSupport() {
  const location = useLocation()
  const [openedAt, setOpenedAt] = useState(null)
  const isOpen = openedAt === location.key
  const containerRef = useRef(null)
  const toggleRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnOutsidePointer = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpenedAt(null)
    }
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpenedAt(null)
      toggleRef.current?.focus()
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <ul
        id={menuId}
        aria-label="Contact options"
        inert={!isOpen}
        className={`absolute right-0 bottom-full mb-3 flex w-max flex-col items-end gap-2.5 transition-all duration-300 ease-out-soft ${
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {options.map(({ id, label, detail, href, icon: Icon }, index) => (
          <li
            key={id}
            className="transition-transform duration-300 ease-out-soft"
            style={{ transitionDelay: isOpen ? `${(options.length - 1 - index) * 50}ms` : '0ms' }}
          >
            <a
              href={href}
              onClick={() => setOpenedAt(null)}
              className="group flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 shadow-lift ring-1 ring-ink-900/8 transition-all duration-300 hover:-translate-x-0.5 hover:ring-brand-200 focus-visible:outline-brand-700"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                <Icon aria-hidden="true" className="size-4.5" strokeWidth={2} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.9375rem] font-semibold text-ink-900">{label}</span>
                <span className="mt-0.5 max-w-52 truncate text-xs text-ink-500 sm:max-w-none">{detail}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
        onClick={() => setOpenedAt(isOpen ? null : location.key)}
        className="group relative grid size-14 place-items-center rounded-full bg-linear-to-br from-brand-600 to-brand-800 text-white shadow-[0_14px_30px_-10px_rgb(15_45_143/0.7)] ring-1 ring-white/25 transition-transform duration-300 ease-out-soft hover:scale-105 focus-visible:outline-brand-700 active:scale-95 md:size-16"
      >
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-600/50"
            style={{ animationIterationCount: 3, animationDelay: '2s' }}
          />
        )}
        <MessageCircleMore
          aria-hidden="true"
          className={`absolute size-6 transition-all duration-300 ease-out-soft md:size-7 ${
            isOpen ? 'scale-50 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
        <X
          aria-hidden="true"
          className={`absolute size-6 transition-all duration-300 ease-out-soft md:size-7 ${
            isOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0'
          }`}
        />
      </button>
    </div>
  )
}
