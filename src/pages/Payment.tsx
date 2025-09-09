
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentSystem from '@/components/PaymentSystem';
import DigitalWallet from '@/components/DigitalWallet';
import AlgerianPaymentMethods from '@/components/AlgerianPaymentMethods';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CreditCard, Wallet, Receipt } from 'lucide-react';

const Payment: React.FC = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // محاكاة بيانات الموعد
  const appointmentData = {
    id: appointmentId || '1',
    clinicName: 'عيادة النور الطبية',
    doctorName: 'د. سارة أحمد',
    specialty: 'طب الأسنان',
    date: '2024-01-20',
    time: '14:30',
    amount: 3500
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentCompleted(true);
    console.log('Payment completed with ID:', paymentId);
  };

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card className="animate-bounce-in text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Receipt className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">تم الدفع بنجاح!</h2>
                  <p className="text-gray-600 mb-6">
                    تم تأكيد موعدك مع {appointmentData.doctorName} في {appointmentData.clinicName}
                  </p>
                  <div className="space-y-2">
                    <Button onClick={() => navigate('/profile')} className="w-full">
                      عرض مواعيدي
                    </Button>
                    <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                      العودة للرئيسية
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2 mb-4"
            >
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">نظام الدفع</h1>
            <p className="text-gray-600 mt-2">اختر طريقة الدفع المناسبة لك</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="algerian" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="algerian" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    الطرق الجزائرية
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    الدفع التقليدي
                  </TabsTrigger>
                  <TabsTrigger value="wallet" className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    المحفظة الرقمية
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="algerian">
                  <AlgerianPaymentMethods 
                    amount={appointmentData.amount} 
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </TabsContent>

                <TabsContent value="payment">
                  <PaymentSystem
                    amount={appointmentData.amount}
                    appointmentId={parseInt(appointmentData.id)}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </TabsContent>

                <TabsContent value="wallet">
                  <DigitalWallet />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              {/* تفاصيل الموعد */}
              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle>تفاصيل الموعد</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">العيادة</p>
                    <p className="font-semibold">{appointmentData.clinicName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الطبيب</p>
                    <p className="font-semibold">{appointmentData.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">التخصص</p>
                    <p className="font-semibold">{appointmentData.specialty}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">التاريخ</p>
                      <p className="font-semibold">{appointmentData.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الوقت</p>
                      <p className="font-semibold">{appointmentData.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* نصائح الأمان */}
              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle className="text-lg">نصائح الأمان</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>تأكد من صحة بياناتك قبل الدفع</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>لا تشارك معلومات بطاقتك مع أحد</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>احتفظ بإيصال الدفع للمراجعة</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>في حالة وجود مشكلة، اتصل بالدعم الفني</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
