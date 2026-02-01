export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-white py-6 lg:py-6 space-y-8 lg:space-y-12">
      {children}
    </section>
  );
}
