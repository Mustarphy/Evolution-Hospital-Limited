import emailjs from '@emailjs/browser'

const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export const isEmailServiceConfigured = Boolean(config.serviceId && config.templateId && config.publicKey)

if (!isEmailServiceConfigured && import.meta.env.DEV) {
  console.warn(
    'EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in .env.local. The appointment form will fall back to opening the visitor’s email app.',
  )
}

export function sendAppointmentEmail(templateParams) {
  return emailjs.send(config.serviceId, config.templateId, templateParams, {
    publicKey: config.publicKey,
    limitRate: { id: 'appointment-request', throttle: 15000 },
  })
}
