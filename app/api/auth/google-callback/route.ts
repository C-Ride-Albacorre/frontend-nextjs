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
    const body = await req.json();

    const normalize = (v: unknown) =>
      typeof v === 'string' && v !== 'undefined' ? v : null;

    const accessToken = normalize(body.accessToken);
    const refreshToken = normalize(body.refreshToken);
    const verificationToken = normalize(body.verificationToken);

    const cookieStore = await cookies();

    // -------------------------
    // FLOW A: Full auth (access + refresh tokens)
    // -------------------------
    if (accessToken && refreshToken) {
      cookieStore.set('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: getTokenExpiry(accessToken),
      });

      cookieStore.set('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: getTokenExpiry(refreshToken),
      });

      if (verificationToken) {
        cookieStore.set('verificationToken', verificationToken, {
          ...cookieOptions,
          maxAge: getTokenExpiry(verificationToken),
        });
      }

      return NextResponse.json({ success: true });
    }

    // -------------------------
    // FLOW B: Phone verification only (no auth tokens)
    // -------------------------
    if (verificationToken) {
      cookieStore.set('verificationToken', verificationToken, {
        ...cookieOptions,
        maxAge: getTokenExpiry(verificationToken),
      });

      return NextResponse.json({ success: true });
    }

    // -------------------------
    // FLOW C: Nothing usable
    // -------------------------
    return NextResponse.json({ error: 'Missing tokens' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
