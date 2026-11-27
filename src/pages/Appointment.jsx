import { useId, useState } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle, Mail, Phone, Siren } from 'lucide-react'
import { useSearchParams } from 'react-router'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import { isEmailServiceConfigured, sendAppointmentEmail } from '../lib/emailjs'
import { departments, getDepartment } from '../data/departments'
import { getStaffMember, isClinician, staffMembers } from '../data/doctors'
import { getService, services } from '../data/services'
import { hospital, primaryPhone, routes } from '../data/site'

const clinicians = staffMembers.filter(isClinician)
const bookableServices = services.filter((service) => !service.urgent)

function todayIsoDate() {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 10)
}

function initialReason(searchParams) {
  const department = getDepartment(searchParams.get('department'))
  if (department) return `department:${department.slug}`
  const service = getService(searchParams.get('service'))
  if (service && !service.urgent) return `service:${service.slug}`
  return ''
}

function initialDoctor(searchParams) {
  const member = getStaffMember(searchParams.get('doctor'))
  return member && isClinician(member) ? member.slug : ''
}

function describeReason(reason) {
  const [type, slug] = reason.split(':')
  if (type === 'department') return getDepartment(slug)?.name
  if (type === 'service') return getService(slug)?.name
  return 'General consultation'
}

function formatDate(isoDate) {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function buildTemplateParams(form) {
  const doctor = getStaffMember(form.doctor)
  return {
    to_email: hospital.email,
    patient_name: form.fullName.trim(),
    patient_phone: form.phone.trim(),
    patient_email: form.email.trim() || 'Not provided',
    reply_to: form.email.trim() || hospital.email,
    reason: describeReason(form.reason),
    preferred_doctor: doctor ? doctor.name : 'No preference',
    preferred_date: formatDate(form.date) || 'No preference',
    notes: form.notes.trim() || 'None',
    submitted_at: new Date().toLocaleString('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Africa/Lagos',
    }),
  }
}

