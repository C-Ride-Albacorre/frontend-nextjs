import AdminLoginForm from '@/features/auth/components/admin/login';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <Loader2 size={24} className="animate-spin text-primary mx-auto" />
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
