import { useState } from 'react';
import { Home, Heart, Clock, Shield, Phone, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import homeCareImg from '@/assets/home-care.jpg';

const HomeCare = () => {
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      id: 1,
      name: 'التمريض المنزلي',
      description: 'خدمات تمريض متخصصة في منزلك',
      price: 'من 2500 دج',
      duration: '2-4 ساعات',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 2,
      name: 'العلاج الطبيعي',
      description: 'جلسات علاج طبيعي متخصصة',
      price: 'من 3000 دج',
      duration: '1-2 ساعة',
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 3,
      name: 'رعاية المسنين',
      description: 'رعاية شاملة لكبار السن',
      price: 'من 4000 دج',
      duration: '4-8 ساعات',
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 4,
      name: 'رعاية ما بعد الجراحة',
      description: 'رعاية متخصصة للمرضى بعد العمليات',
      price: 'من 3500 دج',
      duration: '2-6 ساعات',
      icon: <Heart className="w-6 h-6" />
    }
  ];

  const caregivers = [
    {
      id: 1,
      name: 'أ. سارة بن علي',
      specialty: 'ممرضة متخصصة',
      experience: '8 سنوات',
      rating: 4.9,
      reviews: 156,
      services: ['تمريض', 'رعاية مسنين'],
      price: '2500 دج/يوم',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'أ. محمد العربي',
      specialty: 'أخصائي علاج طبيعي',
      experience: '12 سنة',
      rating: 4.8,
      reviews: 234,
      services: ['علاج طبيعي', 'تأهيل'],
      price: '3000 دج/جلسة',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'أ. فاطمة محمدي',
      specialty: 'ممرضة أطفال',
      experience: '6 سنوات',
      rating: 4.7,
      reviews: 98,
      services: ['تمريض أطفال', 'رعاية حديثي الولادة'],
      price: '2800 دج/يوم',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">التمريض المنزلي</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  احصل على رعاية طبية متخصصة في راحة منزلك مع فريق من الممرضين والأخصائيين المؤهلين
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12">
                    احجز خدمة الآن
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    <Phone className="w-5 h-5 ml-2" />
                    اتصل بنا
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">متاح دائماً</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">ممرض مؤهل</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">رضا العملاء</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img 
                    src={homeCareImg} 
                    alt="خدمات التمريض المنزلي"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-2xl p-8 border">
                  <h3 className="text-xl font-semibold mb-6">احجز خدمتك الان</h3>
                  <div className="space-y-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input type="date" />
                    <Input placeholder="رقم الهاتف" />
                    <Button className="w-full">
                      طلب استشارة مجانية
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">خدماتنا المنزلية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>السعر:</span>
                        <span className="font-semibold text-primary">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>المدة:</span>
                        <span className="text-muted-foreground">{service.duration}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      اطلب الخدمة
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">فريق الرعاية المنزلية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caregivers.map((caregiver) => (
                <Card key={caregiver.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={caregiver.image} alt={caregiver.name} />
                      <AvatarFallback>{caregiver.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{caregiver.name}</CardTitle>
                    <Badge variant="secondary" className="mx-auto">{caregiver.specialty}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center text-sm text-muted-foreground">
                      خبرة {caregiver.experience}
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                      <span className="font-medium">{caregiver.rating}</span>
                      <span className="text-muted-foreground mr-1">({caregiver.reviews} تقييم)</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 justify-center">
                      {caregiver.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold text-primary">{caregiver.price}</div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      احجز الآن
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">كيف تعمل خدمة التمريض المنزلي</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">اطلب الخدمة</h3>
                <p className="text-muted-foreground text-sm">
                  اتصل بنا أو احجز أونلاين
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">تقييم الحالة</h3>
                <p className="text-muted-foreground text-sm">
                  نقييم احتياجاتك الطبية
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">اختيار الفريق</h3>
                <p className="text-muted-foreground text-sm">
                  نختار أفضل فريق لحالتك
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">بدء الرعاية</h3>
                <p className="text-muted-foreground text-sm">
                  نبدأ الرعاية في منزلك
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeCare;