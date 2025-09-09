import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, X, Stethoscope, Clock, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingTelemedicineButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-fade-in">
      {/* العروض التوضيحية عند التوسع */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 mb-4 animate-scale-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 w-80 backdrop-blur-lg">
            {/* زر الإغلاق */}
            <button 
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* المحتوى */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  الفحص الطبي عن بُعد
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  احجز موعد فحص طبي مع أفضل الأطباء من راحة منزلك
                </p>
              </div>

              {/* المميزات */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-slate-300">أطباء معتمدين ومتخصصين</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-slate-300">مواعيد مرنة 24/7</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-slate-300">خصوصية وأمان تام</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-gray-700 dark:text-slate-300">+500 طبيب متاح</span>
                </div>
              </div>

              {/* زر الحجز */}
              <Link to="/telemedicine-booking">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => setIsExpanded(false)}
                >
                  <Video className="w-5 h-5 mr-2" />
                  احجز موعد فحص عن بُعد
                </Button>
              </Link>

              {/* رابط الخدمات العادية */}
              <div className="text-center pt-2 border-t border-gray-200 dark:border-slate-600">
                <Link 
                  to="/telemedicine" 
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setIsExpanded(false)}
                >
                  أو تصفح جميع خدمات الطب عن بُعد
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* الزر الرئيسي العائم */}
      <div className="relative">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 border-4 border-white dark:border-slate-800 group overflow-hidden"
        >
          {/* خلفية متحركة */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* الأيقونة */}
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {isExpanded ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Video className="w-7 h-7 text-white" />
            )}
          </div>
        </Button>

        {/* مؤشر النشاط */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse">
          <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75" />
        </div>

        {/* تأثير الإشعاع */}
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping animation-delay-1000" />
        <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-10 animate-ping animation-delay-2000" />
      </div>

      {/* نص تعريفي صغير */}
      {!isExpanded && (
        <div className="absolute bottom-0 right-20 bg-blue-600 text-white text-xs px-3 py-1 rounded-lg shadow-lg animate-bounce whitespace-nowrap">
          فحص طبي عن بُعد
          <div className="absolute top-1/2 -right-1 w-0 h-0 border-l-4 border-l-blue-600 border-t-2 border-t-transparent border-b-2 border-b-transparent transform -translate-y-1/2" />
        </div>
      )}
    </div>
  );
};

export default FloatingTelemedicineButton;