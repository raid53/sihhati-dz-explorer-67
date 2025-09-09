
import { useState } from 'react';
import { ArrowDown, MapPin, Clock, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import medicalBg1 from '@/assets/medical-bg-1.png';
import medicalBg2 from '@/assets/medical-bg-2.png';
import medicalBg3 from '@/assets/medical-bg-3.png';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  const handleAuthModalOpen = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* خلفية متدرجة محسنة مع دعم الوضع الليلي المتقدم */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-blue-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
      
      {/* طبقة إضافية للوضع الليلي */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-600/20 to-blue-600/30 dark:from-green-900/30 dark:via-green-800/20 dark:to-blue-900/40"></div>
      
      {/* عناصر تزيينية متحركة ومحسنة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 dark:bg-green-400/20 rounded-full backdrop-blur-md hover:bg-white/20 dark:hover:bg-green-400/30 hover:scale-110 transition-all duration-700 shadow-lg dark:shadow-green-400/10 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/15 dark:bg-blue-400/25 rounded-full backdrop-blur-md hover:bg-white/25 dark:hover:bg-blue-400/35 hover:scale-110 transition-all duration-700 shadow-lg dark:shadow-blue-400/10 animate-float-medium"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/20 dark:bg-emerald-400/30 rounded-full backdrop-blur-md hover:bg-white/30 dark:hover:bg-emerald-400/40 hover:scale-110 transition-all duration-700 shadow-lg dark:shadow-emerald-400/10 animate-float-fast"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/8 dark:bg-cyan-400/15 rounded-full backdrop-blur-md hover:bg-white/15 dark:hover:bg-cyan-400/25 hover:scale-110 transition-all duration-700 shadow-lg dark:shadow-cyan-400/10 animate-float-slow"></div>
        
        {/* أشكال هندسية متحركة إضافية */}
        <div className="absolute top-1/3 right-1/4 w-32 h-1 bg-white/15 dark:bg-green-400/25 rounded-full rotate-45 hover:bg-white/25 dark:hover:bg-green-400/35 transition-all duration-700 shadow-md dark:shadow-green-400/10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-1 bg-white/20 dark:bg-blue-400/30 rounded-full -rotate-45 hover:bg-white/30 dark:hover:bg-blue-400/40 transition-all duration-700 shadow-md dark:shadow-blue-400/10 animate-pulse-medium"></div>
        
        {/* عناصر طبية متحركة */}
        <div className="absolute top-1/4 left-1/3 opacity-20 animate-breathe">
          <Heart className="w-8 h-8 text-red-400 dark:text-red-300" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-15 animate-float-medium">
          <div className="relative">
            <div className="w-6 h-1 bg-white/40 dark:bg-green-400/40 rounded-full"></div>
            <div className="w-1 h-6 bg-white/40 dark:bg-green-400/40 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* موجات متحركة في الخلفية */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-slow"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-slow" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>

      {/* تراكب النمط المحسن مع صور طبية متحركة */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* صور طبية متحركة ومتغيرة - تتبادل الظهور */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-full mix-blend-overlay dark:mix-blend-soft-light animate-[fade-cycle-1_9s_infinite]"
            style={{
              backgroundImage: `url(${medicalBg1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(1.2) contrast(1.5) saturate(0.95)'
            }}
          ></div>
          
          <div 
            className="absolute top-0 left-0 w-full h-full mix-blend-overlay dark:mix-blend-soft-light animate-[fade-cycle-2_9s_infinite]"
            style={{
              backgroundImage: `url(${medicalBg2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(1.3) contrast(1.4) saturate(1.0)'
            }}
          ></div>
          
          <div 
            className="absolute top-0 left-0 w-full h-full mix-blend-overlay dark:mix-blend-soft-light animate-[fade-cycle-3_9s_infinite]"
            style={{
              backgroundImage: `url(${medicalBg3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(1.4) contrast(1.3) saturate(1.1)'
            }}
          ></div>
        </div>
      </div>

      {/* المحتوى */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <div className="animate-fade-up">
          <Badge className="bg-white/25 dark:bg-slate-800/80 text-white dark:text-green-400 border-white/40 dark:border-green-400/50 mb-8 px-6 py-3 text-lg font-medium hover:bg-white/35 dark:hover:bg-slate-700/90 hover:scale-105 transition-all duration-500 backdrop-blur-lg shadow-lg dark:shadow-green-400/20">
            رابط الرعاية - نربط بينك وبين أفضل الخدمات الصحية
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-slate-100 mb-8 leading-tight">
            رعايتك
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 dark:from-green-400 dark:via-emerald-300 dark:to-green-500 hover:from-yellow-200 hover:to-orange-200 dark:hover:from-green-300 dark:hover:to-emerald-400 transition-all duration-700">
              رسالتنا
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 dark:text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            نحن نربط بينك وبين أفضل الأطباء والعيادات ومراكز الرعاية الصحية في جميع أنحاء الجزائر. 
            احجز موعدك الآن بكل سهولة وأمان.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-14">
            {isAuthenticated ? (
              <>
                <Button className="bg-white/95 dark:bg-green-500 dark:hover:bg-green-400 text-green-600 dark:text-white hover:bg-white dark:hover:bg-green-400 h-16 px-10 text-lg font-bold hover:scale-105 hover:shadow-2xl dark:hover:shadow-green-400/30 transition-all duration-500 backdrop-blur-sm border-2 border-transparent dark:border-green-400/30 dark:hover:border-green-300">
                  ابدأ البحث الآن
                </Button>
                <Button variant="outline" className="border-2 border-white/90 dark:border-slate-600 text-white dark:text-slate-200 hover:bg-white/15 dark:hover:bg-slate-700/80 hover:text-white dark:hover:text-white h-16 px-10 text-lg font-bold hover:scale-105 transition-all duration-500 backdrop-blur-lg dark:bg-slate-800/50">
                  كيف نعمل؟
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => handleAuthModalOpen('register')}
                  className="bg-white/95 dark:bg-green-500 dark:hover:bg-green-400 text-green-600 dark:text-white hover:bg-white dark:hover:bg-green-400 h-16 px-10 text-lg font-bold hover:scale-105 hover:shadow-2xl dark:hover:shadow-green-400/30 transition-all duration-500 backdrop-blur-sm border-2 border-transparent dark:border-green-400/30 dark:hover:border-green-300"
                >
                  انضم إلينا الآن
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleAuthModalOpen('login')}
                  className="border-2 border-white/90 dark:border-slate-600 text-white dark:text-slate-200 hover:bg-white/15 dark:hover:bg-slate-700/80 hover:text-white dark:hover:text-white h-16 px-10 text-lg font-bold hover:scale-105 transition-all duration-500 backdrop-blur-lg dark:bg-slate-800/50"
                >
                  تسجيل الدخول
                </Button>
              </>
            )}
          </div>

          {/* إحصائيات محسنة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group cursor-pointer bg-white/10 dark:bg-slate-800/60 rounded-3xl p-8 backdrop-blur-lg hover:bg-white/15 dark:hover:bg-slate-700/70 transition-all duration-500 border border-white/20 dark:border-slate-600/50 hover:border-white/40 dark:hover:border-green-400/50 shadow-lg dark:shadow-slate-900/50 hover:shadow-2xl dark:hover:shadow-green-400/20">
              <div className="text-4xl font-bold text-white dark:text-green-400 mb-3 group-hover:scale-110 transition-transform duration-500">4,000+</div>
              <div className="text-white/90 dark:text-slate-300 group-hover:text-white dark:group-hover:text-green-300 transition-colors duration-500 font-medium">مقدم خدمة صحية</div>
            </div>
            <div className="text-center group cursor-pointer bg-white/10 dark:bg-slate-800/60 rounded-3xl p-8 backdrop-blur-lg hover:bg-white/15 dark:hover:bg-slate-700/70 transition-all duration-500 border border-white/20 dark:border-slate-600/50 hover:border-white/40 dark:hover:border-blue-400/50 shadow-lg dark:shadow-slate-900/50 hover:shadow-2xl dark:hover:shadow-blue-400/20">
              <div className="text-4xl font-bold text-white dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-500">50,000+</div>
              <div className="text-white/90 dark:text-slate-300 group-hover:text-white dark:group-hover:text-blue-300 transition-colors duration-500 font-medium">مريض راضٍ</div>
            </div>
            <div className="text-center group cursor-pointer bg-white/10 dark:bg-slate-800/60 rounded-3xl p-8 backdrop-blur-lg hover:bg-white/15 dark:hover:bg-slate-700/70 transition-all duration-500 border border-white/20 dark:border-slate-600/50 hover:border-white/40 dark:hover:border-emerald-400/50 shadow-lg dark:shadow-slate-900/50 hover:shadow-2xl dark:hover:shadow-emerald-400/20">
              <div className="text-4xl font-bold text-white dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform duration-500">58</div>
              <div className="text-white/90 dark:text-slate-300 group-hover:text-white dark:group-hover:text-emerald-300 transition-colors duration-500 font-medium">ولاية مغطاة</div>
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير المحسن */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce hover:scale-110 transition-transform duration-500 cursor-pointer bg-white/15 dark:bg-slate-800/70 rounded-full p-4 backdrop-blur-lg border border-white/30 dark:border-slate-600/50 shadow-lg dark:shadow-slate-900/50 hover:bg-white/25 dark:hover:bg-slate-700/80">
          <ArrowDown className="w-6 h-6 text-white/80 dark:text-slate-300 hover:text-white dark:hover:text-green-400 transition-colors duration-500" />
        </div>
      </div>

      {/* نافذة تسجيل الدخول */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </section>
  );
};

export default HeroSection;
