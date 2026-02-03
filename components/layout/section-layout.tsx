export default function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="space-y-8 px-4 lg:px-8">{children}</section>;
}
