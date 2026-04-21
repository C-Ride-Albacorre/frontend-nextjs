import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';

const USER_PROTECTED_ROUTES = [
  '/user/dashboard',
  '/user/profile',
  '/user/settings',
  '/user/delivery',
];

const VENDOR_PROTECTED_ROUTES = [
  '/onboarding/business-info',
  '/onboarding/business-contact',
  '/onboarding/business-address',
  '/onboarding/business-bank',
  '/onboarding/business-document',
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
  '/admin/create-admin',
  '/admin/stores',
  '/admin/category',
];

const VERIFICATION_ROUTES = [
  '/verify/user',
  '/verify/vendor-phone',
  '/verify/vendor-email',
  '/add-google-phone',
  '/verify/admin',
];

const USER_AUTH_ROUTES = ['/user/register', '/user/login'];
const VENDOR_AUTH_ROUTES = ['/vendor/register', '/vendor/login'];
const ADMIN_AUTH_ROUTES = ['/admin/login'];
const SHARED_AUTH_ROUTES = ['/reset', '/reset/reset-password'];
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

const isProd = process.env.NODE_ENV === 'production';

function getTokenExpiryFromJwt(token: string): number {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const secondsFromNow = payload.exp - Math.floor(Date.now() / 1000);
    return Math.max(secondsFromNow, 0);
  } catch {
    return 0;
  }
}

type RefreshApiResponse = {
  status: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: { id: string; email: string; role: string };
  };
};

