import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Course from '@/models/Course';
import { getAuthPayload } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const payload = await getAuthPayload(req);

    if (!payload) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    await connectToDatabase();
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ message: 'Course ID is required' }, { status: 400 });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Add course to user's enrolledCourses
    const user = await User.findByIdAndUpdate(
      payload.userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Enrolled successfully', success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Enrollment Error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
