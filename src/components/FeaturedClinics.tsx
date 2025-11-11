import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Phone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
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
  const { getClinics } = useAdmin();
  
  // Map image paths to imported images
  const imageMap: Record<string, string> = {
    '/src/assets/clinic-1.jpg': clinic1,
    '/src/assets/clinic-2.jpg': clinic2,
    '/src/assets/hospital-1.jpg': hospital1,
    '/src/assets/hospital-2.jpg': hospital2,
  };

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

  // إذا لم توجد خدمات، عرض العيادات من AdminContext
  if (services.length === 0) {
    const allClinics = getClinics();

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
            {allClinics.slice(0, showAll ? allClinics.length : 6).map((clinic) => (
              <Link key={clinic.id} to={`/clinic/${clinic.id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={imageMap[clinic.image] || clinic.image} 
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
                عرض المزيد من العيادات ({allClinics.length - 6} أخرى)
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
