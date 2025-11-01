import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Clock, Star, Phone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      name: 'عيادة الدكتور محمد بن عيسى',
      specialty: 'طب الأسنان',
      location: 'حي بومعراف، الجزائر العاصمة',
      rating: 4.8,
      reviews: 245,
      price: 'من 3000 دج',
      image: '/placeholder.svg',
      verified: true,
      category: 'dental'
    },
    {
      id: 2,
      name: 'مستشفى الشهيد خليل عمران',
      specialty: 'طب القلب والأوعية الدموية',
      location: 'وسط المدينة، وهران',
      rating: 4.9,
      reviews: 189,
      price: 'من 4500 دج',
      image: '/placeholder.svg',
      verified: true,
      category: 'cardiology'
    },
    {
      id: 3,
      name: 'عيادة الدكتورة فاطمة مداني',
      specialty: 'طب الأطفال والرضع',
      location: 'حي الجامعة، قسنطينة',
      rating: 4.7,
      reviews: 156,
      price: 'من 2500 دج',
      image: '/placeholder.svg',
      verified: true,
      category: 'pediatrics'
    },
    {
      id: 4,
      name: 'مركز الشفاء للعلاج الطبيعي',
      specialty: 'العلاج الطبيعي وإعادة التأهيل',
      location: 'حي النصر، سطيف',
      rating: 4.6,
      reviews: 123,
      price: 'من 2000 دج',
      image: '/placeholder.svg',
      verified: false,
      category: 'physiotherapy'
    },
    {
      id: 5,
      name: 'عيادة الدكتور عبد الرحمن زروقي',
      specialty: 'طب العيون',
      location: 'شارع الاستقلال، عنابة',
      rating: 4.8,
      reviews: 198,
      price: 'من 3500 دج',
      image: '/placeholder.svg',
      verified: true,
      category: 'ophthalmology'
    },
    {
      id: 6,
      name: 'مركز الأمل للصحة النفسية',
      specialty: 'الطب النفسي والعلاج النفسي',
      location: 'حي البدر، تلمسان',
      rating: 4.5,
      reviews: 87,
      price: 'من 4000 دج',
      image: '/placeholder.svg',
      verified: true,
      category: 'psychiatry'
    },
    {
      id: 7,
      name: 'عيادة السعادة الطبية',
      specialty: 'الطب العام والباطنية',
      location: 'وسط المدينة، غرداية',
      rating: 4.7,
      reviews: 142,
      price: 'من 2500 دج',
      image: '/placeholder.svg',
      verified: true,
      category: 'general'
    },
    {
      id: 8,
      name: 'مركز الرحمة للرعاية المنزلية',
      specialty: 'الرعاية المنزلية والتمريض',
      location: 'حي الحامة، الجزائر العاصمة',
      rating: 4.7,
      reviews: 134,
      price: 'من 1500 دج/زيارة',
      image: '/placeholder.svg',
      verified: true,
      category: 'homecare'
    },
    {
      id: 8,
      name: 'خدمة الممرض المنزلي - الزهراء',
      specialty: 'تمريض منزلي متخصص',
      location: 'وهران - خدمة على مدار 24 ساعة',
      rating: 4.8,
      reviews: 89,
      price: 'من 2500 دج/يوم',
      image: '/placeholder.svg',
      verified: true,
      category: 'homecare'
    },
    {
      id: 9,
      name: 'مركز النور لعلاج الإدمان',
      specialty: 'معالجة الإدمان والتأهيل النفسي',
      location: 'حي الصنوبر، البليدة',
      rating: 4.6,
      reviews: 67,
      price: 'من 8000 دج/جلسة',
      image: '/placeholder.svg',
      verified: true,
      category: 'addiction'
    },
    {
      id: 10,
      name: 'مركز الأمان لإعادة التأهيل',
      specialty: 'علاج الإدمان والدعم النفسي',
      location: 'باتنة - برنامج داخلي وخارجي',
      rating: 4.5,
      reviews: 45,
      price: 'من 12000 دج/أسبوع',
      image: '/placeholder.svg',
      verified: true,
      category: 'addiction'
    },
    {
      id: 11,
      name: 'خدمة الرعاية الطبية الفورية',
      specialty: 'رعاية طبية منزلية عاجلة',
      location: 'قسنطينة - استجابة سريعة',
      rating: 4.9,
      reviews: 156,
      price: 'من 3500 دج/استدعاء',
      image: '/placeholder.svg',
      verified: true,
      category: 'homecare'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع التخصصات' },
    { id: 'dental', name: 'طب الأسنان' },
    { id: 'cardiology', name: 'طب القلب' },
    { id: 'pediatrics', name: 'طب الأطفال' },
    { id: 'physiotherapy', name: 'العلاج الطبيعي' },
    { id: 'ophthalmology', name: 'طب العيون' },
    { id: 'psychiatry', name: 'الطب النفسي' },
    { id: 'homecare', name: 'الرعاية المنزلية' },
    { id: 'addiction', name: 'علاج الإدمان' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              الخدمات الصحية في الجزائر
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              اكتشف أفضل مقدمي الخدمات الصحية في جميع أنحاء الجزائر واحجز موعدك بسهولة
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="ابحث عن طبيب أو تخصص أو مدينة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background/95 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                {filteredServices.length} خدمة متاحة
              </h2>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                فلتر متقدم
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Link key={service.id} to={`/clinic/${service.id}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-card border-0 shadow-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {service.verified && (
                          <Badge className="bg-green-500 text-white">
                            ✓ موثق
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/80 hover:bg-background"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-muted-foreground">{service.specialty}</p>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{service.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">({service.reviews} تقييم)</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{service.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">متاح اليوم</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{service.price}</span>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          احجز الآن
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  لم يتم العثور على خدمات تطابق بحثك
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  إعادة تعيين البحث
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
