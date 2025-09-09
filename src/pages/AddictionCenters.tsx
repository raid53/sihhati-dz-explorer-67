import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Phone, Clock, Shield, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import hospital1 from '@/assets/hospital-1.jpg';
import hospital2 from '@/assets/hospital-2.jpg';

const AddictionCenters = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const addictionCenters = [
    {
      id: 1,
      name: 'مركز النور لعلاج الإدمان',
      type: 'مركز علاج إدمان',
      location: 'حي الصنوبر، البليدة',
      rating: 4.6,
      reviews: 67,
      phone: '+213 25 432 567',
      services: ['علاج الإدمان على المخدرات', 'علاج الإدمان على الكحول', 'العلاج النفسي', 'إعادة التأهيل'],
      programs: ['برنامج داخلي', 'برنامج خارجي', 'متابعة طويلة الأمد'],
      price: 'من 8000 دج/جلسة',
      image: hospital1,
      verified: true,
      emergency: true
    },
    {
      id: 2,
      name: 'مركز الأمل لإعادة التأهيل',
      type: 'مركز إعادة تأهيل',
      location: 'وسط المدينة، الجزائر العاصمة',
      rating: 4.8,
      reviews: 124,
      phone: '+213 21 567 890',
      services: ['علاج الإدمان السلوكي', 'العلاج الجماعي', 'الدعم النفسي', 'التأهيل المهني'],
      programs: ['برنامج مكثف', 'برنامج تدريجي', 'دعم الأسرة'],
      price: 'من 10000 دج/أسبوع',
      image: hospital2,
      verified: true,
      emergency: false
    },
    {
      id: 3,
      name: 'مركز الشفاء النفسي',
      type: 'مركز علاج نفسي',
      location: 'حي النصر، وهران',
      rating: 4.5,
      reviews: 89,
      phone: '+213 41 678 901',
      services: ['علاج الاكتئاب', 'علاج القلق', 'علاج اضطرابات الأكل', 'علاج الإدمان'],
      programs: ['برنامج فردي', 'برنامج جماعي', 'علاج عائلي'],
      price: 'من 6000 دج/جلسة',
      image: hospital1,
      verified: true,
      emergency: false
    },
    {
      id: 4,
      name: 'مركز الأمان لإعادة التأهيل',
      type: 'مركز إعادة تأهيل شاملة',
      location: 'باتنة - برنامج داخلي وخارجي',
      rating: 4.5,
      reviews: 45,
      phone: '+213 33 789 012',
      services: ['علاج الإدمان والدعم النفسي', 'إعادة التأهيل المهني', 'الدعم الاجتماعي', 'المتابعة طويلة الأمد'],
      programs: ['برنامج داخلي كامل', 'برنامج خارجي', 'متابعة بعد العلاج'],
      price: 'من 12000 دج/أسبوع',
      image: hospital2,
      verified: true,
      emergency: true
    }
  ];

  const filteredCenters = addictionCenters.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">مراكز علاج الإدمان</h1>
            <p className="text-xl text-muted-foreground mb-8">
              اعثر على أفضل مراكز علاج الإدمان والدعم النفسي في الجزائر
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="ابحث عن مركز أو خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-12"
              />
            </div>
          </div>
        </section>

        {/* Addiction Centers Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCenters.map((center) => (
                <Card key={center.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={center.image} 
                        alt={center.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-2">{center.name}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{center.type}</Badge>
                      </div>
                      <div className="flex gap-2">
                        {center.verified && (
                          <Badge variant="default" className="text-xs bg-green-500">
                            ✓ موثق
                          </Badge>
                        )}
                        {center.emergency && (
                          <Badge variant="destructive" className="text-xs">
                            طوارئ 24/7
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 ml-2" />
                        <span>{center.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                        <span className="font-medium">{center.rating}</span>
                        <span className="text-muted-foreground mr-1">({center.reviews} تقييم)</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 ml-2" />
                        <span>{center.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-green-600 font-semibold">
                        <Heart className="w-4 h-4 ml-2" />
                        <span>{center.price}</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">الخدمات المتاحة:</h4>
                        <div className="flex flex-wrap gap-1">
                          {center.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">البرامج العلاجية:</h4>
                        <div className="flex flex-wrap gap-1">
                          {center.programs.map((program, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4"
                        onClick={() => navigate(`/service-details/${center.id}`, { state: { center } })}
                      >
                        عرض التفاصيل وحجز موعد
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">هل تحتاج إلى مساعدة فورية؟</h3>
              <p className="text-muted-foreground mb-6">
                نحن هنا لمساعدتك في العثور على أفضل علاج مناسب لحالتك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  اتصل بخط المساعدة
                  <Phone className="w-4 h-4 mr-2" />
                </Button>
                <Button variant="outline" size="lg">
                  استشارة مجانية
                  <Heart className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddictionCenters;