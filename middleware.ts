// /middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './lib/jwt';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip open routes
  if (pathname.startsWith('/api/login') || pathname.startsWith('/api/refresh') || pathname.startsWith('/api/logout') || pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  // Check Authorization header first, then cookie fallback
  const authHeader = req.headers.get('authorization') || '';
  let token: string | null = null;
  if (authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

  if (!token) {
    const cookie = req.cookies.get('refreshToken'); // not ideal; better to use access token in Authorization
    // If using access token in cookie: read it here
    // token = cookie?.value ?? null;
  }

  if (!token) {
    // not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const payload = verifyAccessToken(token as string) as any;
    // optionally attach user info to request (via header) for downstream handlers
    const res = NextResponse.next();
    res.headers.set('x-user', payload.username);
    return res;
  } catch (e) {
    // token invalid/expired -> redirect to login or call /api/refresh from client to obtain new access token
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // adjust per app
};
