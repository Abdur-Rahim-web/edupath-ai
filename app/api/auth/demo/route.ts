import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { signToken, JWT_COOKIE } from '@/lib/auth';

const DEMO_EMAIL = 'demo@edupath.ai';
const DEMO_PASSWORD = 'Demo@12345';
const DEMO_NAME = 'Demo Admin';

/**
 * POST /api/auth/demo
 * Finds or creates the demo admin user, then issues a JWT cookie.
 * This powers the "Try Demo" button on the login page.
 */
export async function POST() {
  try {
    await connectToDatabase();

    let user = await User.findOne({ email: DEMO_EMAIL }).populate('enrolledCourses');

    if (!user) {
      const hashed = await bcrypt.hash(DEMO_PASSWORD, 10);
      user = await User.create({
        name: DEMO_NAME,
        email: DEMO_EMAIL,
        password: hashed,
        role: 'admin',
      });
    }

    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCourses: user.enrolledCourses || [],
    };

    const response = NextResponse.json({ message: 'Demo login successful', user: userResponse }, { status: 200 });

    response.cookies.set(JWT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    });

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Demo Login Error:', error);
    return NextResponse.json({ message: 'Demo login failed', error: error.message }, { status: 500 });
  }
}
