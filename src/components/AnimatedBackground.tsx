import React from 'react';
import { Heart, Shield, Stethoscope, Plus, Activity } from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Medical Icons */}
      <div className="absolute top-20 left-16 opacity-10 animate-float-slow">
        <Heart className="w-12 h-12 text-red-400 dark:text-red-300" />
      </div>
      
      <div className="absolute top-40 right-24 opacity-8 animate-float-medium" style={{ animationDelay: '1s' }}>
        <Shield className="w-10 h-10 text-blue-400 dark:text-blue-300" />
      </div>
      
      <div className="absolute bottom-32 left-20 opacity-12 animate-float-fast" style={{ animationDelay: '2s' }}>
        <Stethoscope className="w-14 h-14 text-green-400 dark:text-green-300" />
      </div>
      
      <div className="absolute bottom-48 right-32 opacity-10 animate-float-slow" style={{ animationDelay: '0.5s' }}>
        <Plus className="w-8 h-8 text-purple-400 dark:text-purple-300" />
      </div>
      
      <div className="absolute top-1/2 left-1/4 opacity-15 animate-breathe" style={{ animationDelay: '1.5s' }}>
        <Activity className="w-16 h-16 text-cyan-400 dark:text-cyan-300" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-32 right-1/4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-xl animate-pulse-medium" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-16 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse-slower" style={{ animationDelay: '2s' }}></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-green-400/30 rounded-full animate-float-${i % 3 === 0 ? 'slow' : i % 3 === 1 ? 'medium' : 'fast'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Medical Cross Patterns */}
      <div className="absolute top-1/4 left-1/2 opacity-5 animate-pulse-slow">
        <div className="relative">
          <div className="w-20 h-2 bg-white/30 dark:bg-green-400/30 rounded-full"></div>
          <div className="w-2 h-20 bg-white/30 dark:bg-green-400/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* DNA Helix Inspired Lines */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-green-400 animate-pulse-slow"
          />
          <path
            d="M0,50 Q25,70 50,50 T100,50"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-blue-400 animate-pulse-medium"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;