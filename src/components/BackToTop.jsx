import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const SHOW_AFTER_PX = 600
const RING_RADIUS = 21
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

function readScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  return {
    isVisible: window.scrollY > SHOW_AFTER_PX,
    progress: scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0,
  }
}

export default function BackToTop() {
  const [{ isVisible, progress }, setScroll] = useState({ isVisible: false, progress: 0 })

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScroll(readScroll())
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      inert={!isVisible}
      className={`group relative grid size-12 place-items-center rounded-full bg-white text-ink-900 shadow-lift ring-1 ring-ink-900/8 transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:text-brand-700 focus-visible:outline-brand-700 ${
        isVisible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-90 opacity-0'
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH * (1 - progress)}
          className="text-brand-600"
        />
      </svg>
      <ArrowUp
        aria-hidden="true"
        className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={2.25}
      />
    </button>
  )
}
