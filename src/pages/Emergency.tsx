import { Phone, MapPin, AlertTriangle, Clock, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Emergency = () => {
  const emergencyNumbers = [
    { service: 'الإسعاف', number: '14', description: 'خدمة الإسعاف الوطنية' },
    { service: 'الشرطة', number: '17', description: 'الشرطة الوطنية' },
    { service: 'الحماية المدنية', number: '14', description: 'خدمات الطوارئ والإنقاذ' },
    { service: 'مركز السموم', number: '021 97 98 98', description: 'مركز مكافحة السموم' }
  ];

  const emergencyHospitals = [
    {
      name: 'مستشفى مصطفى باشا الجامعي',
      location: 'الجزائر العاصمة',
      phone: '+213 21 67 84 52',
      distance: '2.5 كم',
      waitTime: '15 دقيقة',
      status: 'متاح'
    },
    {
      name: 'مستشفى بني مسوس',
      location: 'الجزائر العاصمة',
      phone: '+213 21 93 15 50',
      distance: '4.1 كم',
      waitTime: '25 دقيقة',
      status: 'مزدحم'
    },
    {
      name: 'مستشفى الزهراء',
      location: 'الجزائر العاصمة',
      phone: '+213 21 54 17 25',
      distance: '6.8 كم',  
      waitTime: '10 دقيقة',
      status: 'متاح'
    }
  ];

  const firstAidTips = [
    {
      situation: 'نزيف حاد',
      steps: ['اضغط مباشرة على الجرح بقطعة قماش نظيفة', 'ارفع العضو المصاب فوق مستوى القلب', 'لا تزيل القماش حتى لو تشبع بالدم', 'اطلب المساعدة الطبية فوراً']
    },
    {
      situation: 'الاختناق',
      steps: ['اطلب من الشخص السعال بقوة', 'اضرب بين لوحي الكتف 5 مرات', 'قم بمناورة هايمليك إذا لم يتحسن', 'اتصل بالإسعاف إذا فقد الوعي']
    },
    {
      situation: 'الحروق',
      steps: ['ضع المنطقة المحروقة تحت الماء البارد', 'لا تستخدم الثلج أو الزبدة', 'غط الحرق بضمادة نظيفة', 'لا تفقع الفقاعات إن وجدت']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Emergency Alert */}
        <section className="bg-destructive/10 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <Alert className="border-destructive">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-center text-lg font-medium">
                في حالة الطوارئ الطبية اتصل بالرقم <span className="font-bold text-2xl">14</span> فوراً
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold mb-4">خدمات الطوارئ</h1>
            <p className="text-xl text-muted-foreground">
              احصل على المساعدة الطبية الطارئة في أسرع وقت ممكن
            </p>
          </div>
        </section>

        {/* Emergency Numbers */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">أرقام الطوارئ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencyNumbers.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-destructive" />
                    </div>
                    <CardTitle className="text-lg">{item.service}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-destructive mb-2">{item.number}</div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <Button className="w-full mt-4" variant="destructive">
                      <Phone className="w-4 h-4 ml-2" />
                      اتصل الآن
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nearest Emergency Hospitals */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">أقرب مستشفيات الطوارئ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyHospitals.map((hospital, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <Badge 
                      variant={hospital.status === 'متاح' ? 'default' : 'secondary'}
                      className="w-fit"
                    >
                      {hospital.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 ml-2" />
                        <span>{hospital.location} - {hospital.distance}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 ml-2" />
                        <span>وقت الانتظار المتوقع: {hospital.waitTime}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 ml-2" />
                        <span>{hospital.phone}</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" variant="destructive">
                          <Phone className="w-4 h-4 ml-2" />
                          اتصل
                        </Button>
                        <Button className="flex-1" variant="outline">
                          <MapPin className="w-4 h-4 ml-2" />
                          الاتجاهات
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* First Aid Guide */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">دليل الإسعافات الأولية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {firstAidTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-destructive">{tip.situation}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ml-3 mt-0.5 flex-shrink-0">
                            {stepIndex + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
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

export default Emergency;