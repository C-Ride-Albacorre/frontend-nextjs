import Card from '@/components/layout/card';

export default function VendorStoreCardSkeleton() {
  return (
    <Card
      border="none"
      spacing="sm"
      gap="sm"
      className="bg-primary/10 shadow animate-pulse"
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full bg-primary/20 shrink-0" />

        {/* Text */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 rounded bg-primary/20" />
          <div className="h-3 w-40 rounded bg-primary/10" />
        </div>
      </div>
    </Card>
  );
}
