'use client';

import { useState } from 'react';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { ArrowDownLeft } from 'lucide-react';
import { MOCK_DATA } from '@/features/vendor/analytics/data';
import { Period } from '@/features/vendor/analytics/type';
import { Select, SelectOption } from '@/components/ui/inputs/select';

export default function WalletTransactions() {
  const [period, setPeriod] = useState<Period>('week');

  const transactions = MOCK_DATA[period].transactions;

  const periodOptions: SelectOption[] = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
  ];

  return (
    <Card
      gap="sm"
      spacing="sm"
      className="p-4 xl:col-span-4 flex flex-col justify-between min-h-full"
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Recent Transactions ({period})</p>

          <div className="w-40">
            <Select
              id="transactions"
              value={period}
              options={periodOptions}
              onChange={(value) => setPeriod(value as Period)}
            />
          </div>
        </div>

        <ul className="space-y-12 md:space-y-8 max-h-105 overflow-y-auto">
          {transactions.map((item: any) => (
            <li
              className="flex flex-col md:flex-row justify-between gap-4 md:gap-0"
              key={`${period}-${item.id}`}
            >
              <div className="flex-1 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 aspect-square bg-[#10B981]/10">
                  <ArrowDownLeft size={20} className="text-[#10B981]" />
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">{item.title}</p>

                  <div className="flex gap-6 text-sm text-neutral-400">
                    <p>{item.date}</p>
                  </div>
                </div>
              </div>

              <div className="md:text-right flex md:flex-col items-end gap-2">
                <p className="text-[#10B981] font-medium order-2 md:order-1">
                  {item.amount}
                </p>

                <span
                  className={`px-2 py-1 rounded-full ${
                    item.status === 'completed'
                      ? 'bg-[#10B981]/10 text-[#10B981]'
                      : 'bg-neutral-100 text-primary-text-100'
                  } text-[10px] order-1 md:order-2 inline-flex items-center justify-center w-max`}
                >
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {transactions.length > 5 && (
        <Button variant="outline" size="sm" className="w-full hover:bg-primary">
          View All Transactions
        </Button>
      )}
    </Card>
  );
}
