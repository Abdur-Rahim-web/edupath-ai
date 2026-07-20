'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CourseCard, { CourseCardSkeleton } from '@/components/CourseCard';
import FAQItem from '@/components/FAQItem';

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          // Take the first 4 courses as featured
          setCourses(data.slice(0, 4));
        }
      } catch (e) {
        console.error('Failed to load featured courses:', e);
      } finally {
        setIsCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-slate-900/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
            Future of Learning
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl">
            Unlock Your Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI-Driven</span> Education
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Discover personalized learning paths tailored specifically to your goals. Join thousands of students learning from world-class instructors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/explore" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 transform hover:-translate-y-1">
              Explore Courses
            </Link>
            <Link href="/register" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg backdrop-blur-md transition-all duration-300">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Top Categories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Find the perfect course in your desired field. We offer a wide range of subjects to help you advance your career.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Development', 'Business', 'Design', 'Marketing', 'Data Science', 'Photography'].map((category, idx) => (
              <div key={idx} className="group cursor-pointer flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-colors duration-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full group-hover:bg-indigo-500 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 text-center">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Courses Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Courses</h2>
              <p className="text-slate-600 max-w-2xl">Hand-picked courses from top instructors to kickstart your journey.</p>
            </div>
            <Link href="/explore" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors pb-1">
              View All
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isCoursesLoading
              ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
              : courses.length > 0 ? (
                courses.map(course => (
                  <CourseCard
                    key={course._id}
                    id={course._id}
                    title={course.title}
                    category={course.category}
                    instructor={course.instructor}
                    level={course.level}
                    price={course.price}
                    imageUrl={course.imageUrl}
                  />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-8">
                  <p className="text-slate-500">No courses available at this moment.</p>
                </div>
              )
            }
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose EduPath AI?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We combine cutting-edge technology with world-class education to deliver an unparalleled learning experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Expert Instructors', desc: 'Learn from industry professionals with years of real-world experience.', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { title: 'AI-Powered Paths', desc: 'Get personalized curriculum recommendations based on your unique goals.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { title: 'Interactive Learning', desc: 'Engage with hands-on projects, quizzes, and peer reviews.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { title: 'Lifetime Access', desc: 'Learn at your own pace with unrestricted access to course materials.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Start your learning journey in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-700 z-0"></div>
            {[
              { step: '1', title: 'Register Account', desc: 'Sign up for free and set up your learning profile.' },
              { step: '2', title: 'Select Courses', desc: 'Browse our catalog or let AI recommend the best path.' },
              { step: '3', title: 'Start Learning', desc: 'Dive into the content, complete projects, and earn certificates.' }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center text-3xl font-extrabold text-indigo-400 mb-6 shadow-[0_0_20px_rgba(79,70,229,0.2)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Join thousands of happy learners who have transformed their careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Johnson', role: 'Frontend Developer', quote: 'EduPath AI completely changed how I learn. The personalized path helped me land my dream job in just 6 months!' },
              { name: 'Maria Garcia', role: 'Data Analyst', quote: 'The quality of the courses is unmatched. The instructors explain complex concepts in a way that is incredibly easy to grasp.' },
              { name: 'David Smith', role: 'UI Designer', quote: 'I love the interactive nature of the platform. The UI is stunning and the learning experience is seamless.' }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full relative">
                <div className="text-indigo-200 mb-6">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <p className="text-slate-600 mb-8 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full mr-4 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500 blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-700 blur-3xl opacity-50"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
              <p className="text-indigo-100 mb-10 max-w-2xl mx-auto">Subscribe to our newsletter to get the latest courses, updates, and exclusive discounts right in your inbox.</p>

              <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-6 py-4 rounded-full border-none focus:ring-4 focus:ring-indigo-400/50 outline-none shadow-inner text-slate-900"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Got questions? We've got answers.</p>
          </div>

          <div className="space-y-6">
            {[
              { q: 'Is EduPath AI free to use?', a: 'Creating an account and exploring the catalog is completely free. We offer both free and premium courses.' },
              { q: 'How does the AI recommendation work?', a: 'Our AI analyzes your goals, current skill level, and learning pace to curate a personalized curriculum specifically for you.' },
              { q: 'Do I get a certificate upon completion?', a: 'Yes! All premium courses and most free courses provide a verified certificate upon successful completion.' },
              { q: 'Can I access the courses on mobile?', a: 'Absolutely. Our platform is fully responsive and works beautifully on desktops, tablets, and smartphones.' }
            ].map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
