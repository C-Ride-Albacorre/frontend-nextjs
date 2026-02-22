// features/auth/components/login-form-skeleton.tsx

export function LoginFormSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      {/* Auth method toggle */}
      <div className="flex gap-2 mb-2">
        <div className="h-9 w-24 bg-neutral-200 rounded-lg" />
        <div className="h-9 w-24 bg-neutral-200 rounded-lg" />
      </div>

      {/* Email/Phone input */}
      <div className="space-y-1">
        <div className="h-4 w-24 bg-neutral-200 rounded" />
        <div className="h-11 w-full bg-neutral-200 rounded-xl" />
      </div>

      {/* Password input */}
      <div className="space-y-1">
        <div className="h-4 w-20 bg-neutral-200 rounded" />
        <div className="h-11 w-full bg-neutral-200 rounded-xl" />
        {/* Forgot password link */}
        <div className="h-4 w-28 bg-neutral-100 rounded ml-auto mt-2" />
      </div>

      {/* Submit button */}
      <div className="h-12 w-full bg-neutral-200 rounded-xl mt-4" />
    </div>
  );
}
