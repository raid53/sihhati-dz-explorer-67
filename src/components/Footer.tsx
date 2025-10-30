
import { Heart, MapPin, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Footer = () => {
  const [showAllWilayas, setShowAllWilayas] = useState(false);
  
  const wilayas = [
    'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار',
    'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر العاصمة',
    'الجلفة', 'جيجل', 'سطيف', 'سعيدة', 'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة',
    'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض',
    'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي', 'خنشلة',
    'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غرداية', 'غليزان',
    'تيميمون', 'برج باجي مختار', 'أولاد جلال', 'بني عباس', 'عين صالح', 'عين قزام', 'تقرت', 'جانت',
    'المغير', 'المنيعة'
  ];

  return (
    <footer className="bg-muted/50 text-foreground">
      {/* Newsletter Section */}
      <div className="bg-primary py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold mb-4 text-primary-foreground">
            اشترك في نشرتنا الإخبارية
          </h3>
          <p className="text-primary-foreground/80 mb-6">
            احصل على آخر الأخبار والعروض الصحية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="أدخل بريدك الإلكتروني"
              className="bg-background text-foreground h-12"
            />
            <Button className="bg-background text-foreground hover:bg-accent h-12 px-6">
              اشتراك
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-bold mr-2">رابط الرعاية</div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                منصة الجزائر الأولى للخدمات الصحية. نربط بين المرضى ومقدمي الرعاية الصحية بطريقة آمنة وسهلة.
              </p>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="w-5 h-5 ml-2" />
                <span>الجزائر العاصمة، الجزائر</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-5 h-5 ml-2" />
                <span>24/7 خدمة العملاء</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                <li><a href="/clinics" className="text-muted-foreground hover:text-primary transition-colors">العيادات</a></li>
                <li><a href="/doctors" className="text-muted-foreground hover:text-primary transition-colors">الأطباء</a></li>
                <li><a href="/hospitals" className="text-muted-foreground hover:text-primary transition-colors">المستشفيات</a></li>
                <li><a href="/pharmacy" className="text-muted-foreground hover:text-primary transition-colors">الصيدليات</a></li>
                <li><a href="/emergency" className="text-muted-foreground hover:text-red-500 transition-colors font-semibold">الطوارئ</a></li>
                <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">من نحن</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">خدماتنا</h4>
              <ul className="space-y-3">
                <li><a href="/booking" className="text-muted-foreground hover:text-primary transition-colors">حجز المواعيد</a></li>
                <li><a href="/telemedicine" className="text-muted-foreground hover:text-primary transition-colors">الطب عن بُعد</a></li>
                <li><a href="/home-care" className="text-muted-foreground hover:text-primary transition-colors">التمريض المنزلي</a></li>
                <li><a href="/lab-tests" className="text-muted-foreground hover:text-primary transition-colors">التحاليل الطبية</a></li>
                <li><a href="/medical-records" className="text-muted-foreground hover:text-primary transition-colors">السجلات الطبية</a></li>
                <li><a href="/insurance" className="text-muted-foreground hover:text-primary transition-colors">التأمين الصحي</a></li>
              </ul>
            </div>

            {/* Coverage Areas */}
            <div>
              <h4 className="text-lg font-semibold mb-6">الولايات المغطاة</h4>
              <div className="flex flex-wrap gap-2">
                {(showAllWilayas ? wilayas : wilayas.slice(0, 10)).map((wilaya, index) => (
                  <span key={index} className="bg-accent text-sm px-3 py-1 rounded-full text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    {wilaya}
                  </span>
                ))}
              </div>
              <button 
                className="text-primary text-sm mt-3 hover:text-primary/80 transition-colors"
                onClick={() => setShowAllWilayas(!showAllWilayas)}
              >
                {showAllWilayas ? 'عرض أقل' : `عرض جميع الولايات (${wilayas.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 رابط الرعاية. جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              سياسة الخصوصية
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              شروط الاستخدام
            </a>
            <button
              onClick={() => (window as any).openDisclaimer?.()}
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              إخلاء المسؤولية القانونية
            </button>
            <a href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
