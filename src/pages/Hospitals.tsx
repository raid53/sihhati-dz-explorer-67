import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Bed, Phone, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import hospital1 from '@/assets/hospital-1.jpg';
import hospital2 from '@/assets/hospital-2.jpg';

const Hospitals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const hospitals = [
    {
      id: 1,
      name: 'مستشفى الجزائر الجامعي',
      type: 'مستشفى عام',
      location: 'الجزائر العاصمة',
      rating: 4.5,
      reviews: 456,
      beds: 800,
      phone: '+213 21 234 567',
      emergency: true,
      services: ['طوارئ 24/7', 'جراحة', 'باطنية', 'أطفال'],
      image: hospital1
    },
    {
      id: 2,
      name: 'مستشفى وهران التخصصي',
      type: 'مستشفى تخصصي',
      location: 'وهران',
      rating: 4.7,
      reviews: 234,
      beds: 450,
      phone: '+213 41 567 890',
      emergency: true,
      services: ['قلب', 'أعصاب', 'عظام', 'طوارئ'],
      image: hospital2
    },
    {
      id: 3,
      name: 'مستشفى ابن سينا',
      type: 'مستشفى خاص',
      location: 'قسنطينة',
      rating: 4.8,
      reviews: 189,
      beds: 200,
      phone: '+213 31 678 901',
      emergency: false,
      services: ['جراحة تجميلية', 'عيون', 'أسنان', 'نساء وولادة'],
      image: hospital1
    },
    {
      id: 4,
      name: 'مستشفى الأطفال المتخصص',
      type: 'مستشفى أطفال',
      location: 'عنابة',
      rating: 4.6,
      reviews: 167,
      beds: 150,
      phone: '+213 38 789 012',
      emergency: true,
      services: ['طوارئ أطفال', 'جراحة أطفال', 'حديثي الولادة'],
      image: hospital2
    },
    {
      id: 5,
      name: 'مستشفى النخيل الإقليمي',
      type: 'مستشفى عام',
      location: 'غرداية',
      rating: 4.5,
      reviews: 134,
      beds: 180,
      phone: '+213 29 234 567',
      emergency: true,
      services: ['طوارئ', 'جراحة عامة', 'باطنية', 'نساء وولادة'],
      image: hospital1
    },
    {
      id: 6,
      name: 'مصحة النخيل',
      type: 'مصحة خاصة',
      location: 'قرب المطار، غرداية',
      rating: 4.8,
      reviews: 87,
      beds: 120,
      phone: '+213 29 876 543',
      emergency: true,
      services: ['استشفاء داخلي', 'جراحة عامة ومتخصصة', 'تشخيص وفحوصات', 'طوارئ طبية', 'متابعة ما بعد العمليات'],
      image: hospital2
    }
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">المستشفيات</h1>
            <p className="text-xl text-muted-foreground mb-8">
              اعثر على أفضل المستشفيات والمراكز الطبية في الجزائر
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="ابحث عن مستشفى أو خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-12"
              />
            </div>
          </div>
        </section>

        {/* Hospitals Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital) => (
                <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={hospital.image} 
                        alt={hospital.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-2">{hospital.name}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{hospital.type}</Badge>
                      </div>
                      {hospital.emergency && (
                        <Badge variant="destructive" className="text-xs">
                          طوارئ 24/7
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 ml-2" />
                        <span>{hospital.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                        <span className="font-medium">{hospital.rating}</span>
                        <span className="text-muted-foreground mr-1">({hospital.reviews} تقييم)</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Bed className="w-4 h-4 ml-2" />
                        <span>{hospital.beds} سرير</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 ml-2" />
                        <span>{hospital.phone}</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">الخدمات المتاحة:</h4>
                        <div className="flex flex-wrap gap-1">
                          {hospital.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4"
                        onClick={() => navigate(`/hospital-details/${hospital.id}`, { state: { hospital } })}
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

export default Hospitals;
