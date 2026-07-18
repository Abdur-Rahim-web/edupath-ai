import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Log In</h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl">
        The login functionality is currently under development. Stay tuned!
      </p>
      <Link href="/" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg">
        Return Home
      </Link>
    </div>
  );
}
