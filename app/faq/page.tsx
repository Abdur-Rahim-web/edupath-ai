import React from 'react';

export const metadata = {
  title: 'FAQ | EduPath AI',
  description: 'Frequently Asked Questions about EduPath AI.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "You can enroll in any course by navigating to the course details page and clicking the 'Enroll Now' button. You must be signed in to your account."
    },
    {
      question: "Are the courses free?",
      answer: "We offer both free and paid courses. You can filter courses by price on the Explore page."
    },
    {
      question: "Do I get a certificate upon completion?",
      answer: "Yes! All of our courses include a certificate of completion that you can share on your professional networks."
    },
    {
      question: "Can I access the course materials after I finish?",
      answer: "Absolutely. Once enrolled, you have lifetime access to the course materials, including any future updates."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
              <h3 className="text-xl font-bold text-slate-800 mb-3">{faq.question}</h3>
              <p className="text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
