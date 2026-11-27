import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds, viewportRatio = 0.4) {
  const [activeId, setActiveId] = useState(sectionIds[0])
  const idsKey = sectionIds.join('|')

  useEffect(() => {
    const ids = idsKey.split('|')
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * viewportRatio
      let current = ids[0]

      ids.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return
        const { top, bottom } = element.getBoundingClientRect()
        if (top <= line && bottom > line) current = id
      })

      setActiveId(current)
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
  }, [idsKey, viewportRatio])

  return activeId
}
