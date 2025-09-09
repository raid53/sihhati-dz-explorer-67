
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, Eye, AlertTriangle, CheckCircle, FileImage, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  imageType: string;
  findings: Finding[];
  confidence: number;
  recommendations: string[];
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  requiresDoctor: boolean;
}

interface Finding {
  description: string;
  location?: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  confidence: number;
}

const MedicalImageAnalyzer: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const mockAnalysisResults: Record<string, AnalysisResult> = {
    'xray': {
      imageType: 'أشعة سينية للصدر',
      findings: [
        {
          description: 'الرئتان تبدوان طبيعيتان',
          severity: 'normal',
          confidence: 92
        },
        {
          description: 'شكل القلب طبيعي',
          severity: 'normal',
          confidence: 88
        }
      ],
      confidence: 90,
      recommendations: [
        'النتائج تبدو طبيعية',
        'يُنصح بالمتابعة الدورية',
        'الحفاظ على نمط حياة صحي'
      ],
      severity: 'normal',
      requiresDoctor: false
    },
    'skin': {
      imageType: 'صورة جلدية',
      findings: [
        {
          description: 'بقعة صبغية حميدة',
          location: 'الذراع الأيسر',
          severity: 'mild',
          confidence: 78
        }
      ],
      confidence: 78,
      recommendations: [
        'يُنصح بمراجعة طبيب الجلدية',
        'مراقبة أي تغييرات في الشكل أو اللون',
        'تجنب التعرض المفرط للشمس',
        'استخدام واقي الشمس'
      ],
      severity: 'mild',
      requiresDoctor: true
    },
    'blood_test': {
      imageType: 'نتائج فحص الدم',
      findings: [
        {
          description: 'مستوى الهيموجلوبين منخفض قليلاً',
          severity: 'mild',
          confidence: 85
        },
        {
          description: 'باقي القيم ضمن المعدل الطبيعي',
          severity: 'normal',
          confidence: 92
        }
      ],
      confidence: 88,
      recommendations: [
        'تناول الأطعمة الغنية بالحديد',
        'فحص مستوى فيتامين B12',
        'مراجعة الطبيب لتحديد سبب الانخفاض',
        'إعادة الفحص بعد شهر'
      ],
      severity: 'mild',
      requiresDoctor: true
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!supportedTypes.includes(file.type)) {
      toast({
        title: "نوع ملف غير مدعوم",
        description: "يرجى اختيار صورة بصيغة JPG أو PNG",
        variant: "destructive"
      });
      return;
    }

    if (file.size > maxFileSize) {
      toast({
        title: "حجم الملف كبير",
        description: "يرجى اختيار صورة أصغر من 5 ميجابايت",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // إعادة تعيين النتائج السابقة
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    
    // محاكاة تحليل الصورة
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // اختيار نتيجة عشوائية بناءً على نوع الصورة المفترض
    const resultTypes = Object.keys(mockAnalysisResults);
    const randomType = resultTypes[Math.floor(Math.random() * resultTypes.length)];
    const result = mockAnalysisResults[randomType];
    
    setAnalysisResult(result);
    setLoading(false);

    toast({
      title: "تم التحليل بنجاح",
      description: "تم تحليل الصورة الطبية بواسطة الذكاء الاصطناعي",
    });
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'severe': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'mild': return <Eye className="w-4 h-4 text-yellow-600" />;
      default: return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-6 h-6 text-purple-600" />
            تحليل الصور الطبية بالذكاء الاصطناعي
          </CardTitle>
          <p className="text-sm text-gray-600">
            ارفع صورة طبية للحصول على تحليل أولي بواسطة الذكاء الاصطناعي
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!imagePreview ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">ارفع صورة طبية</h3>
              <p className="text-gray-600 text-sm mb-4">
                يدعم أشعة سينية، صور جلدية، نتائج فحوصات، وأكثر
              </p>
              <Button variant="outline">
                <FileImage className="w-4 h-4 mr-2" />
                اختر صورة
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">
                الحد الأقصى: 5 ميجابايت | الصيغ المدعومة: JPG, PNG
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Medical Image" 
                  className="w-full h-64 object-contain bg-gray-50 rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedFile?.name} ({(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                </div>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      تحليل الصورة
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResult && (
        <Card className="animate-fade-in-scale border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              نتائج التحليل
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{analysisResult.imageType}</Badge>
              <Badge className="bg-purple-100 text-purple-800">
                دقة {analysisResult.confidence}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold">النتائج المكتشفة:</h4>
              {analysisResult.findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {getSeverityIcon(finding.severity)}
                  <div className="flex-1">
                    <p className="font-medium">{finding.description}</p>
                    {finding.location && (
                      <p className="text-sm text-gray-600">الموقع: {finding.location}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getSeverityColor(finding.severity)}>
                        {finding.severity === 'normal' && 'طبيعي'}
                        {finding.severity === 'mild' && 'خفيف'}
                        {finding.severity === 'moderate' && 'متوسط'}
                        {finding.severity === 'severe' && 'شديد'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        دقة {finding.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">التوصيات:</h4>
              <ul className="space-y-1">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {analysisResult.requiresDoctor && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-800 mb-1">يُنصح بمراجعة طبيب مختص</p>
                    <p className="text-orange-700">
                      هذه النتائج تتطلب فحصاً أكثر تفصيلاً من قبل طبيب متخصص لتأكيد التشخيص والحصول على العلاج المناسب.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">تنبيه مهم</p>
                  <p className="text-blue-700">
                    هذا التحليل أولي فقط ولا يغني عن استشارة الطبيب المختص. 
                    النتائج قد تحتاج لفحوصات إضافية للتأكيد.
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={() => console.log('Book appointment')}>
              حجز موعد مع طبيب مختص
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalImageAnalyzer;
