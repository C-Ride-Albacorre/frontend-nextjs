import Card from '@/components/layout/card';
import { getCurrentUser } from '@/utils/auth';
import { LockIcon, ShieldUser } from 'lucide-react';

export default async function AdminCard() {
  try {
    const admin = await getCurrentUser();

    console.log(' [AdminCard] Admin Data:', admin);

    if (!admin) {
      return (
        <Card
          border="none"
          spacing="sm"
          gap="sm"
          className="bg-primary/10 shadow"
        >
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center shrink-0 aspect-square">
              <ShieldUser size={16} className="text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-text-100 text-sm">
                No Admin
              </h2>
              <span className="text-xs text-neutral-500 leading-1">
                You have not created an admin yet.
              </span>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        border="none"
        spacing="sm"
        gap="sm"
        className="bg-primary/10 shadow"
      >
        <div className="flex  gap-3">
          <div className="h-10 w-10 rounded-md bg-primary-text-100 flex items-center justify-center shrink-0">
            <ShieldUser size={20} className="text-green-100" />
          </div>

          <div className="w-full flex flex-col gap-y-1.5  min-w-0">
            <h2 className="font-semibold text-neutral-800 text-sm wrap-break-word capitalize truncate block flex-wrap overflow-hidden whitespace-normal">
              {admin?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
            </h2>

            <p className="text-[10px]  truncate block flex-wrap text-neutral-500 wrap-break-word">
              {admin?.email}
            </p>

            {/* <p className="text-[10px]  truncate block flex-wrap text-neutral-500 wrap-break-word">
            {admin?.id}
          </p> */}
          </div>
        </div>

        <div className="text-[8px] bg-primary-text-100 rounded-2xl  wrap-break-word capitalize w-fit px-2 py-1 text-green-100 flex gap-1 items-center shadow-2xl">
          <LockIcon size={8} className=" text-green-100" />
          {admin?.type}
        </div>

        {/* <div className="flex justify-end items-center ">
        <span className="flex w-fit items-center justify-center gap-0.5 rounded-full bg-[#10B981]/20  px-1 py-1  text-[8px] text-[#10B981] border border-[#10B981] ">
          <Shield strokeWidth={0} size={12} fill="#10B981" />
          {admin?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
        </span>
      </div> */}
      </Card>
    );
  } catch (error) {
    console.error('Error fetching store data:', error);

    return (
      <Card
        border="none"
        spacing="sm"
        gap="sm"
        className="bg-primary/10 shadow"
      >
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center shrink-0 aspect-square">
            <ShieldUser size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-primary-text-100 text-sm">
              Error
            </h2>
            <span className="text-xs text-neutral-500 leading-1">
              {error instanceof Error
                ? error.message
                : 'An error occurred while fetching admin data.'}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}
