import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Phone, Calendar, Users, Bed, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HospitalDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get hospital data from location state or fallback to mock data
  const hospital = location.state?.hospital || {
    id: parseInt(id || '1'),
    name: 'مستشفى الجزائر الجامعي',
    type: 'مستشفى عام',
    location: 'الجزائر العاصمة',
    rating: 4.5,
    reviews: 456,
    beds: 800,
    phone: '+213 21 234 567',
    emergency: true,
    services: ['طوارئ 24/7', 'جراحة', 'باطنية', 'أطفال'],
    image: '/placeholder.svg',
    description: 'مستشفى جامعي رائد يقدم خدمات طبية متخصصة بأعلى معايير الجودة والسلامة',
    departments: ['قسم الطوارئ', 'قسم الجراحة العامة', 'قسم الباطنية', 'قسم الأطفال', 'قسم النساء والولادة'],
    address: 'شارع الشهداء، الجزائر العاصمة',
    facilities: ['غرف عمليات متطورة', 'وحدة عناية مركزة', 'مختبرات تشخيصية', 'صيدلية داخلية']
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
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{hospital.name}</CardTitle>
                      <Badge variant="secondary" className="mb-2">{hospital.type}</Badge>
                    </div>
                    {hospital.emergency && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        طوارئ 24/7
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {hospital.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-5 h-5 ml-2" />
                      <div>
                        <p className="font-medium">العنوان</p>
                        <p>{hospital.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-5 h-5 ml-2" />
                      <div>
                        <p className="font-medium">الهاتف</p>
                        <p>{hospital.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Bed className="w-5 h-5 ml-2" />
                      <div>
                        <p className="font-medium">عدد الأسرة</p>
                        <p>{hospital.beds} سرير</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-current ml-2" />
                      <div>
                        <p className="font-medium">{hospital.rating}</p>
                        <p className="text-muted-foreground">({hospital.reviews} تقييم)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الأقسام الطبية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hospital.departments.map((department, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{department}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الخدمات المتاحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {hospital.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="justify-start">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المرافق والتجهيزات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {hospital.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>تواصل مع المستشفى</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/booking?hospitalId=${hospital.id}&hospitalName=${encodeURIComponent(hospital.name)}&type=${encodeURIComponent(hospital.type)}`)}
                  >
                    <Calendar className="w-4 h-4 ml-2" />
                    احجز موعد
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 ml-2" />
                    اتصل بالمستشفى
                  </Button>

                  {hospital.emergency && (
                    <Button variant="destructive" className="w-full">
                      <AlertCircle className="w-4 h-4 ml-2" />
                      طوارئ 24/7
                    </Button>
                  )}
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

export default HospitalDetails;