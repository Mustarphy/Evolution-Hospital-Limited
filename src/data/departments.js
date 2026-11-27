import { Baby, Bone, Droplet, Ear, HeartPulse, Scissors, Sprout } from 'lucide-react'

export const departments = [
  {
    slug: 'fertility',
    name: 'Fertility Care',
    icon: Sprout,
    description:
      'Support for individuals and couples trying to conceive, from investigation through to treatment and onward referral.',
    services: [
      'Fertility Clinic',
      'Hydrotubation for Tubal Blockage',
      'Fertility Investigation and Referral Services',
    ],
    featured: true,
  },
  {
    slug: 'women-and-child-health',
    name: 'Women & Child Health',
    icon: Baby,
    description:
      'Care for women through pregnancy and gynaecological concerns, and for children from infancy through adolescence.',
    services: ['Obstetrics and Gynaecology', 'Pediatrics'],
  },
  {
    slug: 'surgery',
    name: 'Surgical Services',
    icon: Scissors,
    description: 'General, thyroid and reconstructive surgery carried out by our surgical teams.',
    services: ['General Surgery', 'Goiter Surgeries', 'Plastic Surgery'],
  },
  {
    slug: 'internal-medicine',
    name: 'Internal Medicine',
    icon: HeartPulse,
    description:
      'Diagnosis and ongoing management of adult medical conditions, including hormonal and metabolic disorders.',
    services: ['General Medicine', 'Endocrinology'],
  },
  {
    slug: 'urology',
    name: 'Urology',
    icon: Droplet,
    description: 'Assessment and treatment of conditions affecting the urinary tract and prostate.',
    services: ['Urology', 'Prostate Surgeries'],
  },
  {
    slug: 'orthopaedics',
    name: 'Orthopaedics',
    icon: Bone,
    description: 'Care for conditions and injuries of the bones, joints and muscles.',
    services: ['Orthopaedics'],
  },
  {
    slug: 'ent',
    name: 'Ear, Nose & Throat',
    icon: Ear,
    description: 'Assessment and treatment of ear, nose and throat conditions.',
    services: ['Ear, Nose and Throat (ENT)'],
  },
]

export const getDepartment = (slug) => departments.find((department) => department.slug === slug)

export const departmentPath = (slug) => `/departments/${slug}`
