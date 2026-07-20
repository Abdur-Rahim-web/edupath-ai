'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface EnrollButtonProps {
  courseId: string;
  initialIsEnrolled: boolean;
}

export default function EnrollButton({ courseId, initialIsEnrolled }: EnrollButtonProps) {
  const { isAuthenticated, refreshSession } = useAuth();
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to enroll');
      }

      setIsEnrolled(true);
      
      // Refresh Auth Context session
      if (refreshSession) {
        await refreshSession();
      }

      // Refresh page data
      router.refresh();
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEnrolled) {
    return (
      <button 
        disabled
        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg cursor-not-allowed shadow-md shadow-emerald-600/20"
      >
        Enrolled ✓
      </button>
    );
  }

  return (
    <div className="w-full">
      {error && <p className="text-red-500 text-xs font-semibold mb-2 text-center">{error}</p>}
      <button
        onClick={handleEnroll}
        disabled={isSubmitting}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enrolling...' : 'Enroll Now'}
      </button>
    </div>
  );
}
