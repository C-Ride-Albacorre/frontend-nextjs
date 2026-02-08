import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { ChevronDown, DollarSign, Info, Receipt } from 'lucide-react';
import { FEE_DETAILS } from '@/features/vendor/partner-program/data';

export default function FeeStructure() {
  return (
    <>
      <Card spacing="sm" gap="sm" className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <p>Fee Structure</p>
            <p className="text-sm text-neutral-500">
              Transparent pricing for all services
            </p>
          </div>

          <div className="text-left">
            <Button
              leftIcon={<Info size={16} className="" />}
              variant="default"
              size="none"
              className="text-sm text-[#10B981]"
            >
              <p>Click to expand for details</p>
            </Button>
          </div>
        </div>

        <ul className="space-y-4 max-h-105 overflow-auto">
          {FEE_DETAILS.map((fee, index) => {
            return (
              <li key={index}>
                <Card
                  className="p-4 flex items-center justify-between gap-6"
                  spacing="sm"
                >
                  <div className="flex items-center gap-6 flex-1 mb-0">
                    <DollarSign size={20} />
                    <p className="text-sm text-neutral-500">{fee.title}</p>
                  </div>
                  <div className="flex items-center gap-6 mb-0">
                    <p className="text-primary font-medium">{fee.value}</p>

                    <ChevronDown size={20} />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
