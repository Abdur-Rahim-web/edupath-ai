import { NextResponse } from 'next/server';

/**
 * GET /api/auth/google
 * Redirects the user to Google's OAuth 2.0 consent screen.
 * Requires GOOGLE_CLIENT_ID and NEXT_PUBLIC_APP_URL in .env.local.
 */
export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID') {
    return NextResponse.json(
      { message: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local.' },
      { status: 503 }
    );
  }

  const redirectUri = `${appUrl}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
