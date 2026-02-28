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

function decodeJwtPayload(token: string): { role?: string } | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest){
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
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

  // --- Unauthenticated: redirect to login ---
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

  // --- Wrong role: redirect to correct dashboard ---
  if (isUserProtected && userRole === 'VENDOR') {
    return NextResponse.redirect(new URL('/vendor/store', request.url));
  }

  if (isVendorProtected && userRole === 'CUSTOMER') {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  // --- Authenticated: redirect away from auth pages ---
  if ((isUserAuth || isVendorAuth || isSharedAuth) && accessToken) {
    const dest = userRole === 'VENDOR' ? '/vendor/store' : '/user/dashboard';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico
     * - /google/callback (OAuth callback — handled by the page itself)
     * - Static file extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|google/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
