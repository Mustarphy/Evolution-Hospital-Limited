import { CalendarHeart, Footprints, HeartPulse } from 'lucide-react'

const imageModules = import.meta.glob('../assets/gallery/*.webp', { eager: true, query: '?url', import: 'default' })

const imageUrl = (name, size) => imageModules[`../assets/gallery/${name}-${size}.webp`]

export const galleryCategories = [
  { id: 'anniversary', label: '5th Anniversary' },
  { id: 'bls', label: 'BLS Practical Review' },
  { id: 'outreach', label: 'Medical Outreach' },
  { id: 'care', label: 'Care in Action' },
  { id: 'community', label: 'Community & Events' },
  { id: 'posters', label: 'Anniversary Posters' },
]

const entries = [
  ['anniversary-cake-cutting-team', 'anniversary', 'Cutting the 5th anniversary cake with the team', 1280, 963],
  ['outreach-blood-pressure-check', 'outreach', 'Blood pressure checks at the free medical outreach', 1020, 768],
  ['theatre-team', 'care', 'Members of our theatre team', 1020, 768],
  ['bls-bag-valve-mask-practice', 'bls', 'Practising bag-valve-mask ventilation with chest compressions', 1280, 960],
  ['anniversary-cake-cutting', 'anniversary', 'Cutting the anniversary cake', 1169, 1280],
  ['laboratory-microscopy', 'care', 'Microscopy in the hospital laboratory', 768, 1020],
  ['outreach-registration', 'outreach', 'Registering residents at the outreach', 1020, 768],
  ['bls-presentation', 'bls', 'Basic Life Support (BLS) presentation for trainees', 1280, 960],
  ['anniversary-evening-celebration', 'anniversary', 'An evening celebration in front of the hospital', 1280, 1126],
  ['outreach-health-check', 'outreach', 'Health checks under the outreach tent', 768, 1020],
  ['laboratory-sample-analysis', 'care', 'Analysing samples in the laboratory', 768, 1020],
  ['bls-written-assessment', 'bls', 'Trainees completing the BLS written review', 1280, 960],
  ['anniversary-staff-cake', 'anniversary', 'Staff gathered around the 5th anniversary cake', 1280, 964],
  ['outreach-blood-sugar-test', 'outreach', 'Blood sugar testing during the outreach', 1020, 768],
  ['bls-compression-demonstration', 'bls', 'A trainee demonstrating chest compressions on a manikin', 1280, 960],
  ['bls-manikin-session', 'bls', 'Adult, child and infant CPR manikins ready for practice', 1280, 960],
  ['bls-trainer-briefing', 'bls', 'A trainer preparing the BLS practical session', 1280, 960],
  ['emergency-team-entrance', 'care', 'Our team moving a stretcher at the hospital entrance', 768, 1020],
  ['staff-celebration', 'community', 'A staff celebration at the hospital', 1020, 768],
  ['outreach-with-ambulances', 'community', 'Staff out in the community alongside our ambulances', 768, 1020],
  ['outreach-waiting-area', 'outreach', 'Residents waiting to be seen at the outreach', 1020, 768],
  ['guests-at-the-hospital', 'community', 'Guests gathered at the hospital', 1020, 768],
  ['community-event-address', 'community', 'Addressing guests at a community event', 768, 1020],
  ['signboard-installation', 'community', 'Putting up an Evolution Hospital signboard', 768, 1020],
  ['ambulance-on-the-road', 'care', 'One of our ambulances on the road', 768, 1020],
  ['bls-poster-class', 'bls', 'BLS Practical promotional graphic', 1280, 960, { graphic: true }],
  ['bls-poster-pair', 'bls', 'BLS Practical promotional graphic', 1280, 960, { graphic: true }],
  ['poster-anniversary-invitation', 'posters', 'Invitation to the 5th anniversary celebration', 1080, 1080],
  ['poster-exercise-walkout', 'posters', 'Exercise Walkout poster', 1254, 1254],
  ['poster-free-medical-outreach', 'posters', 'Free Medical Outreach poster', 1254, 1254],
  ['poster-five-years-thank-you', 'posters', 'Five years of trust, care and impact', 1254, 1254],
  ['poster-five-years-general-manager', 'posters', 'Five years anniversary poster featuring our General Manager', 1254, 1254],
  ['poster-five-years-cmd', 'posters', 'Five years anniversary poster featuring our CMD', 1280, 853],
  ['poster-five-years-staff', 'posters', 'Five years anniversary poster', 853, 1280],
]

export const galleryItems = entries.map(([id, category, caption, width, height, options = {}]) => ({
  id,
  category,
  caption,
  width,
  height,
  isPoster: category === 'posters' || Boolean(options.graphic),
  src: imageUrl(id, 'lg'),
  thumb: imageUrl(id, 'sm'),
  srcSet: `${imageUrl(id, 'sm')} 640w, ${imageUrl(id, 'lg')} ${width}w`,
}))

export const getGalleryItem = (id) => galleryItems.find((item) => item.id === id)

export const anniversaryEvents = [
  {
    id: 'walkout',
    day: '09',
    month: 'Nov',
    date: '9 November 2026',
    time: '7:00am',
    title: 'Exercise Walkout',
    tagline: 'Healthy staff, healthy community',
    venue: 'Evolution Refreshment Solutions Open Ground',
    icon: Footprints,
    poster: 'poster-exercise-walkout',
  },
  {
    id: 'outreach',
    day: '10',
    month: 'Nov',
    date: '10 November 2026',
    time: '8:00am',
    title: 'Free Medical Outreach',
    tagline: 'Bringing quality healthcare closer to you',
    venue: 'Evolution Refreshment Solutions Ground',
    highlights: [
      'General medical check-up',
      'Blood pressure check',
      'Blood sugar test',
      'Free medicines (where applicable)',
      'Health education & guidance',
    ],
    icon: HeartPulse,
    poster: 'poster-free-medical-outreach',
    photosCategory: 'outreach',
  },
  {
    id: 'celebration',
    day: '11',
    month: 'Nov',
    date: '11 November 2026',
    time: '3:00pm',
    title: '5th Anniversary Celebration',
    tagline: '5 years of excellent healthcare service, compassion and commitment to life',
    venue: 'Hospital Premises',
    icon: CalendarHeart,
    poster: 'poster-anniversary-invitation',
    photosCategory: 'anniversary',
  },
]
