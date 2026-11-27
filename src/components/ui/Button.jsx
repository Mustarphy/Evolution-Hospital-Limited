import { Link } from 'react-router'

const baseStyles =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]'

const variants = {
  primary:
    'bg-brand-700 text-white shadow-[0_8px_20px_-8px_rgb(15_45_143/0.6)] hover:bg-brand-800 hover:shadow-[0_12px_28px_-10px_rgb(15_45_143/0.7)] focus-visible:outline-brand-700',
  secondary:
    'bg-white text-ink-900 ring-1 ring-ink-200 hover:ring-ink-300 hover:bg-canvas focus-visible:outline-brand-700',
  ghostLight:
    'bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm hover:bg-white/20 focus-visible:outline-white',
  light: 'bg-white text-ink-900 hover:bg-brand-50 focus-visible:outline-white',
}

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-7 text-base',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  children,
  ...props
}) {
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {children}
      {Icon && (
        <Icon
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={2.25}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
