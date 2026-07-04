import Card from '@/components/layout/card';
import { Lock, LockIcon, Shield, ShieldUser } from 'lucide-react';

export default function AdminCard({
  user,
}: {
  user: {
    id: string;

    type: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR' | 'CUSTOMER';
  } | null;
}) {
  console.log('User Info :', user);
  return (
    <Card border="none" spacing="sm" gap="sm" className="bg-primary/10 shadow">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-border">
          <ShieldUser size={20} className="text-neutral-800" />
        </div>

        <div className="w-full flex flex-col gap-y-3  min-w-0">
          <div className=" flex justify-between ">
            <p className="font-medium text-primary-text-100 text-sm wrap-break-word">
              {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
            </p>
          </div>

          <div className="text-[8px] bg-primary-text-100 rounded-2xl  wrap-break-word capitalize w-fit px-2 py-1 text-primary flex gap-1 items-center shadow-2xl">
            <LockIcon size={8} className="" />
            {user?.type}
          </div>

          <p className="text-[10px]  truncate block flex-wrap  wrap-break-word">
            {user?.email}
          </p>

          {/* <p className="text-[10px]  truncate block flex-wrap text-neutral-500 wrap-break-word">
            {user?.id}
          </p> */}
        </div>
      </div>

      {/* <div className="flex justify-end items-center ">
        <span className="flex w-fit items-center justify-center gap-0.5 rounded-full bg-[#10B981]/20  px-1 py-1  text-[8px] text-[#10B981] border border-[#10B981] ">
          <Shield strokeWidth={0} size={12} fill="#10B981" />
          {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
        </span>
      </div> */}
    </Card>
  );
}
