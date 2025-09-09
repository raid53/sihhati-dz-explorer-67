import { useState } from 'react';
import { Video, Monitor, Phone, Clock, Shield, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import telemedicineImg from '@/assets/telemedicine.jpg';

const Telemedicine = () => {
  const [activeTab, setActiveTab] = useState('video');

  const onlineDoctors = [
    {
      id: 1,
      name: 'د. أحمد بن علي',
      specialty: 'طبيب عام',
      rating: 4.9,
      experience: '12 سنة',
      price: '2000 دج',
      isOnline: true,
      nextAvailable: 'متاح الآن',
      languages: ['عربي', 'فرنسي'],
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'د. فاطمة محمدي',
      specialty: 'طبيبة نفسية',
      rating: 4.8,
      experience: '8 سنوات',
      price: '2500 دج',
      isOnline: true,
      nextAvailable: 'متاح الآن',
      languages: ['عربي', 'إنجليزي'],
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'د. محمد العربي',
      specialty: 'طبيب جلدية',
      rating: 4.7,
      experience: '15 سنة',
      price: '3000 دج',
      isOnline: false,
      nextAvailable: 'غداً 10:00 ص',
      languages: ['عربي'],
      image: '/placeholder.svg'
    }
  ];

  const features = [
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: 'استشارة بالفيديو',
      description: 'تحدث مع طبيبك وجهاً لوجه من منزلك'
    },
    {
      icon: <Phone className="w-8 h-8 text-primary" />,
      title: 'استشارة هاتفية',
      description: 'احصل على استشارة طبية سريعة عبر الهاتف'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'حماية البيانات',
      description: 'جميع المحادثات مشفرة ومحمية بالكامل'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'متاح 24/7',
      description: 'خدمة الطب عن بُعد متاحة في أي وقت'
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
                  <Monitor className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">الطب عن بُعد</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  احصل على استشارة طبية عالية الجودة من منزلك مع أفضل الأطباء في الجزائر
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12">
                    <Video className="w-5 h-5 ml-2" />
                    ابدأ استشارة بالفيديو
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    <Phone className="w-5 h-5 ml-2" />
                    استشارة هاتفية
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img 
                    src={telemedicineImg} 
                    alt="الطب عن بُعد"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-2xl p-8 border">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">د. أحمد بن علي</h3>
                    <p className="text-muted-foreground">طبيب عام - متاح الآن</p>
                    <Badge className="mt-2">🟢 متصل</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">مميزات الطب عن بُعد</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Online Doctors */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">الأطباء المتاحون الآن</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">{onlineDoctors.filter(d => d.isOnline).length} طبيب متصل</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {doctor.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <Badge variant="secondary" className="mx-auto">{doctor.specialty}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{doctor.experience}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{doctor.price}</span>
                      <Badge variant={doctor.isOnline ? 'default' : 'secondary'} className="text-xs">
                        {doctor.nextAvailable}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button 
                        className="h-9" 
                        disabled={!doctor.isOnline}
                        variant={doctor.isOnline ? 'default' : 'secondary'}
                      >
                        <Video className="w-4 h-4 ml-1" />
                        فيديو
                      </Button>
                      <Button 
                        className="h-9" 
                        variant="outline"
                        disabled={!doctor.isOnline}
                      >
                        <Phone className="w-4 h-4 ml-1" />
                        صوت
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">كيف يعمل الطب عن بُعد</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">اختر الطبيب</h3>
                <p className="text-muted-foreground">
                  اختر الطبيب المناسب من قائمة الأطباء المتاحين حسب التخصص
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">احجز الموعد</h3>
                <p className="text-muted-foreground">
                  احجز موعداً فورياً أو اختر وقتاً يناسبك لاحقاً
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">ابدأ الاستشارة</h3>
                <p className="text-muted-foreground">
                  تحدث مع الطبيب عبر الفيديو أو الهاتف واحصل على التشخيص
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

export default Telemedicine;