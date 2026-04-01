import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/config/api';
import { getTokenExpiry } from '@/utils/jwt';

const isProd = process.env.NODE_ENV === 'production';

function buildCookieResponse(
  accessToken: string,
  refreshToken: string,
  role: string,
) {
  const response = NextResponse.json({ success: true, role });

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: getTokenExpiry(accessToken),
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: getTokenExpiry(refreshToken),
  });

  return response;
}

// POST: Frontend sends tokens from query params (cross-domain flow)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (
      !accessToken ||
      typeof accessToken !== 'string' ||
      !refreshToken ||
      typeof refreshToken !== 'string'
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing tokens' },
        { status: 400 },
      );
    }

    const profileRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });

    if (!profileRes.ok) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 },
      );
    }

    const profileData = await profileRes.json();
    const profile = profileData.data ?? profileData;

    return buildCookieResponse(accessToken, refreshToken, profile.role);
  } catch (err) {
    console.error('Google callback POST error:', err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}

// GET: Backend already set httpOnly cookies (same-domain / proxy flow)
export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') ?? '';

    // Forward browser cookies to backend profile endpoint
    const profileRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
        ...(request.cookies.get('accessToken')?.value && {
          Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
        }),
      },
      cache: 'no-store',
    });

    if (!profileRes.ok) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 },
      );
    }

    const profileData = await profileRes.json();
    const profile = profileData.data ?? profileData;

    // Extract tokens from browser cookies if present
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (accessToken && refreshToken) {
      return buildCookieResponse(accessToken, refreshToken, profile.role);
    }

    // Tokens might be in backend's set-cookie response
    const setCookie = profileRes.headers.get('set-cookie') ?? '';
    const extractedAccess = extractTokenFromSetCookie(setCookie, 'accessToken');
    const extractedRefresh = extractTokenFromSetCookie(
      setCookie,
      'refreshToken',
    );

    if (extractedAccess && extractedRefresh) {
      return buildCookieResponse(
        extractedAccess,
        extractedRefresh,
        profile.role,
      );
    }

    // Profile succeeded but no tokens to persist — still return role
    return NextResponse.json({ success: true, role: profile.role });
  } catch (err) {
    console.error('Google callback GET error:', err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}

function extractTokenFromSetCookie(
  header: string,
  name: string,
): string | null {
  const match = header.split(',').find((p) => p.trim().startsWith(`${name}=`));
  if (!match) return null;
  return match.trim().split(';')[0].split('=').slice(1).join('=') || null;
}
