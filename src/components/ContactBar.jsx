import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { hospital, primaryPhone } from '../data/site'

export default function ContactBar({ isCollapsed }) {
  return (
    <div
      inert={isCollapsed}
      className={`hidden transition-[grid-template-rows,opacity] duration-500 ease-out-soft md:grid ${
        isCollapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
      }`}
    >
      <div className="overflow-hidden">
        <div className="bg-ink-900 text-[0.8125rem] text-white/75">
          <div className="container-page flex h-9 items-center justify-between gap-6">
            <p className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-3.5 text-brand-300" />
                {hospital.address[1]}, Lagos
              </span>
              <span className="hidden items-center gap-1.5 lg:flex">
                <Clock aria-hidden="true" className="size-3.5 text-brand-300" />
                Emergency service open 24 hours
              </span>
            </p>
            <p className="flex items-center gap-5">
              <a href={`mailto:${hospital.email}`} className="hidden items-center gap-1.5 hover:text-white lg:flex">
                <Mail aria-hidden="true" className="size-3.5 text-brand-300" />
                {hospital.email}
              </a>
              <a href={primaryPhone.href} className="flex items-center gap-1.5 font-semibold text-white hover:text-brand-200">
                <Phone aria-hidden="true" className="size-3.5 text-brand-300" />
                {primaryPhone.display}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
