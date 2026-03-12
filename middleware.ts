import { jwtDecode } from 'jwt-decode';
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

const ADMIN_PROTECTED_ROUTES = [
  '/admin/dashboard',
  '/admin/analytics',
  '/admin/vendor-onboarding',
  '/admin/customer-accounts',
];

const USER_AUTH_ROUTES = ['/user/register', '/user/login'];
const VENDOR_AUTH_ROUTES = ['/vendor/register', '/vendor/login'];
const ADMIN_AUTH_ROUTES = ['/admin/login'];

const SHARED_AUTH_ROUTES = ['/verify', '/reset', '/reset/reset-password'];

const SUPER_ADMIN_ONLY_ROUTES = ['/admin/create-admin'];

function isTokenExpired(token: string) {
  try {
    const payload = jwtDecode<{ exp: number }>(token);

    return payload.exp < Math.floor(Date.now() / 1000);
  } catch {
    return true;
  }
}

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR' | 'CUSTOMER';

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  });
  if (!res.ok) return null;

  return res.json();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

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

      if (refreshed.refreshToken) {
        response.cookies.set('refreshToken', refreshed.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
        });
      }

      return response;
    }
    if (
      !pathname.startsWith('/admin') &&
      !pathname.startsWith('/vendor') &&
      !pathname.startsWith('/user')
    ) {
      return NextResponse.next();
    }
  }

  let userRole: Role | null = null;

  if (accessToken) {
    try {
      const payload = jwtDecode<{ role: Role }>(accessToken);
      userRole = payload.role;
    } catch {
      userRole = null;
    }
  }

  const isUserProtected = USER_PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );

  const isVendorProtected = VENDOR_PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );

  const isAdminProtected = ADMIN_PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );

  const isUserAuth = USER_AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isVendorAuth = VENDOR_AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminAuth = ADMIN_AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isSharedAuth = SHARED_AUTH_ROUTES.some((r) => pathname.startsWith(r));

  const isSuperAdminOnly = SUPER_ADMIN_ONLY_ROUTES.some((r) =>
    pathname.startsWith(r),
  );

  /**
   * -------------------------
   * UNAUTHENTICATED ACCESS
   * -------------------------
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

  if (isAdminProtected && !accessToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  /**
   * -------------------------
   * ROLE RESTRICTIONS
   * -------------------------
   */
  if (isUserProtected && userRole === 'VENDOR') {
    return NextResponse.redirect(new URL('/vendor/store', request.url));
  }

  if (isVendorProtected && userRole === 'CUSTOMER') {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  if (isSuperAdminOnly && userRole !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  /**
   * -------------------------
   * AUTH PAGES REDIRECT
   * -------------------------
   */
  if (
    (isUserAuth || isVendorAuth || isAdminAuth || isSharedAuth) &&
    accessToken
  ) {
    let dest = '/';

    if (userRole === 'VENDOR') dest = '/vendor/store';
    if (userRole === 'CUSTOMER') dest = '/user/dashboard';
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN')
      dest = '/admin/dashboard';

    if (pathname !== dest) {
      return NextResponse.redirect(new URL(dest, request.url));
    }
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
