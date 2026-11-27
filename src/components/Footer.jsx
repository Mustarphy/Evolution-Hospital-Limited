import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { brandMark } from '../data/media'
import { departmentPath, departments } from '../data/departments'
import { servicePath, services } from '../data/services'
import { appointmentCta, hospital, navigationLinks, routes } from '../data/site'

const footerServices = ['laboratory', 'ultrasound-scans', 'health-checkups', 'cancer-screening', 'emergency-care', 'ambulance']
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(Boolean)

function FooterColumn({ title, className = '', children }) {
  return (
    <div className={className}>
      <h2 className="text-xs font-semibold tracking-[0.16em] text-brand-200 uppercase">{title}</h2>
      <ul className="mt-3 flex flex-col sm:mt-5 sm:gap-1">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="inline-block py-2.5 text-[0.9375rem] text-white/70 sm:py-1.5 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 size-128 rounded-full bg-brand-700/25 blur-3xl"
      />
      <div className="container-page relative pt-16 pb-28 sm:pb-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to={routes.home} className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white">
                <img src={brandMark.src} width={brandMark.width} height={brandMark.height} alt="" className="h-auto w-8" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold">{hospital.shortName}</span>
                <span className="mt-1 text-xs font-semibold tracking-[0.22em] text-brand-200 uppercase">
                  {hospital.descriptor}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-white/65">
              Specialist medical care, laboratory diagnostics, health screening and a 24-hour emergency service in{' '}
              {hospital.locality}.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white/8 px-4 py-2 text-sm font-semibold ring-1 ring-white/10">
              <Clock aria-hidden="true" className="size-4 text-alert-500" />
              Emergency service open 24 hours
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <FooterColumn title="Explore">
              {navigationLinks.map((link) => (
                <FooterLink key={link.to} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
              <FooterLink to={appointmentCta.to}>{appointmentCta.label}</FooterLink>
            </FooterColumn>
            <FooterColumn title="Departments" className="hidden sm:block">
              {departments.map((department) => (
                <FooterLink key={department.slug} to={departmentPath(department.slug)}>
                  {department.name}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title="Services">
              {footerServices.map((service) => (
                <FooterLink key={service.slug} to={servicePath(service.slug)}>
                  {service.shortName ?? service.name}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-brand-200 uppercase">Contact</h2>
            <address className="mt-5 flex flex-col gap-4 text-[0.9375rem] text-white/70 not-italic">
              <a href={hospital.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                <span>
                  {hospital.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </a>
              <span className="flex gap-3">
                <Phone aria-hidden="true" className="mt-3 size-4 shrink-0 text-brand-300 sm:mt-0.5" />
                <span className="flex flex-col">
                  {hospital.phones.map((phone) => (
                    <a key={phone.href} href={phone.href} className="py-2.5 hover:text-white sm:py-1">
                      {phone.display}
                    </a>
                  ))}
                </span>
              </span>
              <a href={`mailto:${hospital.email}`} className="flex gap-3 py-2.5 break-all hover:text-white sm:py-0">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                {hospital.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:pr-40">
          <p>
            &copy; {new Date().getFullYear()} {hospital.name}. All rights reserved.
          </p>
          <p className="hidden sm:block">{hospital.fullAddress}</p>
        </div>
      </div>
    </footer>
  )
}
