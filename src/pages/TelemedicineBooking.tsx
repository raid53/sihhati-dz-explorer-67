import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Shield, 
  Star, 
  CheckCircle, 
  Monitor,
  Headphones,
  Camera,
  AlertCircle,
  CreditCard,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/contexts/AdminContext';
import doctorMale1 from '@/assets/doctor-male-1.jpg';
import doctorMale2 from '@/assets/doctor-male-2.jpg';
import doctorFemale1 from '@/assets/doctor-female-1.jpg';
import doctorFemale2 from '@/assets/doctor-female-2.jpg';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  languages: string[];
  price: number;
  image: string;
  availability: string[];
  qualifications: string[];
}

const TelemedicineBooking: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getDoctors } = useAdmin();
  
  // Map image paths to imported images
  const imageMap: Record<string, string> = {
    '/src/assets/doctor-male-1.jpg': doctorMale1,
    '/src/assets/doctor-male-2.jpg': doctorMale2,
    '/src/assets/doctor-female-1.jpg': doctorFemale1,
    '/src/assets/doctor-female-2.jpg': doctorFemale2,
  };
  
  // حالات النموذج
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [currentSymptoms, setCurrentSymptoms] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [deviceCheck, setDeviceCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  // جلب الأطباء من AdminContext
  const allDoctors = getDoctors();
  
  // تصفية وتحويل الأطباء الذين يقدمون خدمة الطب عن بعد
  const doctors: Doctor[] = allDoctors
    .filter(doc => doc.specialties?.includes('طب عن بعد'))
    .map(doc => ({
      id: String(doc.id),
      name: doc.name,
      specialty: doc.specialty,
      experience: doc.experience,
      rating: doc.rating,
      languages: ['العربية', 'الفرنسية'],
      price: parseInt(doc.price.replace(/[^\d]/g, '')) || 0,
      image: imageMap[doc.image] || doc.image,
      availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      qualifications: doc.specialties || []
    }));

  // أنواع الاستشارة
  const consultationTypes = [
    { value: 'general', label: 'استشارة عامة', duration: '30 دقيقة', price: 0 },
    { value: 'follow-up', label: 'متابعة حالة', duration: '20 دقيقة', price: -500 },
    { value: 'emergency', label: 'استشارة طارئة', duration: '45 دقيقة', price: 1000 },
    { value: 'detailed', label: 'فحص شامل مفصل', duration: '60 دقيقة', price: 1500 }
  ];

  // مستويات الأولوية
  const urgencyLevels = [
    { value: 'low', label: 'غير عاجل', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'medium', label: 'متوسط الأولوية', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: 'high', label: 'عاجل', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    { value: 'urgent', label: 'طارئ جداً', color: 'bg-red-100 text-red-800', icon: AlertCircle }
  ];

  // التحقق من التوافق التقني
  const checkDevice = async () => {
    setDeviceCheck(true);
    // محاكاة فحص الجهاز
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "تم فحص الجهاز بنجاح",
      description: "جهازك متوافق مع منصة الفحص الطبي عن بُعد",
    });
  };

  // حساب السعر الإجمالي
  const calculateTotalPrice = () => {
    if (!selectedDoctor || !consultationType) return 0;
    
    const basePrice = selectedDoctor.price;
    const consultationExtra = consultationTypes.find(t => t.value === consultationType)?.price || 0;
    const urgencyExtra = urgencyLevel === 'urgent' ? 2000 : urgencyLevel === 'high' ? 1000 : 0;
    
    return basePrice + consultationExtra + urgencyExtra;
  };

  // إرسال النموذج
  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !patientName || !patientPhone) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // محاكاة حجز الموعد
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // إنشاء معرف الحجز
      const bookingId = `TELE_${Date.now()}`;
      
      // حفظ بيانات الحجز
      const bookingData = {
        id: bookingId,
        type: 'telemedicine',
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        consultationType,
        patient: {
          name: patientName,
          age: patientAge,
          gender: patientGender,
          phone: patientPhone,
          email: patientEmail
        },
        medicalInfo: {
          history: medicalHistory,
          symptoms: currentSymptoms,
          urgency: urgencyLevel
        },
        totalPrice: calculateTotalPrice(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      const bookings = JSON.parse(localStorage.getItem('telemedicine-bookings') || '[]');
      bookings.push(bookingData);
      localStorage.setItem('telemedicine-bookings', JSON.stringify(bookings));
      
      toast({
        title: "تم تأكيد الحجز بنجاح!",
        description: `رقم الحجز: ${bookingId}. ستتلقى رسالة تأكيد قريباً`,
      });

      // توجيه لصفحة الدفع
      navigate(`/payment/${bookingId}`);
      
    } catch (error) {
      toast({
        title: "خطأ في الحجز",
        description: "حدث خطأ أثناء معالجة طلبك، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-cyan-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div className="animate-fade-in">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Video className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              احجز فحص طبي عن بُعد
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              استشارات طبية احترافية من منزلك مع أفضل الأطباء في الجزائر
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>آمن ومشفر</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>24/7 متاح</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>أطباء معتمدين</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* النموذج الرئيسي */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* اختيار الطبيب */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  اختر طبيبك المفضل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedDoctor?.id === doctor.id 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {doctor.name.split(' ')[1]?.[0] || 'د'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{doctor.name}</h3>
                          <p className="text-blue-600 text-sm mb-2">{doctor.specialty}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{doctor.rating}</span>
                            <span className="text-xs text-gray-500">({doctor.experience})</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {doctor.languages.slice(0, 2).map((lang) => (
                              <Badge key={lang} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-lg font-bold text-green-600">
                            {doctor.price.toLocaleString()} دج
                          </p>
                        </div>
                        {selectedDoctor?.id === doctor.id && (
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* نوع الاستشارة والموعد */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  تفاصيل الموعد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>نوع الاستشارة</Label>
                    <Select value={consultationType} onValueChange={setConsultationType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="اختر نوع الاستشارة" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <p className="font-medium">{type.label}</p>
                              <p className="text-sm text-gray-500">
                                {type.duration} - {type.price !== 0 && `${type.price > 0 ? '+' : ''}${type.price} دج`}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>مستوى الأولوية</Label>
                    <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="مستوى الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => {
                          const IconComponent = level.icon;
                          return (
                            <SelectItem key={level.value} value={level.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                {level.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">تاريخ الموعد</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getTomorrowDate()}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>وقت الموعد</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="اختر الوقت" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDoctor?.availability.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* بيانات المريض */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  بيانات المريض
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName">الاسم الكامل *</Label>
                    <Input
                      id="patientName"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="الاسم الكامل"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="patientAge">العمر</Label>
                    <Input
                      id="patientAge"
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="العمر بالسنوات"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>الجنس</Label>
                    <Select value={patientGender} onValueChange={setPatientGender}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="اختر الجنس" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>اللغة المفضلة</Label>
                    <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="اختر اللغة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arabic">العربية</SelectItem>
                        <SelectItem value="french">الفرنسية</SelectItem>
                        <SelectItem value="english">الإنجليزية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientPhone">رقم الهاتف *</Label>
                    <Input
                      id="patientPhone"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+213 555 123 456"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="patientEmail">البريد الإلكتروني</Label>
                    <Input
                      id="patientEmail"
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="insuranceProvider">شركة التأمين (اختياري)</Label>
                  <Input
                    id="insuranceProvider"
                    value={insuranceProvider}
                    onChange={(e) => setInsuranceProvider(e.target.value)}
                    placeholder="اسم شركة التأمين الصحي"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* المعلومات الطبية */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-600" />
                  المعلومات الطبية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentSymptoms">الأعراض الحالية *</Label>
                  <Textarea
                    id="currentSymptoms"
                    value={currentSymptoms}
                    onChange={(e) => setCurrentSymptoms(e.target.value)}
                    placeholder="اكتب الأعراض التي تشعر بها بالتفصيل..."
                    className="mt-1 h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalHistory">التاريخ المرضي (اختياري)</Label>
                  <Textarea
                    id="medicalHistory"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    placeholder="الأمراض المزمنة، العمليات السابقة، الأدوية الحالية..."
                    className="mt-1 h-20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* فحص التوافق التقني */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-indigo-600" />
                  فحص التوافق التقني
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">كاميرا</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">ميكروفون</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">اتصال مستقر</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={checkDevice}
                    disabled={deviceCheck}
                    variant="outline" 
                    className="w-full"
                  >
                    {deviceCheck ? (
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    ) : (
                      <Monitor className="w-4 h-4 mr-2" />
                    )}
                    {deviceCheck ? 'تم فحص الجهاز بنجاح' : 'فحص توافق الجهاز'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            
            {/* ملخص الحجز */}
            <Card className="sticky top-4 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  ملخص الحجز
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDoctor && (
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {selectedDoctor.name.split(' ')[1]?.[0] || 'د'}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{selectedDoctor.name}</p>
                        <p className="text-xs text-gray-600">{selectedDoctor.specialty}</p>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      {selectedDate && <p>📅 {selectedDate}</p>}
                      {selectedTime && <p>🕒 {selectedTime}</p>}
                      {consultationType && (
                        <p>💼 {consultationTypes.find(t => t.value === consultationType)?.label}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>سعر الاستشارة:</span>
                    <span>{selectedDoctor?.price.toLocaleString() || 0} دج</span>
                  </div>
                  
                  {consultationType && consultationTypes.find(t => t.value === consultationType)?.price !== 0 && (
                    <div className="flex justify-between text-sm">
                      <span>رسوم إضافية:</span>
                      <span>+{consultationTypes.find(t => t.value === consultationType)?.price || 0} دج</span>
                    </div>
                  )}
                  
                  {urgencyLevel && ['high', 'urgent'].includes(urgencyLevel) && (
                    <div className="flex justify-between text-sm">
                      <span>رسوم الأولوية:</span>
                      <span>+{urgencyLevel === 'urgent' ? 2000 : 1000} دج</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>المجموع:</span>
                    <span className="text-green-600">{calculateTotalPrice().toLocaleString()} دج</span>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={loading || !selectedDoctor || !selectedDate || !selectedTime || !patientName || !patientPhone}
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري تأكيد الحجز...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      تأكيد الحجز والدفع
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* ضمانات الخدمة */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">ضمانات الخدمة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm">حماية كاملة للخصوصية</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">أطباء معتمدين ومرخصين</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">ضمان الوقت المحدد</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">دعم فني 24/7</span>
                </div>
              </CardContent>
            </Card>

            {/* معلومات مهمة */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">
                  <AlertCircle className="w-5 h-5 inline mr-2" />
                  تنبيهات مهمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• تأكد من وجود اتصال إنترنت مستقر</p>
                <p>• احضر معك جميع التقارير الطبية السابقة</p>
                <p>• يمكن إلغاء الحجز مجاناً قبل 4 ساعات</p>
                <p>• الاستشارة لا تغني عن الفحص الطبي المباشر في الحالات الطارئة</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TelemedicineBooking;