'use client';

function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl bg-foreground-200 p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-4 w-24 animate-pulse rounded-md bg-neutral-200" />
          <div className="h-5 w-32 animate-pulse rounded-md bg-neutral-200" />
          <div className="h-3 w-40 animate-pulse rounded-md bg-neutral-100" />
        </div>

        <div className="relative h-28 w-32 shrink-0 rounded-xl bg-neutral-200 animate-pulse">
          <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-neutral-100 animate-pulse" />
          <div className="absolute bottom-2 left-2 flex flex-col gap-2">
            <div className="h-2 w-16 rounded bg-neutral-100 animate-pulse" />
            <div className="h-2 w-10 rounded bg-neutral-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesSkeleton() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
