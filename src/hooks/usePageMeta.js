import { useEffect } from 'react'
import { hospital } from '../data/site'

const defaultDescription =
  'Evolution Hospital Limited in Ikorodu, Lagos provides specialist medical care, laboratory and diagnostic services, health screening and a 24-hour emergency service.'

export function usePageMeta({ title, description = defaultDescription }) {
  useEffect(() => {
    document.title = title ? `${title} | ${hospital.name}` : `${hospital.name} | Specialist Care & 24-Hour Emergency`

    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.name = 'description'
      document.head.append(descriptionTag)
    }
    descriptionTag.content = description
  }, [title, description])
}
