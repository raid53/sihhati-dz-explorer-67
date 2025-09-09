import { useState } from 'react';
import { FileText, Shield, Cloud, Share, Download, Upload } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: <Cloud className="w-8 h-8 text-primary" />,
      title: 'تخزين آمن في السحابة',
      description: 'احفظ ملفاتك الطبية بأمان في السحابة مع إمكانية الوصول في أي وقت'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'حماية البيانات',
      description: 'جميع بياناتك محمية بأعلى معايير الأمان والتشفير'
    },
    {
      icon: <Share className="w-8 h-8 text-primary" />,
      title: 'مشاركة مع الأطباء',
      description: 'شارك ملفك الطبي مع الأطباء بسهولة وأمان'
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: 'تحميل وتصدير',
      description: 'حمل ملفاتك الطبية بصيغ مختلفة أو اطبعها'
    }
  ];

  const recordTypes = [
    {
      type: 'تقارير طبية',
      count: 15,
      lastUpdated: '2024-01-15',
      icon: <FileText className="w-6 h-6" />
    },
    {
      type: 'نتائج تحاليل',
      count: 28,
      lastUpdated: '2024-01-10',
      icon: <FileText className="w-6 h-6" />
    },
    {
      type: 'صور أشعة',
      count: 8,
      lastUpdated: '2024-01-12',
      icon: <FileText className="w-6 h-6" />
    },
    {
      type: 'وصفات طبية',
      count: 22,
      lastUpdated: '2024-01-08',
      icon: <FileText className="w-6 h-6" />
    },
    {
      type: 'تقارير عمليات',
      count: 3,
      lastUpdated: '2023-12-20',
      icon: <FileText className="w-6 h-6" />
    },
    {
      type: 'فحوصات دورية',
      count: 12,
      lastUpdated: '2024-01-14',
      icon: <FileText className="w-6 h-6" />
    }
  ];

  const recentRecords = [
    {
      id: 1,
      title: 'تحليل الدم الشامل',
      type: 'تحليل طبي',
      date: '2024-01-15',
      doctor: 'د. أحمد محمد',
      status: 'مكتمل'
    },
    {
      id: 2,
      title: 'أشعة الصدر',
      type: 'صورة أشعة',
      date: '2024-01-12',
      doctor: 'د. فاطمة العلي',
      status: 'مكتمل'
    },
    {
      id: 3,
      title: 'وصفة دوائية',
      type: 'وصفة طبية',
      date: '2024-01-10',
      doctor: 'د. محمد الأحمد',
      status: 'نشط'
    },
    {
      id: 4,
      title: 'تقرير فحص القلب',
      type: 'تقرير طبي',
      date: '2024-01-08',
      doctor: 'د. سارة خالد',
      status: 'مكتمل'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">السجلات الطبية الإلكترونية</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  احفظ وأدر جميع ملفاتك الطبية في مكان واحد آمن ومنظم مع إمكانية الوصول في أي وقت ومن أي مكان
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12">
                    <Upload className="w-5 h-5 ml-2" />
                    ارفع ملفاتك الطبية
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    <FileText className="w-5 h-5 ml-2" />
                    عرض السجلات
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg shadow-2xl p-8 border">
                  <h3 className="text-xl font-semibold mb-6 text-center">إحصائيات ملفك الطبي</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">88</div>
                      <div className="text-sm text-muted-foreground">إجمالي الملفات</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-muted-foreground">أطباء مشاركون</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <div className="text-sm text-muted-foreground">مواعيد هذا الشهر</div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">5</div>
                      <div className="text-sm text-muted-foreground">وصفات نشطة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">مميزات السجل الطبي الإلكتروني</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Records Dashboard */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">لوحة تحكم السجلات الطبية</h2>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="records">السجلات</TabsTrigger>
                <TabsTrigger value="sharing">المشاركة</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recordTypes.map((record, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                              {record.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{record.type}</CardTitle>
                              <p className="text-sm text-muted-foreground">آخر تحديث: {record.lastUpdated}</p>
                            </div>
                          </div>
                          <Badge>{record.count}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" variant="outline">
                          عرض الملفات
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="records">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">السجلات الحديثة</h3>
                    <Button>
                      <Upload className="w-4 h-4 ml-2" />
                      إضافة ملف جديد
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {recentRecords.map((record) => (
                      <Card key={record.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{record.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{record.type}</span>
                                  <span>•</span>
                                  <span>{record.date}</span>
                                  <span>•</span>
                                  <span>{record.doctor}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={record.status === 'نشط' ? 'default' : 'secondary'}>
                                {record.status}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sharing">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>مشاركة السجلات مع الأطباء</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="البحث عن طبيب..." />
                        <Button>
                          <Share className="w-4 h-4 ml-2" />
                          مشاركة السجل
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium">الأطباء المشاركون:</h4>
                        <div className="grid gap-3">
                          {['د. أحمد محمد - طبيب عام', 'د. فاطمة العلي - أخصائية قلب', 'د. محمد الأحمد - جراح'].map((doctor, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <span>{doctor}</span>
                              <div className="flex gap-2">
                                <Badge variant="outline">مشارك</Badge>
                                <Button size="sm" variant="outline">
                                  إلغاء المشاركة
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6">الأمان والخصوصية</h2>
            <p className="text-xl text-muted-foreground mb-8">
              نحن ملتزمون بحماية بياناتك الطبية باستخدام أحدث تقنيات التشفير والأمان
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">🔒 تشفير عالي الجودة</h3>
                <p className="text-sm text-muted-foreground">جميع بياناتك مشفرة بمعايير AES-256</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">🏥 معايير طبية دولية</h3>
                <p className="text-sm text-muted-foreground">نتبع معايير HIPAA لحماية البيانات الطبية</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">🛡️ نسخ احتياطية آمنة</h3>
                <p className="text-sm text-muted-foreground">نسخ احتياطية متعددة لضمان عدم فقدان البيانات</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MedicalRecords;