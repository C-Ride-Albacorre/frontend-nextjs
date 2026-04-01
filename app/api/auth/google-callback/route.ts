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

// GET: Cookies already set by backend redirect — decode role and re-set as httpOnly
export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    console.log(
      '[Google GET] accessToken:',
      accessToken ? 'present' : 'missing',
    );
    console.log(
      '[Google GET] refreshToken:',
      refreshToken ? 'present' : 'missing',
    );

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'No access token in cookies' },
        { status: 401 },
      );
    }

    // Decode role from the JWT — backend already verified it when setting the cookie
    let role: string;
    try {
      const payload = jwtDecode<{ role: string }>(accessToken);
      role = payload.role;
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid access token' },
        { status: 401 },
      );
    }

    if (refreshToken) {
      return buildCookieResponse(accessToken, refreshToken, role);
    }

    // No refresh token but access token works — return role
    const response = NextResponse.json({ success: true, role });
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: getTokenExpiry(accessToken),
    });
    return response;
  } catch (err) {
    console.error('Google callback GET error:', err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
