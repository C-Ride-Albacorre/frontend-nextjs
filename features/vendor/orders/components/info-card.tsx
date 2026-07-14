import Card from "@/components/layout/card";

export default function InfoCard({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Card border="none" gap="xs" spacing="sm" className=" bg-foreground-200">
      <div className="flex gap-2">
        {icon && <div>{icon}</div>}

        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            {label}
          </p>

          <h2 className="font-medium wrap-break-word text-sm">{value}</h2>
        </div>
      </div>
    </Card>
  );
}