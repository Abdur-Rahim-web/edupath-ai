import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { getAuthPayload } from '@/lib/auth';

/**
 * GET /api/auth/me
 * Reads the authToken cookie, verifies the JWT, and returns the current user.
 * Used by AuthContext on mount to restore persistent sessions.
 */
export async function GET(req: NextRequest) {
  try {
    const payload = await getAuthPayload(req);

    if (!payload) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(payload.userId).select('-password').populate('enrolledCourses');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          enrolledCourses: user.enrolledCourses || [],
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Auth Me Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
