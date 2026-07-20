import React from 'react';
import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  category: string;
  instructor: string;
  level: string;
  price: number;
  imageUrl?: string;
  isLoading?: boolean;
}

export const CourseCardSkeleton = () => {
  return (
    <div className="w-full h-full min-h-[380px] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col animate-pulse">
      <div className="h-48 bg-slate-200 w-full" />
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-auto" />
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-100">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-6 bg-slate-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  category,
  instructor,
  level,
  price,
  imageUrl,
  isLoading = false,
}) => {
  if (isLoading) return <CourseCardSkeleton />;

  return (
    <Link href={`/courses/${id}`} className="group h-full flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Course Image */}
      <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <>
            <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </>
        )}
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-indigo-600 rounded-full shadow-sm z-10">
          {category}
        </span>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-slate-500 mb-auto">By {instructor}</p>
        
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center text-sm text-slate-600">
            <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {level}
          </div>
          <div className="text-lg font-bold text-slate-900">
            {price === 0 ? 'Free' : `$${price}`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
