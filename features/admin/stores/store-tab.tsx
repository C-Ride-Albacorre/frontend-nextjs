import { Button } from '@/components/ui/buttons/button';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { key: 'all', label: 'All Stores' },
  { key: 'PENDING_APPROVAL', label: 'Pending Approval' },
  { key: 'ACTIVE', label: 'Active' },
  { key: 'SUSPENDED', label: 'Suspended' },
  { key: 'REJECTED', label: 'Rejected' },
];

export default function StoreTabs({ activeTab, setActiveTab }: Props) {
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
