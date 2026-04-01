import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/config/api';
import { getTokenExpiry } from '@/utils/jwt';
import { jwtDecode } from 'jwt-decode';

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

// POST: Frontend sends tokens explicitly (cross-domain fallback)
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

// GET: Backend already set cookies on the redirect — read them and return role
export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'No access token cookie found' },
        { status: 401 },
      );
    }

    const payload = jwtDecode<{ role: string }>(accessToken);
    const role = payload.role;

    // Re-set cookies as httpOnly on our domain (in case backend set them differently)
    if (refreshToken) {
      return buildCookieResponse(accessToken, refreshToken, role);
    }

    return NextResponse.json({ success: true, role });
  } catch (err) {
    console.error('Google callback GET error:', err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
