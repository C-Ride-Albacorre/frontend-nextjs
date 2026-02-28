import { NextRequest, NextResponse } from 'next/server';
import { getTokenExpiry } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  console.log('🔥 CALLBACK ROUTE HIT', {
    url: request.url,
    cookies: request.cookies.getAll().map((c) => c.name),
  });

  const { searchParams } = new URL(request.url);
  const success = searchParams.get('success');
  const error = searchParams.get('error');

  if (error || success !== 'true') {
    console.log('Failed at success check:', { success, error });
    return NextResponse.redirect(
      new URL('/user/login?error=google_failed', request.url),
    );
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  console.log('Cookie check:', {
    accessToken: accessToken ? 'present' : 'missing',
    refreshToken: refreshToken ? 'present' : 'missing',
    allCookies: request.cookies.getAll().map((c) => c.name),
  });

  if (!accessToken) {
    return NextResponse.redirect(
      new URL('/user/login?error=google_failed', request.url),
    );
  }

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
