'use client';

import { usePathname } from 'next/navigation';

import Stepper from '@/components/layout/stepper';
import { STEPS } from '@/features/onboarding/data';

export default function OnboardingSteps() {
  const path = usePathname();

  const currentStep = (() => {
    if (path.includes('business')) return 1;
    if (path.includes('contact')) return 2;
    if (path.includes('address')) return 3;
    if (path.includes('bank')) return 4;
    if (path.includes('documents')) return 5;
    return 0;
  })();

  return <Stepper STEPS={STEPS} currentStep={currentStep} />;
}
