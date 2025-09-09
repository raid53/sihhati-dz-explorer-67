
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const ServiceCardSkeleton = () => (
  <Card className="animate-pulse bg-white border-0 shadow-lg">
    <CardContent className="p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
        <div className="h-8 bg-gray-200 rounded w-20 mx-auto"></div>
      </div>
    </CardContent>
  </Card>
);

export const ClinicCardSkeleton = () => (
  <Card className="animate-pulse bg-white border-0 shadow-lg overflow-hidden">
    <div className="w-full h-48 bg-gray-200"></div>
    <CardContent className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        <div className="w-10 h-10 bg-gray-200 rounded"></div>
      </div>
    </CardContent>
  </Card>
);

export const StatSkeleton = () => (
  <div className="text-center animate-pulse">
    <div className="bg-gray-200 w-20 h-20 rounded-full mx-auto mb-4"></div>
    <div className="h-8 bg-gray-200 rounded mb-2 w-16 mx-auto"></div>
    <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
  </div>
);

export const ReviewSkeleton = () => (
  <Card className="animate-pulse bg-white border-0 shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
      </div>
    </CardContent>
  </Card>
);

export const SearchSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto mb-6">
      <div className="flex-1 h-14 bg-gray-200 rounded-xl"></div>
      <div className="lg:w-56 h-14 bg-gray-200 rounded-xl"></div>
      <div className="h-14 w-32 bg-gray-200 rounded-xl"></div>
      <div className="h-14 w-24 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
);

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'gray';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'green' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    green: 'border-green-500',
    blue: 'border-blue-500',
    gray: 'border-gray-500'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}></div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg animate-pulse">جاري التحميل...</p>
    </div>
  </div>
);

export const ButtonLoader = () => (
  <div className="flex items-center justify-center">
    <LoadingSpinner size="sm" color="green" />
    <span className="mr-2">جاري المعالجة...</span>
  </div>
);

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
    <div 
      className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    ></div>
  </div>
);

export const PulseDot = () => (
  <div className="flex items-center justify-center">
    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mx-1"></div>
    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mx-1 animation-delay-200"></div>
    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mx-1 animation-delay-400"></div>
  </div>
);

export default {
  ServiceCardSkeleton,
  ClinicCardSkeleton,
  StatSkeleton,
  ReviewSkeleton,
  SearchSkeleton,
  LoadingSpinner,
  PageLoader,
  ButtonLoader,
  ProgressBar,
  PulseDot
};
