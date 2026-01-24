

export default function OnboardingFormHeader({
  title,
  subtitle,
  headerIcon,
}: {
  title: string;
  subtitle: string;
  headerIcon: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {headerIcon}

        <span className="md:text-lg ">{title}</span>
      </div>

      <p className="text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}
