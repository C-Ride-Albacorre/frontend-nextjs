import { STEPS } from '@/features/vendor-dashboard/data';
import { CheckCircle } from 'lucide-react';

export default function OnboardingStepsLayout() {
  return (
    <section className="rounded-2xl border border-border bg-white px-4 py-8 md:px-10 space-y-10 w-full">
      {/* ================= STATUS HEADER ================= */}
      <div className="flex items-start gap-4">
        <div
          className="flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-full bg-emerald-100  shrink-0 
    aspect-square"
        >
          <CheckCircle size={20} className="text-emerald-600" />
        </div>

        <div className="space-y-1.5 md:space-y-1">
          <p className="font-medium text-neutral-900">Onboarding Complete</p>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl">
            Your account was approved on 2024-01-20. All verification steps
            completed successfully.
          </p>
        </div>
      </div>

      {/* ================= STEPPER ================= */}
      <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-0">
        {STEPS.map((step, index) => {
          const isLast = index === STEPS.length - 1;

          return (
            <div
              key={step.label}
              className="relative flex md:flex-1 md:flex-col md:items-center gap-4 md:gap-2 text-left md:text-center"
            >
              {/* CONNECTOR */}
              {!isLast && (
                <>
                  {/* Mobile: vertical line */}
                  <div className="absolute left-4 top-8 md:top-10 h-full w-0.5 bg-emerald-500/25 md:hidden" />

                  {/* Desktop: horizontal line */}
                  <div className="absolute top-5 left-1/2 w-full h-0.5 bg-emerald-500/25 hidden md:block" />
                </>
              )}

              {/* ICON */}
              <div className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0">
                <CheckCircle size={16} />
              </div>

              {/* TEXT */}
              <div className="space-y-1.5 md:space-y-0.5">
                <p className=" md:text-xs font-medium md:text-neutral-700 text-neutral-900">
                  Step {index + 1}
                </p>
                <p className="text-xs text-neutral-500 md:text-neutral-600">
                  {step.label}
                </p>
                <p className="text-xs text-emerald-600">{step.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
