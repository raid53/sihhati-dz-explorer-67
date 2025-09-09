import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  User, 
  Shield, 
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingSystem from '@/components/BookingSystem';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  createdAt: string;
}

interface Provider {
  id: string;
  userId: string;
  speciality: string;
  licenseNumber: string;
  experience: string;
  serviceType: 'clinic' | 'hospital' | 'home_nursing' | 'addiction_center';
  description: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  userType: 'patient' | 'provider';
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [service, setService] = useState<Service | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServiceData = async () => {
      try {
        setLoading(true);
        setError(null);

        const allServices = JSON.parse(localStorage.getItem('services') || '[]');
        const allProviders = JSON.parse(localStorage.getItem('providers') || '[]');
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

        const foundService = allServices.find((s: Service) => s.id === id);
        
        if (!foundService) {
          setError('الخدمة غير موجودة');
          return;
        }

        setService(foundService);
        
        const foundProvider = allProviders.find((p: Provider) => p.id === foundService.providerId);
        if (foundProvider) {
          setProvider(foundProvider);
          
          const foundUser = allUsers.find((u: User) => u.id === foundProvider.userId);
          if (foundUser) {
            setUser(foundUser);
          }
        }
      } catch (err) {
        console.error('Error loading service data:', err);
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadServiceData();
    }
  }, [id]);

  const getServiceTypeLabel = (serviceType: string) => {
    const labels = {
      'clinic': 'عيادة طبية',
      'hospital': 'مستشفى',
      'home_nursing': 'تمريض منزلي',
      'addiction_center': 'مركز علاج إدمان'
    };
    return labels[serviceType as keyof typeof labels] || serviceType;
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يرجى تسجيل الدخول أولاً للتمكن من حجز موعد",
        variant: "destructive"
      });
      return;
    }
    
    if (!service || !provider || !user) {
      toast({
        title: "خطأ في البيانات",
        description: "لا يمكن إتمام الحجز، بيانات مقدم الخدمة غير مكتملة",
        variant: "destructive"
      });
      return;
    }
    
    setShowBooking(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل تفاصيل الخدمة...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'الخدمة غير موجودة'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error === 'الخدمة غير موجودة' 
                ? 'لم يتم العثور على الخدمة المطلوبة' 
                : 'يرجى المحاولة مرة أخرى لاحقاً'
              }
            </p>
            <div className="space-x-4">
              <Link to="/">
                <Button className="bg-green-500 hover:bg-green-600">
                  العودة للصفحة الرئيسية
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // إذا كان نظام الحجز مفتوحاً، عرض نظام الحجز
  if (showBooking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Button
              onClick={() => setShowBooking(false)}
              variant="outline"
              className="flex items-center gap-2 mb-4"
            >
              <ArrowRight className="w-4 h-4" />
              العودة لتفاصيل الخدمة
            </Button>
          </div>

          <BookingSystem 
            clinicId={parseInt(service.providerId)} 
            clinicName={user?.name || 'مقدم الخدمة'} 
          />
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600 transition-colors">الرئيسية</Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{service.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Image */}
            <Card className="overflow-hidden animate-fade-in-scale">
              <div className="relative h-64 lg:h-80">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-green-600" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  {provider?.isVerified && (
                    <Badge className="bg-green-500 text-white flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      موثق
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/90">
                    {service.category}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Service Info */}
            <Card className="animate-fade-in-scale">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">4.8</span>
                        <span className="text-sm">(24 تقييم)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm text-green-600 font-medium">متاح اليوم</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-bold text-green-600">
                      {service.price.toLocaleString()} دج
                    </div>
                    <p className="text-gray-500 text-sm">للجلسة الواحدة</p>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">وصف الخدمة</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Features */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">مميزات الخدمة:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>استشارة مهنية متخصصة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>متابعة ما بعد الجلسة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>إمكانية الإلغاء المجاني</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>ضمان جودة الخدمة</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            {provider && user && (
              <Card className="animate-fade-in-scale">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">معلومات مقدم الخدمة</h3>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">
                          د. {user.name}
                        </h4>
                        {provider.isVerified && (
                          <Shield className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-green-600 font-medium mb-2">{provider.speciality}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{getServiceTypeLabel(provider.serviceType)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>خبرة {provider.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>رخصة رقم: {provider.licenseNumber}</span>
                        </div>
                      </div>

                      {provider.description && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold text-gray-900 mb-2">نبذة عن الطبيب:</h5>
                          <p className="text-gray-700 text-sm leading-relaxed">{provider.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 animate-fade-in-scale">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {service.price.toLocaleString()} دج
                  </div>
                  <p className="text-gray-600">سعر الجلسة الواحدة</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">المدة المتوقعة:</span>
                    <span className="font-medium">30-45 دقيقة</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-600">التوفر:</span>
                    <span className="font-medium text-green-600">متاح اليوم</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-600">نوع الخدمة:</span>
                    <span className="font-medium">{service.category}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg mb-4"
                  disabled={!provider || !user}
                >
                  {!isAuthenticated ? 'سجل دخولك للحجز' : 'احجز الآن'}
                </Button>

                <div className="text-center text-sm text-gray-500 mb-4">
                  <p>* يمكن إلغاء الحجز مجاناً قبل 24 ساعة</p>
                </div>

                {provider && user && (
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-3 text-gray-900">معلومات التواصل</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${user.phone}`} className="text-green-600 hover:underline">
                          {user.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{user.address}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
