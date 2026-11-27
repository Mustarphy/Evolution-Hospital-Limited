export const hospital = {
  name: 'Evolution Hospital Limited',
  shortName: 'Evolution',
  descriptor: 'Hospital Limited',
  locality: 'Ikorodu, Lagos',
  address: [
    'Zone A, Block 16-18, Lane 3 PPT Tescom',
    'Irede CDA, Agura/Gberigbe, Ikorodu',
    'Lagos State, Nigeria',
  ],
  email: 'evolutionhospitals@yahoo.com',
  phones: [
    { display: '0901 350 9022', href: 'tel:+2349013509022' },
    { display: '0912 803 9517', href: 'tel:+2349128039517' },
    { display: '0811 746 4954', href: 'tel:+2348117464954' },
  ],
}

hospital.fullAddress = hospital.address.join(', ')
hospital.mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.fullAddress)}`

export const primaryPhone = hospital.phones[0]

export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  departments: '/departments',
  doctors: '/doctors',
  gallery: '/gallery',
  hmo: '/hmo',
  contact: '/contact',
  appointment: '/appointment',
}

export const navigationLinks = [
  { label: 'Home', to: routes.home, end: true },
  { label: 'About Us', to: routes.about },
  { label: 'Services', to: routes.services },
  { label: 'Departments', to: routes.departments },
  { label: 'Our Doctors', to: routes.doctors },
  { label: 'Gallery', to: routes.gallery },
  { label: 'HMO', to: routes.hmo },
  { label: 'Contact', to: routes.contact },
]

export const appointmentCta = {
  label: 'Book Appointment',
  to: routes.appointment,
}

export function appointmentLink(params) {
  const query = new URLSearchParams(params).toString()
  return query ? `${routes.appointment}?${query}` : routes.appointment
}

export const supportContacts = {
  email: hospital.email,
  phone: primaryPhone,
}
