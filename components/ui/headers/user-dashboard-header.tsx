import Image from 'next/image';
import Link from 'next/link';

import { User } from 'lucide-react';
import { profileService } from '@/features/user/profile/service';
import { ApiError } from '@/features/libs/api-error';
import { redirect } from 'next/navigation';

export default async function DashboardHeader() {
  let data;

  try {
    const result = await profileService();
    data = result.data;
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 401) {
      redirect('/user/login');
    }
    throw error;
  }

  const firstName = data.firstName.toLowerCase();

  return (
    <section className=" bg-linear-to-r from-primary to-primary/95  px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <Image
            src="/assets/svg/logo-black.svg"
            alt="Logo"
            width={140}
            height={66}
            priority
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-[2rem] font-semibold text-primary-text-100">
              Welcome back, <span className="capitalize">{firstName}</span>
            </h1>
            <p className="mt-1 text-sm text-primary-text-100/80">
              How may we serve you today?
            </p>
          </div>

          <Link
            href="/user/profile"
            className="flex p-3 items-center justify-center rounded-full bg-white/20"
          >
            <User className="h-5 w-5 text-primary-text-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
