import Image from 'next/image';
import Link from 'next/link';

export default function AuthFormHeader() {
  return (
    <div className="mb-8 text-center">
      <Link href="/" className="inline-block">
        <Image
          src="/assets/svg/logo-main.svg"
          alt="Logo"
          width={120}
          height={48}
        />
      </Link>

      <p className="mt-2 text-sm text-neutral-500">
        Begin your journey with care
      </p>
    </div>
  );
}
