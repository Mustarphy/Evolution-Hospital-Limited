import buildingLarge from '../assets/images/hospital-building-1000.webp'
import buildingSmall from '../assets/images/hospital-building-640.webp'
import heroSmall from '../assets/images/hospital-hero-828.webp'
import heroMedium from '../assets/images/hospital-hero-1280.webp'
import heroLarge from '../assets/images/hospital-hero-1920.webp'
import ehlMark from '../assets/brand/ehl-mark.svg'

export const heroImage = {
  src: buildingLarge,
  srcSet: `${buildingSmall} 640w, ${buildingLarge} 1000w`,
  sizes: '(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw',
  width: 1000,
  height: 655,
  alt: 'Front view of the Evolution Hospital building in Ikorodu, Lagos, with the hospital sign beside the main entrance',
}

export const heroBackground = {
  src: heroLarge,
  srcSet: `${heroSmall} 828w, ${heroMedium} 1280w, ${heroLarge} 1920w`,
  sizes: '(max-aspect-ratio: 1/1) 360vw, 100vw',
  width: 1920,
  height: 1258,
  alt: 'The Evolution Hospital building in Ikorodu, Lagos',
}

export const brandMark = {
  src: ehlMark,
  width: 916,
  height: 583,
}
