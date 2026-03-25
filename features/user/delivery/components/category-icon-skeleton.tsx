export default function CategoryIconsSkeleton() {
  return (
    <section>
      <div className="flex flex-wrap gap-12 justify-center md:justify-between items-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center animate-pulse"
          >
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full  bg-linear-to-r from-neutral-100 to-neutral-200" />
            <div className="mt-3 h-3 w-12 rounded bg-linear-to-r from-neutral-100 to-neutral-200" />
          </div>
        ))}
      </div>
    </section>
  );
}
