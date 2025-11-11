import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';

const Booking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { getDoctors } = useAdmin();
  const doctors = getDoctors();
  
  // Extract booking parameters from URL
  const bookingData = {
    doctorId: searchParams.get('doctorId'),
    doctorName: searchParams.get('doctorName'),
    clinicId: searchParams.get('clinicId'),
    clinicName: searchParams.get('clinicName'),
    hospitalId: searchParams.get('hospitalId'),
    hospitalName: searchParams.get('hospitalName'),
    specialty: searchParams.get('specialty'),
    type: searchParams.get('type'),
    price: searchParams.get('price')
  };

  const [selectedDoctor, setSelectedDoctor] = useState(bookingData.doctorId || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">حجز المواعيد</h1>
            <p className="text-xl text-muted-foreground">
              احجز موعدك مع الطبيب المناسب في الوقت الذي يناسبك
            </p>
            {/* Show pre-filled information */}
            {(bookingData.doctorName || bookingData.clinicName || bookingData.hospitalName) && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">محدد مسبقاً:</p>
                {bookingData.doctorName && (
                  <p className="font-medium">{decodeURIComponent(bookingData.doctorName)}</p>
                )}
                {bookingData.clinicName && (
                  <p className="font-medium">{decodeURIComponent(bookingData.clinicName)}</p>
                )}
                {bookingData.hospitalName && (
                  <p className="font-medium">{decodeURIComponent(bookingData.hospitalName)}</p>
                )}
                {bookingData.specialty && (
                  <p className="text-sm text-muted-foreground">{decodeURIComponent(bookingData.specialty)}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">تفاصيل الحجز</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Doctor Selection */}
                    <div>
                      <Label htmlFor="doctor">اختر الطبيب</Label>
                      <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="اختر الطبيب المناسب" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                              <div className="flex justify-between w-full">
                                <span>{doctor.name}</span>
                                <span className="text-muted-foreground">({doctor.specialty})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <Label htmlFor="date">التاريخ</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-2"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <Label htmlFor="time">الوقت</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="اختر الوقت المناسب" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Patient Information */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">معلومات المريض</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">الاسم الأول</Label>
                          <Input id="firstName" placeholder="أدخل الاسم الأول" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">اسم العائلة</Label>
                          <Input id="lastName" placeholder="أدخل اسم العائلة" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input id="phone" placeholder="0123456789" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input id="email" type="email" placeholder="example@email.com" className="mt-2" />
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                      <Textarea 
                        id="notes"
                        placeholder="أدخل أي ملاحظات أو أعراض تريد إبلاغ الطبيب بها"
                        className="mt-2"
                        rows={4}
                      />
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        if (selectedDoctor && selectedDate && selectedTime) {
                          const selectedDoctorData = doctors.find(d => d.id.toString() === selectedDoctor);
                          // Navigate to payment with appointment data
                          window.location.href = `/payment/new?doctor=${encodeURIComponent(selectedDoctorData?.name || '')}&date=${selectedDate}&time=${selectedTime}&price=${encodeURIComponent(selectedDoctorData?.price || '')}`;
                        } else {
                          alert('يرجى ملء جميع البيانات المطلوبة');
                        }
                      }}
                    >
                      تأكيد الحجز
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>ملخص الحجز</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDoctor && (
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <User className="w-4 h-4 ml-2" />
                          <span>الطبيب</span>
                        </div>
                        <div className="font-medium">
                          {doctors.find(d => d.id.toString() === selectedDoctor)?.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {doctors.find(d => d.id.toString() === selectedDoctor)?.specialty}
                        </div>
                      </div>
                    )}

                    {selectedDate && (
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 ml-2" />
                          <span>التاريخ</span>
                        </div>
                        <div className="font-medium">{selectedDate}</div>
                      </div>
                    )}

                    {selectedTime && (
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 ml-2" />
                          <span>الوقت</span>
                        </div>
                        <div className="font-medium">{selectedTime}</div>
                      </div>
                    )}

                    {selectedDoctor && (
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">إجمالي التكلفة:</span>
                          <span className="text-2xl font-bold text-primary">
                            {doctors.find(d => d.id.toString() === selectedDoctor)?.price}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      <p className="mb-2">📋 يرجى الحضور قبل 15 دقيقة من موعدك</p>
                      <p className="mb-2">🏥 العنوان: مركز الرعاية الطبية</p>
                      <p>📞 للاستفسار: 021 123 456</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;