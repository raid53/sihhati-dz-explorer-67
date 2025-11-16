import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, LogOut, Globe, MapPin, CheckCircle2, XCircle, Users, Image, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DoctorManagement from '@/components/DoctorManagement';
import ClinicsManagement from '@/components/ClinicsManagement';
import SplashScreenManagement from '@/components/SplashScreenManagement';

const AdminDashboard = () => {
  const { isAdmin, isSiteActive, activeWilayas, logout, toggleSiteStatus, toggleWilaya } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/auth');
    }
  }, [isAdmin, navigate]);

  const handleLogout = async () => {
    await logout();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح",
    });
    navigate('/auth');
  };

  const handleToggleSite = () => {
    toggleSiteStatus();
    toast({
      title: isSiteActive ? "تم إغلاق الموقع" : "تم تفعيل الموقع",
      description: isSiteActive ? "الموقع الآن في وضع الصيانة" : "الموقع الآن نشط ومتاح للجميع",
    });
  };

  const handleToggleWilaya = (wilayaId: number, wilayaName: string, currentStatus: boolean) => {
    toggleWilaya(wilayaId);
    toast({
      title: currentStatus ? `تم تعطيل ${wilayaName}` : `تم تفعيل ${wilayaName}`,
      description: currentStatus ? "الولاية الآن غير متاحة في الموقع" : "الولاية الآن متاحة في الموقع",
    });
  };

  const enabledCount = activeWilayas.filter(w => w.enabled).length;

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">لوحة التحكم الإدارية</h1>
              <p className="text-sm text-muted-foreground" dir="ltr">Admin Control Panel</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="site">
              <Globe className="w-4 h-4 ml-2" />
              حالة الموقع
            </TabsTrigger>
            <TabsTrigger value="wilayas">
              <MapPin className="w-4 h-4 ml-2" />
              الولايات
            </TabsTrigger>
            <TabsTrigger value="doctors">
              <Users className="w-4 h-4 ml-2" />
              الأطباء
            </TabsTrigger>
            <TabsTrigger value="clinics">
              <Building2 className="w-4 h-4 ml-2" />
              العيادات
            </TabsTrigger>
            <TabsTrigger value="splash">
              <Image className="w-4 h-4 ml-2" />
              الواجهة الترحيبية
            </TabsTrigger>
          </TabsList>

          {/* Site Status Tab */}
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <CardTitle>حالة الموقع / Site Status</CardTitle>
                </div>
                <CardDescription>التحكم في تفعيل وإغلاق الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="site-status" className="text-base font-medium">
                      {isSiteActive ? "الموقع نشط" : "الموقع مغلق"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {isSiteActive ? "الموقع متاح للزوار حاليًا" : "يتم عرض صفحة الصيانة للزوار"}
                    </p>
                  </div>
                  <Switch
                    id="site-status"
                    checked={isSiteActive}
                    onCheckedChange={handleToggleSite}
                  />
                </div>
                
                <div className={`flex items-center gap-2 p-3 rounded-lg ${isSiteActive ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
                  {isSiteActive ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">الموقع يعمل بشكل طبيعي</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">الموقع في وضع الصيانة</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wilayas Tab */}
          <TabsContent value="wilayas">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <CardTitle>إدارة الولايات / Wilayas Management</CardTitle>
                </div>
                <CardDescription>
                  التحكم في الولايات المدعومة ({enabledCount} من 58 مفعلة)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto p-1">
                  {activeWilayas.map((wilaya) => (
                    <div
                      key={wilaya.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        wilaya.enabled
                          ? 'bg-card border-border hover:bg-accent/50'
                          : 'bg-muted/50 border-muted opacity-60'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{wilaya.nameAr}</p>
                        <p className="text-xs text-muted-foreground truncate" dir="ltr">
                          {wilaya.nameEn}
                        </p>
                      </div>
                      <Switch
                        checked={wilaya.enabled}
                        onCheckedChange={() => handleToggleWilaya(wilaya.id, wilaya.nameAr, wilaya.enabled)}
                        className="ml-3"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors">
            <DoctorManagement />
          </TabsContent>

          {/* Clinics Tab */}
          <TabsContent value="clinics">
            <ClinicsManagement />
          </TabsContent>

          {/* Splash Screen Tab */}
          <TabsContent value="splash">
            <SplashScreenManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
