import PublicContent from '@/components/layout/public-content';
import { VENDOR_BENEFITS } from '@/features/public/data';

export default function VendorPage() {
  return (
    <>
      <PublicContent
        title="Deliver Unforgettable Customer Experiences"
        subtitle="Your reputation is defined by your last mile. C-Ride ensures your customers receive an experience that is consistent, safe, and premium, perfectly aligning with your brand's quality."
        href="/"
        heroImageSrc="/assets/image/hero-3.jpg"
        publicData={
          VENDOR_BENEFITS as unknown as { title: string; desc: string }[]
        }
        publicImageSrc="/assets/image/vendor.jpg"
      />
    </>
  );
}
