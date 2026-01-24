import { Mail } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import ButtonPrevious from '@/components/ui/buttons/button-previous';
import ButtonProceed from '@/components/ui/buttons/button-proceed';

export default function BusinessContactInfoForm() {
  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Contact Details"
        subtitle="How can we reach you ?"
        headerIcon={<Mail size={24} className="text-primary" />}
      />

      <form action="" className="space-y-6">
        <Input
          id="businessEmail"
          label="Business Email Address"
          type="email"
          placeholder="Enter your business email"
        />

        <Input
          id="businessPhone"
          label="Business Phone Number"
          type="tel"
          placeholder="Enter your business phone number"
          inputInfo="For urgent order update"
        />

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <ButtonPrevious
            href="/onboarding/business-info"
            buttonText="Previous"
          />

          <ButtonProceed
            href="/onboarding/business-address"
            buttonText="Proceed"
          />
        </div>
      </form>
    </section>
  );
}
