import { NextResponse } from 'next/server';
import { JWT_COOKIE } from '@/lib/auth';

/**
 * POST /api/auth/logout
 * Clears the authToken cookie to end the session.
 */
export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  response.cookies.set(JWT_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // expire immediately
  });
  return response;
}
