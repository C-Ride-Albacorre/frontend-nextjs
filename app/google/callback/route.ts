// app/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  // If backend returned an error in query params
  if (error) {
    console.error('Google OAuth callback error from backend:', error);
    const redirectUrl = new URL('/user/login', request.url);
    redirectUrl.searchParams.set('error', error || message || 'Google login failed');
    return NextResponse.redirect(redirectUrl);
  }

  // Backend has already set the httpOnly cookies (accessToken + refreshToken)
  // We just need to decode the role (from the accessToken in cookies) and redirect

  try {
    const cookieStore = request.cookies;
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      console.warn('No accessToken cookie found after Google callback');
      const redirectUrl = new URL('/user/login', request.url);
      redirectUrl.searchParams.set('error', 'Login successful but session not created. Please try again.');
      return NextResponse.redirect(redirectUrl);
    }

    // Safely decode role from JWT payload (no external library needed)
    let userRole = 'CUSTOMER';
    try {
      const payload = JSON.parse(
        Buffer.from(accessToken.split('.')[1], 'base64').toString()
      );
      userRole = payload.role || 'CUSTOMER';
    } catch (decodeErr) {
      console.warn('Failed to decode role from accessToken:', decodeErr);
    }

    // Role-based redirect
    let redirectPath = '/user/dashboard';

    if (userRole === 'VENDOR') {
      redirectPath = '/vendor/store';
    } else if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
      redirectPath = '/admin/dashboard';
    } else if (userRole === 'DRIVER') {
      redirectPath = '/driver/dashboard';   // ← Change if your driver route is different
    }

    console.log(`✅ Google login successful → ${userRole} redirected to ${redirectPath}`);

    return NextResponse.redirect(new URL(redirectPath, request.url));

  } catch (err) {
    console.error('Error in Google callback route:', err);

    const errorUrl = new URL('/user/login', request.url);
    errorUrl.searchParams.set('error', 'Something went wrong after Google login. Please try again.');
    return NextResponse.redirect(errorUrl);
  }
}