import { useEffect, useState } from 'react';
import carelinkLogo from '@/assets/carelink-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
    const timer3 = setTimeout(() => setAnimationPhase(3), 1500);
    const timer4 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      {/* Main Logo Container - Full Screen */}
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        {/* Logo Image - Large and Centered */}
        <div className={`transform transition-all duration-1000 ease-out ${animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <img 
            src={carelinkLogo} 
            alt="CareLink - رابط الرعاية" 
            className="max-w-lg w-full h-auto drop-shadow-2xl rounded-3xl"
          />
        </div>

        {/* Loading Animation */}
        <div className={`mt-12 transition-all duration-500 delay-500 ${animationPhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>

      {/* Fade Out Effect */}
      <div className={`absolute inset-0 bg-white dark:bg-slate-900 transition-opacity duration-500 ${isVisible ? 'opacity-0' : 'opacity-100'} pointer-events-none`}></div>
    </div>
  );
};

export default SplashScreen;