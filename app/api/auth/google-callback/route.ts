import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/config/api';
import { getTokenExpiry } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') ?? '';

    console.log('Incoming cookies from browser:', cookieHeader || 'NONE ❌');

    // Forward browser cookies to backend profile endpoint
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Profile status:', res.status);
    console.log(
      'Set-Cookie header back:',
      res.headers.get('set-cookie') ?? 'NONE',
    );

    if (!res.ok) {
      const text = await res.text();
      console.log('Profile failed:', text);
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const profile = await res.json();
    console.log('Profile:', profile);

    // Try to get token from incoming cookies OR from backend's set-cookie response
    const accessToken =
      request.cookies.get('accessToken')?.value ??
      extractTokenFromSetCookie(res.headers.get('set-cookie'), 'accessToken');

    const refreshToken =
      request.cookies.get('refreshToken')?.value ??
      extractTokenFromSetCookie(res.headers.get('set-cookie'), 'refreshToken');

    console.log('accessToken:', accessToken ? '✅ found' : '❌ missing');
    console.log('refreshToken:', refreshToken ? '✅ found' : '❌ missing');

    const isProd = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      success: true,
      role: profile.role,
    });

    if (accessToken) {
      response.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: getTokenExpiry(accessToken),
      });
    }

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
    console.error('Callback error:', err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}

function extractTokenFromSetCookie(
  header: string | null,
  name: string,
): string | null {
  if (!header) return null;
  const match = header.split(',').find((p) => p.trim().startsWith(`${name}=`));
  if (!match) return null;
  return match.trim().split(';')[0].split('=')[1] ?? null;
}
