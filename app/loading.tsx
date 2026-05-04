export default function Loading() {
  return (
    <div className="max-w-container mx-auto px-gutter pt-24 space-y-32 animate-pulse">
      {/* Hero skeleton */}
      <div className="min-h-screen flex flex-col justify-center gap-12 py-32">
        <div className="space-y-4">
          <div className="h-16 bg-black/10 dark:bg-white/10 w-3/4" />
          <div className="h-16 bg-black/10 dark:bg-white/10 w-1/2" />
        </div>
        <div className="h-5 bg-black/10 dark:bg-white/10 w-full max-w-lg" />
        <div className="h-5 bg-black/10 dark:bg-white/10 w-2/3 max-w-md" />
        <div className="flex gap-4">
          <div className="h-14 w-40 bg-black/20 dark:bg-white/20" />
          <div className="h-14 w-32 bg-black/10 dark:bg-white/10 border border-black/20" />
        </div>
      </div>

      {/* Section skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="py-section space-y-12">
          <div className="h-10 bg-black/10 dark:bg-white/10 w-64" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