function buildEmailLink(form) {
  const doctor = getStaffMember(form.doctor)
  const lines = [
    'Appointment request',
    '',
    `Name: ${form.fullName}`,
    `Phone: ${form.phone}`,
    form.email && `Email: ${form.email}`,
    `Reason for visit: ${describeReason(form.reason)}`,
    `Preferred doctor: ${doctor ? doctor.name : 'No preference'}`,
    form.date && `Preferred date: ${formatDate(form.date)}`,
    form.notes && '',
    form.notes && `Notes: ${form.notes}`,
  ].filter((line) => line !== false && line !== undefined && line !== null)

  const subject = `Appointment request: ${form.fullName}`
  return `mailto:${hospital.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

function validate(form) {
  const errors = {}
  if (form.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a phone number we can reach you on.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.'
  if (!form.reason) errors.reason = 'Please choose a reason for your visit.'
  if (form.date && form.date < todayIsoDate()) errors.date = 'Please choose today or a future date.'
  return errors
}

const inputStyles =
  'mt-2 block w-full rounded-2xl bg-white min-h-12 px-4 py-3 text-base text-ink-900 ring-1 ring-ink-200 transition-shadow outline-none placeholder:text-ink-500 focus:ring-2 focus:ring-brand-600 aria-invalid:ring-alert-500'

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink-900">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-500">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-alert-700">
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function ResultPanel({ tone, title, body, children }) {
  const isError = tone === 'error'
  const Icon = isError ? AlertCircle : CheckCircle2
  const focusOnMount = (node) => node?.focus()

  return (
    <div
      ref={focusOnMount}
      role={isError ? 'alert' : 'status'}
      tabIndex={-1}
      className="rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 outline-none sm:p-10"
    >
      <Icon aria-hidden="true" className={`size-10 ${isError ? 'text-alert-600' : 'text-brand-600'}`} strokeWidth={1.5} />
      <h2 className="mt-5 font-display text-display-md font-medium text-ink-900">{title}</h2>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-600">{body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>
    </div>
  )
}

export default function Appointment() {
  usePageMeta({
    title: 'Book an Appointment',
    description: 'Request an appointment at Evolution Hospital Limited, Ikorodu, Lagos.',
  })

  const [searchParams] = useSearchParams()
  const formId = useId()
  const [form, setForm] = useState(() => ({
    fullName: '',
    phone: '',
    email: '',
    reason: initialReason(searchParams),
    doctor: initialDoctor(searchParams),
    date: '',
    notes: '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [emailLink, setEmailLink] = useState(null)
  const [honeypot, setHoneypot] = useState('')

  const fieldId = (name) => `${formId}-${name}`
  const update = (name) => (event) => {
    setForm((current) => ({ ...current, [name]: event.target.value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }
  const fieldProps = (name) => ({
    id: fieldId(name),
    name,
    value: form[name],
    onChange: update(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }
    if (honeypot) {
      setStatus('sent')
      return
    }

    if (!isEmailServiceConfigured) {
      const link = buildEmailLink(form)
      setEmailLink(link)
      setStatus('handoff')
      window.location.href = link
      return
    }

    setStatus('sending')
    try {
      await sendAppointmentEmail(buildTemplateParams(form))
      setStatus('sent')
    } catch {
      setEmailLink(buildEmailLink(form))
      setStatus('error')
    }
  }

  const startOver = () => {
    setForm((current) => ({ ...current, date: '', notes: '' }))
    setStatus('idle')
  }

  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        title="Book an appointment"
        description="Tell us what you need and how to reach you. The hospital will contact you to confirm a time."
        breadcrumbs={[{ label: 'Home', to: routes.home }, { label: 'Book an Appointment' }]}
      />

      <section className="pb-14 sm:pb-24 lg:pb-32">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            {status === 'sent' ? (
              <ResultPanel
                tone="success"
                title="Request sent"
                body={
                  <>
                    Thank you, {form.fullName.trim().split(' ')[0]}. Your appointment request has reached the hospital.
                    We will call you on <strong className="font-semibold text-ink-900">{form.phone}</strong> to confirm a
                    time. Your appointment is only confirmed once the hospital contacts you.
                  </>
                }
              >
                <Button href={primaryPhone.href} icon={Phone}>
                  Call {primaryPhone.display}
                </Button>
                <Button variant="secondary" onClick={startOver}>
                  Make another request
                </Button>
              </ResultPanel>
            ) : status === 'error' ? (
              <ResultPanel
                tone="error"
                title="We couldn’t send your request"
                body="Something went wrong while sending. Your details are still filled in, so you can try again, call the hospital, or send the request from your own email app."
              >
                <Button onClick={() => setStatus('idle')}>Try again</Button>
                <Button href={primaryPhone.href} variant="secondary" icon={Phone}>
                  Call {primaryPhone.display}
                </Button>
                <Button href={emailLink} variant="secondary" icon={Mail}>
                  Use my email app
                </Button>
              </ResultPanel>
            ) : status === 'handoff' ? (
              <ResultPanel
                tone="success"
                title="Your request is ready to send"
                body={
                  <>
                    Your email app should have opened with your request addressed to{' '}
                    <strong className="font-semibold text-ink-900">{hospital.email}</strong>. Please press send to
                    deliver it. Your appointment is only confirmed once the hospital contacts you.
                  </>
                }
              >
                <Button href={emailLink} icon={Mail}>
                  Open email again
                </Button>
                <Button href={primaryPhone.href} variant="secondary" icon={Phone}>
                  Call {primaryPhone.display}
                </Button>
                <Button variant="secondary" onClick={() => setStatus('idle')}>
                  Edit request
                </Button>
              </ResultPanel>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="relative rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 sm:p-10"
              >
                <div className="flex items-start gap-3 rounded-2xl bg-alert-50 p-4 text-sm leading-relaxed text-alert-700 ring-1 ring-alert-100">
                  <Siren aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <p>
                    <strong className="font-semibold">In an emergency, do not use this form.</strong> Call{' '}
                    <a href={primaryPhone.href} className="font-semibold underline underline-offset-2">
                      {primaryPhone.display}
                    </a>{' '}
                    or come straight to the hospital. Our emergency service is open 24 hours.
                  </p>
                </div>

                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor={fieldId('company')}>Leave this field empty</label>
                  <input
                    id={fieldId('company')}
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                <fieldset
                  disabled={status === 'sending'}
                  className="mt-8 grid gap-6 disabled:opacity-70 sm:grid-cols-2"
                >
                  <Field id={fieldId('fullName')} label="Full name" error={errors.fullName}>
                    <input {...fieldProps('fullName')} type="text" autoComplete="name" required className={inputStyles} />
                  </Field>
                  <Field id={fieldId('phone')} label="Phone number" error={errors.phone}>
                    <input
                      {...fieldProps('phone')}
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="e.g. 0801 234 5678"
                      required
                      className={inputStyles}
                    />
                  </Field>
                  <Field id={fieldId('email')} label="Email address" optional error={errors.email}>
                    <input {...fieldProps('email')} type="email" autoComplete="email" className={inputStyles} />
                  </Field>
                  <Field id={fieldId('date')} label="Preferred date" optional error={errors.date}>
                    <input {...fieldProps('date')} type="date" min={todayIsoDate()} className={inputStyles} />
                  </Field>
                  <Field id={fieldId('reason')} label="Reason for visit" error={errors.reason}>
                    <select {...fieldProps('reason')} required className={inputStyles}>
                      <option value="">Select a department or service</option>
                      <option value="general">General consultation</option>
                      <optgroup label="Departments">
                        {departments.map((department) => (
                          <option key={department.slug} value={`department:${department.slug}`}>
                            {department.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Services">
                        {bookableServices.map((service) => (
                          <option key={service.slug} value={`service:${service.slug}`}>
                            {service.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </Field>
                  <Field id={fieldId('doctor')} label="Preferred doctor" optional>
                    <select {...fieldProps('doctor')} className={inputStyles}>
                      <option value="">No preference</option>
                      {clinicians.map((member) => (
                        <option key={member.slug} value={member.slug}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id={fieldId('notes')} label="Anything else we should know?" optional>
                      <textarea {...fieldProps('notes')} rows={4} className={`${inputStyles} resize-y`} />
                    </Field>
                  </div>
                </fieldset>

                <div className="mt-8 flex flex-col gap-4 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-sm leading-relaxed text-ink-500">
                    {isEmailServiceConfigured
                      ? 'Your details are sent to the hospital and used only to arrange your appointment.'
                      : `Submitting opens your email app with this request addressed to ${hospital.email}.`}
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    icon={status === 'sending' ? undefined : ArrowRight}
                    disabled={status === 'sending'}
                    aria-busy={status === 'sending'}
                    className="shrink-0 disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === 'sending' && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
                    {status === 'sending' ? 'Sending…' : 'Send request'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-4 lg:self-start lg:sticky lg:top-28">
            <div className="rounded-panel bg-brand-800 p-6 text-white sm:p-7">
              <h2 className="font-display text-display-sm font-medium text-white">Prefer to call?</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">Speak to the hospital directly.</p>
              <ul className="mt-4 flex flex-col gap-0.5">
                {hospital.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className="inline-flex items-center gap-2.5 py-2 font-semibold hover:text-brand-100">
                      <Phone aria-hidden="true" className="size-4 text-brand-200" />
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-panel bg-white p-6 shadow-card ring-1 ring-ink-900/6 sm:p-7">
              <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">Hospital address</h2>
              <address className="mt-3 text-[0.9375rem] leading-relaxed text-ink-800 not-italic">
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
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Get directions
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
