/* SkeletonCard — stone temple theme, supports layout="grid" (default) | layout="list" */
export default function SkeletonCard({ layout = 'grid' }) {
  if (layout === 'list') {
    return (
      <div className="rounded-xl overflow-hidden animate-pulse stone-panel">
        <div className="flex items-stretch gap-3 p-3">
          <div className="flex-shrink-0 w-[110px] h-[110px] rounded-xl" style={{ background: "#D4C4B4" }} />
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-3 rounded w-12" style={{ background: "#D4C4B4" }} />
              <div className="h-3 rounded w-16" style={{ background: "#C5B5A5" }} />
            </div>
            <div className="h-4 rounded w-3/4 mb-1" style={{ background: "#D4C4B4" }} />
            <div className="h-3 rounded w-1/2 mb-2" style={{ background: "#C5B5A5" }} />
            <div className="flex gap-1 mb-2">
              <div className="h-3 rounded-full w-14" style={{ background: "#C5B5A5" }} />
              <div className="h-3 rounded-full w-10" style={{ background: "#C5B5A5" }} />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-5 rounded w-16" style={{ background: "#D4C4B4" }} />
              <div className="h-4 rounded w-12" style={{ background: "#C5B5A5" }} />
              <div className="h-4 rounded-full w-10 ml-auto" style={{ background: "#C5B5A5" }} />
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center justify-between gap-2 pl-1 py-0.5">
            <div className="w-7 h-7 rounded-full" style={{ background: "#D4C4B4" }} />
            <div className="h-7 rounded-full w-14" style={{ background: "#D4C4B4" }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden animate-pulse stone-panel">
      <div className="aspect-square" style={{ background: "#D4C4B4" }} />
      <div className="p-3 space-y-2">
        <div className="h-3 rounded w-1/3" style={{ background: "#C5B5A5" }} />
        <div className="h-4 rounded w-3/4" style={{ background: "#D4C4B4" }} />
        <div className="flex gap-1">
          <div className="h-3 rounded-full w-14" style={{ background: "#C5B5A5" }} />
          <div className="h-3 rounded-full w-10" style={{ background: "#C5B5A5" }} />
        </div>
        <div className="h-5 rounded w-1/2" style={{ background: "#D4C4B4" }} />
        <div className="h-8 rounded-xl mt-2" style={{ background: "rgba(250,190,26,0.3)" }} />
      </div>
    </div>
  )
}
