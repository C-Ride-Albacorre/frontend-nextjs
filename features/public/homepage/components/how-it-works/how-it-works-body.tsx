import Image from 'next/image';
import { Check } from 'lucide-react';
import { TABS_CONTENT } from '@/features/public/homepage/data';

export default function HowItWorksBody({
  activeTab,
}: {
  activeTab: keyof typeof TABS_CONTENT;
}) {
  return (
    <>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* ================= IMAGE ================= */}
        <div className="relative mx-auto aspect-square w-80 md:w-96 rounded-full overflow-visible">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={TABS_CONTENT[activeTab].image}
              alt={activeTab}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Badge */}
          <div className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/4 z-10">
            <Image
              src="/assets/svg/cride-green.svg"
              alt="C-ride badge"
              width={72}
              height={72}
            />
          </div>
        </div>

        {/* ================= LIST ================= */}
        <div>
          <ul className="flex flex-col gap-6 text-sm text-primary-text-100">
            {TABS_CONTENT[activeTab].list.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="p-2">
                  <Check className="h-6 w-6 p-1.5 rounded-full bg-primary-text-100 text-primary" />
                </div>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
