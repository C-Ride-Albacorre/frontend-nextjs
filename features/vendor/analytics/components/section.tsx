'use client';

import { useState } from 'react';

import { MOCK_DATA } from '@/features/vendor/analytics/data';

import { Period } from '@/features/vendor/analytics/type';
import AnalyticsPeriodTabs from '@/features/vendor/analytics/components/period-tabs';
import AnalyticsStatCards from '@/features/vendor/analytics/components/stat-cards';
import AnalyticsTransactions from '@/features/vendor/analytics/components/transaction';
import AnalyticsCommission from '@/features/vendor/analytics/components/commission';
import AnalyticsInvoice from '@/features/vendor/analytics/components/invoice';

export default function AnalyticsSection() {
  const [period, setPeriod] = useState<Period>('week');

  const data = MOCK_DATA[period];

  return (
    <>
      <section className="space-y-4">
        <AnalyticsPeriodTabs
          setPeriod={(period) => setPeriod(period as Period)}
        />

        <AnalyticsStatCards data={data} />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-6 gap-8">
        <AnalyticsTransactions data={data} />

        <section className="xl:col-span-2 space-y-8">
          <AnalyticsCommission data={data} />

          <AnalyticsInvoice data={data} />
        </section>
      </section>
    </>
  );
}
