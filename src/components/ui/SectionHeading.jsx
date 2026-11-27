export default function SectionHeading({ eyebrow, title, description, id, align = 'left', tone = 'dark' }) {
  const isCentered = align === 'center'
  const isLight = tone === 'light'

  return (
    <div className={isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className={`eyebrow ${isLight ? 'text-brand-200' : ''}`}>
          <span aria-hidden="true" className={`h-px w-6 ${isLight ? 'bg-alert-500' : 'bg-alert-600'}`} />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-4 font-display text-display-lg font-medium tracking-[-0.02em] ${
          isLight ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lead ${isLight ? 'text-white/70' : 'text-ink-600'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
