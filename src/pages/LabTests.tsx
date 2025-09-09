import { useState } from 'react';
import { TestTube, Home, Clock, Shield, Download, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import labTestsImg from '@/assets/lab-tests.jpg';

const LabTests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const testCategories = [
    {
      id: 1,
      name: 'تحاليل عامة',
      icon: <TestTube className="w-6 h-6" />,
      tests: [
        { name: 'تحليل الدم الكامل (CBC)', price: '800 دج', duration: '30 دقيقة' },
        { name: 'تحليل البول الكامل', price: '500 دج', duration: '15 دقيقة' },
        { name: 'تحليل السكر الصيامي', price: '300 دج', duration: '15 دقيقة' },
        { name: 'تحليل الكوليسترول', price: '600 دج', duration: '30 دقيقة' }
      ]
    },
    {
      id: 2,
      name: 'تحاليل الهرمونات',
      icon: <TestTube className="w-6 h-6" />,
      tests: [
        { name: 'هرمونات الغدة الدرقية (TSH, T3, T4)', price: '2500 دج', duration: '45 دقيقة' },
        { name: 'هرمون الأنسولين', price: '1200 دج', duration: '30 دقيقة' },
        { name: 'هرمونات الخصوبة', price: '3000 دج', duration: '60 دقيقة' },
        { name: 'الكورتيزول', price: '1500 دج', duration: '30 دقيقة' }
      ]
    },
    {
      id: 3,
      name: 'تحاليل المناعة',
      icon: <Shield className="w-6 h-6" />,
      tests: [
        { name: 'فيتامين د', price: '1800 دج', duration: '30 دقيقة' },
        { name: 'فيتامين ب12', price: '1200 دج', duration: '30 دقيقة' },
        { name: 'الحديد والفيريتين', price: '1500 دج', duration: '45 دقيقة' },
        { name: 'الزنك والمغنيسيوم', price: '2000 دج', duration: '45 دقيقة' }
      ]
    }
  ];

  const packages = [
    {
      name: 'باقة الفحص الشامل',
      description: 'فحص شامل للصحة العامة',
      tests: ['تحليل الدم الكامل', 'تحليل البول', 'وظائف الكلى', 'وظائف الكبد', 'السكر والكوليسترول'],
      originalPrice: '4500 دج',
      discountedPrice: '3200 دج',
      savings: '1300 دج'
    },
    {
      name: 'باقة الهرمونات',
      description: 'فحص شامل للهرمونات',
      tests: ['الغدة الدرقية', 'الأنسولين', 'الكورتيزول', 'هرمونات الخصوبة'],
      originalPrice: '6500 دج',
      discountedPrice: '4800 دج',
      savings: '1700 دج'
    },
    {
      name: 'باقة الفيتامينات',
      description: 'فحص شامل للفيتامينات والمعادن',
      tests: ['فيتامين د', 'فيتامين ب12', 'الحديد', 'الزنك', 'المغنيسيوم'],
      originalPrice: '5200 دج',
      discountedPrice: '3900 دج',
      savings: '1300 دج'
    }
  ];

  const services = [
    {
      icon: <Home className="w-8 h-8 text-primary" />,
      title: 'سحب عينات منزلي',
      description: 'نأتي إليك في المنزل لسحب العينات'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'نتائج سريعة',
      description: 'احصل على النتائج في نفس اليوم'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'دقة عالية',
      description: 'معايير دولية في الفحص والتحليل'
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: 'نتائج رقمية',
      description: 'احصل على النتائج عبر التطبيق أو البريد'
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
                  <TestTube className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">التحاليل الطبية</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  احصل على أدق التحاليل الطبية مع إمكانية السحب المنزلي ونتائج سريعة ومضمونة
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12">
                    <Calendar className="w-5 h-5 ml-2" />
                    احجز تحليل الآن
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    <Home className="w-5 h-5 ml-2" />
                    سحب منزلي
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img 
                    src={labTestsImg} 
                    alt="التحاليل الطبية"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-2xl p-8 border">
                  <h3 className="text-xl font-semibold mb-6 text-center">احجز تحليلك</h3>
                  <div className="space-y-4">
                    <Input placeholder="ابحث عن التحليل المطلوب" />
                    <Input type="date" />
                    <Input placeholder="رقم الهاتف" />
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="homeCollection" className="rounded" />
                      <label htmlFor="homeCollection" className="text-sm">سحب منزلي (+500 دج)</label>
                    </div>
                    <Button className="w-full">
                      احجز الآن
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">خدماتنا المميزة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Tests */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">التحاليل المتاحة</h2>
            
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {testCategories.map((category, index) => (
                  <TabsTrigger key={category.id} value={index.toString()} className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {testCategories.map((category, index) => (
                <TabsContent key={category.id} value={index.toString()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tests.map((test, testIndex) => (
                      <Card key={testIndex} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-bold text-primary">{test.price}</span>
                            <Badge variant="secondary">{test.duration}</Badge>
                          </div>
                          <Button className="w-full">
                            اطلب التحليل
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Test Packages */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">باقات التحاليل المميزة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <Card key={index} className="relative hover:shadow-lg transition-shadow">
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-destructive text-destructive-foreground">
                      وفر {pkg.savings}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {pkg.tests.map((test, testIndex) => (
                          <div key={testIndex} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
                            {test}
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-primary">{pkg.discountedPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">{pkg.originalPrice}</span>
                        </div>
                        <Button className="w-full">
                          اطلب الباقة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">كيف تتم عملية التحليل</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">احجز موعدك</h3>
                <p className="text-muted-foreground text-sm">
                  اختر التحليل المطلوب واحجز موعدك
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">سحب العينة</h3>
                <p className="text-muted-foreground text-sm">
                  في المختبر أو في منزلك حسب اختيارك
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">التحليل</h3>
                <p className="text-muted-foreground text-sm">
                  نحلل العينة بأحدث الأجهزة
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">النتائج</h3>
                <p className="text-muted-foreground text-sm">
                  احصل على النتائج رقمياً أو مطبوعة
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

export default LabTests;