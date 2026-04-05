// app/user/delivery/[id]/[slug]/delivery-type/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight, Clock, Loader2 } from 'lucide-react';
import { useOrderStore } from '@/features/user/delivery/order-store';
import { getDeliveryOptionsAction } from '@/features/user/delivery/action';

// 🔁 Swap these out once backend seeds real delivery options
const FALLBACK_OPTIONS = [
  {
    id: '290d07e7-60a5-4bb0-8883-9417b72fbe6q', // hardcoded UUID — replace later
    label: 'Standard Delivery',
    badge: 'Fast',
    description: 'Delivered within 60 – 90 mins',
    price: '₦ 2,000',
    duration: '60–90 mins',
  },
  {
    id: '120c07e7-60a5-4cc0-8883-9417b72fbh9r', // hardcoded UUID — replace later
    label: 'Express Delivery',
    badge: 'Urgent',
    description: 'Delivered within 30 – 45 mins',
    price: '₦ 4,000',
    duration: '30–45 mins',
  },
];

type DeliveryOption = {
  id: string;
  label?: string;
  name?: string;
  badge?: string;
  description?: string;
  price?: string;
  basePrice?: number;
  duration?: string;
  estimatedTime?: string;
};

function normalizeOption(opt: DeliveryOption, index: number) {
  return {
    id: opt.id,
    label: opt.label ?? opt.name ?? `Option ${index + 1}`,
    badge: opt.badge ?? (index === 0 ? 'Fast' : 'Urgent'),
    description: opt.description ?? 'Delivered to your doorstep',
    price: opt.price ?? (opt.basePrice ? `₦ ${opt.basePrice.toLocaleString()}` : '₦ —'),
    duration: opt.duration ?? opt.estimatedTime ?? '—',
  };
}

export default function DeliveryTypePage() {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const router = useRouter();
  const setDeliveryOption = useOrderStore((s) => s.setDeliveryOption);

  const [options, setOptions] = useState(FALLBACK_OPTIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDeliveryOptionsAction().then((result) => {
      if (result.success && result.data.length > 0) {
        // Real options exist — use them
        setOptions(result.data.map(normalizeOption));
      }
      // If empty, FALLBACK_OPTIONS stays in state — no UI change
      setIsLoading(false);
    });
  }, []);

  const handleSelect = (optionId: string) => {
    setDeliveryOption(optionId);
    router.push(`/user/delivery/${id}/${slug}/delivery-location`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ul className="space-y-8 text-sm">
      {options.map((option) => (
        <li key={option.id}>
          <button
            onClick={() => handleSelect(option.id)}
            className="w-full p-8 border border-border rounded-2xl flex items-center justify-between hover:bg-primary text-left cursor-pointer transition-colors"
          >
            <div className="space-y-6">
              <div className="flex gap-6 items-center">
                <h5 className="font-semibold text-xl">{option.label}</h5>
                <span className="text-xs px-4 py-1.5 bg-primary-text-100 text-primary rounded-3xl">
                  {option.badge}
                </span>
              </div>
              <p className="text-neutral-500 text-sm">{option.description}</p>
              <p className="flex gap-6 font-medium">
                <span>{option.price}</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} /> {option.duration}
                </span>
              </p>
            </div>
            <ChevronRight size={24} className="text-neutral-400" />
          </button>
        </li>
      ))}
    </ul>
  );
}