import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { signToken, JWT_COOKIE } from '@/lib/auth';

/**
 * GET /api/auth/google/callback
 * Handles the OAuth 2.0 callback from Google.
 * Exchanges the authorization code for tokens, fetches user info,
 * finds or creates a user in the DB, and issues a JWT cookie.
 */
export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${appUrl}/login?error=google_cancelled`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret || clientId === 'YOUR_GOOGLE_CLIENT_ID') {
    return NextResponse.redirect(`${appUrl}/login?error=google_not_configured`);
  }

  try {
    const redirectUri = `${appUrl}/api/auth/google/callback`;

    // 1. Exchange code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Google token exchange failed:', tokenData);
      return NextResponse.redirect(`${appUrl}/login?error=google_token_failed`);
    }

    // 2. Fetch user profile from Google
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileRes.json();

    if (!profile.email) {
      return NextResponse.redirect(`${appUrl}/login?error=google_profile_failed`);
    }

    // 3. Find or create user in DB
    await connectToDatabase();

    let user = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.email }] });

    if (!user) {
      user = await User.create({
        name: profile.name ?? profile.email,
        email: profile.email,
        googleId: profile.id,
        role: 'student',
      });
    } else if (!user.googleId) {
      // Link Google ID to existing email-based account
      user.googleId = profile.id;
      await user.save();
    }

    // 4. Issue JWT cookie
    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.redirect(`${appUrl}/dashboard`);

    response.cookies.set(JWT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    });

    return response;
  } catch (err: any) {
    console.error('Google OAuth Callback Error:', err);
    return NextResponse.redirect(`${appUrl}/login?error=google_server_error`);
  }
}
