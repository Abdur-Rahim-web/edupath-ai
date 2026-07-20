import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import CourseCard from '@/components/CourseCard';
import EnrollButton from '@/components/EnrollButton';
import { verifyToken, JWT_COOKIE } from '@/lib/auth';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await connectToDatabase();
  try {
    const course = await Course.findById(resolvedParams.id);
    if (course) {
      return {
        title: `${course.title} | EduPath AI`,
        description: course.description.substring(0, 155),
      };
    }
  } catch (e) {}
  return { title: 'Course Details | EduPath AI' };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await connectToDatabase();
  
  let course;
  try {
    course = await Course.findById(resolvedParams.id);
  } catch (err) {
    // Cast to ObjectId failed, rendering 404
    return notFound();
  }

  if (!course) {
    return notFound();
  }

  // Check enrollment status
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE)?.value;
  let isEnrolled = false;

  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      const user = await User.findById(payload.userId);
      isEnrolled = user?.enrolledCourses?.some(id => id.toString() === course._id.toString()) || false;
    }
  }

  // Fetch related courses (same category, excluding the current one)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let relatedCourses: any[] = [];
  try {
    relatedCourses = await Course.find({
      category: course.category,
      _id: { $ne: course._id }
    }).limit(4);
  } catch (e) {
    console.error('Failed to fetch related courses:', e);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/explore" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Explore Catalog
          </Link>
        </div>

        {course.imageUrl && (
          <div className="mb-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 max-h-[500px]">
            <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Course Main Details Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/60 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <span className="inline-block px-3.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-wider">
              {course.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 text-slate-500 text-sm font-semibold">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Instructor: {course.instructor}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Level: {course.level}
              </div>
              {course.duration && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Duration: {course.duration}
                </div>
              )}
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-indigo-600 blur-3xl opacity-30"></div>
            <div className="relative z-10 space-y-6">
              <span className="text-sm font-bold text-slate-400 block uppercase tracking-wide">Course Price</span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Includes full lifetime access to all learning materials, exercises, and certificates of completion.
              </p>
            </div>
            
            <div className="relative z-10 mt-8">
              <EnrollButton courseId={course._id.toString()} initialIsEnrolled={isEnrolled} />
              <span className="text-center text-xs text-slate-400 block mt-3 font-semibold">30-day money-back guarantee</span>
            </div>
          </div>
        </div>

        {/* AI Summary Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-10 border border-indigo-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-32 h-32 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 19h20L12 2zm0 3.8l6.3 11.2H5.7L12 5.8z" />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Generated Summary
            </h2>
            <p className="text-indigo-800/80 leading-relaxed max-w-4xl">
              This course covers comprehensive aspects of <strong>{course.title}</strong> designed for <strong>{course.level}</strong> learners. It belongs to the <strong>{course.category}</strong> category. Expect a deep dive into practical and theoretical concepts, helping you to achieve mastery and implement these skills in real-world scenarios.
              {course.shortDescription ? ` ${course.shortDescription}` : ''}
            </p>
          </div>
        </div>

        {/* Related Items Section */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Related Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedCourses.map((related) => (
                <CourseCard
                  key={related._id}
                  id={related._id.toString()}
                  title={related.title}
                  category={related.category}
                  instructor={related.instructor}
                  level={related.level}
                  price={related.price}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
