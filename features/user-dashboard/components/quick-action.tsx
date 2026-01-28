import Link from 'next/link';

export default function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={`/user/dashboard/${label.trim().toLowerCase().replace(/\s+/g, '-')}`}
      className="rounded-2xl border border-border p-6 flex flex-col gap-8 bg-foreground-200 hover:bg-foreground-100 transition"
    >
      <div className="h-12 w-12  text-primary">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
