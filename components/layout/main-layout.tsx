export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="space-y-6 pb-8">{children}</main>
    </>
  );
}
