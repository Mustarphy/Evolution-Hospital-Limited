const photoModules = import.meta.glob(['../assets/images/*.{jpg,jpeg,png,webp,avif}', '!../assets/images/WhatsApp*'], {
  eager: true,
  query: '?url',
  import: 'default',
})

const photosByFilename = Object.fromEntries(
  Object.entries(photoModules).map(([path, url]) => [path.split('/').pop(), url]),
)

export function getStaffPhoto(filename) {
  const url = filename ? photosByFilename[filename] : undefined
  if (!url && filename && import.meta.env.DEV) {
    console.warn(`Staff photo "${filename}" was not found in src/assets/images/.`)
  }
  return url ?? null
}
