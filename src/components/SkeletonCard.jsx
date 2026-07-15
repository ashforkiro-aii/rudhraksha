/* SkeletonCard — supports layout="grid" (default) | layout="list" */
export default function SkeletonCard({ layout = 'grid' }) {
  if (layout === 'list') {
    return (
      <div className="bg-[#2A1408] rounded-xl border border-[#5C3015] overflow-hidden animate-pulse">
        <div className="flex items-stretch gap-3 p-3">
          {/* Image placeholder */}
          <div className="flex-shrink-0 w-[110px] h-[110px] rounded-xl bg-[#3D1F0A]" />

          {/* Content placeholder */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-3 bg-[#5C3015] rounded w-12" />
              <div className="h-3 bg-[#3D1F0A] rounded w-16" />
            </div>
            <div className="h-4 bg-[#5C3015] rounded w-3/4 mb-1" />
            <div className="h-3 bg-[#5C3015] rounded w-1/2 mb-2" />
            <div className="flex gap-1 mb-2">
              <div className="h-3 bg-[#3D1F0A] rounded-full w-14" />
              <div className="h-3 bg-[#3D1F0A] rounded-full w-10" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-5 bg-[#5C3015] rounded w-16" />
              <div className="h-4 bg-[#3D1F0A] rounded w-12" />
              <div className="h-4 bg-[#3D1F0A] rounded-full w-10 ml-auto" />
            </div>
          </div>

          {/* Right side */}
          <div className="flex-shrink-0 flex flex-col items-center justify-between gap-2 pl-1 py-0.5">
            <div className="w-7 h-7 rounded-full bg-[#5C3015]" />
            <div className="h-7 bg-[#5C3015] rounded-full w-14" />
          </div>
        </div>
      </div>
    )
  }

  // Grid skeleton
  return (
    <div className="bg-[#2A1408] rounded-2xl overflow-hidden border border-[#5C3015] animate-pulse">
      <div className="aspect-square bg-[#3D1F0A]" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-[#5C3015] rounded w-1/3" />
        <div className="h-4 bg-[#5C3015] rounded w-3/4" />
        <div className="flex gap-1">
          <div className="h-3 bg-[#3D1F0A] rounded-full w-14" />
          <div className="h-3 bg-[#3D1F0A] rounded-full w-10" />
        </div>
        <div className="h-5 bg-[#5C3015] rounded w-1/2" />
        <div className="h-8 bg-[#C8860A]/30 rounded-xl mt-2" />
      </div>
    </div>
  )
}
