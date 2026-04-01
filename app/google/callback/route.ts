// app/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  console.log('📍 Google Callback Hit:', {
    url: request.url,
    cookies: request.cookies.getAll().map((c) => c.name),
    hasAccessToken: !!request.cookies.get('accessToken'),
  });

  if (error) {
    console.error('Backend sent error:', error);
    const redirectUrl = new URL('/user/login', request.url);
    redirectUrl.searchParams.set(
      'error',
      error || message || 'Google login failed',
    );
    return NextResponse.redirect(redirectUrl);
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    console.error('❌ No accessToken cookie received from backend');

    const redirectUrl = new URL('/user/login', request.url);
    redirectUrl.searchParams.set(
      'error',
      'Google login succeeded, but cookies were not set. Check backend CORS & cookie settings.',
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Decode role safely
  let userRole = 'CUSTOMER';
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString(),
    );
    userRole = payload.role || 'CUSTOMER';
  } catch (e) {
    console.warn('⚠️ Could not decode role from token');
  }

  // Role-based redirect
  let redirectPath = '/user/dashboard';
  if (userRole === 'VENDOR') redirectPath = '/vendor/store';
  else if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN')
    redirectPath = '/admin/dashboard';
  else if (userRole === 'DRIVER') redirectPath = '/driver/dashboard';

  console.log(`✅ Success! Role: ${userRole} → Redirecting to ${redirectPath}`);

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
