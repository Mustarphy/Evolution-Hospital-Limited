import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import Button from '../ui/Button'
import HeroFeatures from './HeroFeatures'
import { DepartmentsCard, EmergencyCard } from './HeroStatCards'
import PartnersMarquee from '../PartnersMarquee'
import { heroBackground } from '../../data/media'
import { appointmentCta, hospital, primaryPhone } from '../../data/site'

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate pb-14 lg:pb-24">
      <div className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-28 sm:pt-40 sm:pb-32 md:pt-48 lg:min-h-[46rem] lg:pt-52 lg:pb-40">
        <img
          src={heroBackground.src}
          srcSet={heroBackground.srcSet}
          sizes={heroBackground.sizes}
          width={heroBackground.width}
          height={heroBackground.height}
          alt={heroBackground.alt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 size-full animate-fade object-cover object-[50%_38%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-b from-ink-950/85 via-brand-900/65 to-ink-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(7_13_36/0.45)_100%)]" />
        </div>

        <div className="container-page relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex animate-rise items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-[0.8125rem] font-semibold text-white ring-1 ring-white/20 backdrop-blur-md">
              <span aria-hidden="true" className="relative grid size-2 place-items-center">
                <span className="absolute size-2 animate-pulse-ring rounded-full bg-alert-500" />
                <span className="relative size-2 rounded-full bg-alert-500" />
              </span>
              {hospital.locality} · 24-hour emergency care
            </p>

            <h1
              id="hero-title"
              className="mt-6 animate-rise font-display text-display-2xl font-medium tracking-[-0.03em] text-white [animation-delay:80ms] [text-shadow:0_2px_24px_rgb(7_13_36/0.35)]"
            >
              Specialist care with the{' '}
              <span className="relative whitespace-nowrap text-brand-200">
                <em className="italic">attention</em>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 16"
                  className="absolute -bottom-2 left-0 h-3 w-full text-alert-500"
                  preserveAspectRatio="none"
                >
                  <path d="M3 11C80 3 210 2 297 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </span>{' '}
              every patient deserves.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl animate-rise text-lead text-white/80 [animation-delay:160ms]">
              From fertility, maternity and children&rsquo;s health to surgery, diagnostics and round-the-clock emergency
              care, Evolution Hospital brings specialist services together under one roof.
            </p>

            <div className="mt-9 flex animate-rise flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
              <Button to={appointmentCta.to} variant="light" size="lg" icon={ArrowUpRight} className="w-full sm:w-auto">
                {appointmentCta.label}
              </Button>
              <a
                href={primaryPhone.href}
                className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white/10 pr-6 pl-2 text-[0.9375rem] font-semibold text-white ring-1 ring-white/25 backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:w-auto"
              >
                <span className="grid size-10 place-items-center rounded-full bg-alert-600 text-white">
                  <Phone aria-hidden="true" className="size-4" />
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-xs font-medium text-white/70">Call the hospital</span>
                  {primaryPhone.display}
                </span>
              </a>
            </div>

            <p className="mt-8 inline-flex animate-rise items-center gap-1.5 text-sm text-white/60 [animation-delay:320ms]">
              <MapPin aria-hidden="true" className="size-4 text-white/70" />
              {hospital.address[1]}
            </p>
          </div>

          <EmergencyCard className="absolute bottom-0 left-0 hidden w-56 animate-float xl:block" />
          <DepartmentsCard className="absolute right-0 bottom-6 hidden w-56 animate-float [animation-delay:-3.5s] xl:block" />
        </div>
      </div>

      <div className="container-page relative z-10 -mt-16 animate-rise [animation-delay:400ms] sm:-mt-20 sm:px-4">
        <HeroFeatures />
      </div>

      <div className="container-page mt-14 lg:mt-20">
        <PartnersMarquee />
      </div>
    </section>
  )
}
