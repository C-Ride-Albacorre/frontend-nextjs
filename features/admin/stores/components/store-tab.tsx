// features/admin/stores/components/store-tabs.tsx

import { Button } from "@/components/ui/buttons/button";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { key: 'all', label: 'All Stores' },
  { key: 'PENDING_APPROVAL', label: 'Pending Approval' },
  { key: 'ACTIVE', label: 'Active' },
  { key: 'REJECTED', label: 'Rejected' },
  { key: 'SUSPENDED', label: 'Suspended' },
  { key: 'INACTIVE', label: 'Inactive' },
];

export default function StoreTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          type="button"
          size="icon"
          onClick={() => setActiveTab(tab.key)}
          className={` border text-sm
            ${
              activeTab === tab.key
                ? 'bg-primary border-primary'
                : 'bg-white text-neutral-600 border-border hover:bg-neutral-50'
            }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
