import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Award, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import doctorFemale1 from '@/assets/doctor-female-1.jpg';
import doctorMale1 from '@/assets/doctor-male-1.jpg';
import doctorMale2 from '@/assets/doctor-male-2.jpg';
import doctorFemale2 from '@/assets/doctor-female-2.jpg';

const Doctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'د. أحمد بن علي',
      specialty: 'طبيب قلب',
      experience: '15 سنة خبرة',
      location: 'الجزائر العاصمة',
      rating: 4.9,
      reviews: 234,
      price: '3000 دج',
      nextAvailable: 'غداً 10:00 ص',
      image: doctorMale1
    },
    {
      id: 2,
      name: 'د. فاطمة محمدي',
      specialty: 'طبيبة أطفال',
      experience: '12 سنة خبرة',
      location: 'وهران',
      rating: 4.8,
      reviews: 189,
      price: '2500 دج',
      nextAvailable: 'اليوم 14:30',
      image: doctorFemale2
    },
    {
      id: 3,
      name: 'د. محمد العربي',
      specialty: 'طبيب عظام',
      experience: '20 سنة خبرة',
      location: 'قسنطينة',
      rating: 4.7,
      reviews: 156,
      price: '3500 دج',
      nextAvailable: 'بعد غد 09:00 ص',
      image: doctorMale2
    },
    {
      id: 4,
      name: 'د. سارة بوعلام',
      specialty: 'طبيبة جلدية',
      experience: '8 سنوات خبرة',
      location: 'عنابة',
      rating: 4.6,
      reviews: 98,
      price: '2800 دج',
      nextAvailable: 'الأسبوع المقبل',
      image: doctorFemale1
    },
    {
      id: 5,
      name: 'د. محمد الصحراوي',
      specialty: 'أخصائي قلب وأوعية دموية',
      experience: '15 سنة خبرة',
      location: 'غرداية',
      rating: 4.8,
      reviews: 156,
      price: '3200 دج',
      nextAvailable: 'بعد غد 9:00 ص',
      image: doctorMale1
    },
    {
      id: 6,
      name: 'د. فريد  لطرش',
      specialty: 'طب التغذية وطب التجميل',
      experience: '18 سنة خبرة - دراسة في فرنسا', 
      location: 'غرداية',
      rating: 4.9,
      reviews: 167,
      price: '4000 دج',
      nextAvailable: 'اليوم 15:00',
      image: doctorMale2,
      specialties: ['معالجة السمنة وسوء التغذية', 'طب التجميل', 'العلاج بالليزر', 'الأمراض العامة']
    }
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">الأطباء المتخصصون</h1>
            <p className="text-xl text-muted-foreground mb-8">
              احجز موعدك مع أفضل الأطباء في الجزائر
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="ابحث عن طبيب أو تخصص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-12"
              />
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit mx-auto">{doctor.specialty}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-muted-foreground">
                        <Award className="w-4 h-4 ml-2" />
                        <span>{doctor.experience}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 ml-2" />
                        <span>{doctor.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span className="text-muted-foreground mr-1">({doctor.reviews} تقييم)</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 ml-2" />
                        <span>{doctor.nextAvailable}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold text-primary">{doctor.price}</span>
                          <span className="text-sm text-muted-foreground">سعر الكشف</span>
                        </div>
                        
                        <Button 
                          className="w-full"
                          onClick={() => navigate(`/booking?doctorId=${doctor.id}&doctorName=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}&price=${doctor.price}`)}
                        >
                          احجز موعد
                        </Button>
                      </div>
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

export default Doctors;
