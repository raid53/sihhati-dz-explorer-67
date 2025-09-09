
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  userType: 'patient' | 'provider';
  createdAt: string;
}

interface ProviderProfile {
  id: string;
  userId: string;
  speciality: string;
  licenseNumber: string;
  experience: string;
  serviceType: 'clinic' | 'hospital' | 'home_nursing' | 'addiction_center';
  description: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  providerProfile: ProviderProfile | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<{ success: boolean; message: string }>;
  registerProvider: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }, providerData: Omit<ProviderProfile, 'id' | 'userId' | 'createdAt' | 'isVerified'>) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>;
  updateProviderProfile: (providerData: Partial<ProviderProfile>) => Promise<{ success: boolean; message: string }>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [providerProfile, setProviderProfile] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      if (userData.userType === 'provider') {
        const providers = JSON.parse(localStorage.getItem('providers') || '[]');
        const provider = providers.find((p: any) => p.userId === userData.id);
        if (provider) {
          setProviderProfile(provider);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        if (userWithoutPassword.userType === 'provider') {
          const providers = JSON.parse(localStorage.getItem('providers') || '[]');
          const provider = providers.find((p: any) => p.userId === userWithoutPassword.id);
          if (provider) {
            setProviderProfile(provider);
          }
        }
        
        return { success: true, message: 'تم تسجيل الدخول بنجاح' };
      } else {
        return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
      }
    } catch (error) {
      return { success: false, message: 'حدث خطأ أثناء تسجيل الدخول' };
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<{ success: boolean; message: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const existingUser = users.find((u: any) => u.email === userData.email);
      if (existingUser) {
        return { success: false, message: 'البريد الإلكتروني مستخدم بالفعل' };
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        userType: 'patient' as const,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true, message: 'تم إنشاء الحساب بنجاح' };
    } catch (error) {
      return { success: false, message: 'حدث خطأ أثناء إنشاء الحساب' };
    }
  };

  const registerProvider = async (
    userData: Omit<User, 'id' | 'createdAt'> & { password: string }, 
    providerData: Omit<ProviderProfile, 'id' | 'userId' | 'createdAt' | 'isVerified'>
  ): Promise<{ success: boolean; message: string }> => {
    try {
      console.log('بدء registerProvider - بيانات المستخدم:', userData);
      console.log('بدء registerProvider - بيانات مقدم الخدمة:', providerData);
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      console.log('المستخدمون الحاليون:', users);
      
      const existingUser = users.find((u: any) => u.email === userData.email);
      if (existingUser) {
        console.log('البريد الإلكتروني موجود بالفعل:', userData.email);
        return { success: false, message: 'البريد الإلكتروني مستخدم بالفعل' };
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        userType: 'provider' as const,
        createdAt: new Date().toISOString()
      };
      console.log('المستخدم الجديد:', newUser);

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('تم حفظ المستخدم في localStorage');

      const newProvider = {
        ...providerData,
        id: (Date.now() + 1).toString(),
        userId: newUser.id,
        isVerified: false,
        createdAt: new Date().toISOString()
      };
      console.log('مقدم الخدمة الجديد:', newProvider);

      const providers = JSON.parse(localStorage.getItem('providers') || '[]');
      providers.push(newProvider);
      localStorage.setItem('providers', JSON.stringify(providers));
      console.log('تم حفظ مقدم الخدمة في localStorage');

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setProviderProfile(newProvider);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      console.log('تم تعيين المستخدم الحالي');

      return { success: true, message: 'تم إنشاء حساب مقدم الخدمة بنجاح' };
    } catch (error) {
      console.error('خطأ في registerProvider:', error);
      return { success: false, message: 'حدث خطأ أثناء إنشاء الحساب' };
    }
  };

  const logout = () => {
    setUser(null);
    setProviderProfile(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) return { success: false, message: 'المستخدم غير مسجل الدخول' };

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      
      if (userIndex !== -1) {
        const updatedUser = { ...user, ...userData };
        users[userIndex] = { ...users[userIndex], ...userData };
        
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        return { success: true, message: 'تم تحديث الملف الشخصي بنجاح' };
      }
      
      return { success: false, message: 'فشل في تحديث الملف الشخصي' };
    } catch (error) {
      return { success: false, message: 'حدث خطأ أثناء تحديث الملف الشخصي' };
    }
  };

  const updateProviderProfile = async (providerData: Partial<ProviderProfile>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!providerProfile) return { success: false, message: 'الملف التجاري غير موجود' };

      const providers = JSON.parse(localStorage.getItem('providers') || '[]');
      const providerIndex = providers.findIndex((p: any) => p.id === providerProfile.id);
      
      if (providerIndex !== -1) {
        const updatedProvider = { ...providerProfile, ...providerData };
        providers[providerIndex] = { ...providers[providerIndex], ...providerData };
        
        localStorage.setItem('providers', JSON.stringify(providers));
        setProviderProfile(updatedProvider);
        
        return { success: true, message: 'تم تحديث الملف التجاري بنجاح' };
      }
      
      return { success: false, message: 'فشل في تحديث الملف التجاري' };
    } catch (error) {
      return { success: false, message: 'حدث خطأ أثناء تحديث الملف التجاري' };
    }
  };

  const value = {
    user,
    providerProfile,
    login,
    register,
    registerProvider,
    logout,
    updateProfile,
    updateProviderProfile,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
