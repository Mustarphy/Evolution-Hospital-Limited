import { ArrowUpRight, Clock, Mail, MapPin, Phone, Siren } from 'lucide-react'
import CtaBanner from '../components/ui/CtaBanner'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { hospital, routes } from '../data/site'

const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(hospital.fullAddress)}&z=15&output=embed`

function ContactCard({ icon: Icon, title, children, tone = 'default', delay = 0 }) {
  const isUrgent = tone === 'urgent'
  return (
    <Reveal
      delay={delay}
      className={`flex h-full flex-col rounded-panel p-6 sm:p-7 ${
        isUrgent ? 'bg-ink-900 text-white' : 'bg-white shadow-card ring-1 ring-ink-900/6'
      }`}
    >
      <span
        className={`grid size-12 place-items-center rounded-2xl ${
          isUrgent ? 'bg-alert-600 text-white' : 'bg-brand-50 text-brand-700'
        }`}
      >
        <Icon aria-hidden="true" className="size-5.5" strokeWidth={1.75} />
      </span>
      <h2 className={`mt-5 font-display text-display-sm font-medium ${isUrgent ? 'text-white' : 'text-ink-900'}`}>
        {title}
      </h2>
      <div className={`mt-3 flex-1 text-[0.9375rem] leading-relaxed ${isUrgent ? 'text-white/70' : 'text-ink-600'}`}>
        {children}
      </div>
    </Reveal>
  )
}

export default function Contact() {
  usePageMeta({
    title: 'Contact Us',
    description: `Visit, call or email Evolution Hospital Limited at ${hospital.fullAddress}.`,
  })

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with Evolution Hospital"
        description="Call, email or visit us. Our emergency service is open 24 hours a day, every day."
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'Contact' }]}
      />

      <section aria-label="Contact details" className="pb-12 lg:pb-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <ContactCard icon={Phone} title="Call us">
            <ul className="-my-2 flex flex-col">
              {hospital.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="inline-block py-2 font-semibold text-ink-900 hover:text-brand-700">
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </ContactCard>
          <ContactCard icon={Mail} title="Email us" delay={80}>
            <a href={`mailto:${hospital.email}`} className="font-semibold break-all text-ink-900 hover:text-brand-700">
              {hospital.email}
            </a>
          </ContactCard>
          <ContactCard icon={MapPin} title="Visit us" delay={160}>
            <address className="not-italic">
              {hospital.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={hospital.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800"
            >
              Open in Google Maps
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </ContactCard>
          <ContactCard icon={Siren} title="Emergencies" tone="urgent" delay={240}>
            <p className="flex items-center gap-2 font-semibold text-white">
              <Clock aria-hidden="true" className="size-4 text-alert-500" />
              Open 24 hours, every day
            </p>
            <p className="mt-2">In an emergency, call the hospital or come straight to our emergency service.</p>
          </ContactCard>
        </div>
      </section>

      <section aria-label="Map" className="pb-14 sm:pb-24">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-panel bg-white p-2.5 shadow-card ring-1 ring-ink-900/6">
            <iframe
              title={`Map showing ${hospital.name}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-4/3 w-full rounded-[1.25rem] border-0 sm:aspect-16/7"
            />
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
