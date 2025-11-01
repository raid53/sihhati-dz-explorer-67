
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Phone, MessageSquare, CreditCard, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingSystemProps {
  clinicId: number;
  clinicName: string;
}

const BookingSystem: React.FC<BookingSystemProps> = ({ clinicId, clinicName }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const doctors = [
    { id: 1, name: 'د. محمد بن عيسى', specialty: 'طب الأسنان' },
    { id: 2, name: 'د. أمينة بوزيدي', specialty: 'طب القلب' },
    { id: 3, name: 'د. عبد الرحمن مرزوقي', specialty: 'طب الأطفال' },
    { id: 4, name: 'د. فاطمة مداني', specialty: 'طب النساء والتوليد' },
    { id: 5, name: 'د. يوسف عبدلي', specialty: 'طب العيون' },
    { id: 6, name: 'د. حميد لطرش ', specialty: 'طب  التغذية وطب التجميل' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedDate) {
      newErrors.date = 'يرجى اختيار التاريخ';
    } else {
      const selectedDateObj = new Date(selectedDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDateObj < today) {
        newErrors.date = 'لا يمكن حجز موعد في تاريخ سابق';
      }
    }

    if (!selectedTime) {
      newErrors.time = 'يرجى اختيار الوقت';
    }

    if (!selectedDoctor) {
      newErrors.doctor = 'يرجى اختيار الطبيب';
    }

    if (!patientName.trim()) {
      newErrors.name = 'يرجى إدخال اسم المريض';
    } else if (patientName.trim().length < 2) {
      newErrors.name = 'اسم المريض يجب أن يكون أكثر من حرفين';
    }

    if (!patientPhone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else if (!/^(\+213|0)[5-7][0-9]{8}$/.test(patientPhone.replace(/\s/g, ''))) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async () => {
    if (!validateForm()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى مراجعة البيانات المدخلة وتصحيح الأخطاء",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // محاكاة API call لحجز الموعد
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // إنشاء معرف للموعد
      const appointmentId = `APT_${Date.now()}`;
      
      // حفظ بيانات الموعد في localStorage للرجوع إليها في صفحة الدفع
      const appointmentData = {
        id: appointmentId,
        clinicId,
        clinicName,
        date: selectedDate,
        time: selectedTime,
        doctor: selectedDoctor,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        notes: notes.trim(),
        createdAt: new Date().toISOString()
      };
      
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push(appointmentData);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      
      toast({
        title: "تم إنشاء الموعد!",
        description: `سيتم توجيهك لصفحة الدفع لتأكيد الحجز`,
      });

      // توجيه المستخدم لصفحة الدفع
      navigate(`/payment/${appointmentId}`);
    } catch (error) {
      toast({
        title: "خطأ في الحجز",
        description: "حدث خطأ أثناء إنشاء الموعد، يرجى المحاولة مرة أخرى",
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
    <Card className="animate-fade-in-scale">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          حجز موعد في {clinicName}
        </CardTitle>
        <p className="text-gray-600 text-sm">
          يرجى ملء جميع البيانات المطلوبة لتأكيد الحجز
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">تاريخ الموعد *</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                if (errors.date) {
                  setErrors(prev => ({ ...prev, date: '' }));
                }
              }}
              min={getTomorrowDate()}
              className={`mt-1 ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.date}</span>
              </div>
            )}
          </div>
          
          <div>
            <Label>وقت الموعد *</Label>
            <Select 
              value={selectedTime} 
              onValueChange={(value) => {
                setSelectedTime(value);
                if (errors.time) {
                  setErrors(prev => ({ ...prev, time: '' }));
                }
              }}
            >
              <SelectTrigger className={`mt-1 ${errors.time ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="اختر الوقت" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {time}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.time && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.time}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <Label>اختر الطبيب *</Label>
          <Select 
            value={selectedDoctor} 
            onValueChange={(value) => {
              setSelectedDoctor(value);
              if (errors.doctor) {
                setErrors(prev => ({ ...prev, doctor: '' }));
              }
            }}
          >
            <SelectTrigger className={`mt-1 ${errors.doctor ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="اختر الطبيب" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.name}>
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.doctor && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.doctor}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="patientName">اسم المريض *</Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => {
                setPatientName(e.target.value);
                if (errors.name) {
                  setErrors(prev => ({ ...prev, name: '' }));
                }
              }}
              placeholder="الاسم الكامل"
              className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="patientPhone">رقم الهاتف *</Label>
            <Input
              id="patientPhone"
              value={patientPhone}
              onChange={(e) => {
                setPatientPhone(e.target.value);
                if (errors.phone) {
                  setErrors(prev => ({ ...prev, phone: '' }));
                }
              }}
              placeholder="+213 555 123 456"
              className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أي ملاحظات أو أعراض تود ذكرها..."
            className="w-full mt-1 p-3 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {notes.length}/500 حرف
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">ملاحظات مهمة:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• يرجى الحضور قبل 15 دقيقة من موعدك</li>
            <li>• احضر معك بطاقة الهوية وأي تقارير طبية سابقة</li>
            <li>• يمكن إلغاء الحجز مجاناً قبل 24 ساعة من الموعد</li>
          </ul>
        </div>

        <Button 
          onClick={handleBooking} 
          disabled={loading}
          className="w-full h-12 text-lg"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              جاري إنشاء الموعد...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              تأكيد الحجز والانتقال للدفع
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingSystem;
