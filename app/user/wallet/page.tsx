import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import Header from '@/components/ui/headers/user-route-header';
import AddCard from '@/features/user/wallet/components/add-card';
import WalletBalance from '@/features/user/wallet/components/balance';
import TransactionBonusPoint from '@/features/user/wallet/components/bonus-point';
import WalletTransactions from '@/features/user/wallet/components/transactions';
import { DollarSign, Gift, History, Plus } from 'lucide-react';

export default function WalletPage() {
  return (
    <>
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <Header />

        <WalletBalance />

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-4">
            <TransactionBonusPoint />
            <AddCard />
          </div>

          <div className="md:col-span-2">
            <WalletTransactions />
          </div>
        </section>
      </main>
    </>
  );
}
