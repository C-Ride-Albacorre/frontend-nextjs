import { Clock, TrendingUp, Wallet } from 'lucide-react';

import Card from '@/components/layout/card';
import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';

import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import AnalyticsInfoCard from '@/features/vendor/analytics/components/info-card';
import AnalyticsSection from '@/features/vendor/analytics/components/section';

export default function VendorPerformancePage() {
  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <Card gap="sm" spacing="sm" className=" p-4 shadow">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <AnalyticsInfoCard
                icon={<Wallet size={24} className="text-[#10B981]" />}
                iconBackground="bg-[#10B981]/10"
                status="Active"
                title="Wallet Balance"
                amount="₦1,250,000.00"
                buttonText="Request Payout"
              />

              <AnalyticsInfoCard
                icon={<Clock size={24} className="text-primary-text-100" />}
                iconBackground="bg-neutral-100"
                title="Pending Payout"
                amount="₦185,000.00"
                footNote="Processing in 3-5 days"
              />

              <AnalyticsInfoCard
                icon={<TrendingUp size={24} className="text-primary" />}
                iconBackground="bg-primary/10"
                title="Last Payout"
                amount="₦450,000.00"
                footNote="Nov 20, 2025"
              />
            </div>
          </Card>

          <AnalyticsSection />
        </SectionLayout>
      </MainLayout>
    </>
  );
}
