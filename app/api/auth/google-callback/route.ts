import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/config/api';
import { getTokenExpiry } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') ?? '';

    console.log('=== GOOGLE CALLBACK DEBUG ===');
    console.log('BASE_URL:', BASE_URL);
    console.log('Incoming cookies:', cookieHeader || 'NONE');
    console.log('All cookies:', request.cookies.getAll().map((c) => c.name));

    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Profile response status:', res.status);

    // Log what cookies the backend is sending back
    console.log('Set-Cookie from backend:', res.headers.get('set-cookie'));

    if (!res.ok) {
      const body = await res.text();
      console.log('Profile error body:', body);
      return NextResponse.json(
        { success: false, debug: { status: res.status, body } },
        { status: 401 },
      );
    }

    const profile = await res.json();
    console.log('Profile data:', profile);

    const accessToken =
      request.cookies.get('accessToken')?.value ??
      extractTokenFromSetCookie(res.headers.get('set-cookie'), 'accessToken');

    const refreshToken =
      request.cookies.get('refreshToken')?.value ??
      extractTokenFromSetCookie(res.headers.get('set-cookie'), 'refreshToken');

    console.log('accessToken found:', !!accessToken);
    console.log('refreshToken found:', !!refreshToken);

    if (!accessToken) {
      return NextResponse.json(
        { success: false, debug: 'no accessToken found anywhere' },
        { status: 401 },
      );
    }

    const isProd = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      success: true,
      role: profile.role,
    });

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
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

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