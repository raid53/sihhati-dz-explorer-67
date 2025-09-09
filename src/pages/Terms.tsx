import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Shield, Users, Gavel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            شروط الاستخدام
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            الشروط والأحكام المنظمة لاستخدام منصة رابط الرعاية الصحية
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary" />
                قبول الشروط
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                باستخدامك لمنصة رابط الرعاية، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
                إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-secondary" />
                الخدمات المقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                منصة رابط الرعاية تتيح لك:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>البحث عن مقدمي الخدمات الصحية</li>
                <li>حجز المواعيد الطبية</li>
                <li>الوصول للخدمات الصحية عن بُعد</li>
                <li>إدارة السجلات الطبية</li>
                <li>طلب الأدوية والمستلزمات الطبية</li>
                <li>الحصول على الاستشارات الطبية</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-accent-foreground" />
                مسؤوليات المستخدم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                كمستخدم للمنصة، أنت ملزم بـ:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>تقديم معلومات صحيحة ومحدثة</li>
                <li>عدم مشاركة بيانات حسابك مع الآخرين</li>
                <li>احترام خصوصية المرضى والأطباء الآخرين</li>
                <li>عدم استخدام المنصة لأغراض غير قانونية</li>
                <li>الالتزام بالآداب العامة في التعامل</li>
                <li>دفع الرسوم المستحقة في مواعيدها</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                إخلاء المسؤولية الطبية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                منصة رابط الرعاية هي وسيط تقني فقط. نحن لا نقدم المشورة الطبية المباشرة ولسنا مسؤولين عن:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>جودة الخدمات المقدمة من الأطباء أو المؤسسات الصحية</li>
                <li>النتائج الطبية أو العلاجية</li>
                <li>الأخطاء التشخيصية</li>
                <li>تأخير أو إلغاء المواعيد من قبل مقدمي الخدمة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Gavel className="w-6 h-6 text-primary" />
                الدفع والإلغاء
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                سياسة الدفع والإلغاء:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                <li>الدفع مطلوب وقت الحجز أو قبل تلقي الخدمة</li>
                <li>يمكن إلغاء المواعيد قبل 24 ساعة دون رسوم</li>
                <li>الإلغاء المتأخر قد يترتب عليه رسوم</li>
                <li>الاسترداد يتم وفقاً لسياسة مقدم الخدمة</li>
                <li>رسوم المنصة غير قابلة للاسترداد</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-secondary" />
                تعديل الشروط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر 
                البريد الإلكتروني أو من خلال إشعار على المنصة. استمرارك في استخدام المنصة 
                بعد التعديل يعني موافقتك على الشروط الجديدة.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 p-6 bg-muted/30 rounded-xl">
          <p className="text-sm text-muted-foreground">
            آخر تحديث: يناير 2024
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            للاستفسارات القانونية: legal@rabit-care.dz
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;