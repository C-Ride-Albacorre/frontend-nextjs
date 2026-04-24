export default function FoodMarqueeSkeleton() {
  return (
    <section className="py-14">
      <div className="grid grid-cols-4 gap-4 px-6 max-w-6xl mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    </section>
  );
}
