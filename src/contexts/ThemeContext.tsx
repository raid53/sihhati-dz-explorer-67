
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // فحص localStorage أولاً، ثم تفضيل النظام
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // فحص تفضيل النظام
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // إزالة فئة السمة السابقة
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // إضافة انتقال سلس مع تأثيرات محسنة
    root.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // إضافة فئة السمة الحالية
    root.classList.add(theme);
    body.classList.add(theme);
    
    // تعيين خصائص meta للسمة
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = theme === 'dark' ? '#0f172a' : '#ffffff';
      document.head.appendChild(meta);
    }
    
    // حفظ في localStorage
    localStorage.setItem('theme', theme);

    // الاستماع لتغييرات سمة النظام
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // فقط إذا لم يكن هناك تفضيل محفوظ
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // تطبيق تأثيرات إضافية للوضع الليلي
    if (theme === 'dark') {
      // تحسين التباين والوضوح
      root.style.setProperty('--shadow-intensity', '0.4');
      root.style.setProperty('--blur-intensity', '20px');
    } else {
      root.style.setProperty('--shadow-intensity', '0.1');
      root.style.setProperty('--blur-intensity', '10px');
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // إضافة تأثير انتقال محسن
      const root = window.document.documentElement;
      const body = window.document.body;
      
      // تطبيق انتقال متطور
      root.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      body.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      // تأثير تلاشي مؤقت
      body.style.filter = 'brightness(0.9)';
      setTimeout(() => {
        body.style.filter = 'brightness(1)';
      }, 250);
      
      console.log(`تم التبديل إلى: ${newTheme === 'dark' ? 'الوضع الليلي' : 'الوضع النهاري'}`);
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
