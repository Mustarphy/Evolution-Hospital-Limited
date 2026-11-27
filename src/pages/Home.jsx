import Hero from '../components/hero/Hero'
import GalleryTeaser from '../components/home/GalleryTeaser'
import ServicesPreview from '../components/home/ServicesPreview'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta({})

  return (
    <>
      <Hero />
      <ServicesPreview />
      <GalleryTeaser />
    </>
  )
}
