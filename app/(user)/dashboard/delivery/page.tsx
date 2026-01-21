import Image from 'next/image';
import Link from 'next/link';

import { DELIVERY_TYPES } from '@/features/delivery/data';
import DeliveryHeader from '@/features/delivery/components/layout/delivery-header';

export default function CreateDeliveryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <DeliveryHeader id="" />

        {/* Subtitle */}
        <div className="mt-10">
          <h2 className="text-lg font-medium text-primary-text-100">
            What are you sending?
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Select the type of item for delivery
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {DELIVERY_TYPES.map((item) =>
            item.highlighted ? (
              <Link
                href={`/dashboard/delivery/${item.id}`}
                key={item.id}
                className="relative flex  items-center justify-between rounded-2xl bg-primary px-6 py-4  text-left transition hover:opacity-95 cursor-pointer"
              >
                {/* Left */}
                <div className="flex flex-col justify-around h-full py-2">
                  <item.icon className="h-6 w-6 text-primary-text-100" />
                  <p className="mt-6 font-medium text-primary-text-100 ">
                    {item.title}
                  </p>
                </div>

                {/* Image */}
                <div className="relative h-32 w-36 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />

                  {/* Badge */}
                  <span className="absolute right-1 top-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-primary-text-100 shadow-2xl">
                    {item.badge}
                  </span>

                  <div className="absolute inset-0 hidden md:block [background:linear-gradient(180deg,rgba(153,153,153,0)_54.34%,#201F23_95.39%)]" />

                  {/* Text */}
                  <div className="absolute bottom-1 left-1 text-[10px] text-white">
                    <p className="font-medium">{item.subtitle}</p>
                    <p className="opacity-80">{item.meta}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                href={`/${item.title
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                key={item.id}
                className="flex flex-col justify-around  px-6 py-6 gap-10 rounded-2xl border border-border bg-white  text-left hover:bg-foreground-100 cursor-pointer"
              >
                <item.icon className="h-6 w-6 text-primary" />
                <p className="text-sm font-medium text-primary-text-100">
                  {item.title}
                </p>
              </Link>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
