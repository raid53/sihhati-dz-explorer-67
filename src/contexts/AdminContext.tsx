import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WILAYAS, Wilaya } from '@/data/wilayas';
import { defaultDoctors, Doctor } from '@/data/doctors';
import { defaultClinics, Clinic } from '@/data/clinics';
import carelinkLogo from '@/assets/carelink-logo.png';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { initializeDatabase } from '@/lib/initDatabase';

export interface SplashScreenSettings {
  logoUrl: string;
}

interface AdminContextType {
  isAdminAuthenticated: boolean;
  isSiteActive: boolean;
  activeWilayas: Wilaya[];
  doctors: Doctor[];
  clinics: Clinic[];
  splashScreenSettings: SplashScreenSettings;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toggleSiteStatus: () => void;
  toggleWilaya: (wilayaId: number) => void;
  getEnabledWilayas: () => Wilaya[];
  updateDoctor: (id: number, updatedData: Partial<Doctor>) => void;
  getDoctors: () => Doctor[];
  updateClinic: (id: number, updatedData: Partial<Clinic>) => void;
  getClinics: () => Clinic[];
  updateSplashScreenSettings: (settings: Partial<SplashScreenSettings>) => void;
  resetSplashScreenSettings: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAIL = 'soad@admin.com';
const ADMIN_PASSWORD = 'soadgh010203';
const ADMIN_AUTH_KEY = 'carelink_admin_auth';
const SITE_STATUS_KEY = 'carelink_site_status';
const WILAYAS_STATUS_KEY = 'carelink_wilayas_status';
const DOCTORS_KEY = 'carelink_doctors';
const CLINICS_KEY = 'carelink_clinics';
const SPLASH_SCREEN_KEY = 'carelink_splash_screen';

const DEFAULT_SPLASH_SETTINGS: SplashScreenSettings = {
  logoUrl: carelinkLogo,
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isSiteActive, setIsSiteActive] = useState(true);
  const [activeWilayas, setActiveWilayas] = useState<Wilaya[]>(WILAYAS);
  const [doctors, setDoctors] = useState<Doctor[]>(defaultDoctors);
  const [clinics, setClinics] = useState<Clinic[]>(defaultClinics);
  const [splashScreenSettings, setSplashScreenSettings] = useState<SplashScreenSettings>(DEFAULT_SPLASH_SETTINGS);

  useEffect(() => {
    // Load admin auth status from localStorage
    const authStatus = localStorage.getItem(ADMIN_AUTH_KEY);
    setIsAdminAuthenticated(authStatus === 'true');

    // Initialize and load data from database
    const initAndLoad = async () => {
      const result = await initializeDatabase();
      if (result.success) {
        await loadFromDatabase();
      } else {
        console.error('Failed to initialize database:', result.error);
        toast.error('فشل تهيئة قاعدة البيانات. يرجى التأكد من إنشاء الجداول في Cloud → Database');
      }
    };

    initAndLoad();

    // Setup realtime subscriptions
    const channel = supabase
      .channel('admin-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_settings'
        },
        () => {
          loadSettingsFromDB();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'doctors'
        },
        () => {
          loadDoctorsFromDB();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clinics'
        },
        () => {
          loadClinicsFromDB();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadFromDatabase = async () => {
    await loadSettingsFromDB();
    await loadDoctorsFromDB();
    await loadClinicsFromDB();
  };

  const loadSettingsFromDB = async () => {
    try {
      // Load site status
      const { data: siteData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'site_active')
        .single();
      
      if (siteData) {
        setIsSiteActive(siteData.setting_value as boolean);
      }

      // Load wilayas status
      const { data: wilayasData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'wilayas_status')
        .single();
      
      if (wilayasData) {
        setActiveWilayas(wilayasData.setting_value as Wilaya[]);
      }

      // Load splash screen settings
      const { data: splashData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'splash_screen')
        .single();
      
      if (splashData) {
        setSplashScreenSettings(splashData.setting_value as SplashScreenSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadDoctorsFromDB = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('id');

      if (error) throw error;

      if (data && data.length > 0) {
        setDoctors(data as Doctor[]);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  const loadClinicsFromDB = async () => {
    try {
      const { data, error } = await supabase
        .from('clinics')
        .select('*')
        .order('id');

      if (error) throw error;

      if (data && data.length > 0) {
        setClinics(data as Clinic[]);
      }
    } catch (error) {
      console.error('Error loading clinics:', error);
    }
  };

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const toggleSiteStatus = async () => {
    const newStatus = !isSiteActive;
    setIsSiteActive(newStatus);
    
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ setting_value: newStatus })
        .eq('setting_key', 'site_active');

      if (error) throw error;
    } catch (error) {
      console.error('Error updating site status:', error);
      toast.error('فشل تحديث حالة الموقع');
    }
  };

  const toggleWilaya = async (wilayaId: number) => {
    const updatedWilayas = activeWilayas.map(w =>
      w.id === wilayaId ? { ...w, enabled: !w.enabled } : w
    );
    setActiveWilayas(updatedWilayas);
    
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ setting_value: updatedWilayas })
        .eq('setting_key', 'wilayas_status');

      if (error) throw error;
    } catch (error) {
      console.error('Error updating wilaya:', error);
      toast.error('فشل تحديث الولاية');
    }
  };

  const getEnabledWilayas = (): Wilaya[] => {
    return activeWilayas.filter(w => w.enabled);
  };

  const updateDoctor = async (id: number, updatedData: Partial<Doctor>) => {
    const updatedDoctors = doctors.map(doctor =>
      doctor.id === id ? { ...doctor, ...updatedData } : doctor
    );
    setDoctors(updatedDoctors);
    
    try {
      const { error } = await supabase
        .from('doctors')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error('فشل تحديث بيانات الطبيب');
    }
  };

  const getDoctors = (): Doctor[] => {
    return doctors;
  };

  const updateClinic = async (id: number, updatedData: Partial<Clinic>) => {
    const updatedClinics = clinics.map(clinic =>
      clinic.id === id ? { ...clinic, ...updatedData } : clinic
    );
    setClinics(updatedClinics);
    
    try {
      const { error } = await supabase
        .from('clinics')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating clinic:', error);
      toast.error('فشل تحديث بيانات العيادة');
    }
  };

  const getClinics = (): Clinic[] => {
    return clinics;
  };

  const updateSplashScreenSettings = async (settings: Partial<SplashScreenSettings>) => {
    const updatedSettings = { ...splashScreenSettings, ...settings };
    setSplashScreenSettings(updatedSettings);
    
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ setting_value: updatedSettings })
        .eq('setting_key', 'splash_screen');

      if (error) throw error;
    } catch (error) {
      console.error('Error updating splash screen:', error);
      toast.error('فشل تحديث إعدادات الواجهة الترحيبية');
    }
  };

  const resetSplashScreenSettings = async () => {
    setSplashScreenSettings(DEFAULT_SPLASH_SETTINGS);
    
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ setting_value: DEFAULT_SPLASH_SETTINGS })
        .eq('setting_key', 'splash_screen');

      if (error) throw error;
    } catch (error) {
      console.error('Error resetting splash screen:', error);
      toast.error('فشل إعادة تعيين الواجهة الترحيبية');
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        isSiteActive,
        activeWilayas,
        doctors,
        clinics,
        splashScreenSettings,
        login,
        logout,
        toggleSiteStatus,
        toggleWilaya,
        getEnabledWilayas,
        updateDoctor,
        getDoctors,
        updateClinic,
        getClinics,
        updateSplashScreenSettings,
        resetSplashScreenSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
