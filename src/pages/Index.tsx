import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AdvancedSearch from '@/components/AdvancedSearch';
import ServiceCard from '@/components/ServiceCard';
import FeaturedClinics from '@/components/FeaturedClinics';
import StatsSection from '@/components/StatsSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import AnimatedBackground from '@/components/AnimatedBackground';
import { DisclaimerModal } from '@/components/DisclaimerModal';
import { Heart, Shield, Clock, Users } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import DeliveryService from '@/components/DeliveryService';
import FloatingDeliveryBubble from '@/components/FloatingDeliveryBubble';
import FloatingTelemedicineButton from '@/components/FloatingTelemedicineButton';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  // Listen for manual open events
  useEffect(() => {
    const handleOpenDisclaimer = () => setDisclaimerOpen(true);
    window.addEventListener('openDisclaimer', handleOpenDisclaimer);
    return () => window.removeEventListener('openDisclaimer', handleOpenDisclaimer);
  }, []);

  const healthServices = [
    {
      title: 'العيادات الطبية',
      description: 'ابحث عن أفضل العيادات في منطقتك',
      icon: Heart,
      color: 'bg-green-500',
      count: '2,500+',
      route: '/clinics'
    },
    {
      title: 'المستشفيات',
      description: 'مستشفيات عامة وخاصة معتمدة',
      icon: Shield,
      color: 'bg-blue-500',
      count: '850+',
      route: '/hospitals'
    },
    {
      title: 'مراكز التمريض المنزلي',
      description: 'رعاية صحية في منزلك',
      icon: Clock,
      color: 'bg-purple-500',
      count: '450+',
      route: '/home-care'
    },
    {
      title: 'مراكز معالجة الإدمان',
      description: 'مراكز متخصصة للعلاج والتأهيل',
      icon: Users,
      color: 'bg-red-500',
      count: '120+',
      route: '/addiction-centers'
    }
  ];

  const handleAuthModalOpen = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />

      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Advanced Search Section */}
      <AdvancedSearch />

      {/* Services Grid - Enhanced animated background */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm relative overflow-hidden">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse-slow shadow-lg"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse-slower shadow-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse-medium transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
        </div>
        
        {/* Medical Icons Floating Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-32 left-16 animate-float-slow">
            <Heart className="w-8 h-8 text-red-400" />
          </div>
          <div className="absolute top-48 right-32 animate-float-medium">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div className="absolute bottom-32 left-1/4 animate-float-fast">
            <Clock className="w-7 h-7 text-green-400" />
          </div>
          <div className="absolute bottom-48 right-16 animate-float-slow">
            <Users className="w-9 h-9 text-purple-400" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-slide-in-top">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا الصحية</h2>
            <p className="text-gray-600 text-lg">اكتشف أفضل الخدمات الصحية في الجزائر</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthServices.map((service, index) => (
              <div key={index} className={`animate-fade-in-scale stagger-${index + 1}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Clinics */}
      <FeaturedClinics />

      {/* Delivery Service Section */}
      <DeliveryService />

      {/* Interactive Map Section */}
      <section className="py-16 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-in-top">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">اعثر على أقرب عيادة</h2>
            <p className="text-gray-600 text-lg">خريطة تفاعلية لجميع المرافق الصحية في منطقتك</p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection clinicId={1} />

      {/* Stats Section */}
      <StatsSection />

      {/* Enhanced CTA Section */}
      <section className="py-16 px-4 health-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow backdrop-blur-sm"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/15 rounded-full animate-pulse-medium backdrop-blur-sm"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse-slower backdrop-blur-sm"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-white/5 rounded-full animate-pulse-fast backdrop-blur-sm"></div>
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-slow"></div>
          
          {/* Medical Cross Animation */}
          <div className="absolute top-1/4 right-1/4 opacity-10">
            <div className="relative">
              <div className="w-16 h-2 bg-white/30 rounded-full animate-pulse-slow"></div>
              <div className="w-2 h-16 bg-white/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-medium"></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <div className="animate-slide-in-bottom">
            <h2 className="text-4xl font-bold mb-6">
              انضم إلى منصتنا اليوم
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              احصل على أفضل الخدمات الصحية في الجزائر بأسعار مناسبة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <button className="bg-white text-green-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl animate-bounce-in">
                      لوحة التحكم
                    </button>
                  </Link>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 h-14 px-8 text-lg rounded-xl transition-all duration-300 hover:scale-105 animate-bounce-in stagger-2">
                    ابدأ البحث
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleAuthModalOpen('register')}
                    className="bg-white text-green-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl animate-bounce-in"
                  >
                    تسجيل جديد
                  </button>
                  <button 
                    onClick={() => handleAuthModalOpen('login')}
                    className="border-2 border-white text-white hover:bg-white hover:text-green-600 h-14 px-8 text-lg rounded-xl transition-all duration-300 hover:scale-105 animate-bounce-in stagger-2"
                  >
                    تسجيل الدخول
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Delivery Bubble */}
      <FloatingDeliveryBubble />

      {/* Floating Telemedicine Button */}
      <FloatingTelemedicineButton />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Disclaimer Modal */}
      <DisclaimerModal 
        forceOpen={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />
    </div>
  );
};

export default Index;
