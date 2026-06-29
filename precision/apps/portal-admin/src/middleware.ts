import { NextRequest, NextResponse } from 'next/server';
import { decryptSession, SESSION_COOKIE_NAME } from '@precision/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication
  const isAuthRoute = pathname === '/login' || pathname.startsWith('/api/auth');
  const isExpiredRoute = pathname === '/expired';
  const isStaticAsset = pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname === '/favicon.ico';

  if (isStaticAsset) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await decryptSession(token) : null;

  // 1. Unauthenticated: redirect to /login
  if (!session) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // 2. Authenticated but unauthorized role:
  // Only SUPERADMIN, OWNER, and ADMIN can access portal-admin
  const allowedRoles = ['SUPERADMIN', 'OWNER', 'ADMIN'];
  if (!allowedRoles.includes(session.userRole)) {
    // Clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  // 3. Authenticated: redirect /login to home
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 4. Subscription check for company-level admins (OWNER, ADMIN)
  // SUPERADMIN has no companyId and is bypass this check
  if (session.userRole !== 'SUPERADMIN') {
    const subscriptionEndsAt = session.subscriptionEndsAt;
    const subscriptionStatus = session.subscriptionStatus;

    const isSubscriptionExpired = 
      subscriptionStatus === 'EXPIRED' || 
      (subscriptionEndsAt && new Date(subscriptionEndsAt).getTime() < Date.now());

    if (isSubscriptionExpired) {
      if (!isExpiredRoute && !pathname.startsWith('/api/auth')) {
        return NextResponse.redirect(new URL('/expired', request.url));
      }
      return NextResponse.next();
    }
  }

  // 5. Active session: redirect /expired to home
  if (isExpiredRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
