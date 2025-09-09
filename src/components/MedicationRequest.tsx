import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, MapPin, Calendar, Plane, Package, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TravelerOffer {
  id: number;
  name: string;
  location: string;
  returnDate: string;
  contact: string;
  message: string;
  isVerified: boolean;
  createdAt: string;
}

const MedicationRequest = () => {
  const { toast } = useToast();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isTravelerModalOpen, setIsTravelerModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    medicationName: '',
    dosage: '',
    quantity: '',
    urgency: 'medium',
    notes: '',
    patientName: '',
    phone: ''
  });

  const [travelerForm, setTravelerForm] = useState({
    name: '',
    currentLocation: '',
    returnDate: '',
    contact: '',
    message: ''
  });

  const [travelerOffers, setTravelerOffers] = useState<TravelerOffer[]>([
    {
      id: 1,
      name: 'أحمد محمد',
      location: 'باريس، فرنسا',
      returnDate: '2024-01-15',
      contact: '+33123456789',
      message: 'مسافر من باريس إلى الجزائر العاصمة. يمكنني المساعدة في إحضار الأدوية المتوفرة في الصيدليات الفرنسية.',
      isVerified: true,
      createdAt: '2024-01-05'
    },
    {
      id: 2,
      name: 'فاطمة العربي',
      location: 'تورنتو، كندا',
      returnDate: '2024-01-20',
      contact: '+14161234567',
      message: 'عائدة من كندا إلى وهران. متخصصة في الأدوية النادرة والعلاجات المتقدمة.',
      isVerified: true,
      createdAt: '2024-01-03'
    },
    {
      id: 3,
      name: 'يوسف بن علي',
      location: 'دبي، الإمارات',
      returnDate: '2024-01-18',
      contact: '+971501234567',
      message: 'في دبي حاليًا، عائد إلى قسنطينة. يمكنني المساعدة في توفير الأدوية من الصيدليات المعتمدة.',
      isVerified: false,
      createdAt: '2024-01-07'
    }
  ]);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // محاكاة إرسال الطلب
    toast({
      title: "تم إرسال طلبك بنجاح",
      description: "سيتم مراجعة طلبك والتواصل معك خلال 24 ساعة",
    });
    setRequestForm({
      medicationName: '',
      dosage: '',
      quantity: '',
      urgency: 'medium',
      notes: '',
      patientName: '',
      phone: ''
    });
    setIsRequestModalOpen(false);
  };

  const handleTravelerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOffer: TravelerOffer = {
      id: Date.now(),
      name: travelerForm.name,
      location: travelerForm.currentLocation,
      returnDate: travelerForm.returnDate,
      contact: travelerForm.contact,
      message: travelerForm.message,
      isVerified: false,
      createdAt: new Date().toISOString()
    };
    
    setTravelerOffers(prev => [newOffer, ...prev]);
    toast({
      title: "تم نشر عرضك بنجاح",
      description: "سيتم مراجعة عرضك وتفعيله قريباً",
    });
    setTravelerForm({
      name: '',
      currentLocation: '',
      returnDate: '',
      contact: '',
      message: ''
    });
    setIsTravelerModalOpen(false);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">الأدوية من الخارج</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          لم تجد الدواء المطلوب؟ يمكنك طلب المساعدة من المسافرين أو تقديم عرض مساعدة للآخرين
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Package className="w-5 h-5" />
              طلب دواء من الخارج
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">طلب دواء من الخارج</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <Label htmlFor="medicationName">اسم الدواء *</Label>
                <Input
                  id="medicationName"
                  value={requestForm.medicationName}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, medicationName: e.target.value }))}
                  placeholder="مثال: إنسولين نوفورابيد"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dosage">الجرعة</Label>
                  <Input
                    id="dosage"
                    value={requestForm.dosage}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, dosage: e.target.value }))}
                    placeholder="مثال: 500 مغ"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">الكمية</Label>
                  <Input
                    id="quantity"
                    value={requestForm.quantity}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, quantity: e.target.value }))}
                    placeholder="مثال: علبتين"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="urgency">مستوى الأولوية</Label>
                <select
                  id="urgency"
                  value={requestForm.urgency}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, urgency: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="low">عادي</option>
                  <option value="medium">متوسط</option>
                  <option value="high">عاجل</option>
                </select>
              </div>

              <div>
                <Label htmlFor="patientName">اسم المريض *</Label>
                <Input
                  id="patientName"
                  value={requestForm.patientName}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, patientName: e.target.value }))}
                  placeholder="الاسم الكامل"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={requestForm.phone}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+213..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  value={requestForm.notes}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="أي معلومات إضافية مهمة..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                إرسال الطلب
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isTravelerModalOpen} onOpenChange={setIsTravelerModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              أريد تقديم المساعدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">تقديم عرض مساعدة</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleTravelerSubmit} className="space-y-4">
              <div>
                <Label htmlFor="travelerName">الاسم الكامل *</Label>
                <Input
                  id="travelerName"
                  value={travelerForm.name}
                  onChange={(e) => setTravelerForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="اسمك الكامل"
                  required
                />
              </div>

              <div>
                <Label htmlFor="currentLocation">الموقع الحالي *</Label>
                <Input
                  id="currentLocation"
                  value={travelerForm.currentLocation}
                  onChange={(e) => setTravelerForm(prev => ({ ...prev, currentLocation: e.target.value }))}
                  placeholder="مثال: باريس، فرنسا"
                  required
                />
              </div>

              <div>
                <Label htmlFor="returnDate">تاريخ العودة المتوقع *</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={travelerForm.returnDate}
                  onChange={(e) => setTravelerForm(prev => ({ ...prev, returnDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="travelerContact">معلومات التواصل *</Label>
                <Input
                  id="travelerContact"
                  value={travelerForm.contact}
                  onChange={(e) => setTravelerForm(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="رقم الهاتف أو الإيميل"
                  required
                />
              </div>

              <div>
                <Label htmlFor="travelerMessage">رسالة للمرضى</Label>
                <Textarea
                  id="travelerMessage"
                  value={travelerForm.message}
                  onChange={(e) => setTravelerForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="اكتب رسالة تعريفية وما يمكنك تقديمه من مساعدة..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                نشر العرض
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Traveler Offers */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
          المسافرون المتطوعون للمساعدة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelerOffers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{offer.name}</CardTitle>
                  <div className="flex gap-2">
                    {offer.isVerified && (
                      <Badge className="bg-green-500 text-white text-xs">
                        موثق
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{offer.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">العودة: {new Date(offer.returnDate).toLocaleDateString('ar-DZ')}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {offer.message}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button size="sm" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    تواصل معي
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {offer.contact}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Warning Notice */}
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                تنبيه مهم
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                يرجى التأكد من صحة وسلامة الأدوية المستوردة والتحقق من مصادرها. 
                ننصح بالتواصل مع الطبيب المختص قبل استخدام أي دواء. 
                الموقع غير مسؤول عن جودة أو سلامة الأدوية المحضرة من الخارج.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationRequest;