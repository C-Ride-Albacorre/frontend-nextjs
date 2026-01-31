export default function Stepper({ 
  STEPS,
  currentStep,
}: {
  STEPS: readonly string[];
  currentStep: number;
}) {
  return (
    <div className="mt-6 hidden rounded-xl bg-foreground-200 p-6 md:block py-10">
      <ol className="flex w-full items-start">
        {STEPS.map((step, index) => {
          // Only show checkmark if we've moved PAST this step (not on it)
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <li
              key={step}
              className={`relative flex w-full flex-col items-center
            ${
              !isLast
                ? `
                  after:absolute
                  after:top-6
                  after:left-[calc(50%+38px)]
                  after:h-0.75
                  after:w-[calc(100%-76px)]
                  after:rounded-full
                `
                : ''
            }
            ${
              !isLast && isCompleted
                ? 'after:bg-primary'
                : !isLast
                  ? 'after:bg-[#E8E8E8] '
                  : ''
            }
          `}
            >
              {/* Circle */}
              <span
                className={`z-10 flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium
              ${
                isCompleted
                  ? 'bg-primary text-primary-text-100 border-4 border-border'
                  : isActive
                  ? 'bg-primary text-primary-text-100 border-4 border-border'
                  : 'border border-[#E8E8E8] bg-white text-neutral-400'
              }`}
              >
                {/* Only show checkmark for completed (past) steps, always show number for current and future */}
                {isCompleted ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>

              {/* Label */}
              <span
                className={`mt-3 text-xs text-center
              ${
                isCompleted || isActive
                  ? 'font-medium text-primary-text-100'
                  : 'text-neutral-400'
              }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}