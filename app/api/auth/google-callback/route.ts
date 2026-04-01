import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/config/api';
import { getTokenExpiry } from '@/utils/jwt';

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

    // Verify the token by calling the backend profile endpoint
    const profileRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: getTokenExpiry(refreshToken),
    });

    return response;
  } catch (err) {
    console.error('Google callback error:', err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
