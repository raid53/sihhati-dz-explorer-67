import { useState } from 'react';
import { Shield, Heart, Users, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Insurance = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const insurancePlans = [
    {
      id: 1,
      name: 'الباقة الأساسية',
      price: '5000 دج/شهرياً',
      description: 'تغطية أساسية للخدمات الطبية',
      features: [
        'استشارات طبية عامة',
        'تحاليل أساسية',
        'أدوية أساسية',
        'طوارئ 24/7'
      ],
      coverage: '70%',
      maxCoverage: '500,000 دج',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'الباقة الشاملة',
      price: '8000 دج/شهرياً',
      description: 'تغطية شاملة لجميع الخدمات الطبية',
      features: [
        'جميع خدمات الباقة الأساسية',
        'استشارات متخصصة',
        'عمليات جراحية',
        'تحاليل متقدمة',
        'أشعة وتصوير طبي',
        'إقامة مستشفى'
      ],
      coverage: '85%',
      maxCoverage: '2,000,000 دج',
      color: 'bg-green-500',
      popular: true
    },
    {
      id: 3,
      name: 'الباقة المميزة',
      price: '12000 دج/شهرياً',
      description: 'تغطية مميزة مع خدمات إضافية',
      features: [
        'جميع خدمات الباقة الشاملة',
        'طب الأسنان',
        'العلاج في الخارج',
        'غرف VIP',
        'تمريض منزلي',
        'فحوصات دورية شاملة'
      ],
      coverage: '95%',
      maxCoverage: '5,000,000 دج',
      color: 'bg-purple-500'
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: 'رعاية صحية شاملة',
      description: 'تغطية جميع احتياجاتك الطبية من الاستشارات إلى العمليات الجراحية'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'حماية مالية',
      description: 'احم نفسك وعائلتك من التكاليف الطبية المرتفعة'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'تغطية عائلية',
      description: 'خطط تأمينية تشمل جميع أفراد العائلة'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: 'شبكة واسعة من مقدمي الخدمة',
      description: 'الوصول إلى أفضل المستشفيات والعيادات في الجزائر'
    }
  ];

  const partnerHospitals = [
    'مستشفى الجزائر الجامعي',
    'مستشفى وهران التخصصي',
    'مستشفى قسنطينة المركزي',
    'مستشفى عنابة الإقليمي',
    'مستشفى باتنة العام',
    'مستشفى سطيف الجامعي'
  ];

  const claimProcess = [
    {
      step: 1,
      title: 'قدم طلب التعويض',
      description: 'قدم طلبك عبر التطبيق أو موقعنا الإلكتروني'
    },
    {
      step: 2,
      title: 'مراجعة الطلب',
      description: 'نراجع طلبك والمستندات المطلوبة'
    },
    {
      step: 3,
      title: 'الموافقة',
      description: 'نرسل لك الموافقة خلال 48 ساعة'
    },
    {
      step: 4,
      title: 'استلام التعويض',
      description: 'احصل على التعويض في حسابك البنكي'
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
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">التأمين الصحي</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  احم نفسك وعائلتك مع أفضل خطط التأمين الصحي في الجزائر. تغطية شاملة وخدمة متميزة
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12">
                    احصل على عرض أسعار
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    <Phone className="w-5 h-5 ml-2" />
                    استشارة مجانية
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">عميل راضي</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">200+</div>
                    <div className="text-sm text-muted-foreground">مقدم خدمة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">99%</div>
                    <div className="text-sm text-muted-foreground">معدل الموافقة</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border">
                  <h3 className="text-xl font-semibold mb-6 text-center">احسب قسط التأمين</h3>
                  <div className="space-y-4">
                    <Input placeholder="العمر" type="number" />
                    <select className="w-full p-3 border rounded-lg">
                      <option>اختر نوع التغطية</option>
                      <option>فردية</option>
                      <option>عائلية</option>
                      <option>مجموعات</option>
                    </select>
                    <select className="w-full p-3 border rounded-lg">
                      <option>اختر الباقة</option>
                      <option>أساسية</option>
                      <option>شاملة</option>
                      <option>مميزة</option>
                    </select>
                    <Button className="w-full">
                      احسب القسط
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      * الأسعار تقديرية وقابلة للتغيير
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">مميزات التأمين الصحي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Plans */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">خطط التأمين المتاحة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insurancePlans.map((plan) => (
                <Card key={plan.id} className={`relative hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-primary text-primary-foreground">الأكثر شعبية</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-center">{plan.name}</CardTitle>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{plan.price}</div>
                      <p className="text-muted-foreground mt-2">{plan.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-2 bg-muted/50 rounded">
                          <div className="font-semibold">{plan.coverage}</div>
                          <div className="text-xs text-muted-foreground">نسبة التغطية</div>
                        </div>
                        <div className="p-2 bg-muted/50 rounded">
                          <div className="font-semibold text-xs">{plan.maxCoverage}</div>
                          <div className="text-xs text-muted-foreground">الحد الأقصى</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">المميزات الشاملة:</h4>
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-6" variant={plan.popular ? 'default' : 'outline'}>
                        اختر هذه الباقة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Claims Process */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">عملية طلب التعويض</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {claimProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground text-sm">{process.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Card className="p-8 bg-primary/5">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-primary ml-3" />
                  <h3 className="text-xl font-semibold">سرعة في التعويض</h3>
                </div>
                <p className="text-muted-foreground">
                  نحن ملتزمون بمعالجة طلبات التعويض خلال 48 ساعة كحد أقصى لضمان حصولك على حقوقك بأسرع وقت ممكن.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Partner Network */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">شبكة المستشفيات الشريكة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnerHospitals.map((hospital, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium">{hospital}</h4>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline">
                عرض جميع الشركاء
              </Button>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">هل تحتاج مساعدة؟</h2>
            <p className="text-xl text-muted-foreground mb-8">
              فريقنا من الخبراء جاهز لمساعدتك في اختيار الباقة المناسبة لك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-12">
                <Phone className="w-5 h-5 ml-2" />
                اتصل بنا: 021 123 456
              </Button>
              <Button size="lg" variant="outline" className="h-12">
                احجز استشارة مجانية
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Insurance;