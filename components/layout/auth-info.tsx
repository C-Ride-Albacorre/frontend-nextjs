'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, Mail, Stars } from 'lucide-react';

export default function AuthInfo() {
  const path = usePathname();

  const register = path.includes('register');
  const login = path.includes('login');

  return (
    <div className="space-y-12 px-4  py-8 md:py-10 md:px-10">
      <div className="flex flex-col gap-0.5">
        <Link href="/">
          <Image
            src="/assets/svg/logo-main.svg"
            alt="C-ride Logo"
            width={120}
            height={48}
            priority
          />
        </Link>
        <span className="text-xs text-neutral-500 mt-4">Vendor Portal</span>
      </div>

      <div className="space-y-3 text-sm text-neutral-800">
        <p>Partner with Nigeria's Premier Luxury Delivery Platform</p>

        <p>
          Join our exclusive network of premium vendors and reach Lagos' most
          discerning customers.
        </p>
      </div>

      {login && (
        <div className="px-8 py-8 bg-primary/10 flex gap-6 rounded-2xl border border-border">
          <Stars size={24} className="text-primary" />

          <div className="space-y-6">
            <h6>Premium Partnership Benefits</h6>
            <ul className="list-disc list-inside space-y-4  text-sm text-neutral-800 marker:text-primary">
              <li>Real-time order management</li>

              <li>Performance analytics dashboard</li>

              <li>Direct customer communication</li>

              <li>Secure payment processing</li>
            </ul>
          </div>
        </div>
      )}

      {register && (
        <ul className="space-y-8 text-sm text-neutral-800">
          <li className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Stars size={20} className=" text-primary" />
            </div>

            <p>Access to high-net-worth clientele</p>
          </li>

          <li className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Home size={20} className=" text-primary" />
            </div>

            <p>Professional vendor dashboard</p>
          </li>

          <li className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Mail size={20} className=" text-primary" />
            </div>
            <p>Real-time order notifications</p>
          </li>
        </ul>
      )}

      <div className="border-t border-border py-8 text-neutral-800 text-sm italic">
        <p>
          "Beyond Delivery, It's Care" - Join vendors who prioritize excellence
        </p>
      </div>
    </div>
  );
}
