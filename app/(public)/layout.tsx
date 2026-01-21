import Footer from '@/components/layout/footer';
import NavBar from '@/components/layout/nav-bar';
import Cta from '@/features/public/homepage/components/cta';
import FAQSection from '@/features/public/homepage/components/faq';
import HowItWorks from '@/features/public/homepage/components/how-it-works-content';

import '../globals.css';

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <HowItWorks />
      <FAQSection />
      <Cta />
      <Footer />
    </>
  );
}
