import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import Header from '@/components/ui/headers/user-route-header';
import Input from '@/components/ui/inputs/input';
import ContactCard from '@/features/user/help-center/components/contact-card';
import FAQs from '@/features/user/help-center/components/faqs';
import QuickLinks from '@/features/user/help-center/components/quick-links';
import SupportTicket from '@/features/user/help-center/components/support-ticket';
import { CheckCircle2, Clock, FileText, SearchIcon } from 'lucide-react';

export default function HelpCenterPage() {
  return (
    <>
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <Header />

        <div>
          <Input
            leftIcon={<SearchIcon size={16} />}
            placeholder="Search for help"
          />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-12">
            <ContactCard />

            <FAQs />
          </section>

          <section className="space-y-12 w-full">
            <SupportTicket />

            <QuickLinks />
          </section>
        </section>
      </main>
    </>
  );
}
