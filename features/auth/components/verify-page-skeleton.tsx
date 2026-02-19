export function VerifyPageSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl px-8 py-14 text-center animate-pulse">
        {/* Title */}
        <div className="h-7 w-48 bg-neutral-200 rounded-md mx-auto mb-3" />
        {/* Subtitle */}
        <div className="h-4 w-64 bg-neutral-100 rounded mx-auto mb-2" />
        <div className="h-4 w-40 bg-neutral-100 rounded mx-auto mb-10" />

        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-12 h-12 bg-neutral-200 rounded-xl" />
          ))}
        </div>

        {/* Button */}
        <div className="h-12 w-full bg-neutral-200 rounded-xl" />
      </div>
    </section>
  );
}