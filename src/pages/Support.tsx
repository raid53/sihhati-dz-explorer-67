
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportTicketSystem from '@/components/SupportTicketSystem';
import ChatSystem from '@/components/ChatSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Ticket, 
  HelpCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Search,
  Star
} from 'lucide-react';

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const faqItems = [
    {
      question: 'كيف يمكنني حجز موعد؟',
      answer: 'يمكنك حجز موعد من خلال البحث عن العيادة المناسبة واختيار الموعد المتاح.',
      category: 'حجز المواعيد'
    },
    {
      question: 'كيف يمكنني إلغاء أو تعديل موعدي؟',
      answer: 'يمكنك إلغاء أو تعديل موعدك من خلال صفحة "مواعيدي" قبل 24 ساعة على الأقل.',
      category: 'حجز المواعيد'
    },
    {
      question: 'ما هي شركات التأمين المقبولة؟',
      answer: 'نتعامل مع معظم شركات التأمين الصحي في الجزائر. يرجى التحقق عند الحجز.',
      category: 'التأمين'
    },
    {
      question: 'كيف يمكنني الدفع؟',
      answer: 'نقبل الدفع نقداً، بالبطاقة الائتمانية، أو من خلال التأمين الصحي.',
      category: 'الدفع'
    },
    {
      question: 'هل يمكنني استشارة طبيب عبر الإنترنت؟',
      answer: 'نعم، نوفر خدمات الاستشارة الطبية عن بعد مع أطباء معتمدين.',
      category: 'الاستشارات'
    }
  ];

  const supportStats = [
    { label: 'متوسط وقت الاستجابة', value: '2 دقائق', icon: Clock },
    { label: 'معدل حل المشاكل', value: '98%', icon: CheckCircle },
    { label: 'تقييم الخدمة', value: '4.9/5', icon: Star },
    { label: 'فريق الدعم متاح', value: '24/7', icon: MessageCircle }
  ];

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* رأس الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مركز الدعم والمساعدة
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك! احصل على الدعم الفوري من خلال الدردشة أو إنشاء تذكرة دعم
          </p>
        </div>

        {/* إحصائيات الدعم */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {supportStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* خيارات الدعم السريع */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsChatOpen(true)}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">دردشة فورية</h3>
              <p className="text-gray-600 mb-4">تحدث مع فريق الدعم مباشرة</p>
              <Button className="w-full health-gradient text-white">
                ابدأ الدردشة
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">اتصل بنا</h3>
              <p className="text-gray-600 mb-4">تحدث مع مستشار عبر الهاتف</p>
              <Button variant="outline" className="w-full">
                +213 555 123 456
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">راسلنا</h3>
              <p className="text-gray-600 mb-4">أرسل استفسارك عبر البريد</p>
              <Button variant="outline" className="w-full">
                support@sahati.dz
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              نظام التذاكر
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              الأسئلة الشائعة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <SupportTicketSystem />
          </TabsContent>

          <TabsContent value="faq">
            <div className="space-y-6">
              {/* بحث في الأسئلة الشائعة */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="ابحث في الأسئلة الشائعة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* قائمة الأسئلة الشائعة */}
              <div className="space-y-4">
                {filteredFaq.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">لم يتم العثور على أسئلة تطابق بحثك</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredFaq.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.question}</CardTitle>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* نظام الدردشة */}
      <ChatSystem
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onMinimize={() => setIsChatOpen(false)}
        chatType="support"
      />

      <Footer />
    </div>
  );
};

export default Support;
