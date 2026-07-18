import { NextRequest, NextResponse } from 'next/server';
import Course from '@/models/Course';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { title, description, category, level, price, instructor } = body;

    if (!title || !description || !category || !level) {
      return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
    }

    const newCourse = await Course.create({
      title,
      description,
      category,
      level,
      price: Number(price) || 0,
      instructor: instructor || 'Admin', // Fallback instructor
    });

    return NextResponse.json({ message: 'Course created successfully', course: newCourse }, { status: 201 });
  } catch (error: any) {
    console.error('Course Creation Error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
