import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Award, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAdmin } from '@/contexts/AdminContext';
import { DataRefreshButton } from '@/components/DataRefreshButton';
import doctorFemale1 from '@/assets/doctor-female-1.jpg';
import doctorMale1 from '@/assets/doctor-male-1.jpg';
import doctorMale2 from '@/assets/doctor-male-2.jpg';
import doctorFemale2 from '@/assets/doctor-female-2.jpg';

const Doctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { getDoctors } = useAdmin();
  
  const doctors = getDoctors();

  // Log on mount
  useEffect(() => {
    console.log('[Doctors] Component mounted, doctors count:', doctors.length);
  }, []);

  // Map image paths to imported images
  const imageMap: Record<string, string> = {
    '/src/assets/doctor-male-1.jpg': doctorMale1,
    '/src/assets/doctor-male-2.jpg': doctorMale2,
    '/src/assets/doctor-female-1.jpg': doctorFemale1,
    '/src/assets/doctor-female-2.jpg': doctorFemale2,
  };

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
            
            <div className="max-w-md mx-auto relative mb-4">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="ابحث عن طبيب أو تخصص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-12"
              />
            </div>
            
            <DataRefreshButton />
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
                      <AvatarImage src={imageMap[doctor.image] || doctor.image} alt={doctor.name} />
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
