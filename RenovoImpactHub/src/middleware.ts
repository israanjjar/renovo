import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/dashboard', '/projects', '/vote', '/impact', '/settings', '/onboarding', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('renovo-auth-token');
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/vote/:path*', '/impact/:path*', '/settings/:path*', '/onboarding/:path*', '/admin/:path*'],
};
