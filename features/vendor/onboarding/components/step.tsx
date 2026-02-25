'use client';

import { usePathname } from 'next/navigation';

import Stepper from '@/components/navigation/stepper';
import { STEPS } from '@/features/vendor/onboarding/data';

export default function OnboardingSteps() {
  const path = usePathname();


  const currentStep = (() => {
    if (path.endsWith('/business-document')) return 4;
    if (path.endsWith('/business-bank')) return 3;
    if (path.endsWith('/business-address')) return 2;
    if (path.includes('/business-contact')) return 1;
    if (path.includes('/business-info')) return 0;
    return 0; 
  })();

  return <Stepper STEPS={STEPS} currentStep={currentStep} />;
}
