import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, ImageIcon, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SplashScreenManagement: React.FC = () => {
  const { splashScreenSettings, updateSplashScreenSettings, resetSplashScreenSettings } = useAdmin();
  const [logoUrl, setLogoUrl] = useState(splashScreenSettings.logoUrl);

  const handleSave = () => {
    updateSplashScreenSettings({ logoUrl });
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث إعدادات الواجهة الترحيبية",
    });
  };

  const handleReset = () => {
    resetSplashScreenSettings();
    setLogoUrl(splashScreenSettings.logoUrl);
    toast({
      title: "تمت إعادة التعيين",
      description: "تم إعادة تعيين الإعدادات إلى القيم الافتراضية",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <CardTitle>إدارة الواجهة الترحيبية</CardTitle>
        </div>
        <CardDescription>
          تخصيص الشعار والصورة التي تظهر عند زيارة الموقع
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo URL Input */}
        <div className="space-y-2">
          <Label htmlFor="logoUrl">رابط الشعار (Logo URL)</Label>
          <Input
            id="logoUrl"
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://example.com/logo.png"
            className="text-right"
            dir="ltr"
          />
          <p className="text-sm text-muted-foreground" dir="rtl">
            أدخل رابط الصورة التي تريد استخدامها كشعار في الواجهة الترحيبية
          </p>
        </div>

        {/* Preview Section */}
        <div className="space-y-2">
          <Label>معاينة الشعار</Label>
          <div className="border border-border rounded-lg p-8 bg-gradient-to-br from-background to-muted/30 flex items-center justify-center min-h-[200px]">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Logo Preview" 
                className="max-w-md w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  toast({
                    title: "خطأ في تحميل الصورة",
                    description: "تأكد من صحة رابط الصورة",
                    variant: "destructive",
                  });
                }}
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p>لا توجد صورة</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4" dir="rtl">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>نصائح للاستخدام:</span>
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
            <li>استخدم صور بجودة عالية (PNG أو JPG)</li>
            <li>الحجم الموصى به: 800x400 بكسل أو أكبر</li>
            <li>تأكد من أن الرابط يعمل ويمكن الوصول إليه</li>
            <li>يمكنك استخدام خدمات رفع الصور مثل Imgur أو ImgBB</li>
            <li>للحصول على أفضل النتائج، استخدم صور بخلفية شفافة (PNG)</li>
          </ul>
        </div>

        {/* Hosting Services Suggestions */}
        <div className="bg-muted/50 rounded-lg p-4" dir="rtl">
          <h4 className="font-semibold text-sm mb-2">مواقع رفع الصور المجانية:</h4>
          <div className="text-sm space-y-1">
            <a 
              href="https://imgur.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-primary hover:underline"
            >
              • Imgur.com - سهل الاستخدام ولا يتطلب تسجيل
            </a>
            <a 
              href="https://imgbb.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-primary hover:underline"
            >
              • ImgBB.com - رفع سريع ومجاني
            </a>
            <a 
              href="https://postimages.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-primary hover:underline"
            >
              • Postimages.org - بدون حد للتخزين
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة التعيين
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SplashScreenManagement;
