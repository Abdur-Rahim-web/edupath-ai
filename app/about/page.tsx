import React from 'react';

export const metadata = {
  title: 'About Us | EduPath AI',
  description: 'Learn more about EduPath AI and our mission.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">About EduPath AI</h1>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Welcome to EduPath AI, where we are dedicated to revolutionizing the way you learn. Our platform leverages artificial intelligence to provide personalized, high-quality education to learners worldwide.
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Our Mission</h2>
          <p className="text-slate-600 mb-6">
            We believe that everyone deserves access to top-tier education. Our mission is to democratize learning by providing accessible, affordable, and highly effective courses that cater to individual learning styles and paces.
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Expert instructors with real-world experience</li>
            <li>AI-driven personalized learning paths</li>
            <li>Comprehensive and up-to-date curriculum</li>
            <li>A supportive community of learners</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
