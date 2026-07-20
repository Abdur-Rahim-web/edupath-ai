'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [isMounting, setIsMounting] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isRecLoading, setIsRecLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const fetchRecommendations = async () => {
      try {
        const enrolledTitles = user.enrolledCourses && user.enrolledCourses.length > 0
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? user.enrolledCourses.map((c: any) => c.title)
          : [];
        const response = await fetch('/api/ai/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName: user.name,
            enrolledCourses: enrolledTitles
          })
        });
        const data = await response.json();
        if (response.ok) {
          setRecommendations(data.recommendations);
        }
      } catch (e) {
        console.error('Failed to load AI recommendations:', e);
      } finally {
        setIsRecLoading(false);
      }
    };
    fetchRecommendations();
  }, [isAuthenticated, user]);

  // Client-side protection
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

              {/* Dynamic Enrolled Courses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  user.enrolledCourses.map((course: any, idx: number) => {
                    // Generate deterministic progress (15-95%) based on characters
                    const progressVal = Math.floor((course.title.charCodeAt(0) + course.title.charCodeAt(course.title.length - 1)) % 80) + 15;
                    return (
                      <div key={course._id || idx} className="border border-slate-100 rounded-2xl p-5 hover:border-indigo-100 transition-colors shadow-sm bg-slate-50/50 flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center text-indigo-600 shadow-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progressVal}%` }}></div>
                          </div>
                          <p className="text-xs text-slate-500 mb-4 font-medium">{progressVal}% Completed</p>
                        </div>
                        <Link 
                          href={`/courses/${course._id}`}
                          className="w-full py-2.5 bg-white border border-slate-200 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors shadow-sm text-center block"
                        >
                          Continue Learning
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-1 sm:col-span-2 text-center py-10 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="font-bold text-slate-700 mb-1">No Enrolled Courses</h3>
                    <p className="text-xs text-slate-500 mb-4 max-w-xs">Start your learning path by enrolling in one of our expert-led courses.</p>
                    <Link href="/explore" className="px-5 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-md hover:bg-indigo-700 transition-all">
                      Browse Catalog
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* AI Recommendation Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 mt-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mr-3 animate-pulse">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">AI Recommended for You</h2>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Powered by Gemini AI</p>
                </div>
              </div>

              {isRecLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="animate-pulse border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
                      <div className="h-2 bg-slate-200 rounded w-full mb-2" />
                      <div className="h-2 bg-slate-200 rounded w-3/4 mb-4" />
                      <div className="h-9 bg-slate-200 rounded-xl w-full" />
                    </div>
                  ))}
                </div>
              ) : recommendations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendations.slice(0, 2).map((course, idx) => (
                    <div key={course._id || idx} className="border border-indigo-100 hover:border-indigo-200 rounded-2xl p-5 transition-colors shadow-sm bg-gradient-to-br from-indigo-50/10 to-white relative overflow-hidden flex flex-col justify-between">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full mb-3 uppercase tracking-wider">
                          {course.category}
                        </span>
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{course.description}</p>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm font-bold text-slate-900">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                        <Link 
                          href={`/courses/${course._id}`} 
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No custom recommendations at this time.</p>
              )}
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
                    <span className="font-bold text-slate-900">{user.enrolledCourses ? user.enrolledCourses.length : 0}</span>
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

              {user.role === 'admin' && (
                <div className="border-t border-slate-100 pt-6 mt-6">
                  <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Quick Actions</h4>
                  <div className="space-y-3">
                    <Link
                      href="/dashboard/courses"
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-100 hover:text-indigo-600 transition-all shadow-sm group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-indigo-50 group-hover:bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">Manage Courses</span>
                      </div>
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <Link
                      href="/dashboard/courses/add"
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-100 hover:text-indigo-600 transition-all shadow-sm group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-indigo-50 group-hover:bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">Add Course</span>
                      </div>
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
