import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

export default function BusinessAddressForm() {
  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Business Address"
        subtitle="Where is your business located?"
        headerIcon={<MapPin size={24} className="text-primary" />}
      />

      <form action="" className="space-y-6">
        <Input
          id="businessAddress"
          label="Business Street Address"
          type="text"
          placeholder="123 Business Street"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input id="city" label="City" type="text" placeholder="Lekki" />

          <Input id="state" label="State" type="text" placeholder="Lagos" />
        </div>

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <Button
            href="/onboarding/business-contact"
            variant="outline"
            size="lg"
            leftIcon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>

          <Button
            href="/onboarding/business-bank"
            variant="primary"
            size="lg"
            rightIcon={<ChevronRight size={16} />}
          >
            Proceed
          </Button>

          {/* <ButtonPrevious
            href="/onboarding/business-contact"
            buttonText="Previous"
          />

          <ButtonProceed
            href="/onboarding/business-bank"
            buttonText="Proceed"
          /> */}
        </div>
      </form>
    </section>
  );
}
