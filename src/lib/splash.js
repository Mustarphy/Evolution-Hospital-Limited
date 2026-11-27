const MIN_VISIBLE_MS = 1150
const MIN_VISIBLE_QUICK_MS = 350
const MAX_WAIT_MS = 2500

let dismissal = null

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

function heroImageReady() {
  const image = document.querySelector('main img[fetchpriority="high"]')
  if (!image) return Promise.resolve()
  return image.decode().catch(() => {})
}

export function dismissSplash() {
  if (dismissal || !document.getElementById('app-splash')) return dismissal
  dismissal = (async () => {
    await Promise.race([Promise.all([document.fonts?.ready, heroImageReady()]), wait(MAX_WAIT_MS)])
    const minimum = window.__splashQuick ? MIN_VISIBLE_QUICK_MS : MIN_VISIBLE_MS
    const elapsed = performance.now() - (window.__splashStart ?? 0)
    if (elapsed < minimum) await wait(minimum - elapsed)
    window.__hideSplash?.()
  })()
  return dismissal
}
