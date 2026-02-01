import type { Metadata } from 'next';

import OnboardingSteps from '@/features/vendor/onboarding/components/step';
import FormHeader from '@/components/ui/headers/form-header';

export const metadata: Metadata = {
  title: 'Onboarding | C-ride',
  description: 'Complete your onboarding to start delivering with C-ride.',
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-4  my-6 md:my-12">
        <div className="max-w-4xl mx-auto px-4  md:px-8 py-6 md:py-8 border border-border rounded-2xl space-y-6 md:space-y-12">
          <FormHeader
            title="Join C-Ride as a Vendor"
            subtitle="Partner with Nigeria's premier luxury delivery platform"
          />
          <OnboardingSteps />

          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
