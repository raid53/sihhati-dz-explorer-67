
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: 'ذكر',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (mode === 'register') {
      if (!formData.name.trim()) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى إدخال الاسم الكامل",
          variant: "destructive"
        });
        return false;
      }
      
      if (!formData.phone.trim()) {
        toast({
          title: "خطأ في البيانات", 
          description: "يرجى إدخال رقم الهاتف",
          variant: "destructive"
        });
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "خطأ في البيانات",
          description: "كلمات المرور غير متطابقة",
          variant: "destructive"
        });
        return false;
      }

      if (formData.password.length < 6) {
        toast({
          title: "خطأ في البيانات",
          description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
          variant: "destructive"
        });
        return false;
      }
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.password.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال كلمة المرور",
        variant: "destructive"
      });
      return false;
    }

    return true;
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
      confirmPassword: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: result.message,
          });
          onClose();
          resetForm();
        } else {
          toast({
            title: "خطأ في تسجيل الدخول",
            description: result.message,
            variant: "destructive"
          });
        }
      } else {
        const { confirmPassword, ...userData } = formData;
        const userDataWithType = {
          ...userData,
          userType: 'patient' as const
        };
        const result = await register(userDataWithType);
        
        if (result.success) {
          toast({
            title: "تم إنشاء الحساب بنجاح",
            description: result.message,
          });
          onClose();
          resetForm();
        } else {
          toast({
            title: "خطأ في إنشاء الحساب",
            description: result.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء معالجة طلبك، يرجى المحاولة مرة أخرى",
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </DialogTitle>
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
          {mode === 'register' && (
            <>
              <div>
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="أدخل اسمك الكامل"
                />
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
                  className="mt-1"
                  placeholder="+213 555 123 456"
                />
              </div>

              <div>
                <Label htmlFor="address">العنوان</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="أدخل عنوانك"
                />
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
            </>
          )}

          <div>
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <Label htmlFor="password">كلمة المرور *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="أدخل كلمة المرور"
              minLength={6}
            />
            {mode === 'register' && (
              <p className="text-xs text-gray-500 mt-1">
                كلمة المرور يجب أن تكون 6 أحرف على الأقل
              </p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="أعد إدخال كلمة المرور"
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 text-lg" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {mode === 'login' ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...'}
              </div>
            ) : (
              mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'
            )}
          </Button>

          <div className="text-center pt-4 border-t">
            <button
              type="button"
              onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
              className="text-green-600 hover:text-green-700 text-sm hover:underline"
            >
              {mode === 'login' ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب؟ تسجيل الدخول'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
