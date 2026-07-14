import Header from '@/components/ui/headers/user-route-header';

export default function UserOrderHistoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <Header />

      <div>
        {children}
      </div>
    </main>
  );
}
