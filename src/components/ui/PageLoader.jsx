import { brandMark } from '../../data/media'

export default function PageLoader() {
  return (
    <div role="status" className="grid min-h-dvh place-items-center bg-canvas">
      <span className="grid size-20 animate-pulse place-items-center rounded-3xl bg-white shadow-lift">
        <img src={brandMark.src} width={brandMark.width} height={brandMark.height} alt="" className="h-auto w-12" />
      </span>
      <span className="sr-only">Loading page</span>
    </div>
  )
}
