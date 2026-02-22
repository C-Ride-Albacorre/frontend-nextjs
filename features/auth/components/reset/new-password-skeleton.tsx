export function NewPasswordSkeleton() {
  return (
    <div className="space-y-8 max-w-xl mx-auto animate-pulse">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="h-7 w-48 bg-neutral-200 rounded mx-auto" />
        <div className="h-4 w-64 bg-neutral-100 rounded mx-auto" />
      </div>

      {/* Password input */}
      <div className="space-y-1">
        <div className="h-4 w-24 bg-neutral-200 rounded" />
        <div className="h-12 w-full bg-neutral-200 rounded-xl" />
      </div>

      {/* Confirm password input */}
      <div className="space-y-1">
        <div className="h-4 w-36 bg-neutral-200 rounded" />
        <div className="h-12 w-full bg-neutral-200 rounded-xl" />
      </div>

      {/* Button */}
      <div className="h-12 w-full bg-neutral-200 rounded-xl" />
    </div>
  );
}
