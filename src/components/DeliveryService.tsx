import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Truck, Users, MapPin, CreditCard, Car, Ambulance, Bus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliveryService = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  const deliveryServices = [
    {
      type: 'delivery',
      title: 'خدمات التوصيل',
      services: [
        {
          id: 'pharmacy',
          title: 'الأدوية والصيدليات',
          description: 'توصيل الأدوية والمستلزمات الطبية',
          icon: Heart,
          color: 'from-red-500 to-pink-500',
          count: '150+ صيدلية'
        },
        {
          id: 'grocery',
          title: 'البقالة والمواد الغذائية',
          description: 'توصيل المواد الغذائية والاحتياجات اليومية',
          icon: ShoppingCart,
          color: 'from-green-500 to-emerald-500', 
          count: '300+ محل'
        },
        {
          id: 'household',
          title: 'اللوازم المنزلية',
          description: 'أدوات التنظيف والمستلزمات المنزلية',
          icon: Truck,
          color: 'from-blue-500 to-cyan-500',
          count: '200+ محل'
        }
      ]
    },
    {
      type: 'transport',
      title: 'خدمات النقل والتنقل',
      services: [
        {
          id: 'residential-transport',
          title: 'النقل السكني',
          description: 'تنقل آمن ومريح للأشخاص المسنين والمرضى',
          icon: Car,
          color: 'from-purple-500 to-indigo-500',
          count: '50+ مركبة'
        },
        {
          id: 'medical-transport',
          title: 'النقل الطبي',
          description: 'نقل متخصص بين المستشفيات والعيادات',
          icon: Ambulance,
          color: 'from-teal-500 to-blue-500',
          count: '25+ سيارة إسعاف'
        },
        {
          id: 'accessible-transport',
          title: 'النقل المُيَسَّر',
          description: 'مركبات مجهزة لذوي الاحتياجات الخاصة',
          icon: Bus,
          color: 'from-orange-500 to-amber-500',
          count: '30+ مركبة مجهزة'
        }
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-400 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-top">
          <div className="flex justify-center items-center mb-4">
            <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800 font-medium">خدمة اجتماعية</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            خدمات التوصيل والنقل
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            خدمة شاملة للأشخاص الذين يحتاجون مساعدة في التوصيل والتنقل. 
            نوفر لك التسوق والنقل الآمن مع الدفع بالبطاقة الذهبية
          </p>
        </div>

        {/* Service Types */}
        <div className="space-y-12 mb-12">
          {deliveryServices.map((category, categoryIndex) => (
            <div key={category.type} className="animate-fade-in-scale">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card 
                      key={service.id}
                      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 animate-fade-in-scale stagger-${index + 1} ${
                        selectedService === service.id ? 'border-orange-400 shadow-lg' : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="bg-gray-100 rounded-lg py-2 px-4 mb-4">
                          <span className="text-sm font-medium text-gray-700">{service.count}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">مميزات الخدمة</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">البحث حسب الموقع</h4>
              <p className="text-gray-600 text-sm">ابحث عن الخدمات القريبة في منطقتك</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">توصيل مجاني</h4>
              <p className="text-gray-600 text-sm">توصيل مجاني لجميع الطلبات</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">نقل آمن</h4>
              <p className="text-gray-600 text-sm">مركبات مجهزة وسائقين مدربين</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">البطاقة الذهبية</h4>
              <p className="text-gray-600 text-sm">دفع آمن ومريح بالبطاقة الذهبية</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-slide-in-bottom">
          <Link to="/delivery-search">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MapPin className="h-5 w-5 mr-2" />
              ابدأ البحث عن الخدمات القريبة
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeliveryService;
