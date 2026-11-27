import { ArrowRight, Phone } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import { appointmentCta, primaryPhone } from '../../data/site'

export default function CtaBanner({
  title = 'Ready to see a specialist?',
  description = 'Request an appointment online or call the hospital to speak with our team.',
  appointmentTo = appointmentCta.to,
}) {
  return (
    <section className="pb-14 sm:pb-24 lg:pb-32">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-panel bg-brand-800 px-6 py-12 text-center sm:px-12 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-brand-500/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-brand-300/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-display-lg font-medium tracking-[-0.02em] text-white ">
              {title}
            </h2>
            <p className="mt-4 text-lead text-white/75">{description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to={appointmentTo} variant="light" size="lg" icon={ArrowRight}>
                {appointmentCta.label}
              </Button>
              <Button href={primaryPhone.href} variant="ghostLight" size="lg" icon={Phone}>
                {primaryPhone.display}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
