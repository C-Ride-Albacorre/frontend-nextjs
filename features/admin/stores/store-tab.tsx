import { Button } from '@/components/ui/buttons/button';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { key: 'active', label: 'Active Stores', count: 5 },
  { key: 'suspended', label: 'Suspended', count: 1 },
  { key: 'closed', label: 'Closed', count: 2 },
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

          <span className="bg-white/08 px-2 py-0.5 rounded-full text-xs">
            {tab.count}
          </span>
        </Button>
      ))}
    </div>
  );
}
