import { NextRequest, NextResponse } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = ['/user/dashboard', '/user/profile', '/user/settings'];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/user/register', '/user/login', '/verify'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // ✅ No token + trying to access protected route → send to login
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/user/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname); // so we can redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Has token + trying to access auth routes → send to dashboard
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
