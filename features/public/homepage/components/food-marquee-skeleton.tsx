export default function FoodMarqueeSkeleton() {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto px-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="relative h-48 rounded-2xl overflow-hidden bg-neutral-50"
          >
            {/* Image skeleton */}
            <div className="absolute inset-0 bg-linear-to-t from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />

            {/* Dark overlay (like real card) */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-neutral-300/40 to-transparent" />

            {/* Status dot */}
            <div className="absolute top-4 right-4">
              <div className="h-3 w-3 rounded-full bg-neutral-200 animate-shimmer" />
            </div>

            {/* Text skeleton */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-2">
              <div className="h-4 w-28 rounded bg-linear-to-t from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
              <div className="h-3 w-20 rounded bg-linear-to-t from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
