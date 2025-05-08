import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) { // ✅ Use NextRequest instead of Request
  const url = new URL(req.url);

  // 🚀 Exclude API routes from next-intl middleware
  if (url.pathname.startsWith('/api')) {
    return NextResponse.next(); // ✅ Allow API requests to pass through without locale handling
  }

  return createMiddleware(routing)(req); // ✅ Correct type now
}

export const config = {
  matcher: [
    // ✅ Exclude API routes from next-intl
    '/((?!api|_next|_vercel|.*\\..*).*)',

    // Keep the original locale-based matching
    '/',
    '/(en|bs)/:path*'
  ]
};
