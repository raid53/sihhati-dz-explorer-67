import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WILAYAS, Wilaya } from '@/data/wilayas';
import { defaultDoctors, Doctor } from '@/data/doctors';
import { defaultClinics, Clinic } from '@/data/clinics';
import carelinkLogo from '@/assets/carelink-logo.png';

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
    // Load admin auth status
    const authStatus = localStorage.getItem(ADMIN_AUTH_KEY);
    setIsAdminAuthenticated(authStatus === 'true');

    // Load site status
    const siteStatus = localStorage.getItem(SITE_STATUS_KEY);
    setIsSiteActive(siteStatus !== 'false');

    // Load wilayas status
    const wilayasStatus = localStorage.getItem(WILAYAS_STATUS_KEY);
    if (wilayasStatus) {
      try {
        const savedWilayas = JSON.parse(wilayasStatus);
        setActiveWilayas(savedWilayas);
      } catch {
        setActiveWilayas(WILAYAS);
      }
    }

    // Load doctors
    const doctorsData = localStorage.getItem(DOCTORS_KEY);
    if (doctorsData) {
      try {
        const savedDoctors = JSON.parse(doctorsData);
        setDoctors(savedDoctors);
      } catch {
        setDoctors(defaultDoctors);
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(defaultDoctors));
      }
    } else {
      localStorage.setItem(DOCTORS_KEY, JSON.stringify(defaultDoctors));
    }

    // Load clinics
    const clinicsData = localStorage.getItem(CLINICS_KEY);
    if (clinicsData) {
      try {
        const savedClinics = JSON.parse(clinicsData);
        setClinics(savedClinics);
      } catch {
        setClinics(defaultClinics);
        localStorage.setItem(CLINICS_KEY, JSON.stringify(defaultClinics));
      }
    } else {
      localStorage.setItem(CLINICS_KEY, JSON.stringify(defaultClinics));
    }

    // Load splash screen settings
    const splashData = localStorage.getItem(SPLASH_SCREEN_KEY);
    if (splashData) {
      try {
        const savedSettings = JSON.parse(splashData);
        setSplashScreenSettings(savedSettings);
      } catch {
        setSplashScreenSettings(DEFAULT_SPLASH_SETTINGS);
      }
    }
  }, []);

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

  const toggleSiteStatus = () => {
    const newStatus = !isSiteActive;
    setIsSiteActive(newStatus);
    localStorage.setItem(SITE_STATUS_KEY, String(newStatus));
  };

  const toggleWilaya = (wilayaId: number) => {
    const updatedWilayas = activeWilayas.map(w =>
      w.id === wilayaId ? { ...w, enabled: !w.enabled } : w
    );
    setActiveWilayas(updatedWilayas);
    localStorage.setItem(WILAYAS_STATUS_KEY, JSON.stringify(updatedWilayas));
  };

  const getEnabledWilayas = (): Wilaya[] => {
    return activeWilayas.filter(w => w.enabled);
  };

  const updateDoctor = (id: number, updatedData: Partial<Doctor>) => {
    const updatedDoctors = doctors.map(doctor =>
      doctor.id === id ? { ...doctor, ...updatedData } : doctor
    );
    setDoctors(updatedDoctors);
    localStorage.setItem(DOCTORS_KEY, JSON.stringify(updatedDoctors));
  };

  const getDoctors = (): Doctor[] => {
    return doctors;
  };

  const updateClinic = (id: number, updatedData: Partial<Clinic>) => {
    const updatedClinics = clinics.map(clinic =>
      clinic.id === id ? { ...clinic, ...updatedData } : clinic
    );
    setClinics(updatedClinics);
    localStorage.setItem(CLINICS_KEY, JSON.stringify(updatedClinics));
  };

  const getClinics = (): Clinic[] => {
    return clinics;
  };

  const updateSplashScreenSettings = (settings: Partial<SplashScreenSettings>) => {
    const updatedSettings = { ...splashScreenSettings, ...settings };
    setSplashScreenSettings(updatedSettings);
    localStorage.setItem(SPLASH_SCREEN_KEY, JSON.stringify(updatedSettings));
  };

  const resetSplashScreenSettings = () => {
    setSplashScreenSettings(DEFAULT_SPLASH_SETTINGS);
    localStorage.setItem(SPLASH_SCREEN_KEY, JSON.stringify(DEFAULT_SPLASH_SETTINGS));
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
