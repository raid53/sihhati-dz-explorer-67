
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AISymptomChecker from '@/components/AISymptomChecker';
import AIRecommendations from '@/components/AIRecommendations';
import MedicalImageAnalyzer from '@/components/MedicalImageAnalyzer';
import { Brain, Stethoscope, Image, Lightbulb, Sparkles, TrendingUp } from 'lucide-react';

const AIServices = () => {
  const [activeTab, setActiveTab] = useState('symptom-checker');

  const aiFeatures = [
    {
      icon: Brain,
      title: 'التشخيص الذكي',
      description: 'تحليل متقدم للأعراض باستخدام الذكاء الاصطناعي',
      stats: '95% دقة'
    },
    {
      icon: Lightbulb,
      title: 'التوصيات المخصصة',
      description: 'نصائح طبية مخصصة لحالتك الصحية',
      stats: '50K+ توصية'
    },
    {
      icon: Image,
      title: 'تحليل الصور الطبية',
      description: 'فحص أولي للأشعة والصور الطبية',
      stats: '24/7 متاح'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400 rounded-full animate-float stagger-2"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-slide-in-top">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                الذكاء الاصطناعي الطبي
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              اكتشف مستقبل الرعاية الصحية مع خدماتنا المدعومة بالذكاء الاصطناعي المتقدم
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className={`animate-fade-in-scale stagger-${index + 1} hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                      {feature.stats}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Services Tabs */}
      <section className="py-16 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14 bg-gradient-to-r from-purple-100 to-blue-100">
              <TabsTrigger 
                value="symptom-checker" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <Stethoscope className="w-4 h-4" />
                التشخيص الأولي
              </TabsTrigger>
              <TabsTrigger 
                value="recommendations" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <Lightbulb className="w-4 h-4" />
                التوصيات الذكية
              </TabsTrigger>
              <TabsTrigger 
                value="image-analysis" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <Image className="w-4 h-4" />
                تحليل الصور
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="symptom-checker" className="animate-fade-in-scale">
                <AISymptomChecker />
              </TabsContent>

              <TabsContent value="recommendations" className="animate-fade-in-scale">
                <AIRecommendations />
              </TabsContent>

              <TabsContent value="image-analysis" className="animate-fade-in-scale">
                <MedicalImageAnalyzer />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">إحصائيات الذكاء الاصطناعي</h2>
            <p className="text-xl opacity-90">أرقام تعكس قوة تقنياتنا المتقدمة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '95%', label: 'دقة التشخيص', icon: TrendingUp },
              { number: '50K+', label: 'تشخيص أولي', icon: Stethoscope },
              { number: '10K+', label: 'صورة محللة', icon: Image },
              { number: '30K+', label: 'توصية ذكية', icon: Lightbulb }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white/10 border-white/20 text-white animate-fade-in-scale stagger-${index + 1}">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-in-bottom">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              ابدأ رحلتك مع الذكاء الاصطناعي الطبي
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              استفد من أحدث التقنيات في مجال الصحة واحصل على رعاية طبية ذكية ومخصصة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 h-14 px-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setActiveTab('symptom-checker')}
              >
                ابدأ التشخيص الآن
              </button>
              <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white h-14 px-8 text-lg rounded-xl transition-all duration-300 hover:scale-105">
                تعرف على المزيد
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIServices;
