import { TABS_CONTENT, TabKey } from '@/features/public/homepage/data';

export default function HowItWorksTab({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) {
  return (
    <>
      {/* ================= TABS ================= */}
      <div className="mt-8 flex justify-center">
        <div className="flex rounded-2xl border border-border px-1 py-1.5 md:px-2 md:py-2 gap-2 bg-foreground-200 text-xs md:text-sm">
          {(Object.keys(TABS_CONTENT) as TabKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === key
                  ? 'bg-primary text-primary-text-100 shadow-sm'
                  : 'text-neutral-500 hover:bg-white/60'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
