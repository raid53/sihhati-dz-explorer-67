import { useState } from 'react';
import { User, Heart, Calendar, Bell, Settings, MapPin, Phone, Mail, Edit3, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/LoadingStates';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Appointment {
  id: number;
  clinicName: string;
  doctor: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  specialty: string;
}

interface FavoriteClinic {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  image: string;
}

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || 'ذكر'
  });

  // Mock data for appointments and favorites - in a real app, these would come from the database
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      clinicName: 'عيادة النور الطبية',
      doctor: 'د. سارة أحمد',
      date: '2024-01-15',
      time: '14:30',
      status: 'upcoming',
      specialty: 'طب الأسنان'
    },
    {
      id: 2,
      clinicName: 'مستشفى الأمل',
      doctor: 'د. محمد علي',
      date: '2024-01-10',
      time: '10:00',
      status: 'completed',
      specialty: 'طب القلب'
    }
  ]);

  const [favorites] = useState<FavoriteClinic[]>([
    {
      id: 1,
      name: 'عيادة النور الطبية',
      specialty: 'طب الأسنان',
      rating: 4.8,
      location: 'الجزائر العاصمة',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'مستشفى الأمل',
      specialty: 'طب القلب',
      rating: 4.9,
      location: 'وهران',
      image: '/placeholder.svg'
    }
  ]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateProfile(userData);
      if (result.success) {
        toast.success(result.message);
        setIsEditing(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث الملف الشخصي');
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'قادم';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'appointments', label: 'المواعيد', icon: Calendar },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-top">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
            <p className="text-gray-600">إدارة ملفك الشخصي ومواعيدك الطبية</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 animate-fade-in-scale">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{user?.name}</h3>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                  </div>
                  
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-right rounded-lg transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card className="animate-fade-in-scale">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>الملف الشخصي</CardTitle>
                    <Button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      disabled={loading}
                      variant={isEditing ? "default" : "outline"}
                      className="gap-2"
                    >
                      {loading ? (
                        <LoadingSpinner size="sm" />
                      ) : isEditing ? (
                        <>
                          <Save className="w-4 h-4" />
                          حفظ
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4" />
                          تعديل
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">الجنس</Label>
                        <Input
                          id="gender"
                          value={userData.gender}
                          onChange={(e) => setUserData({...userData, gender: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">العنوان</Label>
                        <Input
                          id="address"
                          value={userData.address}
                          onChange={(e) => setUserData({...userData, address: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'appointments' && (
                <Card className="animate-fade-in-scale">
                  <CardHeader>
                    <CardTitle>المواعيد الطبية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{appointment.clinicName}</h4>
                              <p className="text-gray-600">د. {appointment.doctor}</p>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                              {getStatusText(appointment.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Bell className="w-4 h-4" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'favorites' && (
                <Card className="animate-fade-in-scale">
                  <CardHeader>
                    <CardTitle>العيادات المفضلة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {favorites.map((clinic) => (
                        <div key={clinic.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">{clinic.name}</h4>
                              <p className="text-gray-600 mb-2">{clinic.specialty}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {clinic.location}
                                </div>
                                <div>⭐ {clinic.rating}</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                              <X className="w-4 h-4" />
                              إزالة
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card className="animate-fade-in-scale">
                  <CardHeader>
                    <CardTitle>الإشعارات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                        <h4 className="font-semibold text-blue-800">تذكير بموعد</h4>
                        <p className="text-blue-700 mt-1">لديك موعد غداً في عيادة النور الطبية في الساعة 2:30 مساءً</p>
                        <span className="text-xs text-blue-600">منذ ساعتين</span>
                      </div>
                      <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                        <h4 className="font-semibold text-green-800">تأكيد الحجز</h4>
                        <p className="text-green-700 mt-1">تم تأكيد حجزك في مستشفى الأمل</p>
                        <span className="text-xs text-green-600">أمس</span>
                      </div>
                      <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                        <h4 className="font-semibold text-yellow-800">عرض خاص</h4>
                        <p className="text-yellow-700 mt-1">خصم 20% على الفحص الشامل في عيادة الشفاء</p>
                        <span className="text-xs text-yellow-600">منذ 3 أيام</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'settings' && (
                <Card className="animate-fade-in-scale">
                  <CardHeader>
                    <CardTitle>الإعدادات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">إعدادات الإشعارات</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>تذكيرات المواعيد</span>
                          <Button variant="outline" size="sm">تفعيل</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>العروض والخصومات</span>
                          <Button variant="outline" size="sm">تفعيل</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>أخبار طبية</span>
                          <Button variant="outline" size="sm">إيقاف</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">الخصوصية والأمان</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          تغيير كلمة المرور
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          إعدادات الخصوصية
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                          حذف الحساب
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
