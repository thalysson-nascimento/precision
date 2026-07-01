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

  // 1. Unauthenticated users must be redirected to /login
  if (!session) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // 2. Check if password is temporary
  const isChangePasswordRoute = pathname === '/change-password';
  const isApiRoute = pathname.startsWith('/api/');

  if (session.isPasswordTemp) {
    if (!isChangePasswordRoute && !isAuthRoute) {
      if (isApiRoute) {
        return NextResponse.json(
          { error: 'Password change required' },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL('/change-password', request.url));
    }
    return NextResponse.next();
  } else {
    if (isChangePasswordRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 3. Authenticated users trying to access login page should be redirected to home
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. Subscription check
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

  // 4. Authenticated and active subscription: redirect /expired to home
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
