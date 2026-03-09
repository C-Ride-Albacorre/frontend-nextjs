import { CheckCircle2 } from 'lucide-react';

const STEPS = ['Product Details', 'Variants', 'Add-ons'];

interface AddProductStepProps {
  currentStep?: number;
}

export default function AddProductStep({
  currentStep = 0,
}: AddProductStepProps) {
  return (
    <ol className="flex items-start justify-between w-full text-[10px] sm:text-xs relative">
      {/* Background connecting line */}
      <div className="absolute left-8 right-8 top-4 h-px border-b border-border" />

      {STEPS.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === STEPS.length - 1;

        return (
          <li
            key={label}
            className={`flex flex-col w-full relative z-10 ${
              index === 0
                ? 'items-start'
                : isLast
                  ? 'items-end'
                  : 'items-center'
            }`}
          >
            <div
              className={`flex flex-col gap-2 ${
                index === 0
                  ? 'items-center'
                  : isLast
                    ? 'items-center'
                    : 'items-center'
              }`}
            >
              <div
                className={`w-8 h-8 flex justify-center items-center shrink-0 rounded-full font-medium ${
                  isCompleted
                    ? 'bg-[#10B981]'
                    : isActive
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={16} className="text-white" />
                ) : (
                  <span className={isActive ? 'text-white' : ''}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={`text-center leading-tight ${
                  isCompleted || isActive ? 'text-fg-brand' : 'text-neutral-400'
                }`}
              >
                {label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
