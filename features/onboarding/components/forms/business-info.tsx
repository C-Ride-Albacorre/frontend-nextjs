import { Store } from 'lucide-react';

import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import ButtonPrevious from '@/components/ui/buttons/button-previous';
import ButtonProceed from '@/components/ui/buttons/button-proceed';
import OnboardingFormHeader from '../form-header';

export default function BusinessInfoForm() {
  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Business Information"
        subtitle="Tell us about your business"
        headerIcon={<Store size={24} className="text-primary" />}
      />

      <form action="" className="space-y-6">
        <Input
          id="businessName"
          label="Business Name"
          type="text"
          placeholder="Enter your business name"
        />

        <Input
          id="businessType"
          label="Business Type"
          type="text"
          placeholder="Enter your business type"
        />

        <Textarea
          id="businessDescription"
          label="Business Description"
          placeholder="Briefly describe what your business offers"
        />

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <ButtonPrevious href="/vendor/register" buttonText="Previous" />

          <ButtonProceed href="/onboarding/business-contact" buttonText="Proceed" />
        </div>
      </form>
    </section>
  );
}
