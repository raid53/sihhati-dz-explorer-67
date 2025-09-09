import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Coins, 
  Shield, 
  Check,
  AlertCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlgerianPaymentMethodsProps {
  amount: number;
  onPaymentSuccess: (paymentId: string) => void;
}

const AlgerianPaymentMethods: React.FC<AlgerianPaymentMethodsProps> = ({ 
  amount, 
  onPaymentSuccess 
}) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    phoneNumber: '',
    bankAccount: '',
    bankName: ''
  });

  const paymentMethods = [
    {
      id: 'cib_card',
      name: 'البطاقة الذهبية الجزائرية (CIB)',
      icon: CreditCard,
      description: 'الدفع بالبطاقة المصرفية الجزائرية',
      available: true,
      fee: '0 دج'
    },
    {
      id: 'edahabia',
      name: 'الذهبية الإلكترونية (Edahabia)',
      icon: CreditCard,
      description: 'بطاقة بريد الجزائر الإلكترونية',
      available: true,
      fee: '0 دج'
    },
    {
      id: 'mobilis_money',
      name: 'موبيليس موني (Mobilis Money)',
      icon: Smartphone,
      description: 'المحفظة الإلكترونية من موبيليس',
      available: true,
      fee: '50 دج'
    },
    {
      id: 'djezzy_cash',
      name: 'جيزي كاش (Djezzy Cash)',
      icon: Smartphone,
      description: 'خدمة الدفع من جيزي',
      available: true,
      fee: '50 دج'
    },
    {
      id: 'ooredoo_money',
      name: 'أوريدو موني (Ooredoo Money)',
      icon: Smartphone,
      description: 'المحفظة الإلكترونية من أوريدو',
      available: true,
      fee: '50 دج'
    },
    {
      id: 'bank_transfer',
      name: 'التحويل المصرفي',
      icon: Building,
      description: 'التحويل عبر البنوك الجزائرية',
      available: true,
      fee: '100 دج'
    },
    {
      id: 'cash_payment',
      name: 'الدفع نقداً',
      icon: Coins,
      description: 'الدفع النقدي عند الزيارة',
      available: true,
      fee: '0 دج'
    }
  ];

  const algerianBanks = [
    'بنك الجزائر الخارجي (BEA)',
    'البنك الوطني الجزائري (BNA)',
    'القرض الشعبي الجزائري (CPA)',
    'بنك التنمية المحلية (BDL)',
    'بنك الفلاحة والتنمية الريفية (BADR)',
    'بنك التنمية والاستثمار',
    'بنك السلام الجزائر',
    'البنك العربي',
    'سوسيتي جنرال الجزائر'
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار طريقة الدفع",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // محاكاة عملية الدفع
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const paymentId = `PAY_${selectedMethod}_${Date.now()}`;
      
      // حفظ تفاصيل الدفع
      const paymentRecord = {
        id: paymentId,
        method: selectedMethod,
        amount,
        timestamp: new Date().toISOString(),
        status: 'completed'
      };
      
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      payments.push(paymentRecord);
      localStorage.setItem('payments', JSON.stringify(payments));

      toast({
        title: "تم الدفع بنجاح!",
        description: `تم استلام دفعتك بقيمة ${amount.toLocaleString()} دج`,
      });

      onPaymentSuccess(paymentId);
    } catch (error) {
      toast({
        title: "خطأ في الدفع",
        description: "حدث خطأ أثناء معالجة الدفع، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentForm = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method) return null;

    switch (selectedMethod) {
      case 'cib_card':
      case 'edahabia':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">رقم البطاقة</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">رمز الأمان</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardHolder">اسم حامل البطاقة</Label>
              <Input
                id="cardHolder"
                placeholder="محمد أحمد"
                value={formData.cardHolder}
                onChange={(e) => setFormData({...formData, cardHolder: e.target.value})}
              />
            </div>
          </div>
        );

      case 'mobilis_money':
      case 'djezzy_cash':
      case 'ooredoo_money':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">رقم الهاتف</Label>
              <Input
                id="phoneNumber"
                placeholder="+213 555 123 456"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                ستتلقى رسالة SMS على رقمك لتأكيد الدفع
              </p>
            </div>
          </div>
        );

      case 'bank_transfer':
        return (
          <div className="space-y-4">
            <div>
              <Label>البنك</Label>
              <Select value={formData.bankName} onValueChange={(value) => setFormData({...formData, bankName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البنك" />
                </SelectTrigger>
                <SelectContent>
                  {algerianBanks.map((bank) => (
                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bankAccount">رقم الحساب</Label>
              <Input
                id="bankAccount"
                placeholder="00123456789"
                value={formData.bankAccount}
                onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
              />
            </div>
          </div>
        );

      case 'cash_payment':
        return (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-800">الدفع النقدي</h4>
            </div>
            <p className="text-sm text-green-700">
              يمكنك الدفع نقداً عند زيارة العيادة. تأكد من إحضار المبلغ المطلوب: {amount.toLocaleString()} دج
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods Grid */}
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedMethod === method.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/30'
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.available ? (
                    <>
                      <Badge variant="secondary" className="text-xs">
                        رسوم: {method.fee}
                      </Badge>
                      {selectedMethod === method.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      غير متاح
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Form */}
      {selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              تفاصيل الدفع الآمن
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderPaymentForm()}

            {/* Payment Summary */}
            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>المبلغ الأساسي:</span>
                <span>{amount.toLocaleString()} دج</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم الدفع:</span>
                <span>{paymentMethods.find(m => m.id === selectedMethod)?.fee || '0 دج'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>الإجمالي:</span>
                <span>
                  {(amount + (selectedMethod === 'mobilis_money' || selectedMethod === 'djezzy_cash' || selectedMethod === 'ooredoo_money' ? 50 : selectedMethod === 'bank_transfer' ? 100 : 0)).toLocaleString()} دج
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">أمان المعاملات مضمون</p>
                <p>جميع المعاملات محمية بأحدث تقنيات التشفير المصرفي</p>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={loading || !selectedMethod}
              className="w-full h-12 text-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري معالجة الدفع...
                </div>
              ) : (
                `تأكيد الدفع - ${(amount + (selectedMethod === 'mobilis_money' || selectedMethod === 'djezzy_cash' || selectedMethod === 'ooredoo_money' ? 50 : selectedMethod === 'bank_transfer' ? 100 : 0)).toLocaleString()} دج`
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AlgerianPaymentMethods;