import { NextRequest, NextResponse } from 'next/server';
import Course from '@/models/Course';
import connectToDatabase from '@/lib/mongodb';

const seedCourses = [
  {
    title: 'Mastering Machine Learning with Python',
    description: 'A comprehensive guide to building predictive models, neural networks, and deep learning algorithms using TensorFlow and scikit-learn.',
    category: 'Data Science',
    instructor: 'Dr. Sarah Connor',
    level: 'Advanced',
    tags: ['Python', 'Machine Learning', 'AI'],
    price: 89.99,
  },
  {
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Learn modern web engineering from frontend to backend. Master HTML, CSS, JavaScript, React, Next.js, Node.js, Express, and MongoDB.',
    category: 'Development',
    instructor: 'John Doe',
    level: 'Beginner',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    price: 120.00,
  },
  {
    title: 'UI/UX Design Masterclass',
    description: 'Understand the principles of human-computer interaction, prototyping in Figma, typography, color theory, and wireframing.',
    category: 'Design',
    instructor: 'Emily Chen',
    level: 'Intermediate',
    tags: ['Figma', 'UI/UX', 'Design System'],
    price: 45.00,
  },
  {
    title: 'Cloud Computing Fundamentals (AWS & Azure)',
    description: 'Kickstart your cloud architecture journey. Learn about EC2, S3, IAM, serverless computing, and virtual network management.',
    category: 'Development', // Matching category from dropdown options
    instructor: 'Michael Smith',
    level: 'Beginner',
    tags: ['AWS', 'Azure', 'Cloud'],
    price: 0,
  },
  {
    title: 'Financial Markets & Trading Strategies',
    description: 'Learn options, technical analysis, risk management, and algorithmic trading foundations from industry experts.',
    category: 'Business',
    instructor: 'James Sterling',
    level: 'Advanced',
    tags: ['Finance', 'Trading', 'Stocks'],
    price: 150.00,
  },
  {
    title: 'Introduction to Digital Photography',
    description: 'Master manual camera controls, lighting setups, compositional framing, and raw image post-processing inside Lightroom.',
    category: 'Photography',
    instructor: 'Sophia Vance',
    level: 'Beginner',
    tags: ['Camera', 'Lightroom', 'Composition'],
    price: 0,
  }
];

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    // Optional: Clear existing courses first if clean=true query param is passed
    const { searchParams } = new URL(req.url);
    const clean = searchParams.get('clean') === 'true';
    if (clean) {
      await Course.deleteMany({});
    }

    // Check if courses already exist
    const count = await Course.countDocuments();
    if (count > 0 && !clean) {
      return NextResponse.json({ message: 'Database already has courses, seed skipped. Pass ?clean=true to overwrite.' }, { status: 200 });
    }

    const inserted = await Course.insertMany(seedCourses);

    return NextResponse.json({ message: 'Database seeded successfully with dummy courses', count: inserted.length }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Seeding Error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
