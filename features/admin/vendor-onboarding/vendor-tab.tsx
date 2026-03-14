import { Button } from '@/components/ui/buttons/button';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { key: 'all', label: 'All Vendors' },
  { key: 'PENDING_EMAIL_VERIFICATION', label: 'Pending Email' },
  { key: 'PENDING_PHONE_VERIFICATION', label: 'Pending Phone' },
  { key: 'PENDING_ONBOARDING', label: 'Pending Onboarding' },
  { key: 'UNDER_REVIEW', label: 'Under Review' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'ACTIVE', label: 'Active' },
  { key: 'REJECTED', label: 'Rejected' },
  { key: 'SUSPENDED', label: 'Suspended' },
];

export default function VendorTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {tabs.map((tab) => (
        <Button
          size="icon"
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm
          
          ${
            activeTab === tab.key
              ? 'bg-primary text-black border-primary'
              : 'bg-white text-neutral-600 border-border'
          }
          
          `}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
