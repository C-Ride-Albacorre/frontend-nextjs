import Card from '@/components/layout/card';
import AuthFormHeader from '@/components/ui/headers/auth-form-header';

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <Card spacing='lg' className="w-full max-w-3xl bg-white text-center">
          <AuthFormHeader />
          {children}
        </Card>
      </main>
    </>
  );
}
