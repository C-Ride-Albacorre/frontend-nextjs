// app/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('🔄 Google Callback Received:', {
    fullUrl: request.url,
    cookiesPresent: request.cookies
      .getAll()
      .map((c) => ({ name: c.name, value: c.value ? '***' : null })),
  });

  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  if (error) {
    console.error('Backend returned error:', error);
    const redirectUrl = new URL('/user/login', request.url);
    redirectUrl.searchParams.set(
      'error',
      error || message || 'Google login failed',
    );
    return NextResponse.redirect(redirectUrl);
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken) {
    console.error('❌ No accessToken cookie found in callback');
    const redirectUrl = new URL('/user/login', request.url);
    redirectUrl.searchParams.set(
      'error',
      'Google login completed but cookies were not received. Please check backend CORS and cookie settings.',
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Decode role from token
  let userRole = 'CUSTOMER';
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString(),
    );
    userRole = payload.role || 'CUSTOMER';
  } catch (e) {
    console.warn('⚠️ Failed to decode role from accessToken');
  }

  // Role-based redirect
  let redirectPath = '/user/dashboard';
  if (userRole === 'VENDOR') redirectPath = '/vendor/store';
  else if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN')
    redirectPath = '/admin/dashboard';
  else if (userRole === 'DRIVER') redirectPath = '/driver/dashboard';

  console.log(
    `✅ Google Login Success → Role: ${userRole} | Redirecting to: ${redirectPath}`,
  );

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