async function refreshAccessToken(
  refreshToken: string,
  previousAccessToken: string,
): Promise<RefreshApiResponse | null> {
  const refreshUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`;

  console.log('[🔄 Refresh] Attempting token refresh', {
    url: refreshUrl,
    hasRefreshToken: !!refreshToken,
    refreshTokenPrefix: refreshToken.slice(0, 20) + '...',
    hasPreviousAccessToken: !!previousAccessToken,
  });

  try {
    const res = await fetch(refreshUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken,
        ...(previousAccessToken && { previousAccessToken }),
      }),
      cache: 'no-store',
    });

    const body = await res.json();

    if (!res.ok) {
      console.error('[❌ Refresh] Refresh failed', {
        status: res.status,
        statusText: res.statusText,
        responseBody: body,
      });
      return null;
    }

    console.log('[✅ Refresh] Token refresh successful', {
      status: res.status,
      hasNewAccessToken: !!body?.data?.accessToken,
      hasNewRefreshToken: !!body?.data?.refreshToken,
      user: body?.data?.user,
    });

    return body;
  } catch (err) {
    console.error('[💥 Refresh] Network or parsing error during refresh', {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // ✅ Add this at the very top — bail out immediately
  if (pathname.startsWith('/google/callback')) {
    return NextResponse.next();
  }

  console.log(`\n[🛡️ Middleware] ${request.method} ${pathname}`, {
    hasAccessToken: !!accessToken,
    accessTokenExpired: accessToken ? isTokenExpired(accessToken) : 'N/A',
    hasRefreshToken: !!refreshToken,
  });

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isVerificationRoute = VERIFICATION_ROUTES.some((r) =>
    pathname.startsWith(r),
  );

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

  let userRole: Role | null = null;
  let refreshedResponse: NextResponse | null = null;

  // -------------------------
  // AUTO REFRESH ACCESS TOKEN
  // -------------------------
  if (
    !isVerificationRoute &&
    (!accessToken || isTokenExpired(accessToken)) &&
    refreshToken
  ) {
    console.log(
      accessToken
        ? '[⏰ Middleware] Access token expired — attempting refresh'
        : '[⏰ Middleware] No access token found — attempting refresh with refresh token',
    );

    const refreshed = await refreshAccessToken(refreshToken, accessToken ?? '');

    if (refreshed?.data?.accessToken) {
      // Explicitly rebuild the Cookie header so downstream server components
      // read the refreshed tokens via cookies() during the same request.
      // request.cookies.set() alone is unreliable across Next.js versions.
      const requestHeaders = new Headers(request.headers);
      const existingCookies = requestHeaders.get('cookie') || '';
      const cookieMap = new Map<string, string>();
      existingCookies.split(';').forEach((c) => {
        const idx = c.indexOf('=');
        if (idx > 0) {
          cookieMap.set(c.slice(0, idx).trim(), c.slice(idx + 1).trim());
        }
      });
      cookieMap.set('accessToken', refreshed.data.accessToken);
      if (refreshed.data.refreshToken) {
        cookieMap.set('refreshToken', refreshed.data.refreshToken);
      }
      requestHeaders.set(
        'cookie',
        [...cookieMap.entries()].map(([k, v]) => `${k}=${v}`).join('; '),
      );

      refreshedResponse = NextResponse.next({
        request: { headers: requestHeaders },
      });

      const newAccessMaxAge = getTokenExpiryFromJwt(refreshed.data.accessToken);
      const newRefreshMaxAge = refreshed.data.refreshToken
        ? getTokenExpiryFromJwt(refreshed.data.refreshToken)
        : null;

      console.log('[🍪 Middleware] Setting new cookies', {
        accessTokenMaxAge: newAccessMaxAge,
        refreshTokenMaxAge: newRefreshMaxAge,
      });

      // Also set cookies on the RESPONSE so the browser persists them
      refreshedResponse.cookies.set('accessToken', refreshed.data.accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: newAccessMaxAge,
      });

      if (refreshed.data.refreshToken) {
        refreshedResponse.cookies.set(
          'refreshToken',
          refreshed.data.refreshToken,
          {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            path: '/',
            maxAge: newRefreshMaxAge!,
          },
        );
      }

      try {
        const payload = jwtDecode<{ role: Role }>(refreshed.data.accessToken);
        userRole = payload.role;
        console.log(
          '[👤 Middleware] Role decoded from refreshed token:',
          userRole,
        );
      } catch (err) {
        console.error(
          '[❌ Middleware] Failed to decode refreshed access token',
          err,
        );
        userRole = null;
      }
    } else {
      console.warn(
        '[⚠️ Middleware] Refresh failed — allowing request to continue (refresh token still exists)',
      );
    }
  }




//   if (userRole === 'VENDOR' && accessToken && !isTokenExpired(accessToken)) {
//   try {
//     const payload = jwtDecode<{
//       role: Role;
//       onboardingStatus?: string;
//       onboardingStep?: string;
//     }>(accessToken);

//     const onboardingStatus = payload.onboardingStatus;
//     const onboardingStep = payload.onboardingStep;

//     const isOnboardingRoute = pathname.startsWith('/onboarding');
//     const isVerificationRoute = pathname.startsWith('/verify') || pathname === '/add-google-phone';

//     const isCompleted = onboardingStatus === 'COMPLETED';

//     if (!isCompleted && !isOnboardingRoute && !isVerificationRoute) {
//       const stepRoutes: Record<string, string> = {
//         CONTACT_INFO: '/onboarding/contact-info',
//         ADDRESS_INFO: '/onboarding/address-info',
//         BANK_INFO: '/onboarding/bank-info',
//         DOCUMENT: '/onboarding/business-document',
//       };

//       let redirectPath = '/onboarding/business-info';

//       if (onboardingStatus === 'IN_PROGRESS' && onboardingStep) {
//         redirectPath = stepRoutes[onboardingStep] ?? redirectPath;
//       }

//       return NextResponse.redirect(new URL(redirectPath, request.url));
//     }
//   } catch (err) {
//     console.error('[Middleware] Failed onboarding enforcement', err);
//   }
// }

  // Read role from valid (non-expired) access token if no refresh happened
  if (!userRole && accessToken && !isTokenExpired(accessToken)) {
    try {
      const payload = jwtDecode<{ role: Role }>(accessToken);
      userRole = payload.role;
      console.log(
        '[👤 Middleware] Role decoded from existing token:',
        userRole,
      );
    } catch (err) {
      console.error(
        '[❌ Middleware] Failed to decode existing access token',
        err,
      );
      userRole = null;
    }
  }

  // const isAuthenticated = !!userRole;

  const hasAccessToken = !!accessToken && !isTokenExpired(accessToken);
  const hasRefreshToken = !!refreshToken;

  console.log('[🔐 Middleware] Auth state', {
    // isAuthenticated,
    userRole,
    isUserProtected,
    isVendorProtected,
    isAdminProtected,
    isUserAuth,
    isVendorAuth,
    isAdminAuth,
  });

  const isFullyAuthenticated = hasAccessToken && hasRefreshToken;

  if (VERIFICATION_ROUTES.some((r) => pathname.startsWith(r))) {
    const verificationToken = request.cookies.get('verificationToken')?.value;

    if (!verificationToken) {
      // Route-aware redirect
      let fallback = '/user/register';
      if (pathname.startsWith('/verify/vendor')) fallback = '/vendor/register';
      if (pathname.startsWith('/verify/admin')) fallback = '/admin/login';

      const url = new URL(fallback, request.url);
      url.searchParams.set('expired', 'true');
      return NextResponse.redirect(url);
    }
  }

  // -------------------------
  // UNAUTHENTICATED ACCESS
  // -------------------------
  if (isUserProtected && !isFullyAuthenticated) {
    console.log(
      '[🚫 Middleware] Unauthenticated (no refresh token) → redirecting to /user/login',
    );
    const url = new URL('/user/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  if (isVendorProtected && !isFullyAuthenticated) {
    console.log(
      '[🚫 Middleware] Unauthenticated (no refresh token) → redirecting to /vendor/login',
    );
    const url = new URL('/vendor/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  if (isAdminProtected && !isFullyAuthenticated) {
    console.log(
      '[🚫 Middleware] Unauthenticated (no refresh token) → redirecting to /admin/login',
    );
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // -------------------------
  // ROLE RESTRICTIONS
  // -------------------------
  if (isUserProtected && userRole === 'VENDOR') {
    console.log(
      '[🚫 Middleware] VENDOR tried to access user route → /vendor/store',
    );
    return NextResponse.redirect(new URL('/vendor/store', request.url));
  }
  if (isVendorProtected && userRole === 'CUSTOMER') {
    console.log(
      '[🚫 Middleware] CUSTOMER tried to access vendor route → /user/dashboard',
    );
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }
  if (isSuperAdminOnly && userRole !== 'SUPER_ADMIN') {
    console.log(
      `[🚫 Middleware] Role ${userRole} tried to access SUPER_ADMIN route → /admin/dashboard`,
    );
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // -------------------------
  // AUTH PAGES REDIRECT
  // -------------------------
  if (
    (isUserAuth || isVendorAuth || isAdminAuth || isSharedAuth) &&
    (isFullyAuthenticated || refreshToken)
  ) {
    // Try to decode role from refresh token if we don't have it yet
    let redirectRole = userRole;
    if (!redirectRole && refreshToken) {
      try {
        const payload = jwtDecode<{ role: Role }>(refreshToken);
        redirectRole = payload.role;
      } catch {
        // Fallback: infer from the login page they're on
        if (isVendorAuth) redirectRole = 'VENDOR';
        else if (isAdminAuth) redirectRole = 'ADMIN';
        else redirectRole = 'CUSTOMER';
      }
    }

    let dest = '/';
    // if (redirectRole === 'VENDOR') dest = '/vendor/store';

    if (redirectRole === 'VENDOR') {
      const isOnboarding = pathname.startsWith('/onboarding');
      dest = isOnboarding ? pathname : '/vendor/store';
    }

    if (redirectRole === 'CUSTOMER') dest = '/user/dashboard';
    if (redirectRole === 'ADMIN' || redirectRole === 'SUPER_ADMIN')
      dest = '/admin/dashboard';

    if (pathname !== dest) {
      console.log(
        `[↩️ Middleware] Already authenticated (${userRole}) → redirecting to ${dest}`,
      );
      return NextResponse.redirect(new URL(dest, request.url));
    }
  }

  console.log(
    `[✅ Middleware] Allowing request to proceed — refreshed: ${!!refreshedResponse}\n`,
  );
  return refreshedResponse ?? NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|google/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
