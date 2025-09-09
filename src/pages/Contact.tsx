import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنتواصل معك في أقرب وقت ممكن"
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl">
              <MessageSquare className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            تواصل معنا
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا في أي وقت للحصول على الدعم والمساعدة
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-primary" />
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">الهاتف</p>
                    <a href="tel:+213555123456" className="text-muted-foreground hover:text-primary transition-colors">
                      +213 555 123 456
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">البريد الإلكتروني</p>
                    <a href="mailto:info@rabit-care.dz" className="text-muted-foreground hover:text-secondary transition-colors">
                      info@rabit-care.dz
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">العنوان</p>
                    <p className="text-muted-foreground">
                      الجزائر العاصمة، شارع الاستقلال، المركز التجاري الكبير
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">ساعات العمل</p>
                    <p className="text-muted-foreground">الأحد - الخميس: 9:00 - 17:00</p>
                    <p className="text-muted-foreground">الجمعة - السبت: 10:00 - 15:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-600">
                  <Headphones className="w-6 h-6" />
                  الدعم الطارئ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-3">للحالات الطارئة والدعم الفوري:</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <a href="tel:+213555999999" className="font-bold text-red-600 text-lg">
                    +213 555 999 999
                  </a>
                </div>
                <p className="text-sm text-red-500 mt-2">متاح 24/7</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Send className="w-6 h-6 text-primary" />
                أرسل لنا رسالة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="اسمك الكامل"
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+213 555 123 456"
                      type="tel"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    type="email"
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الموضوع</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="موضوع الرسالة"
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الرسالة</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="اكتب رسالتك هنا..."
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="w-5 h-5 ml-2" />
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>الأسئلة الشائعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">كيف يمكنني حجز موعد؟</h4>
                <p className="text-muted-foreground text-sm">
                  يمكنك حجز موعد من خلال صفحة الحجز أو التواصل معنا مباشرة.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">هل الخدمة متاحة على مدار الساعة؟</h4>
                <p className="text-muted-foreground text-sm">
                  الدعم الطارئ متاح 24/7، بينما الخدمات العادية حسب ساعات العمل.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">كيف يمكنني إلغاء موعد؟</h4>
                <p className="text-muted-foreground text-sm">
                  يمكنك إلغاء المواعيد من خلال حسابك أو بالاتصال بنا قبل 24 ساعة.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">هل معلوماتي آمنة؟</h4>
                <p className="text-muted-foreground text-sm">
                  نعم، نستخدم أعلى معايير الأمان لحماية بياناتك الصحية.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;