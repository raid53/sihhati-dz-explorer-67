import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import clinic1 from '@/assets/clinic-1.jpg';
import clinic2 from '@/assets/clinic-2.jpg';

const Clinics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const clinics = [
    {
      id: 1,
      name: 'عيادة الأمل الطبية',
      specialty: 'طب عام',
      location: 'الجزائر العاصمة',
      rating: 4.8,
      reviews: 124,
      phone: '+213 21 123 456',
      hours: 'السبت-الخميس: 8:00-18:00',
      image: clinic1
    },
    {
      id: 2,
      name: 'مركز الشفاء التخصصي',
      specialty: 'أمراض القلب',
      location: 'وهران',
      rating: 4.9,
      reviews: 89,
      phone: '+213 41 789 012',
      hours: 'الأحد-الخميس: 9:00-17:00',
      image: clinic2
    },
    {
      id: 3,
      name: 'عيادة النور للأطفال',
      specialty: 'طب الأطفال',
      location: 'قسنطينة',
      rating: 4.7,
      reviews: 156,
      phone: '+213 31 345 678',
      hours: 'السبت-الخميس: 8:30-16:30',
      image: clinic1
    },
    {
      id: 4,
      name: 'مركز غرداية الطبي',
      specialty: 'الطب العام والتخصصات',
      location: 'غرداية',
      rating: 4.6,
      reviews: 89,
      phone: '+213 29 456 789',
      hours: 'الأحد-الخميس: 8:00-17:00',
      image: clinic2
    }
  ];

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">العيادات الطبية</h1>
            <p className="text-xl text-muted-foreground mb-8">
              اعثر على أفضل العيادات الطبية في جميع أنحاء الجزائر
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="ابحث عن عيادة أو تخصص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-12"
              />
            </div>
          </div>
        </section>

        {/* Clinics Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClinics.map((clinic) => (
                <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={clinic.image} 
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{clinic.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">{clinic.specialty}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 ml-2" />
                        <span>{clinic.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                        <span className="font-medium">{clinic.rating}</span>
                        <span className="text-muted-foreground mr-1">({clinic.reviews} تقييم)</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 ml-2" />
                        <span>{clinic.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{clinic.hours}</span>
                      </div>
                      
                      <Button 
                        className="w-full mt-4"
                        onClick={() => navigate(`/clinic-details/${clinic.id}`, { state: { clinic } })}
                      >
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Clinics;