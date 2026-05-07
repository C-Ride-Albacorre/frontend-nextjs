export default function StoreSkeleton() {
  return (
    <section className="py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-neutral-50"
          >
            {/* Image */}
            <div className="h-52 bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">
              {/* Title + rating */}
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 rounded bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
                <div className="h-4 w-10 rounded bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
              </div>

              {/* Cuisine */}
              <div className="h-3 w-24 rounded bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />

              {/* Location */}
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 rounded-full bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
                <div className="h-3 w-40 rounded bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center mt-2">
                <div className="h-3 w-20 rounded bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
                <div className="h-3 w-10 rounded bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
