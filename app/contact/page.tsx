import React from 'react';

export const metadata = {
  title: 'Contact Us | EduPath AI',
  description: 'Get in touch with EduPath AI support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Contact Us</h1>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Have questions or need assistance? Our support team is here to help. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={5}
                className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="button"
              className="inline-flex justify-center items-center px-8 py-3 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-lg w-full sm:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
