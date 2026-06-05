import Card from '@/components/layout/card';

let count = 2;

export default function OrderSkeleton() {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card border='none' className="flex h-full flex-col bg-neutral-50"   key={index}>
          <div className="animate-pulse flex flex-col justify-between gap-5">
            <div className="flex-1 space-y-4">
              <div className="flex gap-2">
                <div className="h-5 w-20 rounded bg-neutral-200" />
                <div className="h-5 w-16 rounded-full bg-neutral-200" />
                <div className="h-5 w-16 rounded-full bg-neutral-200" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-neutral-200" />
                <div className="h-3 w-32 rounded bg-neutral-200" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-52 rounded bg-neutral-200" />
                <div className="h-3 w-44 rounded bg-neutral-200" />
              </div>

              <div className="h-5 w-24 rounded bg-neutral-200" />
            </div>

            <div className="flex gap-2">
              <div className="h-9 w-full rounded-lg bg-neutral-200" />
              <div className="h-9 w-full rounded-lg bg-neutral-200" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
