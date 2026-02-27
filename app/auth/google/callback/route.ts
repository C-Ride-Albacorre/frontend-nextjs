import { NextRequest, NextResponse } from 'next/server';
import { getTokenExpiry } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const success = searchParams.get('success');
  const error = searchParams.get('error');

  if (error || success !== 'true') {
    return NextResponse.redirect(
      new URL('/user/login?error=google_failed', request.url),
    );
  }

  // ✅ read tokens from cookies the backend set
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken) {
    return NextResponse.redirect(
      new URL('/user/login?error=google_failed', request.url),
    );
  }

  // ✅ re-set them properly with correct maxAge so they persist
  const response = NextResponse.redirect(
    new URL('/user/dashboard', request.url),
  );

  const isProd = process.env.NODE_ENV === 'production';

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: getTokenExpiry(accessToken),
  });

  if (refreshToken) {
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
      maxAge: getTokenExpiry(refreshToken),
    });
  }

  return response;
}
