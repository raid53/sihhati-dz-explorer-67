import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WILAYAS, Wilaya } from '@/data/wilayas';
import { Doctor } from '@/data/doctors';
import { Clinic } from '@/data/clinics';
import carelinkLogo from '@/assets/carelink-logo.png';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { initializeDatabase } from '@/lib/initDatabase';
import { User, Session } from '@supabase/supabase-js';

export interface SplashScreenSettings {
  enabled?: boolean;
  duration?: number;
  logoUrl: string;
}

interface AdminContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isSiteActive: boolean;
  activeWilayas: Wilaya[];
  doctors: Doctor[];
  clinics: Clinic[];
  splashScreenSettings: SplashScreenSettings;
  logout: () => Promise<void>;
  toggleSiteStatus: () => Promise<void>;
  toggleWilaya: (wilayaId: number) => Promise<void>;
  getEnabledWilayas: () => Wilaya[];
  updateDoctor: (id: number, updatedData: Partial<Doctor>) => Promise<void>;
  getDoctors: () => Doctor[];
  updateClinic: (id: number, updatedData: Partial<Clinic>) => Promise<void>;
  getClinics: () => Clinic[];
  updateSplashScreenSettings: (settings: Partial<SplashScreenSettings>) => Promise<void>;
  resetSplashScreenSettings: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const DEFAULT_SPLASH_SETTINGS: SplashScreenSettings = {
  enabled: true,
  duration: 3000,
  logoUrl: carelinkLogo,
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSiteActive, setIsSiteActive] = useState(true);
  const [activeWilayas, setActiveWilayas] = useState<Wilaya[]>(WILAYAS);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [splashScreenSettings, setSplashScreenSettings] = useState<SplashScreenSettings>(DEFAULT_SPLASH_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[AdminContext] Initializing...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin role after setting session
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    // Initialize database and load data
    const initAndLoad = async () => {
      setIsLoading(true);
      const result = await initializeDatabase();
      if (result.success) {
        await loadFromDatabase();
      } else {
        console.error('Failed to initialize database:', result.error);
      }
      setIsLoading(false);
    };

    initAndLoad();

    // Setup polling as fallback (every 10 seconds)
    const pollingInterval = setInterval(() => {
      console.log('[AdminContext] Polling for updates...');
      loadFromDatabase();
    }, 10000);

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
        (payload) => {
          console.log('[Realtime] Admin settings changed:', payload);
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
        (payload) => {
          console.log('[Realtime] Doctors changed:', payload.eventType);
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
        (payload) => {
          console.log('[Realtime] Clinics changed:', payload.eventType);
          loadClinicsFromDB();
        }
      )
      .subscribe((status) => {
        console.log('[Realtime] Subscription status:', status);
      });

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
      clearInterval(pollingInterval);
    };
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    }
  };

  const loadFromDatabase = async () => {
    console.log('[AdminContext] Loading all data from database...');
    try {
      await Promise.all([
        loadSettingsFromDB(),
        loadDoctorsFromDB(),
        loadClinicsFromDB()
      ]);
      console.log('[AdminContext] All data loaded successfully');
    } catch (error) {
      console.error('[AdminContext] Error loading data:', error);
    }
  };

  const loadSettingsFromDB = async () => {
    try {
      console.log('[AdminContext] Loading settings from DB...');
      
      // Load site status
      const { data: siteData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'site_active')
        .maybeSingle();
      
      if (siteData && siteData.setting_value) {
        const value = siteData.setting_value as any;
        const activeStatus = typeof value === 'boolean' ? value : value.active;
        console.log('[AdminContext] Site status from DB:', activeStatus);
        setIsSiteActive(activeStatus);
      } else {
        console.log('[AdminContext] No site status found in DB, using default (true)');
        setIsSiteActive(true);
      }

      // Load wilayas status
      const { data: wilayasData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'wilayas_status')
        .maybeSingle();
      
      if (wilayasData && wilayasData.setting_value) {
        const wilayasObj = (wilayasData.setting_value as any).wilayas;
        if (wilayasObj) {
          console.log('[AdminContext] Wilayas from DB:', Object.keys(wilayasObj).length);
          const updatedWilayas = WILAYAS.map(w => ({
            ...w,
            enabled: wilayasObj[w.nameAr] !== undefined ? wilayasObj[w.nameAr] : w.enabled
          }));
          setActiveWilayas(updatedWilayas);
        }
      }

      // Load splash screen settings
      const { data: splashData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'splash_screen')
        .maybeSingle();
      
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
        console.log('[AdminContext] Loaded doctors from DB:', data.length);
        const mappedDoctors = data.map(d => ({
          id: d.id,
          name: d.name,
          specialty: d.specialty,
          image: d.image,
          rating: d.rating,
          reviews: d.reviews,
          experience: d.experience,
          location: d.location,
          price: d.price,
          nextAvailable: d.next_available
        })) as Doctor[];
        setDoctors(mappedDoctors);
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
        console.log('[AdminContext] Loaded clinics from DB:', data.length);
        const mappedClinics = data.map(c => ({
          id: c.id,
          name: c.name,
          type: c.type,
          specialty: c.specialty,
          image: c.image,
          rating: c.rating,
          reviews: c.reviews,
          location: c.location,
          phone: c.phone,
          services: c.services,
          distance: c.distance,
          nextAvailable: c.next_available,
          price: c.price,
          verified: c.verified,
          doctors: c.doctors,
          address: c.address,
          hours: c.hours,
          description: c.description
        })) as Clinic[];
        setClinics(mappedClinics);
      }
    } catch (error) {
      console.error('Error loading clinics:', error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      toast.success('تم تسجيل الخروج بنجاح');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  const toggleSiteStatus = async () => {
    if (!isAdmin) {
      toast.error('غير مصرح لك بإجراء هذا التعديل');
      return;
    }

    const newStatus = !isSiteActive;
    console.log('[AdminContext] Toggling site status to:', newStatus);
    setIsSiteActive(newStatus);
    
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ 
          setting_key: 'site_active',
          setting_value: newStatus,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;
      console.log('[AdminContext] Site status saved to DB:', newStatus);
      toast.success(`تم ${newStatus ? 'تفعيل' : 'إيقاف'} الموقع بنجاح`);
    } catch (error) {
      console.error('Error updating site status:', error);
      toast.error('فشل تحديث حالة الموقع');
      setIsSiteActive(!newStatus); // Revert on error
    }
  };

  const toggleWilaya = async (wilayaId: number) => {
    if (!isAdmin) {
      toast.error('غير مصرح لك بإجراء هذا التعديل');
      return;
    }

    const updatedWilayas = activeWilayas.map(w =>
      w.id === wilayaId ? { ...w, enabled: !w.enabled } : w
    );
    setActiveWilayas(updatedWilayas);
    
    try {
      const wilayasObject = updatedWilayas.reduce((acc, wilaya) => {
        acc[wilaya.nameAr] = wilaya.enabled;
        return acc;
      }, {} as Record<string, boolean>);

      const { error } = await supabase
        .from('admin_settings')
        .upsert({ 
          setting_key: 'wilayas_status',
          setting_value: { wilayas: wilayasObject },
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;
      toast.success('تم تحديث الولاية بنجاح');
    } catch (error) {
      console.error('Error updating wilaya:', error);
      toast.error('فشل تحديث الولاية');
    }
  };

  const getEnabledWilayas = (): Wilaya[] => {
    return activeWilayas.filter(w => w.enabled);
  };

  const updateDoctor = async (id: number, updatedData: Partial<Doctor>) => {
    if (!isAdmin) {
      toast.error('غير مصرح لك بإجراء هذا التعديل');
      return;
    }

    console.log('[AdminContext] Updating doctor:', id, updatedData);

    const updatedDoctors = doctors.map(doctor =>
      doctor.id === id ? { ...doctor, ...updatedData } : doctor
    );
    setDoctors(updatedDoctors);
    
    try {
      const dbData: any = {};
      if (updatedData.name !== undefined) dbData.name = updatedData.name;
      if (updatedData.specialty !== undefined) dbData.specialty = updatedData.specialty;
      if (updatedData.experience !== undefined) dbData.experience = updatedData.experience;
      if (updatedData.location !== undefined) dbData.location = updatedData.location;
      if (updatedData.price !== undefined) dbData.price = updatedData.price;
      if (updatedData.nextAvailable !== undefined) dbData.next_available = updatedData.nextAvailable;

      console.log('[AdminContext] Saving doctor to DB:', dbData);

      const { data, error } = await supabase
        .from('doctors')
        .update(dbData)
        .eq('id', id)
        .select();

      if (error) throw error;
      console.log('[AdminContext] Doctor saved successfully:', data);
      toast.success('تم تحديث بيانات الطبيب بنجاح');
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error('فشل تحديث بيانات الطبيب');
    }
  };

  const getDoctors = (): Doctor[] => {
    return doctors;
  };

  const updateClinic = async (id: number, updatedData: Partial<Clinic>) => {
    if (!isAdmin) {
      toast.error('غير مصرح لك بإجراء هذا التعديل');
      return;
    }

    console.log('[AdminContext] Updating clinic:', id, updatedData);

    const updatedClinics = clinics.map(clinic =>
      clinic.id === id ? { ...clinic, ...updatedData } : clinic
    );
    setClinics(updatedClinics);
    
    try {
      const dbData: any = {};
      if (updatedData.name !== undefined) dbData.name = updatedData.name;
      if (updatedData.type !== undefined) dbData.type = updatedData.type;
      if (updatedData.specialty !== undefined) dbData.specialty = updatedData.specialty;
      if (updatedData.location !== undefined) dbData.location = updatedData.location;
      if (updatedData.phone !== undefined) dbData.phone = updatedData.phone;
      if (updatedData.services !== undefined) dbData.services = updatedData.services;
      if (updatedData.nextAvailable !== undefined) dbData.next_available = updatedData.nextAvailable;

      console.log('[AdminContext] Saving clinic to DB:', dbData);

      const { data, error } = await supabase
        .from('clinics')
        .update(dbData)
        .eq('id', id)
        .select();

      if (error) throw error;
      console.log('[AdminContext] Clinic saved successfully:', data);
      toast.success('تم تحديث بيانات العيادة بنجاح');
    } catch (error) {
      console.error('Error updating clinic:', error);
      toast.error('فشل تحديث بيانات العيادة');
    }
  };

  const getClinics = (): Clinic[] => {
    return clinics;
  };

  const updateSplashScreenSettings = async (settings: Partial<SplashScreenSettings>) => {
    if (!isAdmin) {
      toast.error('غير مصرح لك بإجراء هذا التعديل');
      return;
    }

    const updatedSettings = { ...splashScreenSettings, ...settings };
    setSplashScreenSettings(updatedSettings);
    
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ 
          setting_key: 'splash_screen',
          setting_value: updatedSettings,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;
      toast.success('تم تحديث إعدادات الواجهة الترحيبية بنجاح');
    } catch (error) {
      console.error('Error updating splash screen:', error);
      toast.error('فشل تحديث إعدادات الواجهة الترحيبية');
    }
  };

  const resetSplashScreenSettings = async () => {
    if (!isAdmin) {
      toast.error('غير مصرح لك بإجراء هذا التعديل');
      return;
    }

    setSplashScreenSettings(DEFAULT_SPLASH_SETTINGS);
    
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ 
          setting_key: 'splash_screen',
          setting_value: DEFAULT_SPLASH_SETTINGS,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;
      toast.success('تم إعادة تعيين الواجهة الترحيبية بنجاح');
    } catch (error) {
      console.error('Error resetting splash screen:', error);
      toast.error('فشل إعادة تعيين الواجهة الترحيبية');
    }
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isSiteActive,
        activeWilayas,
        doctors,
        clinics,
        splashScreenSettings,
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
