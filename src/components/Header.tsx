
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MapPin, Clock, MessageSquare, Brain, User, LogOut, Info, Handshake, Pill, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProviderRegistrationModal from './ProviderRegistrationModal';
import ChatSystem from './ChatSystem';
import ThemeToggle from './ThemeToggle';
import OrderTrackingButton from './OrderTrackingButton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChatOpen = () => {
    setIsChatOpen(true);
    setIsChatMinimized(false);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setIsChatMinimized(false);
  };

  const handleChatMinimize = () => {
    setIsChatMinimized(true);
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (user?.userType === 'provider') {
      navigate('/provider-dashboard');
    } else {
      navigate('/profile');
    }
  };

  const toggleContactInfo = () => {
    setIsContactInfoOpen(!isContactInfoOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <header className="bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center text-primary font-bold text-xl group transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:rotate-3">
              <Handshake className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">رابط الرعاية</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="relative text-foreground hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary/5 group">
            <span className="relative z-10">الرئيسية</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-lg"></div>
          </Link>
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative text-foreground hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary/5 group flex items-center gap-1">
                <span className="relative z-10">الخدمات</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-lg"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border border-border/50 bg-background/95 backdrop-blur-sm">
              <DropdownMenuItem onClick={() => navigate('/services')} className="p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">جميع الخدمات</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/clinics')} className="p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">العيادات</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/hospitals')} className="p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">المستشفيات</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/doctors')} className="p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">الأطباء</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/pharmacy')} className="p-3 rounded-xl hover:bg-secondary/5 transition-all duration-300 group cursor-pointer">
                <Pill className="mr-3 h-5 w-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">الصيدليات</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/telemedicine')} className="p-3 rounded-xl hover:bg-accent/20 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">الطب عن بُعد</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/home-care')} className="p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">التمريض المنزلي</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/lab-tests')} className="p-3 rounded-xl hover:bg-secondary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">التحاليل الطبية</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/medical-records')} className="p-3 rounded-xl hover:bg-accent/20 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">السجلات الطبية</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/ai-services" className="relative text-foreground hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary/5 group flex items-center gap-2">
            <Brain className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
            <span className="relative z-10">الذكاء الاصطناعي</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-lg"></div>
          </Link>
          
          {/* More Menu for Additional Items */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative text-foreground hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary/5 group flex items-center gap-1">
                <MoreHorizontal className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">المزيد</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-lg"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 shadow-xl border border-border/50 bg-background/95 backdrop-blur-sm">
              <DropdownMenuItem onClick={() => navigate('/emergency')} className="p-3 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">الطوارئ</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/support')} className="p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">الدعم الفني</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/about')} className="p-3 rounded-xl hover:bg-secondary/5 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">من نحن</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/contact')} className="p-3 rounded-xl hover:bg-accent/20 transition-all duration-300 group cursor-pointer">
                <span className="font-medium">اتصل بنا</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Auth Section */}
        <div className="hidden lg:flex items-center gap-3">
          <OrderTrackingButton />
          
          <div className="relative">
            <ThemeToggle />
          </div>
          
          {/* Contact Info Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <Info className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">تواصل معنا</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2 shadow-xl border border-border/50 bg-background/95 backdrop-blur-sm">
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">اتصل بنا</p>
                    <a href="tel:+213555123456" className="text-sm text-muted-foreground hover:text-primary transition-colors">+213 555 123 456</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/5 transition-all duration-300 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">موقعنا</p>
                    <p className="text-sm text-muted-foreground">الجزائر, العاصمة</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-all duration-300 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">ساعات العمل</p>
                    <p className="text-sm text-muted-foreground">الأحد - الخميس: 9:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Chat Button in Header */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">المحادثة</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border border-border/50 bg-background/95 backdrop-blur-sm">
              <DropdownMenuItem 
                onClick={() => navigate('/support')}
                className="p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
              >
                <MessageSquare className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">الدعم الفني</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate('/ai-services')}
                className="p-3 rounded-xl hover:bg-secondary/5 transition-all duration-300 group cursor-pointer"
              >
                <Brain className="mr-3 h-5 w-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">المساعد الذكي</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate('/live-chat')}
                className="p-3 rounded-xl hover:bg-accent/20 transition-all duration-300 group cursor-pointer"
              >
                <MessageSquare className="mr-3 h-5 w-5 text-accent-foreground group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">المحادثة المباشرة</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group px-4 py-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{user?.name}</div>
                    {user?.userType === 'provider' && (
                      <div className="text-xs text-secondary font-medium">مقدم خدمة</div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 shadow-xl border border-border/50 bg-background/95 backdrop-blur-sm">
                <DropdownMenuItem 
                  onClick={handleProfileClick} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                >
                  <User className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{user?.userType === 'provider' ? 'لوحة التحكم' : 'الملف الشخصي'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 group cursor-pointer"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleAuthClick}
                className="hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 font-medium"
              >
                تسجيل الدخول
              </Button>
              <Button 
                onClick={handleAuthClick}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 font-medium hover:scale-105"
              >
                إنشاء حساب
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsProviderModalOpen(true)}
                className="hover:bg-secondary/80 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25 font-medium hover:scale-105"
              >
                انضم كمقدم خدمة
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg hover:bg-primary/5 transition-all duration-300 group"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border/40 shadow-lg animate-fade-in">
            <nav className="flex flex-col items-center space-y-2 p-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors">
              جميع الخدمات
            </Link>
            <Link to="/clinics" className="text-foreground hover:text-primary transition-colors">
              العيادات
            </Link>
            <Link to="/doctors" className="text-foreground hover:text-primary transition-colors">
              الأطباء
            </Link>
            <Link to="/hospitals" className="text-foreground hover:text-primary transition-colors">
              المستشفيات
            </Link>
            <Link to="/emergency" className="text-foreground hover:text-red-500 transition-colors font-semibold">
              الطوارئ
            </Link>
            <Link to="/ai-services" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Brain className="w-4 h-4" />
              الذكاء الاصطناعي
            </Link>
            <Link to="/pharmacy" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Pill className="w-4 h-4" />
              الصيدليات
            </Link>
            <Link to="/support" className="text-foreground hover:text-primary transition-colors">
              الدعم الفني
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              من نحن
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              اتصل بنا
            </Link>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-border w-full flex flex-col items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleContactInfo} className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                معلومات التواصل
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleChatOpen} className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                المحادثة
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleProfileClick} className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user?.userType === 'provider' ? 'لوحة التحكم' : user?.name}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleAuthClick}>
                    تسجيل الدخول
                  </Button>
                  <Button size="sm" onClick={handleAuthClick}>
                    إنشاء حساب
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setIsProviderModalOpen(true)}>
                    انضم كمقدم خدمة
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Modals */}
      <ProviderRegistrationModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
      />

      {/* Chat System */}
      <ChatSystem
        isOpen={isChatOpen && !isChatMinimized}
        onClose={handleChatClose}
        onMinimize={handleChatMinimize}
        chatType="support"
      />

      {/* Mobile Contact Info Panel */}
      {isContactInfoOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsContactInfoOpen(false)}>
          <div className="bg-background rounded-t-2xl p-6 absolute bottom-0 left-0 right-0" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">معلومات التواصل</h3>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">اتصل بنا</p>
                  <a href="tel:+213555123456" className="text-muted-foreground">+213 555 123 456</a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">موقعنا</p>
                  <p className="text-muted-foreground">الجزائر, العاصمة</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium">ساعات العمل</p>
                  <p className="text-muted-foreground">الأحد - الخميس: 9:00 - 17:00</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                onClick={() => {
                  handleChatOpen();
                  setIsContactInfoOpen(false);
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                بدء المحادثة
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
