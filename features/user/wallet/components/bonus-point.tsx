import Card from "@/components/layout/card";
import { DollarSign, Gift } from "lucide-react";

export default function TransactionBonusPoint() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Card className="text-sm flex flex-col md:flex-row gap-4 md:items-center w-full">
        <div
          className=" bg-[#10B981]/10 w-12 h-12 rounded-full flex items-center justify-center aspect-square shrink-0
                mb-0"
        >
          <Gift size={24} className="text-[#10B981]" />
        </div>
        <div className="space-y-2">
          <p className="text-neutral-500">Referral Earnings</p>

          <p className="text-base font-medium text-[#10B981]">₦ 2,500.00</p>
        </div>
      </Card>

      <Card className="text-sm flex flex-col md:flex-row gap-4 md:items-center w-full">
        <div
          className=" bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center aspect-square shrink-0
                mb-0"
        >
          <DollarSign size={24} className="text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-neutral-500">Loyalty Points</p>

          <p className="text-base font-medium text-primary">₦ 2,500.00</p>
        </div>
      </Card>
    </div>
  );
}
