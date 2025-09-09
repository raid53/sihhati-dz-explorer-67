import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Clock, Phone, Calendar, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ClinicDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get clinic data from location state or fallback to mock data
  const clinic = location.state?.clinic || {
    id: parseInt(id || '1'),
    name: 'عيادة الأمل الطبية',
    specialty: 'طب عام',
    location: 'الجزائر العاصمة',
    rating: 4.8,
    reviews: 124,
    phone: '+213 21 123 456',
    hours: 'السبت-الخميس: 8:00-18:00',
    image: '/placeholder.svg',
    description: 'عيادة طبية متخصصة تقدم خدمات طبية شاملة بأحدث التقنيات والمعدات الطبية',
    services: ['فحص شامل', 'تحاليل مخبرية', 'استشارات طبية', 'علاج طبيعي'],
    doctors: ['د. أحمد محمد', 'د. فاطمة علي', 'د. محمد حسن'],
    address: 'شارع ديدوش مراد، الجزائر العاصمة'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2 mb-6"
          >
            <ArrowRight className="w-4 h-4" />
            العودة
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                  <CardTitle className="text-2xl">{clinic.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit">{clinic.specialty}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {clinic.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-5 h-5 ml-2" />
                      <div>
                        <p className="font-medium">العنوان</p>
                        <p>{clinic.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-5 h-5 ml-2" />
                      <div>
                        <p className="font-medium">الهاتف</p>
                        <p>{clinic.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-5 h-5 ml-2" />
                      <div>
                        <p className="font-medium">ساعات العمل</p>
                        <p>{clinic.hours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-current ml-2" />
                      <div>
                        <p className="font-medium">{clinic.rating}</p>
                        <p className="text-muted-foreground">({clinic.reviews} تقييم)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الخدمات المتاحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {clinic.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    الأطباء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {clinic.doctors.map((doctor, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{doctor}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>احجز موعد</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/booking?clinicId=${clinic.id}&clinicName=${encodeURIComponent(clinic.name)}&specialty=${encodeURIComponent(clinic.specialty)}`)}
                  >
                    <Calendar className="w-4 h-4 ml-2" />
                    احجز موعد الآن
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 ml-2" />
                    اتصل بالعيادة
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClinicDetails;