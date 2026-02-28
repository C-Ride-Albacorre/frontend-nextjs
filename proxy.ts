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

// Helper to decode JWT payload (without verification)
function decodeJwtPayload(token: string): { role?: string } | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

// ✅ must be named 'proxy' or default export in Next.js 16
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/google/callback')) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const userRole = accessToken ? decodeJwtPayload(accessToken)?.role : null;

  const isUserProtectedRoute = USER_PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isVendorProtectedRoute = VENDOR_PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isUserAuthRoute = USER_AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isVendorAuthRoute = VENDOR_AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isSharedAuthRoute = SHARED_AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // Redirect unauthenticated users to appropriate login
  if (isUserProtectedRoute && !accessToken) {
    const loginUrl = new URL('/user/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isVendorProtectedRoute && !accessToken) {
    const loginUrl = new URL('/vendor/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control: prevent wrong role from accessing routes
  if (isUserProtectedRoute && userRole === 'VENDOR') {
    return NextResponse.redirect(new URL('/vendor/store', request.url));
  }

  if (isVendorProtectedRoute && userRole === 'USER') {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  // Redirect authenticated users away from auth routes to their respective dashboards
  if (isUserAuthRoute && accessToken) {
    const redirectUrl = userRole === 'VENDOR' ? '/vendor/store' : '/user/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (isVendorAuthRoute && accessToken) {
    const redirectUrl = userRole === 'VENDOR' ? '/vendor/store' : '/user/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (isSharedAuthRoute && accessToken) {
    const redirectUrl = userRole === 'VENDOR' ? '/vendor/store' : '/user/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|google/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
