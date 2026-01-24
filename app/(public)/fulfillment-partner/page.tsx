import { Truck } from 'lucide-react';

import PublicContent from '@/components/layout/public-content';
import { PARTNER_BENEFITS } from '@/features/public/data';

export default function FulfillmentPartnerPage() {
  return (
    <>
      <PublicContent
        title="Become a C-Ride Fulfillment Partner"
        subtitle="Elevate your earning potential.Deliver professionally. Join the most discerning car-based delivery ecosystem."
        href="/"
        heroImageSrc="/assets/image/hero-4.png"
        publicData={
          PARTNER_BENEFITS as unknown as { title: string; desc: string }[]
        }
        publicImageSrc="/assets/image/driver.jpg"
        partner={true}
        label={<Truck className="h-6 w-6 text-primary-text-100" />}
        partnerTitle="Become A Driver"
        partnerSubtitle="Accept delivery requests, navigate routes, and track your
                  performance."
        partnerHref="/vendor/register"
      />
    </>
  );
}
