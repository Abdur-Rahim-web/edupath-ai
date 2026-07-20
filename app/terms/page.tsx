import React from 'react';

export const metadata = {
  title: 'Terms of Service | EduPath AI',
  description: 'Terms of Service for using EduPath AI.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Terms of Service</h1>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 prose prose-slate max-w-none">
          <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 mb-6">
            By accessing and using EduPath AI, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our platform.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. User Accounts</h2>
          <p className="text-slate-600 mb-6">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Course Content</h2>
          <p className="text-slate-600 mb-6">
            All course content provided on EduPath AI is the property of the respective instructors and EduPath AI. You may not distribute, modify, or reproduce any content without explicit permission.
          </p>
        </div>
      </div>
    </div>
  );
}
