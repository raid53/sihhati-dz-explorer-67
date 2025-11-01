import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Phone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import clinic1 from '@/assets/clinic-1.jpg';
import clinic2 from '@/assets/clinic-2.jpg';
import hospital1 from '@/assets/hospital-1.jpg';
import hospital2 from '@/assets/hospital-2.jpg';

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

const FeaturedClinics: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const allServices = JSON.parse(localStorage.getItem('services') || '[]');
    const allProviders = JSON.parse(localStorage.getItem('providers') || '[]');
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    setServices(allServices.slice(0, 6)); // عرض أول 6 خدمات
    setProviders(allProviders);
    setUsers(allUsers);
  }, []);

  const getProviderInfo = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      const user = users.find(u => u.id === provider.userId);
      return { provider, user };
    }
    return null;
  };

  const getServiceTypeLabel = (serviceType: string) => {
    const labels = {
      'clinic': 'عيادة طبية',
      'hospital': 'مستشفى',
      'home_nursing': 'تمريض منزلي',
      'addiction_center': 'مركز علاج إدمان'
    };
    return labels[serviceType as keyof typeof labels] || serviceType;
  };

  // إذا لم توجد خدمات، عرض البيانات الوهمية القديمة
  if (services.length === 0) {
    const mockClinics = [
      {
        id: 1,
        name: 'عيادة الدكتور محمد بن عيسى',
        specialty: 'طب الأسنان',
        rating: 4.8,
        reviews: 124,
        location: 'حي بومعراف، الجزائر العاصمة',
        image: clinic1,
        distance: '2.5 كم',
        nextAvailable: 'اليوم 3:30 م',
        price: 'من 3000 دج',
        verified: true
      },
      {
        id: 2,
        name: 'مستشفى الشهيد خليل عمران',
        specialty: 'طب القلب والأوعية الدموية',
        rating: 4.9,
        reviews: 89,
        location: 'وسط المدينة، وهران',
        image: hospital1,
        distance: '1.2 كم',
        nextAvailable: 'غداً 10:00 ص',
        price: 'من 4500 دج',
        verified: true
      },
      {
        id: 3,
        name: 'عيادة الدكتورة فاطمة مداني',
        specialty: 'طب الأطفال والرضع',
        rating: 4.7,
        reviews: 156,
        location: 'حي الجامعة، قسنطينة',
        image: clinic2,
        distance: '3.8 كم',
        nextAvailable: 'اليوم 5:00 م',
        price: 'من 2500 دج',
        verified: true
      },
      {
        id: 4,
        name: 'مركز الشفاء للعلاج الطبيعي',
        specialty: 'العلاج الطبيعي وإعادة التأهيل',
        rating: 4.6,
        reviews: 123,
        location: 'حي النصر، سطيف',
        image: hospital2,
        distance: '4.2 كم',
        nextAvailable: 'غداً 2:00 م',
        price: 'من 2000 دج',
        verified: false
      },
      {
        id: 5,
        name: 'عيادة الدكتور عبد الرحمن زروقي',
        specialty: 'طب العيون',
        rating: 4.8,
        reviews: 198,
        location: 'شارع الاستقلال، عنابة',
        image: clinic1,
        distance: '3.1 كم',
        nextAvailable: 'اليوم 4:30 م',
        price: 'من 3500 دج',
        verified: true
      },
      {
        id: 6,
        name: 'مركز الأمل للصحة النفسية',
        specialty: 'الطب النفسي والعلاج النفسي',
        rating: 4.5,
        reviews: 87,
        location: 'حي البدر، تلمسان',
        image: hospital1,
        distance: '5.7 كم',
        nextAvailable: 'غداً 11:00 ص',
        price: 'من 4000 دج',
        verified: true
      },
      {
        id: 7,
        name: 'عيادة النخيل الطبية',
        specialty: 'الطب العام والباطنية',
        rating: 4.7,
        reviews: 142,
        location: 'وسط المدينة، غرداية',
        image: clinic2,
        distance: '2.8 كم',
        nextAvailable: 'اليوم 2:00 م',
        price: 'من 2500 دج',
        verified: true
      },
      {
        id: 8,
        name: 'عيادة الحكيم كاسي موسى إبراهيم',
        specialty: 'معالجة السمنة وسوء التغذية وطب التجميل',
        rating: 4.9,
        reviews: 95,
        location: 'وسط المدينة، غرداية',
        image: clinic1,
        distance: '1.5 كم',
        nextAvailable: 'اليوم 4:00 م',
        price: 'من 4000 دج',
        verified: true
      },
      {
        id: 9,
        name: 'مصحة النخيل ',
        specialty: ' جراحة متخصصة',
        rating: 4.8,
        reviews: 87,
        location: ' قرب المطار، غرداية',
        image: hospital2,
        distance: '8.2 كم',
        nextAvailable: 'غداً 9:00 ص',
        price: 'من 5000 دج',
        verified: true
      }
    ];

    return (
      <section className="py-16 px-4 bg-white/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">العيادات والمراكز المميزة</h2>
            <p className="text-gray-600 text-lg">اكتشف أفضل مقدمي الخدمات الصحية في منطقتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClinics.slice(0, showAll ? mockClinics.length : 6).map((clinic) => (
              <Link key={clinic.id} to={`/clinic/${clinic.id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={clinic.image} 
                      alt={clinic.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {clinic.verified && (
                        <Badge className="bg-green-500 text-white">
                          ✓ موثق
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/90">
                        {clinic.distance}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          {clinic.name}
                        </h3>
                        <p className="text-gray-600">{clinic.specialty}</p>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{clinic.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">({clinic.reviews} تقييم)</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{clinic.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{clinic.nextAvailable}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">{clinic.price}</span>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        احجز الآن
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            {!showAll ? (
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:bg-green-50"
                onClick={() => setShowAll(true)}
              >
                عرض المزيد من العيادات ({mockClinics.length - 6} أخرى)
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:bg-green-50"
                onClick={() => setShowAll(false)}
              >
                عرض أقل
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // عرض الخدمات الحقيقية من قاعدة البيانات
  return (
    <section className="py-16 px-4 bg-white/80 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">الخدمات الصحية المتاحة</h2>
          <p className="text-gray-600 text-lg">اكتشف أحدث الخدمات من مقدمي الرعاية الصحية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const providerInfo = getProviderInfo(service.providerId);
            
            return (
              <Link key={service.id} to={`/service/${service.id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <img 
                        src={Math.random() > 0.5 ? clinic1 : clinic2}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      {providerInfo?.provider.isVerified && (
                        <Badge className="bg-green-500 text-white">
                          ✓ موثق
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/90">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                        {service.title}
                      </h3>
                      {providerInfo && (
                        <p className="text-gray-600 text-sm">
                          د. {providerInfo.user?.name} - {providerInfo.provider.speciality}
                        </p>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {providerInfo && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{getServiceTypeLabel(providerInfo.provider.serviceType)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{providerInfo.user?.phone}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">
                        {service.price.toLocaleString()} دج
                      </span>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="hover:bg-green-50">
            عرض المزيد من الخدمات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClinics;
