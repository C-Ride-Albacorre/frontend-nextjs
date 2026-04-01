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

// GET: Cookies set by backend on its domain — try all sources to find tokens
export async function GET(request: NextRequest) {
  try {
    // 1. Check our own domain cookies first (accessToken / refreshToken)
    let accessToken = request.cookies.get('accessToken')?.value;
    let refreshToken = request.cookies.get('refreshToken')?.value;

    console.log(
      '[Google GET] Own cookies — accessToken:',
      accessToken ? 'present' : 'missing',
    );
    console.log(
      '[Google GET] Own cookies — refreshToken:',
      refreshToken ? 'present' : 'missing',
    );

    // 2. If no tokens on our domain, forward ALL cookies to backend /auth/profile
    //    (backend may have set cookies on its own domain that the browser is sending)
    if (!accessToken) {
      const cookieHeader = request.headers.get('cookie') ?? '';
      console.log(
        '[Google GET] Forwarding cookie header to backend profile:',
        cookieHeader ? 'has cookies' : 'empty',
      );

      const profileRes = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          cookie: cookieHeader,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        redirect: 'manual',
      });

      console.log('[Google GET] Backend profile status:', profileRes.status);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        const profile = profileData.data ?? profileData;

        // Try extracting tokens from set-cookie response
        const setCookieHeader = profileRes.headers.get('set-cookie') ?? '';
        const extractedAccess = extractTokenFromSetCookie(
          setCookieHeader,
          'accessToken',
        );
        const extractedRefresh = extractTokenFromSetCookie(
          setCookieHeader,
          'refreshToken',
        );

        if (extractedAccess) accessToken = extractedAccess;
        if (extractedRefresh) refreshToken = extractedRefresh;

        // If we got tokens, set them on our domain
        if (accessToken && refreshToken) {
          return buildCookieResponse(accessToken, refreshToken, profile.role);
        }

        // Profile succeeded but no tokens — return role anyway
        return NextResponse.json({ success: true, role: profile.role });
      }

      return NextResponse.json(
        { success: false, error: 'No access token found' },
        { status: 401 },
      );
    }

    // 3. We have accessToken — decode role from JWT
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

function extractTokenFromSetCookie(
  header: string,
  name: string,
): string | null {
  const parts = header.split(/,(?=\s*\w+=)/);
  const match = parts.find((p) => p.trim().startsWith(`${name}=`));
  if (!match) return null;
  return match.trim().split(';')[0].split('=').slice(1).join('=') || null;
}
