export default function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-neutral-100 animate-pulse
                       shadow-sm"
          />
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-8 mt-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-60 rounded-xl bg-neutral-100 animate-pulse"
          />
        ))}
      </div>
    </>
  );
}
