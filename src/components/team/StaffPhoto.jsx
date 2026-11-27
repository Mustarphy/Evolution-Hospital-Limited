import { getStaffPhoto } from '../../data/staffPhotos'

const getInitials = (name) =>
  name
    .replace(/\(.*?\)|\b(Dr|Mr|Mrs|Ms|Otunba)\b\.?/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

export default function StaffPhoto({ member, eager = false, className = '' }) {
  const src = getStaffPhoto(member.photo)
  const { x = 50, y = 30, zoom = 1 } = member.focus ?? {}
  const origin = `${x}% ${y}%`

  return (
    <div className={`relative overflow-hidden bg-brand-50 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={`Portrait of ${member.name}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 size-full scale-(--zoom) object-cover transition-[scale] duration-700 ease-out-soft group-hover:scale-[calc(var(--zoom)*1.04)]"
          style={{ objectPosition: origin, transformOrigin: origin, '--zoom': zoom }}
        />
      ) : (
        <span
          role="img"
          aria-label={`Photo of ${member.name} coming soon`}
          className="absolute inset-0 grid place-items-center font-display text-5xl font-medium text-brand-700/70"
        >
          {getInitials(member.name)}
        </span>
      )}
    </div>
  )
}
