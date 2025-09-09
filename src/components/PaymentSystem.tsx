
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Wallet, Gift, Tag, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethodType {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  description: string;
}

interface PaymentSystemProps {
  amount: number;
  appointmentId?: number;
  onPaymentSuccess?: (paymentId: string) => void;
}

const PaymentSystem: React.FC<PaymentSystemProps> = ({ 
  amount, 
  appointmentId, 
  onPaymentSuccess 
}) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const paymentMethods: PaymentMethodType[] = [
    {
      id: 'cib',
      name: 'CIB',
      nameAr: 'بنك CIB',
      icon: '🏦',
      color: 'bg-blue-600',
      description: 'الدفع عبر بطاقة CIB البنكية'
    },
    {
      id: 'baridimob',
      name: 'Baridimob',
      nameAr: 'بريدي موب',
      icon: '📱',
      color: 'bg-orange-600',
      description: 'الدفع عبر محفظة بريدي موب'
    },
    {
      id: 'edahabia',
      name: 'eDahabia',
      nameAr: 'الذهبية الإلكترونية',
      icon: '💳',
      color: 'bg-yellow-600',
      description: 'الدفع عبر بطاقة الذهبية الإلكترونية'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      nameAr: 'المحفظة الرقمية',
      icon: '👛',
      color: 'bg-green-600',
      description: 'الدفع من رصيد المحفظة الرقمية'
    }
  ];

  const availableCoupons = [
    { code: 'HEALTH20', discount: 20, type: 'percentage', description: 'خصم 20% على جميع الخدمات' },
    { code: 'NEWUSER', discount: 1000, type: 'fixed', description: 'خصم 1000 دج للمستخدمين الجدد' },
    { code: 'RAMADAN30', discount: 30, type: 'percentage', description: 'عرض رمضان - خصم 30%' }
  ];

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      const discount = coupon.type === 'percentage' 
        ? (amount * coupon.discount) / 100 
        : coupon.discount;
      setDiscountAmount(Math.min(discount, amount));
      toast({
        title: "تم تطبيق الكوبون!",
        description: `تم خصم ${discount} دج من إجمالي المبلغ`,
      });
    } else {
      toast({
        title: "كوبون غير صحيح",
        description: "الرجاء التأكد من صحة رمز الكوبون",
        variant: "destructive"
      });
    }
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار طريقة الدفع",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // محاكاة عملية الدفع
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setLoading(false);
    
    toast({
      title: "تم الدفع بنجاح!",
      description: `تم دفع ${finalAmount} دج بنجاح عبر ${paymentMethods.find(m => m.id === selectedMethod)?.nameAr}`,
    });

    onPaymentSuccess?.(paymentId);
  };

  const finalAmount = amount - discountAmount;

  return (
    <div className="space-y-6">
      {/* ملخص الدفع */}
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-600" />
            ملخص الدفع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>المبلغ الأساسي:</span>
              <span>{amount.toLocaleString()} دج</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>الخصم:</span>
                <span>-{discountAmount.toLocaleString()} دج</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>المبلغ النهائي:</span>
              <span>{finalAmount.toLocaleString()} دج</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* نظام الكوبونات */}
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-600" />
            كوبون الخصم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="أدخل رمز الكوبون"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={applyCoupon} variant="outline">
              تطبيق
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">الكوبونات المتاحة:</p>
            {availableCoupons.map((coupon) => (
              <div key={coupon.code} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{coupon.code}</span>
                  <p className="text-xs text-gray-600 mt-1">{coupon.description}</p>
                </div>
                <Tag className="w-4 h-4 text-orange-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* طرق الدفع */}
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            اختر طريقة الدفع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{method.nameAr}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* نموذج تفاصيل الدفع */}
          {selectedMethod && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg animate-fade-in-scale">
              {(selectedMethod === 'cib' || selectedMethod === 'edahabia') && (
                <>
                  <div>
                    <Label htmlFor="cardNumber">رقم البطاقة</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>
                </>
              )}
              
              {selectedMethod === 'baridimob' && (
                <div>
                  <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+213 555 123 456"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              )}

              {selectedMethod === 'wallet' && (
                <div className="text-center p-4">
                  <Wallet className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-gray-600">رصيد المحفظة: 25,000 دج</p>
                  <p className="text-sm text-gray-500">سيتم خصم المبلغ من رصيدك</p>
                </div>
              )}
            </div>
          )}

          <Button 
            onClick={handlePayment} 
            disabled={loading || !selectedMethod}
            className="w-full h-12 text-lg mt-6"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري المعالجة...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                دفع {finalAmount.toLocaleString()} دج
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSystem;
