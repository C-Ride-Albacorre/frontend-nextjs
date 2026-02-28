import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/config/api';
import { getTokenExpiry } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  try {
    // Forward all cookies from the browser to the backend
    // This is how the backend's httpOnly cookies reach /auth/profile
    const cookieHeader = request.headers.get('cookie') ?? '';

    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader, // forward browser cookies to backend
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const profile = await res.json();

    // Extract the tokens the backend set — they'll be in Set-Cookie on the
    // profile response or you can grab them from the incoming request cookies
    const accessToken =
      request.cookies.get('accessToken')?.value ??
      extractTokenFromSetCookie(res.headers.get('set-cookie'), 'accessToken');

    const refreshToken =
      request.cookies.get('refreshToken')?.value ??
      extractTokenFromSetCookie(res.headers.get('set-cookie'), 'refreshToken');

    if (!accessToken) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const isProd = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      success: true,
      role: profile.role, // e.g. 'CUSTOMER' or 'VENDOR'
    });

    // Set tokens as Next.js httpOnly cookies so middleware can read them
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: getTokenExpiry(accessToken),
    });

    if (refreshToken) {
      response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: getTokenExpiry(refreshToken),
      });
    }

    return response;
  } catch (err) {
    console.error('Google callback error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Helper: pull a specific cookie value out of a Set-Cookie header string
function extractTokenFromSetCookie(
  setCookieHeader: string | null,
  cookieName: string,
): string | null {
  if (!setCookieHeader) return null;
  const match = setCookieHeader
    .split(',')
    .find((part) => part.trim().startsWith(`${cookieName}=`));
  if (!match) return null;
  return match.trim().split(';')[0].split('=')[1] ?? null;
}
