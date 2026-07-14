import Card from '@/components/layout/card';

export default function VendorStoreCardSkeleton() {
  return (
    <Card
      border="none"
      spacing="md"
      gap="md"
      className="bg-primary/10 shadow animate-pulse"
    >
      <div className="flex flex-col gap-3">
        {/* Avatar */}
     <div className='flex items-start gap-3'>
         <div className="h-10 w-10 rounded-md bg-primary/15 shrink-0" />

        {/* Text */}
        <div className="flex-1 space-y-3">
          <div className="h-4  rounded bg-primary/15" />
          <div className="h-3 rounded bg-primary/15" />


         
        </div>
     </div>


         <div className="h-3 w-8 rounded bg-primary/15 " />
      </div>
    </Card>
  );
}
