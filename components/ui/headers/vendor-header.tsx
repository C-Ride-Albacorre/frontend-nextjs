export default function VendorDashboardHeader({pageTitle, pageDescription}: {pageTitle: string, pageDescription?: string}  ) {
  return (
    <header className="space-y-2 md:space-y-3 border-b border-border py-8 md:py-6  px-4 md:px-8">
      <h1 className=" text-2xl md:text-3xl font-semibold text-neutral-900">
    {pageTitle}
      </h1>
      {pageDescription && (
        <p className="text-sm text-neutral-500">
          {pageDescription}
        </p>
      )}
    </header>
  );
}
