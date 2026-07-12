import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Plus, Store, Upload } from 'lucide-react';

export default function AddStore() {
  return (
    <Card className="bg-white">
      <div className="flex justify-between items-start gap-8">
        <div className="space-y-8">
          <div className="space-y-2 md:space-y-2.5 flex-1">
            <h4 className="font-semibold text-neutral-900">
              Add Your Store Information
            </h4>
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
            leftIcon={<Store size={18} />}
          >
          Create Store
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
