'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';

    if (path === '/explore') {
      return (
        pathname === '/explore' ||
        pathname.startsWith('/courses/')
      );
    }

    return pathname === path || pathname.startsWith(path + '/');
  };

  const desktopLink = (path: string) =>
    `transition-colors ${isActive(path)
      ? 'text-indigo-600 font-semibold'
      : 'text-slate-600 hover:text-indigo-600 font-medium'
    }`;

  const mobileLink = (path: string) =>
    `block px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${isActive(path)
      ? 'text-indigo-600 bg-indigo-50'
      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600"
          >
            EduPath AI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">

            <Link href="/" className={desktopLink('/')}>
              Home
            </Link>

            <Link href="/explore" className={desktopLink('/explore')}>
              Explore
            </Link>

            <Link href="/about" className={desktopLink('/about')}>
              About
            </Link>

            <Link href="/contact" className={desktopLink('/contact')}>
              Contact
            </Link>

            <Link href="/faq" className={desktopLink('/faq')}>
              FAQ
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className={desktopLink('/dashboard')}
                >
                  Dashboard
                </Link>

                {user?.role === 'admin' && (
                  <>
                    <Link
                      href="/dashboard/courses"
                      className={desktopLink('/dashboard/courses')}
                    >
                      Manage Courses
                    </Link>

                    <Link
                      href="/dashboard/courses/add"
                      className={desktopLink('/dashboard/courses/add')}
                    >
                      Add Course
                    </Link>
                  </>
                )}
              </>
            )}

            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className={desktopLink('/login')}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 font-medium"
              >
                Logout
              </button>
            )}

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 py-3 px-4 space-y-2 shadow-lg">

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={mobileLink('/')}
          >
            Home
          </Link>

          <Link
            href="/explore"
            onClick={() => setIsOpen(false)}
            className={mobileLink('/explore')}
          >
            Explore
          </Link>

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={mobileLink('/about')}
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={mobileLink('/contact')}
          >
            Contact
          </Link>

          <Link
            href="/faq"
            onClick={() => setIsOpen(false)}
            className={mobileLink('/faq')}
          >
            FAQ
          </Link>

          {isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className={mobileLink('/dashboard')}
              >
                Dashboard
              </Link>

              {user?.role === 'admin' && (
                <>
                  <Link
                    href="/dashboard/courses"
                    onClick={() => setIsOpen(false)}
                    className={mobileLink('/dashboard/courses')}
                  >
                    Manage Courses
                  </Link>

                  <Link
                    href="/dashboard/courses/add"
                    onClick={() => setIsOpen(false)}
                    className={mobileLink('/dashboard/courses/add')}
                  >
                    Add Course
                  </Link>
                </>
              )}
            </>
          )}

          <div className="border-t pt-3 mt-3">

            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block mt-2 text-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;