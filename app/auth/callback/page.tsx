import { redirect } from 'next/navigation';

export default async function GoogleAuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}) {
  const { success, error } = await searchParams;

  if (error || success !== 'true') {
    redirect('/user/login?error=google_failed');
  }

  // ✅ tokens already set as cookies by backend — just redirect
  redirect('/user/dashboard');
}
