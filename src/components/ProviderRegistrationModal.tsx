
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { X, AlertCircle, Shield } from 'lucide-react';

interface ProviderRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProviderRegistrationModal: React.FC<ProviderRegistrationModalProps> = ({ isOpen, onClose }) => {
  const { registerProvider } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: 'ذكر',
    password: '',
    confirmPassword: '',
    speciality: '',
    licenseNumber: '',
    experience: '',
    serviceType: 'clinic' as 'clinic' | 'hospital' | 'home_nursing' | 'addiction_center',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // مسح الخطأ عند تعديل الحقل
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // التحقق من البيانات الشخصية
    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال الاسم الكامل';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else if (!/^(\+213|0)[5-7][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'يرجى إدخال رقم هاتف جزائري صحيح';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'يرجى إدخال العنوان';
    }

    // التحقق من كلمة المرور
    if (!formData.password.trim()) {
      newErrors.password = 'يرجى إدخال كلمة المرور';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    // التحقق من البيانات المهنية
    if (!formData.speciality.trim()) {
      newErrors.speciality = 'يرجى إدخال التخصص';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'يرجى إدخال رقم الترخيص';
    } else if (formData.licenseNumber.length < 5) {
      newErrors.licenseNumber = 'رقم الترخيص يجب أن يكون 5 أرقام على الأقل';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'يرجى إدخال سنوات الخبرة';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'يرجى إدخال وصف الخدمات';
    } else if (formData.description.length < 50) {
      newErrors.description = 'وصف الخدمات يجب أن يكون 50 حرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: 'ذكر',
      password: '',
      confirmPassword: '',
      speciality: '',
      licenseNumber: '',
      experience: '',
      serviceType: 'clinic',
      description: '',
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('بدء عملية التسجيل - البيانات المرسلة:', formData);
    
    if (!validateForm()) {
      console.log('فشل في التحقق من صحة البيانات - الأخطاء:', errors);
      toast({
        title: "خطأ في البيانات",
        description: "يرجى مراجعة البيانات المدخلة وتصحيح الأخطاء",
        variant: "destructive"
      });
      return;
    }

    console.log('تم التحقق من صحة البيانات بنجاح');
    setLoading(true);

    try {
      const { confirmPassword, speciality, licenseNumber, experience, serviceType, description, ...userData } = formData;
      const userDataWithType = {
        ...userData,
        userType: 'provider' as const
      };
      const providerData = { speciality, licenseNumber, experience, serviceType, description };
      
      console.log('بيانات المستخدم:', userDataWithType);
      console.log('بيانات مقدم الخدمة:', providerData);
      
      const result = await registerProvider(userDataWithType, providerData);
      
      console.log('نتيجة التسجيل:', result);
      
      if (result.success) {
        console.log('تم التسجيل بنجاح');
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "سيتم مراجعة طلبك وتفعيل حسابك في أقرب وقت",
        });
        onClose();
        resetForm();
      } else {
        console.log('فشل التسجيل:', result.message);
        toast({
          title: "خطأ في إنشاء الحساب",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('خطأ غير متوقع أثناء التسجيل:', error);
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            تسجيل مقدم خدمة صحية
          </DialogTitle>
          <p className="text-center text-sm text-gray-600">
            سيتم مراجعة طلبك من قبل فريقنا قبل تفعيل الحساب
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-4"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* البيانات الشخصية */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">البيانات الشخصية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="د. أحمد محمد"
                />
                {errors.name && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="doctor@example.com"
                />
                {errors.email && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+213 555 123 456"
                />
                {errors.phone && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="gender">الجنس</Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>

              <div>
                <Label htmlFor="serviceType">نوع الخدمة *</Label>
                <select
                  id="serviceType"
                  name="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="clinic">عيادة طبية</option>
                  <option value="hospital">مستشفى</option>
                  <option value="home_nursing">تمريض منزلي</option>
                  <option value="addiction_center">مركز علاج إدمان</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="address">العنوان *</Label>
              <Input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleInputChange}
                className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
                placeholder="الولاية، المدينة، الشارع"
              />
              {errors.address && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* البيانات المهنية */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">البيانات المهنية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="speciality">التخصص *</Label>
                <Input
                  id="speciality"
                  name="speciality"
                  type="text"
                  required
                  value={formData.speciality}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.speciality ? 'border-red-500' : ''}`}
                  placeholder="مثال: طب الأسنان، القلب، الجراحة..."
                />
                {errors.speciality && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.speciality}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="licenseNumber">رقم الترخيص *</Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  required
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.licenseNumber ? 'border-red-500' : ''}`}
                  placeholder="رقم الترخيص المهني"
                />
                {errors.licenseNumber && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.licenseNumber}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="experience">سنوات الخبرة *</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="text"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.experience ? 'border-red-500' : ''}`}
                  placeholder="مثال: 5 سنوات"
                />
                {errors.experience && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.experience}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="description">وصف الخدمات *</Label>
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
                placeholder="اكتب وصفاً مفصلاً عن خدماتك وخبراتك..."
                rows={4}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.description}</span>
                  </div>
                )}
                <span className="text-xs text-gray-500 ml-auto">
                  {formData.description.length}/1000 حرف
                </span>
              </div>
            </div>
          </div>

          {/* كلمة المرور */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">كلمة المرور</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">كلمة المرور *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="كلمة مرور قوية"
                  minLength={8}
                />
                {errors.password && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  كلمة المرور يجب أن تكون 8 أحرف على الأقل
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="أعد إدخال كلمة المرور"
                />
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري إنشاء الحساب...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                إنشاء حساب مقدم خدمة
              </div>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            بإنشاء الحساب، أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderRegistrationModal;
