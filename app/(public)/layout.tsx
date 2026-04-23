import Footer from '@/components/layout/footer';
import NavBarWrapper from '@/components/navigation/navbar-wrapper';
import Cta from '@/features/public/homepage/components/cta';
import FAQSection from '@/features/public/homepage/components/faq';
import HowItWorks from '@/features/public/homepage/components/how-it-works-content';

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarWrapper />
      <div>{children}</div>
      <HowItWorks />
      <FAQSection />
      <Cta />
      <Footer />
    </>
  );
}
