import Card from '@/components/layout/card';
import AuthFormHeader from '@/components/ui/headers/auth-form-header';

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="min-h-screen bg-neutral-50  flex items-center justify-center px-4 py-4">
        <Card
          gap="lg"
          spacing="lg"
          className="w-full max-w-3xl text-center bg-white "
        >
          <AuthFormHeader />
          {children}
        </Card>
      </section>
    </>
  );
}
