import { Plus } from 'lucide-react';

export default function DeliverySummary() {
  return (
    <div className="rounded-2xl border border-border p-6 text-center">
      <div className="flex justify-between">
        <h3 className="font-semibold">Delivery Summary</h3>
        <span className="text-xs text-neutral-500">View All</span>
      </div>

      <div className="mt-16 space-y-4">
        <p className="font-medium text-sm">
          You have No Active Order or Delivery
        </p>
        <p className="text-sm text-neutral-500 max-w-xs mx-auto">
          You do not have any order or delivery. Make a new order by clicking
          the button below
        </p>

        <button className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-foreground-100 px-6 py-3 text-sm">
          <span className="bg-white rounded-full p-1">
            <Plus size={16} />
          </span>
          Order Now
        </button>
      </div>
    </div>
  );
}
