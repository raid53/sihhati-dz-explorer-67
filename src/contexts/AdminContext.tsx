import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WILAYAS, Wilaya } from '@/data/wilayas';

interface AdminContextType {
  isAdminAuthenticated: boolean;
  isSiteActive: boolean;
  activeWilayas: Wilaya[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toggleSiteStatus: () => void;
  toggleWilaya: (wilayaId: number) => void;
  getEnabledWilayas: () => Wilaya[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAIL = 'soad@admin.com';
const ADMIN_PASSWORD = 'soadgh010203';
const ADMIN_AUTH_KEY = 'carelink_admin_auth';
const SITE_STATUS_KEY = 'carelink_site_status';
const WILAYAS_STATUS_KEY = 'carelink_wilayas_status';

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isSiteActive, setIsSiteActive] = useState(true);
  const [activeWilayas, setActiveWilayas] = useState<Wilaya[]>(WILAYAS);

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

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        isSiteActive,
        activeWilayas,
        login,
        logout,
        toggleSiteStatus,
        toggleWilaya,
        getEnabledWilayas,
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
