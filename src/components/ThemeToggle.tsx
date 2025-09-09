
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-11 h-11 p-0 relative overflow-hidden group border-2 hover:scale-105 transition-all duration-300 bg-background/80 backdrop-blur-sm dark:bg-card/80 dark:border-border/50 hover:border-primary/50 dark:hover:border-primary/70"
      aria-label={theme === 'light' ? 'التبديل إلى الوضع الليلي' : 'التبديل إلى الوضع النهاري'}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun 
          className={`h-5 w-5 transition-all duration-500 ease-in-out ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100 text-amber-500' 
              : 'rotate-90 scale-0 opacity-0 text-amber-400'
          } absolute`} 
        />
        <Moon 
          className={`h-5 w-5 transition-all duration-500 ease-in-out ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100 text-blue-400 dark:text-blue-300' 
              : '-rotate-90 scale-0 opacity-0 text-blue-500'
          } absolute`} 
        />
      </div>
      
      {/* تأثير الخلفية المتحرك */}
      <div className={`absolute inset-0 rounded-md transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100' 
          : 'bg-gradient-to-r from-blue-950/20 via-indigo-950/20 to-purple-950/20 opacity-0 group-hover:opacity-100'
      }`} />
      
      {/* حلقة التأثير */}
      <div className={`absolute inset-0 rounded-md ring-2 ring-transparent transition-all duration-300 ${
        theme === 'light' 
          ? 'group-hover:ring-amber-200/50' 
          : 'group-hover:ring-blue-400/30'
      }`} />
    </Button>
  );
};

export default ThemeToggle;
