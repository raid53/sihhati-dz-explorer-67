import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, Bell, TrendingUp, Clock, MapPin, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  favoritesClinics: number;
  totalSpent: number;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const [stats] = useState<DashboardStats>({
    totalAppointments: 24,
    upcomingAppointments: 3,
    favoritesClinics: 8,
    totalSpent: 15600
  });

  const quickActions: QuickAction[] = [
    {
      title: 'حجز موعد جديد',
      description: 'ابحث واحجز موعدك القادم',
      icon: Calendar,
      color: 'bg-blue-500',
      action: () => console.log('Book appointment')
    },
    {
      title: 'استشارة طبية',
      description: 'تحدث مع طبيب متخصص',
      icon: Heart,
      color: 'bg-red-500',
      action: () => console.log('Medical consultation')
    },
    {
      title: 'مراجعة النتائج',
      description: 'اطلع على نتائج الفحوصات',
      icon: TrendingUp,
      color: 'bg-green-500',
      action: () => console.log('Review results')
    },
    {
      title: 'الطوارئ',
      description: 'خدمة الطوارئ الطبية',
      icon: Bell,
      color: 'bg-orange-500',
      action: () => console.log('Emergency')
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'appointment',
      title: 'موعد مع د. سارة أحمد',
      subtitle: 'عيادة النور الطبية - طب الأسنان',
      time: 'غداً الساعة 2:30 م',
      status: 'upcoming'
    },
    {
      id: 2,
      type: 'review',
      title: 'تقييم جديد',
      subtitle: 'قيمت مستشفى الأمل بـ 5 نجوم',
      time: 'منذ يومين',
      status: 'completed'
    },
    {
      id: 3,
      type: 'favorite',
      title: 'إضافة للمفضلة',
      subtitle: 'أضفت عيادة الشفاء للمفضلة',
      time: 'منذ أسبوع',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white animate-fade-in-scale">
        <h2 className="text-2xl font-bold mb-2">مرحباً بك، {user?.name || 'المستخدم'}!</h2>
        <p className="opacity-90">لديك {stats.upcomingAppointments} مواعيد قادمة هذا الأسبوع</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-fade-in-scale stagger-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المواعيد</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale stagger-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المواعيد القادمة</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale stagger-3">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">العيادات المفضلة</p>
                <p className="text-2xl font-bold text-gray-900">{stats.favoritesClinics}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale stagger-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الإنفاق</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSpent.toLocaleString()} دج</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-3 hover:shadow-md transition-all duration-200"
                  onClick={action.action}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">{action.title}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'upcoming' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.subtitle}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
