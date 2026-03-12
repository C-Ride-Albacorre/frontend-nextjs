import { NextRequest, NextResponse } from 'next/server';

const USER_PROTECTED_ROUTES = [
  '/user/dashboard',
  '/user/profile',
  '/user/settings',
];

const VENDOR_PROTECTED_ROUTES = [
  '/vendor/active-deliveries',
  '/vendor/analytics',
  '/vendor/delivery',
  '/vendor/orders',
  '/vendor/partner-program',
  '/vendor/performance',
  '/vendor/products',
  '/vendor/promotions',
  '/vendor/store',
  '/vendor/tutorials-tips',
];

const USER_AUTH_ROUTES = ['/user/register', '/user/login'];
const VENDOR_AUTH_ROUTES = ['/vendor/register', '/vendor/login'];
const SHARED_AUTH_ROUTES = ['/verify', '/reset', '/reset/reset-password'];

function decodeJwtPayload(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Math.floor(Date.now() / 1000);
  } catch {
    return true;
  }
}

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  return res.json();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  /**
   * -------------------------
   * AUTO REFRESH ACCESS TOKEN
   * -------------------------
   */
  if (accessToken && isTokenExpired(accessToken) && refreshToken) {
    const refreshed = await refreshAccessToken(refreshToken);

    if (refreshed?.accessToken) {
      const response = NextResponse.next();

      response.cookies.set('accessToken', refreshed.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      });

      accessToken = refreshed.accessToken;

      return response;
    }
  }

  const userRole = accessToken ? decodeJwtPayload(accessToken)?.role : null;

  const isUserProtected = USER_PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );

  const isVendorProtected = VENDOR_PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );

  const isUserAuth = USER_AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isVendorAuth = VENDOR_AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isSharedAuth = SHARED_AUTH_ROUTES.some((r) => pathname.startsWith(r));

  /**
   * UNAUTHENTICATED ACCESS
   */
  if (isUserProtected && !accessToken) {
    const url = new URL('/user/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isVendorProtected && !accessToken) {
    const url = new URL('/vendor/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  /**
   * WRONG ROLE ACCESS
   */
  if (isUserProtected && userRole === 'VENDOR') {
    return NextResponse.redirect(new URL('/vendor/store', request.url));
  }

  if (isVendorProtected && userRole === 'CUSTOMER') {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  /**
   * AUTHENTICATED USERS SHOULD NOT ACCESS AUTH PAGES
   */
  if ((isUserAuth || isVendorAuth || isSharedAuth) && accessToken) {
    const dest = userRole === 'VENDOR' ? '/vendor/store' : '/user/dashboard';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}
