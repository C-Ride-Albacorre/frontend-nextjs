import { CreditCard } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import Input from '@/components/ui/inputs/input';
import ButtonPrevious from '@/components/ui/buttons/button-previous';
import ButtonProceed from '@/components/ui/buttons/button-proceed';

export default function BusinessBankForm() {
  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Bank Details"
        subtitle="For receiving payments"
        headerIcon={<CreditCard size={24} className="text-primary" />}
      />

      <form action="" className="space-y-6">
        <Input
          id="businessBankName"
          label="Business Bank Name"
          type="text"
          placeholder="Enter your business Bank name"
        />

        <Input
          id="businessAccountNumber"
          label="Business Account Number"
          type="number"
          placeholder="Enter your business account number"
        />

        <Input
          id="businessAccountName"
          label="Business Account Name"
          type="text"
          placeholder="Enter your account name"
          inputInfo="Must match your business name"
        />

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <ButtonPrevious
            href="/onboarding/business-address"
            buttonText="Previous"
          />

          <ButtonProceed
            href="/vendor/register"
            buttonText="Proceed"
          />
        </div>
      </form>
    </section>
  );
}
