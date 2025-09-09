
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Stethoscope, AlertTriangle, CheckCircle, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Symptom {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
}

interface DiagnosisResult {
  condition: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
  specialistType: string;
}

const AISymptomChecker: React.FC = () => {
  const { toast } = useToast();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const commonSymptoms = [
    'صداع', 'حمى', 'سعال', 'ألم في المعدة', 'غثيان', 'دوخة',
    'ألم في الصدر', 'ضيق في التنفس', 'ألم في المفاصل', 'طفح جلدي'
  ];

  const mockDiagnosisResults: DiagnosisResult[] = [
    {
      condition: 'التهاب في الجهاز التنفسي العلوي',
      probability: 75,
      severity: 'medium',
      recommendations: [
        'راحة تامة لمدة 2-3 أيام',
        'شرب السوائل الدافئة',
        'تناول فيتامين C',
        'تجنب التعرض للبرد'
      ],
      urgency: 'medium',
      specialistType: 'طبيب عام'
    },
    {
      condition: 'التهاب في المعدة',
      probability: 60,
      severity: 'low',
      recommendations: [
        'تناول وجبات خفيفة',
        'تجنب الأطعمة الحارة',
        'شرب الماء بكثرة',
        'تناول البروبيوتيك'
      ],
      urgency: 'low',
      specialistType: 'طبيب باطني'
    }
  ];

  const handleAnalyze = async () => {
    if (!age || !gender || !symptoms || !duration || !severity) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // محاكاة تحليل الذكاء الاصطناعي
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // اختيار نتيجة عشوائية بناءً على الأعراض
    const result = mockDiagnosisResults[Math.floor(Math.random() * mockDiagnosisResults.length)];
    setDiagnosisResult(result);
    setLoading(false);

    toast({
      title: "تم التحليل بنجاح",
      description: "تم إنشاء التشخيص الأولي بواسطة الذكاء الاصطناعي",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            التشخيص الأولي بالذكاء الاصطناعي
          </CardTitle>
          <p className="text-sm text-gray-600">
            احصل على تشخيص أولي لأعراضك باستخدام تقنيات الذكاء الاصطناعي المتقدمة
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">العمر</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="مثال: 30"
                className="mt-1"
              />
            </div>
            <div>
              <Label>الجنس</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="symptoms">الأعراض الحالية</Label>
            <Textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="اكتب الأعراض التي تشعر بها بالتفصيل..."
              className="mt-1 h-24"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <Button
                  key={symptom}
                  variant="outline"
                  size="sm"
                  onClick={() => setSymptoms(prev => prev ? `${prev}، ${symptom}` : symptom)}
                  className="text-xs"
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>مدة الأعراض</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="منذ متى تشعر بهذه الأعراض؟" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">بضع ساعات</SelectItem>
                  <SelectItem value="1-2days">يوم إلى يومين</SelectItem>
                  <SelectItem value="3-7days">3-7 أيام</SelectItem>
                  <SelectItem value="1-2weeks">أسبوع إلى أسبوعين</SelectItem>
                  <SelectItem value="month+">أكثر من شهر</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>شدة الأعراض</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="ما مدى شدة الأعراض؟" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">خفيفة</SelectItem>
                  <SelectItem value="moderate">متوسطة</SelectItem>
                  <SelectItem value="severe">شديدة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={loading}
            className="w-full h-12"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري التحليل...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                تحليل الأعراض
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {diagnosisResult && (
        <Card className="animate-fade-in-scale border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              نتيجة التشخيص الأولي
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              تم التحليل بواسطة الذكاء الاصطناعي
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{diagnosisResult.condition}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getSeverityColor(diagnosisResult.severity)}`}>
                  {getSeverityIcon(diagnosisResult.severity)}
                  {diagnosisResult.probability}% احتمالية
                </span>
              </div>
              <p className="text-sm text-gray-600">
                الطبيب المتخصص المقترح: <strong>{diagnosisResult.specialistType}</strong>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                التوصيات العلاجية
              </h4>
              <ul className="space-y-2">
                {diagnosisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-3 rounded-lg ${getSeverityColor(diagnosisResult.urgency)}`}>
              <div className="flex items-center gap-2">
                {getSeverityIcon(diagnosisResult.urgency)}
                <span className="font-medium">
                  {diagnosisResult.urgency === 'high' && 'يُنصح بزيارة الطبيب فوراً'}
                  {diagnosisResult.urgency === 'medium' && 'يُنصح بزيارة الطبيب خلال يومين'}
                  {diagnosisResult.urgency === 'low' && 'يمكن المتابعة في المنزل مع مراقبة الأعراض'}
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 mb-1">تنبيه مهم</p>
                  <p className="text-yellow-700">
                    هذا التشخيص أولي فقط ولا يغني عن استشارة الطبيب المختص. 
                    في حالة تفاقم الأعراض أو الشعور بألم شديد، يرجى التوجه للطوارئ فوراً.
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={() => console.log('Book appointment')}>
              حجز موعد مع {diagnosisResult.specialistType}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISymptomChecker;
