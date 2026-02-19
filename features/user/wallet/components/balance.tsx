'use client'

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { History, Plus } from 'lucide-react';
import { useState } from 'react';
import AddFunds from './add-funds';

export default function WalletBalance() {
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  return (
    <>
      <Card gap="lg" className="bg-primary">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-2xl font-medium">C-Ride Wallet</h2>

          <span className="text-xs bg-[#10B891] rounded-full py-1 px-2">
            Active
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-neutral-600">Available Balance</p>

          <p className="text-2xl md:text-4xl font-medium">₦ 15,750.00</p>
        </div>

        <div className="space-x-6">
          <Button
            variant="white"
            leftIcon={<Plus size={20} />}
            className="text-sm"
            size="2xl"
            onClick={() => setIsAddFundsModalOpen(true)}
          >
            Add Funds
          </Button>

          <Button
            variant="white"
            leftIcon={<History size={20} />}
            className="text-sm"
            size="2xl"
          >
            History
          </Button>
        </div>
      </Card>

      {isAddFundsModalOpen && (
        <AddFunds
          isModalOpen={isAddFundsModalOpen}
          onClose={() => setIsAddFundsModalOpen(false)}
        />
      )}
    </>
  );
}
