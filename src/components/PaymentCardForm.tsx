import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Shield, Lock, Save } from 'lucide-react';

interface PaymentCardFormProps {
  paymentMethod: string;
  onCardDataChange: (cardData: any) => void;
  savedPaymentInfo?: any;
}

const PaymentCardForm = ({ paymentMethod, onCardDataChange, savedPaymentInfo }: PaymentCardFormProps) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolder: '',
    goldenCardId: '',
    saveCard: false
  });

  // Load saved payment info when component mounts or payment method changes
  useEffect(() => {
    if (savedPaymentInfo && savedPaymentInfo.paymentMethod === paymentMethod) {
      setCardData({
        cardNumber: savedPaymentInfo.cardNumber || '',
        expiryMonth: savedPaymentInfo.expiryMonth || '',
        expiryYear: savedPaymentInfo.expiryYear || '',
        cvv: '', // Never save CVV
        cardHolder: savedPaymentInfo.cardHolder || '',
        goldenCardId: savedPaymentInfo.goldenCardId || '',
        saveCard: false
      });
    } else {
      // Reset form when payment method changes
      setCardData({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardHolder: '',
        goldenCardId: '',
        saveCard: false
      });
    }
  }, [paymentMethod, savedPaymentInfo]);

  const handleInputChange = (field: string, value: string | boolean) => {
    const updatedData = { ...cardData, [field]: value };
    setCardData(updatedData);
    onCardDataChange(updatedData);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (paymentMethod === 'golden-card') {
    return (
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <div className="p-2 bg-amber-100 rounded-full">
              <CreditCard className="h-4 w-4 text-amber-600" />
            </div>
            البطاقة الذهبية - خصم 20%
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goldenCardNumber" className="text-amber-700">رقم البطاقة الذهبية</Label>
            <Input
              id="goldenCardNumber"
              value={cardData.goldenCardId}
              onChange={(e) => handleInputChange('goldenCardId', formatCardNumber(e.target.value))}
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
              className="border-amber-200 focus:border-amber-400 font-mono text-lg tracking-wider"
              required
            />
          </div>

          <div>
            <Label htmlFor="goldenCardHolder" className="text-amber-700">الاسم الكامل كما يظهر على البطاقة</Label>
            <Input
              id="goldenCardHolder"
              value={cardData.cardHolder}
              onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
              placeholder="AHMED MOHAMED BENALI"
              className="border-amber-200 focus:border-amber-400 font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="goldenExpiryMonth" className="text-amber-700">الشهر</Label>
              <Select value={cardData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                <SelectTrigger className="border-amber-200 focus:border-amber-400">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goldenExpiryYear" className="text-amber-700">السنة</Label>
              <Select value={cardData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
                <SelectTrigger className="border-amber-200 focus:border-amber-400">
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <SelectItem key={year} value={year.toString().slice(-2)}>
                      {year.toString().slice(-2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goldenCvv" className="text-amber-700">الرقم السري</Label>
              <Input
                id="goldenCvv"
                value={cardData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="XXX"
                maxLength={3}
                className="border-amber-200 focus:border-amber-400 font-mono text-center"
                required
              />
            </div>
          </div>

          <div className="bg-amber-100 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-sm text-amber-700 font-medium">
              <Shield className="h-4 w-4" />
              مميزات البطاقة الذهبية
            </div>
            <ul className="text-xs text-amber-600 space-y-1 mr-6">
              <li>• خصم 20% على جميع الخدمات الطبية</li>
              <li>• أولوية في المواعيد</li>
              <li>• خدمة عملاء مخصصة 24/7</li>
              <li>• تغطية شاملة للطوارئ</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
            <Lock className="h-4 w-4" />
            جميع المعلومات محمية بتشفير SSL 256-bit وتلتزم بمعايير PCI DSS
          </div>

          <div className="flex items-center gap-2 p-3 bg-amber-25 rounded-lg border border-amber-100">
            <Checkbox 
              id="saveGoldenCard" 
              checked={cardData.saveCard}
              onCheckedChange={(checked) => handleInputChange('saveCard', checked as boolean)}
            />
            <Label htmlFor="saveGoldenCard" className="text-sm text-amber-700 flex items-center gap-2 cursor-pointer">
              <Save className="h-4 w-4" />
              حفظ معلومات البطاقة للمرات القادمة (آمن ومشفر)
            </Label>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <div className="p-2 bg-blue-100 rounded-full">
            <CreditCard className="h-4 w-4 text-blue-600" />
          </div>
          معلومات البطاقة البنكية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cardNumber" className="text-blue-700">رقم البطاقة</Label>
          <Input
            id="cardNumber"
            value={cardData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="border-blue-200 focus:border-blue-400 font-mono text-lg tracking-wider"
            required
          />
        </div>

        <div>
          <Label htmlFor="cardHolder" className="text-blue-700">اسم حامل البطاقة</Label>
          <Input
            id="cardHolder"
            value={cardData.cardHolder}
            onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
            placeholder="AHMED MOHAMED"
            className="border-blue-200 focus:border-blue-400 font-mono"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="expiryMonth" className="text-blue-700">الشهر</Label>
              <Select value={cardData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          <div>
            <Label htmlFor="expiryYear" className="text-blue-700">السنة</Label>
            <Select value={cardData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue placeholder="YY" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <SelectItem key={year} value={year.toString().slice(-2)}>
                    {year.toString().slice(-2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cvv" className="text-blue-700">CVV</Label>
            <Input
              id="cvv"
              value={cardData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="123"
              maxLength={3}
              className="border-blue-200 focus:border-blue-400 font-mono text-center"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
          <Lock className="h-4 w-4" />
          جميع المعلومات محمية بتشفير SSL 256-bit
        </div>

        <div className="flex items-center gap-2 p-3 bg-blue-25 rounded-lg border border-blue-100">
          <Checkbox 
            id="saveBankCard" 
            checked={cardData.saveCard}
            onCheckedChange={(checked) => handleInputChange('saveCard', checked as boolean)}
          />
          <Label htmlFor="saveBankCard" className="text-sm text-blue-700 flex items-center gap-2 cursor-pointer">
            <Save className="h-4 w-4" />
            حفظ معلومات البطاقة للمرات القادمة (آمن ومشفر)
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCardForm;