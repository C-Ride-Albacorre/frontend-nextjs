import Image from 'next/image';
import Link from 'next/link';

export default function AuthFormHeader() {
  return (
    <div className="mb-8 text-center">
      <Link href="/" className="inline-block">
        <Image
          src="/assets/Svg/logo-main.svg"
          alt="Logo"
          width={120}
          height={40}
        />
      </Link>

      <p className="mt-2 text-sm text-neutral-500">
        Begin your journey with care
      </p>
    </div>
  );
}
