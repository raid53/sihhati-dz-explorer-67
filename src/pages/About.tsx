import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  Target,
  Eye
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAdmin } from '@/contexts/AdminContext';

const About = () => {
  const { getEnabledWilayas } = useAdmin();
  const enabledWilayasCount = getEnabledWilayas().length;
  
  const stats = [
    { icon: Users, number: '50,000+', label: 'مستخدم راضٍ' },
    { icon: Heart, number: '1,200+', label: 'مقدم خدمة' },
    { icon: Award, number: String(enabledWilayasCount), label: 'ولاية مغطاة' },
    { icon: Clock, number: '24/7', label: 'خدمة متواصلة' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'الرعاية المتميزة',
      description: 'نضع صحة المرضى في المقدمة ونسعى لتقديم أفضل مستوى من الرعاية الصحية'
    },
    {
      icon: Shield,
      title: 'الأمان والثقة',
      description: 'نضمن سرية البيانات الطبية وأمان جميع المعاملات عبر منصتنا'
    },
    {
      icon: Globe,
      title: 'التقنية المتطورة',
      description: 'نستخدم أحدث التقنيات لتسهيل الوصول إلى الخدمات الصحية'
    },
    {
      icon: Users,
      title: 'فريق متخصص',
      description: 'نعمل مع أفضل الأطباء والمتخصصين في مختلف المجالات الطبية'
    }
  ];

  const features = [
    'حجز المواعيد الطبية بسهولة',
    'استشارات طبية عن بُعد',
    'نظام دفع آمن ومتعدد الخيارات',
    'تذكيرات المواعيد الذكية',
    'تقييمات وآراء المرضى',
    'دعم فني متواصل'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary">من نحن</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                رابط الرعاية - جسر التواصل الصحي في الجزائر
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                نسعى لتكون المنصة الرائدة في مجال الرعاية الصحية الرقمية في الجزائر، 
                نربط بين المرضى ومقدمي الخدمات الصحية بطريقة سهلة وآمنة
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 bg-card/50 backdrop-blur-sm border-0 shadow-lg">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">رسالتنا</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  تسهيل الوصول إلى الخدمات الصحية عالية الجودة لجميع المواطنين الجزائريين من خلال 
                  منصة رقمية متطورة تجمع بين التقنية الحديثة والخبرة الطبية المتخصصة، مع ضمان 
                  الأمان والخصوصية في جميع التعاملات.
                </p>
              </Card>

              <Card className="p-8 bg-secondary/5 border-secondary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-8 h-8 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">رؤيتنا</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون المنصة الصحية الرقمية الأولى في الجزائر والمغرب العربي، نساهم في 
                  تطوير النظام الصحي من خلال التكنولوجيا المبتكرة، ونصبح الخيار الأول للمرضى 
                  في البحث عن الرعاية الصحية المناسبة.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">قيمنا الأساسية</h2>
              <p className="text-xl text-muted-foreground">
                المبادئ التي توجه عملنا وتحدد شخصية منصتنا
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  لماذا تختار رابط الرعاية؟
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  نقدم مجموعة شاملة من الخدمات الصحية الرقمية المصممة خصيصاً لتلبية 
                  احتياجات المرضى ومقدمي الخدمات الصحية في الجزائر.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="mt-8 bg-primary hover:bg-primary/90">
                  ابدأ رحلتك الصحية معنا
                </Button>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg text-center">
                      <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="font-bold">99.9%</div>
                      <div className="text-sm text-muted-foreground">رضا المستخدمين</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg text-center">
                      <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="font-bold">&lt; 2 دقيقة</div>
                      <div className="text-sm text-muted-foreground">متوسط وقت الحجز</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg text-center">
                      <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="font-bold">100%</div>
                      <div className="text-sm text-muted-foreground">أمان البيانات</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg text-center">
                      <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="font-bold">24/7</div>
                      <div className="text-sm text-muted-foreground">دعم فني</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              تواصل معنا
            </h2>
            <p className="text-muted-foreground mb-8">
              نحن هنا لمساعدتك في أي وقت. تواصل معنا لأي استفسار أو مساعدة
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center bg-card border-0 shadow-lg">
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">اتصل بنا</h3>
                <p className="text-muted-foreground">+213 555 123 456</p>
              </Card>

              <Card className="p-6 text-center bg-card border-0 shadow-lg">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">راسلنا</h3>
                <p className="text-muted-foreground">info@rabitcare.dz</p>
              </Card>

              <Card className="p-6 text-center bg-card border-0 shadow-lg">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">زرنا</h3>
                <p className="text-muted-foreground">الجزائر العاصمة، الجزائر</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;