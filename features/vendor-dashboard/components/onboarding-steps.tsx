import { STEPS } from '@/features/vendor-dashboard/data';

import { CheckCircle } from 'lucide-react';

export default function OnboardingStepsLayout({

}: {

}) {
  return (
    <section className="rounded-2xl border border-border bg-white  py-8 px-10 space-y-12">
      {/* STATUS HEADER */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle size={20} className="text-emerald-600" />
        </div>

        <div className="space-y-1.5">
          <p className="font-medium text-neutral-900">Onboarding Complete</p>
          <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
            Your account was approved on 2024-01-20. All verification steps
            completed successfully.
          </p>
        </div>
      </div>

      {/* ================= STEPPER ================= */}
      <div className="flex justify-between">
        {STEPS.map((step, index) => {
          const isLast = index === STEPS.length - 1;

          return (
            <div
              key={step.label}
              className="relative flex-1 text-center space-y-2.5"
            >
              {/* Connector — only between steps */}
              {!isLast && (
                <div className="absolute top-5 left-1/2 w-full h-[2px] bg-emerald-500/25" />
              )}

              <div className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                <CheckCircle size={18} />
              </div>

              <p className="text-sm font-medium text-neutral-700">
                Step {index + 1}
              </p>
              <p className="text-xs text-neutral-500">{step.label}</p>
              <p className="text-[11px] text-emerald-500">{step.date}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
