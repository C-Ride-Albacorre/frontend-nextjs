import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Plus, Upload } from 'lucide-react';

export default function AddStore() {
  return (
    <Card className="bg-white">
      <div className="flex justify-between items-start gap-8">
        <div className="space-y-8">
          <div className="space-y-2 md:space-y-2.5 flex-1">
            <p className="font-medium text-neutral-900">
              Add Your Store Information
            </p>
            <p className="text-xs md:text-sm font-normal leading-6 text-neutral-500">
              Please provide accurate and complete information about your store.
              This includes your store name, category, address, contact details,
              and a compelling description of your offerings.
            </p>
          </div>

          <Button
            href={`/vendor/store/new-store`}
            variant="primary"
            size="icon"
            type="button"
            leftIcon={<Plus size={18} />}
          >
            Add Store
          </Button>
        </div>

        <Button
          variant="white"
          size="xs"
          rounded="full"
          href={`/vendor/store/new-store`}
        >
          <Upload size={18} className="text-primary" />
        </Button>
      </div>
    </Card>
  );
}
