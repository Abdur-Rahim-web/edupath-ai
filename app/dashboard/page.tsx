'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [isMounting, setIsMounting] = useState(true);

  // Client-side protection
  useEffect(() => {
    setIsMounting(false);
  }, []);

  useEffect(() => {
    if (!isMounting && !loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounting, isAuthenticated, loading, router]);

  if (isMounting || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-slate-600">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/explore" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all">
              Discover New Courses
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Enrolled Courses */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Enrolled Courses</h2>
                <Link href="/explore" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  Browse More
                </Link>
              </div>
              
              {/* Placeholder for courses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Introduction to React & Next.js', progress: 45, nextLesson: 'Server Components' },
                  { title: 'Advanced Tailwind CSS', progress: 12, nextLesson: 'Custom Animations' }
                ].map((course, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-2xl p-5 hover:border-indigo-100 transition-colors shadow-sm bg-slate-50/50">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center text-indigo-600 shadow-sm">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    
                    <p className="text-xs text-slate-500 mb-4 font-medium">{course.progress}% Completed</p>
                    <button className="w-full py-2.5 bg-white border border-slate-200 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors shadow-sm">
                      Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Profile & Stats */}
          <div className="space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Profile</h2>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-slate-900">{user.name}</h3>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full capitalize border border-indigo-100">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Quick Stats</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-600 font-medium">Courses Enrolled</span>
                    <span className="font-bold text-slate-900">2</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-600 font-medium">Certificates</span>
                    <span className="font-bold text-slate-900">0</span>
                  </div>
                  <div className="flex justify-between items-center bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                    <span className="text-sm text-indigo-900 font-medium">Learning Streak</span>
                    <span className="font-bold text-indigo-600">3 Days 🔥</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        
      </div>
    </div>
  );
}
