import Card from '@/components/layout/card';
import { Shield, ShieldUser } from 'lucide-react';

export default function AdminCard({
  user,
}: {
  user: {
    id: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR' | 'CUSTOMER';
  } | null;
}) {
  return (
    <Card spacing="sm" gap="sm" className="bg-primary/10">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-border">
          <ShieldUser size={20} className="text-neutral-800" />
        </div>

        <div className="w-full flex flex-col gap-y-1.5  min-w-0">
          <p className="font-medium text-primary-text-100 text-sm wrap-break-word">
            {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
          </p>
          <p className="text-[10px]  truncate block flex-wrap text-neutral-500 wrap-break-word">
            {user?.email}
          </p>

          <p className="text-[10px]  truncate block flex-wrap text-neutral-500 wrap-break-word">
            {user?.id}
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center ">
        <span className="flex w-fit items-center justify-center gap-0.5 rounded-full bg-[#10B981]/20  px-1 py-1  text-[8px] text-[#10B981] border border-[#10B981] ">
          <Shield strokeWidth={0} size={12} fill="#10B981" />
          {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
        </span>
      </div>
    </Card>
  );
}
