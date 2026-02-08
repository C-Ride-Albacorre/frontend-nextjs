import { Check, FileText, Smartphone } from 'lucide-react';
import { BENEFITS } from '@/features/vendor/partner-program/data';
import { Button } from '@/components/ui/buttons/button';
import Card from '@/components/layout/card';

export default function Benefits() {
  return (
    <>
      <div className="bg-primary/10 rounded-xl border border-border p-4 flex flex-col md:flex-row items-start justify-between gap-6 ">
        <div className="bg-linear-to-b from-primary to-primary-hover w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square">
          <Smartphone size={24} className="text-white" />
        </div>

        <div className="space-y-6 flex-1">
          <p>Premium Partner Benefits</p>

          <p className="text-sm text-neutral-500">
            You're enjoying all the benefits of the C-Ride partner program,
            including a free device and access to our premium logistics network.
          </p>

          <ul className="flex  items-center gap-6 md:gap-12 flex-wrap">
            <li className="flex  items-center gap-2">
              <Check size={16} className="text-[#10B981]" />
              <span className="text-xs md:text-sm text-neutral-500">
                Device Activated
              </span>
            </li>

            <li className="flex  items-center gap-2">
              <Check size={16} className="text-[#10B981]" />
              <span className="text-xs md:text-sm text-neutral-500">
                Full Access
              </span>
            </li>

            <li className="flex  items-center gap-2">
              <Check size={16} className="text-[#10B981]" />
              <span className="text-xs md:text-sm text-neutral-500">
                24/7 Support
              </span>
            </li>
          </ul>
        </div>

        <Button
          leftIcon={<FileText size={16} />}
          variant="outline"
          size="sm"
          className="text-xs text-primary border-primary hover:bg-primary hover:text-white transition-transform bg-white"
        >
          View Full Details
        </Button>
      </div>

      <Card gap="md" spacing="sm" className="p-4">
        <div className="space-y-2">
          <p>What You Get</p>

          <p className="text-sm text-neutral-500">
            Comprehensive benefits included with your partnership
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, index) => (
            <li key={index}>
              <Card
                spacing="sm"
                gap="sm"
                className="p-4 flex sm:flex-col xl:flex-row items-start gap-8 "
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 aspect-square rounded-xl mb-0">
                  <benefit.icon size={20} className="text-primary" />
                </div>

                <div className="space-y-2 mb-0">
                  <p>{benefit.title}</p>

                  <p className="text-sm text-neutral-500">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
