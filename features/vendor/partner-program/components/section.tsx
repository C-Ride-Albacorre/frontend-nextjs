import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Check, Info } from 'lucide-react';

export function PartnershipSummary() {
  return (
    <>
      <Card
        className="p-4  flex flex-col md:flex-row items-start gap-4 md:gap-8"
        gap="sm"
        spacing="md"
      >
        <div
          className=" bg-[#10B981] w-10 h-10 rounded-xl flex items-center justify-center shrink-0 aspect-square
            "
        >
          <Check size={20} className="text-white" />
        </div>

        <div className="space-y-4">
          <p>Partnership Summary</p>

          <p className="text-sm text-neutral-500 leading-6">
            As a verified C-Ride partner, you have access to our complete suite
            of tools and services. Your monthly fee of{' '}
            <span className="text-primary-text-100">850 NGN</span> ensures
            continuous access to the platform, while our{' '}
            <span className="text-primary-text-100">free device</span> helps you
            manage orders efficiently.
          </p>

          <div className="flex flex-col md:flex-row w-full items-center gap-4">
            <Button variant="green" size="md" className="w-full md:w-auto">
              Learn More About Benefits
            </Button>

            <Button variant="outline" size="md" className="bg-white w-full md:w-auto">
              Download Fee Schedule
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export function FeeInfo() {
  return (
    <Card
      className="p-4  flex flex-col md:flex-row items-start gap-4 md:gap-8"
      gap="sm"
      spacing="md"
    >
      <div
        className=" bg-linear-to-b from-[#8B5CF6] to-[#6D28D9] w-10 h-10 rounded-xl flex items-center justify-center shrink-0 aspect-square
            "
      >
        <Info size={20} className="text-white" />
      </div>

      <div className="space-y-4">
        <p>Need Help Understanding Fees?</p>

        <p className="text-sm text-neutral-500 leading-6">
          Our partner support team is here to help you understand your fee
          structure and maximize your earnings on the C-Ride platform.
        </p>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="md">
            Contact Partner Support
          </Button>

          <Button variant="outline" size="md">
            View FAQ
          </Button>
        </div>
      </div>
    </Card>
  );
}
