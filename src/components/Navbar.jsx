import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router'
import BrandMark from './BrandMark'
import ContactBar from './ContactBar'
import Button from './ui/Button'
import { useScrolled } from '../hooks/useScrolled'
import { appointmentCta, hospital, navigationLinks, routes } from '../data/site'

function focusMainContent(event) {
  event.preventDefault()
  const main = document.getElementById('main-content')
  main?.focus()
  main?.scrollIntoView()
}

export default function Navbar() {
  const location = useLocation()
  const [menuOpenedAt, setMenuOpenedAt] = useState(null)
  const isMenuOpen = menuOpenedAt === location.key
  const isScrolled = useScrolled()
  const menuButtonRef = useRef(null)
  const menuPanelRef = useRef(null)

  const closeMenu = () => setMenuOpenedAt(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpenedAt(null)
        menuButtonRef.current?.focus()
      }
    }
    const closeOnDesktop = () => {
      if (window.matchMedia('(min-width: 80rem)').matches) setMenuOpenedAt(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuPanelRef.current?.querySelector('a')?.focus()
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [isMenuOpen])

  const isElevated = isScrolled || isMenuOpen
  const isOverDark = location.pathname === routes.home && !isElevated

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-[2px] transition-opacity duration-500 xl:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          isElevated
            ? 'bg-white/90 shadow-[0_1px_0_rgb(12_23_57/0.08),0_8px_24px_-16px_rgb(12_23_57/0.25)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <a
          href="#main-content"
          onClick={focusMainContent}
          className="sr-only rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60"
        >
          Skip to main content
        </a>

        <ContactBar isCollapsed={isElevated} />

        <nav aria-label="Primary" className="container-page flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link to={routes.home} className="shrink-0 rounded-xl">
            <span className="sr-only">{hospital.name}, home</span>
            <span aria-hidden="true">
              <BrandMark tone={isOverDark ? 'light' : 'dark'} />
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navigationLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `group/link relative block rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
                      isOverDark
                        ? isActive
                          ? 'text-white'
                          : 'text-white/75 hover:text-white'
                        : isActive
                          ? 'text-brand-800'
                          : 'text-ink-600 hover:text-ink-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-300 ${isOverDark ? 'bg-alert-500' : 'bg-brand-600'} ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-50'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button to={appointmentCta.to} size="sm" icon={ArrowRight} variant={isOverDark ? 'light' : 'primary'}>
                {appointmentCta.label}
              </Button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpenedAt(isMenuOpen ? null : location.key)}
              className={`grid size-11 place-items-center rounded-full ring-1 transition-colors xl:hidden ${
                isOverDark ? 'text-white ring-white/30 hover:bg-white/10' : 'text-ink-900 ring-ink-200 hover:bg-ink-100'
              }`}
            >
              {isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-navigation"
          ref={menuPanelRef}
          inert={!isMenuOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft xl:hidden ${
            isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="container-page flex max-h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto border-t border-ink-100 pt-3 pb-6 *:shrink-0">
              <ul className="flex flex-col">
                {navigationLinks.map((link, index) => (
                  <li
                    key={link.to}
                    className={`transition-all duration-500 ease-out-soft ${
                      isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                    }`}
                    style={{ transitionDelay: isMenuOpen ? `${80 + index * 40}ms` : '0ms' }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.end}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-ink-100 py-3.5 font-display text-[1.3125rem] tracking-[-0.01em] transition-colors ${
                          isActive ? 'text-brand-700' : 'text-ink-900 hover:text-brand-700'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          <ArrowRight
                            aria-hidden="true"
                            className={`size-5 transition-opacity ${isActive ? 'text-brand-600 opacity-100' : 'opacity-25'}`}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Button to={appointmentCta.to} size="lg" icon={ArrowRight} onClick={closeMenu} className="mt-6 w-full">
                {appointmentCta.label}
              </Button>
              <div className="mt-6 rounded-card bg-canvas p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">Call the hospital</p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {hospital.phones.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-ink-900 hover:text-brand-700"
                      >
                        <Phone aria-hidden="true" className="size-4 text-brand-700" />
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${hospital.email}`}
                  className="mt-4 flex items-center gap-2.5 border-t border-ink-200/70 pt-4 text-sm font-medium break-all text-ink-700 hover:text-brand-700"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-brand-700" />
                  {hospital.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
