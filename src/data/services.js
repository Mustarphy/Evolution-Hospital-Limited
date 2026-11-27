import {
  Activity,
  Ambulance,
  BriefcaseMedical,
  FlaskConical,
  HeartHandshake,
  Microscope,
  Ribbon,
  Scan,
  Siren,
  Stethoscope,
} from 'lucide-react'

export const serviceCategories = [
  { id: 'departments', label: 'Specialist Care', icon: Stethoscope },
  { id: 'diagnostics', label: 'Laboratory & Diagnostics', icon: Microscope },
  { id: 'screening', label: 'Health Checks & Screening', icon: Activity },
  { id: 'emergency', label: 'Emergency & Support', icon: Siren },
]

export const services = [
  {
    slug: 'laboratory',
    name: 'Laboratory Services',
    shortName: 'Laboratory',
    category: 'diagnostics',
    icon: FlaskConical,
    summary: 'Analysis of blood and other samples to support diagnosis and treatment.',
    sections: [{ title: 'Laboratory units', items: ['Hematology', 'Microbiology', 'Clinical Pathology', 'Serology'] }],
  },
  {
    slug: 'ultrasound-scans',
    name: 'Ultrasound Scans',
    category: 'diagnostics',
    icon: Scan,
    summary: 'Imaging to assess pregnancy and the pelvic and abdominal organs.',
    sections: [{ title: 'Scans available', items: ['Pelvic Scan', 'Obstetric Scan', 'Abdominal Scan'] }],
  },
  {
    slug: 'health-checkups',
    name: 'Regular Health Check-ups',
    category: 'screening',
    icon: Activity,
    summary: 'Routine tests that help detect health concerns early, before symptoms appear.',
    sections: [
      {
        title: 'Tests available',
        numbered: true,
        items: [
          'Kidney Function Test',
          'Liver Function Test',
          'Complete Blood Count',
          'Blood Sugar Test',
          'Lipid Profile Test',
          'ECG',
          'Height/Weight Check (BMI)',
          'Genotype (Hemoglobin Electrophoresis)',
          'PSA (Prostate Specific Antigen)',
          'Hepatitis Test (Viral Liver Disease)',
          'Infertility Test (Hormone Profile)',
          'HIV Test',
        ],
      },
    ],
  },
  {
    slug: 'cancer-screening',
    name: 'Cancer Screening Tests',
    category: 'screening',
    icon: Ribbon,
    summary: 'Screening for cancers that commonly affect women and men.',
    sections: [
      {
        title: 'For women',
        items: [
          'Cancer of the Breast',
          'Cancer of the Cervix',
          'Cancer of the Ovary',
          'Cancer of the Endometrium',
          'Cancer of the Colon',
        ],
      },
      { title: 'For men', items: ['Cancer of the Prostate', 'Cancer of the Colon', 'Cancer of the Liver'] },
    ],
  },
  {
    slug: 'occupational-medicals',
    name: 'Occupational Medicals',
    category: 'screening',
    icon: BriefcaseMedical,
    summary: 'Medical tests required for employment and food handling.',
    sections: [{ title: 'Tests available', items: ['Pre-employment Medical Tests', 'Food Handler Tests'] }],
  },
  {
    slug: 'emergency-care',
    name: '24/7 Emergency Services',
    shortName: 'Emergency Care',
    category: 'emergency',
    icon: Siren,
    summary: 'Our emergency service is open 24 hours a day, every day of the year.',
    urgent: true,
  },
  {
    slug: 'ambulance',
    name: 'Medical Transportation & Ambulance',
    shortName: 'Ambulance',
    category: 'emergency',
    icon: Ambulance,
    summary: 'Ambulance and medical transportation services for patients who need to be moved safely.',
    urgent: true,
  },
  {
    slug: 'detoxification',
    name: 'Substance Use Disorder Detoxification',
    shortName: 'Detoxification',
    category: 'emergency',
    icon: HeartHandshake,
    summary: 'Detoxification services for people seeking help with substance use disorder, provided within a hospital setting.',
  },
]

export const getService = (slug) => services.find((service) => service.slug === slug)

export const servicesInCategory = (category) => services.filter((service) => service.category === category)

export const servicePath = (slug) => `/services/${slug}`
