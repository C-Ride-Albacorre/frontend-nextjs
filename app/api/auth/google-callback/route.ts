import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenExpiry } from '@/utils/jwt';

const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
};

export async function POST(req: NextRequest) {
  try {
    const { accessToken, refreshToken } = await req.json();

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Missing tokens' }, { status: 400 });
    }

    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: getTokenExpiry(accessToken),
    });

    cookieStore.set('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: getTokenExpiry(refreshToken),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
