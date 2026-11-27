export default function CategoryHeader({ index, title, description, id, tone = 'dark', aside }) {
  const isLight = tone === 'light'

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
      <div className="max-w-xl">
        {index !== undefined && (
          <p className={`mb-2 text-xs font-semibold tracking-[0.2em] tabular-nums ${isLight ? 'text-brand-300' : 'text-brand-700'}`}>
            {String(index).padStart(2, '0')}
          </p>
        )}
        <h2
          id={id}
          className={`font-display text-display-md font-medium tracking-[-0.02em] ${
            isLight ? 'text-white' : 'text-ink-900'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-3 leading-relaxed ${isLight ? 'text-white/70' : 'text-ink-600'}`}>{description}</p>
        )}
      </div>
      {aside}
    </div>
  )
}
