import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PROTECTED_PREFIXES = ['/dashboard'];
const AUTH_PREFIXES = ['/login', '/register'];

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET ?? '');
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('authToken')?.value;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PREFIXES.some((p) => pathname.startsWith(p));

  // --- Protected routes: must be authenticated ---
  if (isProtected) {
    if (!token || !(await isValidToken(token))) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      // Clear a stale / invalid cookie if it was present
      if (token) response.cookies.delete('authToken');
      return response;
    }
  }

  // --- Auth pages: already-logged-in users go to dashboard ---
  if (isAuthPage && token && (await isValidToken(token))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match:
   *  - /dashboard and all sub-paths
   *  - /login
   *  - /register
   *
   * Explicitly exclude Next.js internals and static files so they
   * are never checked by the middleware (performance + correctness).
   */
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
