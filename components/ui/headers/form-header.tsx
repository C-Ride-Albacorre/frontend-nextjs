

export default function FormHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`text-center space-y-2 ${className}`}>
      <h2 className=" text-xl md:text-2xl font-semibold">{title}</h2>

      <p className="text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}
