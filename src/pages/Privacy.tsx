import React from 'react';
import { Shield, Lock, Eye, Users, FileText, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            سياسة الخصوصية
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن ملتزمون بحماية خصوصيتك وأمان بياناتك الصحية الشخصية
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                جمع المعلومات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند التسجيل في منصتنا، حجز المواعيد، أو استخدام خدماتنا الصحية.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>المعلومات الشخصية (الاسم، العنوان، رقم الهاتف)</li>
                <li>المعلومات الصحية والطبية</li>
                <li>معلومات الدفع والفوترة</li>
                <li>سجل استخدام المنصة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-secondary" />
                استخدام المعلومات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                نستخدم المعلومات المجمعة لتقديم خدماتنا الصحية وتحسين تجربتك على المنصة:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>تقديم الخدمات الطبية والصحية المطلوبة</li>
                <li>التواصل معك بخصوص المواعيد والخدمات</li>
                <li>تحسين جودة خدماتنا</li>
                <li>ضمان أمان وسلامة المنصة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-accent-foreground" />
                مشاركة المعلومات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>مع مقدمي الخدمات الصحية المعتمدين لدينا</li>
                <li>عند الحاجة القانونية أو الطبية الطارئة</li>
                <li>مع موافقتك الصريحة</li>
                <li>لحماية حقوقنا ومصالحنا المشروعة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                حقوقك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                لديك الحق في:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح أو تحديث البيانات</li>
                <li>حذف حسابك ومعلوماتك</li>
                <li>الاعتراض على معالجة بياناتك</li>
                <li>نقل بياناتك إلى مزود خدمة آخر</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-secondary" />
                تواصل معنا
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية أو كيفية التعامل مع بياناتك، 
                يرجى التواصل معنا على:
              </p>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="font-medium">البريد الإلكتروني: privacy@rabit-care.dz</p>
                <p className="font-medium">الهاتف: +213 555 123 456</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 p-6 bg-muted/30 rounded-xl">
          <p className="text-sm text-muted-foreground">
            آخر تحديث: يناير 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;