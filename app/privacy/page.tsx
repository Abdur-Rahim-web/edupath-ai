import React from 'react';

export const metadata = {
  title: 'Privacy Policy | EduPath AI',
  description: 'Privacy Policy for EduPath AI.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 prose prose-slate max-w-none">
          <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 mb-6">
            We collect information you provide directly to us, such as when you create an account, enroll in a course, or contact support. This may include your name, email address, and payment information.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. How We Use Information</h2>
          <p className="text-slate-600 mb-6">
            We use the information we collect to provide, maintain, and improve our services, as well as to personalize your learning experience and communicate with you about updates and offers.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Information Sharing</h2>
          <p className="text-slate-600 mb-6">
            We do not sell your personal information to third parties. We may share information with service providers who assist us in operating our platform, subject to strict confidentiality agreements.
          </p>
        </div>
      </div>
    </div>
  );
}
