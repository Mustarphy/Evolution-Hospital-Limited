import { useSyncExternalStore } from 'react'

const wideQuery = '(min-width: 64rem)'

function getColumnCount() {
  return window.matchMedia(wideQuery).matches ? 3 : 2
}

function subscribe(onChange) {
  const list = window.matchMedia(wideQuery)
  list.addEventListener('change', onChange)
  return () => list.removeEventListener('change', onChange)
}

export function useColumnCount() {
  return useSyncExternalStore(subscribe, getColumnCount, () => 2)
}
