export const staffGroups = {
  leadership: 'Leadership',
  medical: 'Medical team',
  support: 'Administration & support',
}

export const staffMembers = [
  {
    slug: 'tony-bosun',
    name: 'Otunba (Dr) Ogundipe Tony Bosun',
    position: 'CMD, Evolution Group of Company',
    group: 'leadership',
    photo: 'Dr_Tony_Bosun_this_image_as_cmd.jpeg',
    focus: { x: 55, y: 30 },
    featured: true,
  },
  {
    slug: 'salami',
    name: 'Mr Salami',
    position: 'Manager, Evolution Group of Company',
    group: 'leadership',
    photo: 'Dr_Salami.jpeg',
    focus: { x: 52, y: 24, zoom: 1.12 },
  },
  {
    slug: 'chen-james',
    name: 'Dr Chen James',
    position: 'Senior Doctor',
    group: 'medical',
    photo: 'Dr_Chen_James.jpeg',
    focus: { x: 68, y: 30 },
  },
  {
    slug: 'cynthia-iwuji',
    name: 'Dr Cynthia Iwuji',
    group: 'medical',
    photo: 'Dr_Cynthia_Iwuji.jpeg',
    focus: { x: 45, y: 13, zoom: 2.8 },
  },
  {
    slug: 'matron-eo',
    name: 'Matron E.O',
    position: 'Head of Nursing Department',
    department: 'Nursing',
    group: 'medical',
    photo: 'Matron_E_O.jpeg',
    focus: { x: 48, y: 10, zoom: 1.3 },
    bookable: false,
  },
  {
    slug: 'catherine-adebiaye',
    name: 'Catherine Nkeiruka Adebiaye',
    position: 'HMO Coordinator',
    group: 'support',
    photo: 'Catherine_Nkeiruka.jpeg',
    focus: { x: 52, y: 34 },
  },
  {
    slug: 'esther-okeo',
    name: 'Esther Ejiro Okeo',
    position: 'Pharmacy Technician',
    group: 'support',
    photo: 'Esther_Ejiro.jpeg',
    focus: { x: 50, y: 26 },
  },
  {
    slug: 'jimoh-murphy',
    name: 'Jimoh Ayinde Murphy',
    position: 'System Analyst',
    group: 'support',
    photo: 'Jimoh_Ayinde_Murphy.jpeg',
    focus: { x: 57, y: 32, zoom: 1.2 },
  },
  {
    slug: 'emmanuel-ayodeji',
    name: 'Emmanuel Olusegun Ayodeji',
    group: 'support',
    photo: 'Emmanuel_Olusegun.jpeg',
    focus: { x: 60, y: 24, zoom: 1.15 },
  },
]

export const getStaffMember = (slug) => staffMembers.find((member) => member.slug === slug)

export const doctorPath = (slug) => `/doctors/${slug}`

export const isClinician = (member) => member.group === 'medical' && member.bookable !== false
