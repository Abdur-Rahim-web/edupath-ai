'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              EduPath AI
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            <Link href="/explore" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Explore</Link>

            {isAuthenticated && (
              <>
                <Link href="/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Dashboard</Link>
                {user?.role === 'admin' && (
                  <Link href="/dashboard/courses/add" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Add Course</Link>
                )}
              </>
            )}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-all shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-slate-500 hover:text-slate-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
