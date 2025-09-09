import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, User, Phone, CreditCard, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import PaymentCardForm from './PaymentCardForm';
import OrderProcessing from './OrderProcessing';
import { useCart } from '@/contexts/CartContext';

interface BookingFormProps {
  serviceType: 'delivery' | 'transport';
  serviceName: string;
  storeId?: string;
}

const BookingForm = ({ serviceType, serviceName, storeId }: BookingFormProps) => {
  const navigate = useNavigate();
  const { userInfo, paymentInfo, saveUserInfo, savePaymentInfo } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    wilaya: '',
    baladiya: '',
    notes: '',
    paymentMethod: 'golden-card'
  });
  const [cardData, setCardData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load saved user info on component mount
  useEffect(() => {
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        fullName: userInfo.fullName || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        wilaya: userInfo.wilaya || '',
        baladiya: userInfo.baladiya || '',
        notes: userInfo.notes || ''
      }));
    }
  }, [userInfo]);

  const wilayas = [
    'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار', 'البليدة', 'البويرة',
    'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر العاصمة', 'الجلفة', 'جيجل', 'سطيف', 'سعيدة',
    'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة', 'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة',
    'وهران', 'البيض', 'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي', 'خنشلة',
    'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غرداية', 'غليزان', 'تيميمون',
    'برج باجي مختار', 'أولاد جلال', 'بني عباس', 'عين صالح', 'عين قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة'
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) errors.fullName = 'الاسم الكامل مطلوب';
    if (!formData.phone.trim()) errors.phone = 'رقم الهاتف مطلوب';
    if (formData.phone && !/^0[5-7]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'رقم الهاتف غير صحيح';
    }
    if (!formData.address.trim()) errors.address = 'العنوان مطلوب';
    if (!formData.wilaya) errors.wilaya = 'الولاية مطلوبة';
    if (!formData.baladiya.trim()) errors.baladiya = 'البلدية مطلوبة';
    
    // Validate payment details
    if (formData.paymentMethod === 'golden-card') {
      if (!cardData.goldenCardId) errors.goldenCardId = 'رقم البطاقة الذهبية مطلوب';
      if (!cardData.cardHolder) errors.cardHolder = 'اسم حامل البطاقة مطلوب';
      if (!cardData.expiryMonth) errors.expiryMonth = 'شهر الانتهاء مطلوب';
      if (!cardData.expiryYear) errors.expiryYear = 'سنة الانتهاء مطلوبة';
      if (!cardData.cvv) errors.cvv = 'الرقم السري مطلوب';
    } else {
      if (!cardData.cardNumber) errors.cardNumber = 'رقم البطاقة مطلوب';
      if (!cardData.cardHolder) errors.cardHolder = 'اسم حامل البطاقة مطلوب';
      if (!cardData.expiryMonth) errors.expiryMonth = 'شهر الانتهاء مطلوب';
      if (!cardData.expiryYear) errors.expiryYear = 'سنة الانتهاء مطلوبة';
      if (!cardData.cvv) errors.cvv = 'رمز CVV مطلوب';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى التحقق من جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Save user info and payment info using context
    const userInfoToSave = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      wilaya: formData.wilaya,
      baladiya: formData.baladiya,
      notes: formData.notes
    };
    
    const paymentInfoToSave = {
      paymentMethod: formData.paymentMethod,
      ...cardData
    };

    saveUserInfo(userInfoToSave);
    savePaymentInfo(paymentInfoToSave);

    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    // Create mock order with realistic details
    const mockOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      type: serviceType,
      service: serviceName,
      status: 'pending' as const,
      createdAt: new Date().toLocaleString('ar-DZ'),
      estimatedTime: serviceType === 'delivery' ? '30-45 دقيقة' : '15-20 دقيقة',
      currentLocation: 'تم استلام الطلب',
      address: `${formData.address}, ${formData.baladiya}, ${formData.wilaya}`,
      amount: serviceType === 'delivery' ? (formData.paymentMethod === 'golden-card' ? 1200 : 1500) : (formData.paymentMethod === 'golden-card' ? 640 : 800),
      paymentMethod: formData.paymentMethod === 'golden-card' ? 'البطاقة الذهبية' : 'بطاقة بنكية',
      customerInfo: {
        name: formData.fullName,
        phone: formData.phone,
        notes: formData.notes
      },
      paymentDetails: cardData,
      steps: [
        { title: 'تم استلام الطلب', completed: true, time: new Date().toLocaleTimeString('ar-DZ'), location: 'المركز الرئيسي' },
        { title: 'تم تأكيد الطلب', completed: false },
        { title: serviceType === 'delivery' ? 'جاري التحضير' : 'جاري ترتيب المركبة', completed: false },
        { title: serviceType === 'delivery' ? 'في الطريق' : 'المركبة في الطريق', completed: false },
        { title: 'تم التسليم', completed: false }
      ]
    };

    // Save to localStorage
    localStorage.setItem('currentOrder', JSON.stringify(mockOrder));
    
    toast({
      title: "تم تأكيد طلبك بنجاح!",
      description: `رقم الطلبية: ${mockOrder.id}`,
    });

    // Navigate to order tracking
    navigate('/order-tracking');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            تأكيد الطلب - {serviceName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                المعلومات الشخصية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="ادخل اسمك الكامل"
                    className={formErrors.fullName ? 'border-red-500' : ''}
                    required
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0555 123 456"
                    className={formErrors.phone ? 'border-red-500' : ''}
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                معلومات العنوان
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wilaya">الولاية</Label>
                  <Select value={formData.wilaya} onValueChange={(value) => handleInputChange('wilaya', value)}>
                    <SelectTrigger className={formErrors.wilaya ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر الولاية" />
                    </SelectTrigger>
                    <SelectContent>
                      {wilayas.map((wilaya) => (
                        <SelectItem key={wilaya} value={wilaya}>
                          {wilaya}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.wilaya && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      {formErrors.wilaya}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="baladiya">البلدية</Label>
                  <Input
                    id="baladiya"
                    value={formData.baladiya}
                    onChange={(e) => handleInputChange('baladiya', e.target.value)}
                    placeholder="ادخل البلدية"
                    className={formErrors.baladiya ? 'border-red-500' : ''}
                    required
                  />
                  {formErrors.baladiya && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      {formErrors.baladiya}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">العنوان التفصيلي</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="الحي، الشارع، رقم المنزل..."
                  className={formErrors.address ? 'border-red-500' : ''}
                  rows={3}
                  required
                />
                {formErrors.address && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    {formErrors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">ملاحظات إضافية (اختيارية)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="أي ملاحظات خاصة أو تعليمات للتوصيل..."
                rows={2}
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                طريقة الدفع
              </h3>
              
              <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                <SelectTrigger className={formErrors.paymentMethod ? 'border-red-500' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="golden-card">البطاقة الذهبية - خصم 20%</SelectItem>
                  <SelectItem value="bank-card">البطاقة البنكية</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.paymentMethod && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  {formErrors.paymentMethod}
                </p>
              )}
            </div>

            {/* Payment Card Form */}
            <PaymentCardForm 
              paymentMethod={formData.paymentMethod}
              onCardDataChange={setCardData}
              savedPaymentInfo={paymentInfo}
            />

            {/* Order Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">ملخص الطلبية</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>الخدمة:</span>
                    <span className="font-medium">{serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التكلفة:</span>
                    <span className="font-medium">
                      {serviceType === 'delivery' ? 
                        (formData.paymentMethod === 'golden-card' ? '1,200' : '1,500') : 
                        (formData.paymentMethod === 'golden-card' ? '640' : '800')
                      } دج
                    </span>
                  </div>
                  {formData.paymentMethod === 'golden-card' && (
                    <div className="flex justify-between text-green-600">
                      <span>خصم البطاقة الذهبية:</span>
                      <span className="font-medium">-20%</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
              {isProcessing ? 'جاري المعالجة...' : 'تأكيد الطلب والدفع'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Processing Modal */}
      {isProcessing && (
        <OrderProcessing onProcessingComplete={handleProcessingComplete} />
      )}
    </div>
  );
};

export default BookingForm;