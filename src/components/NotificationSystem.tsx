
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Check, Clock, Heart, Calendar } from 'lucide-react';

interface Notification {
  id: number;
  type: 'appointment' | 'reminder' | 'offer' | 'review';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'appointment',
      title: 'تذكير بموعد',
      message: 'لديك موعد غداً في عيادة النور الطبية في الساعة 2:30 مساءً',
      time: 'منذ ساعتين',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'offer',
      title: 'عرض خاص',
      message: 'خصم 20% على الفحص الشامل في عيادة الشفاء',
      time: 'منذ 4 ساعات',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'review',
      title: 'طلب تقييم',
      message: 'شاركنا تجربتك مع مستشفى الأمل',
      time: 'أمس',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'تذكير بالدواء',
      message: 'حان وقت تناول دواء الضغط',
      time: 'منذ 30 دقيقة',
      read: false,
      priority: 'high'
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'reminder': return <Clock className="w-4 h-4" />;
      case 'offer': return <Heart className="w-4 h-4" />;
      case 'review': return <Check className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    if (type === 'appointment') return 'border-l-blue-500 bg-blue-50';
    if (type === 'offer') return 'border-l-green-500 bg-green-50';
    if (type === 'reminder') return 'border-l-orange-500 bg-orange-50';
    return 'border-l-gray-500 bg-gray-50';
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      {/* زر الإشعارات */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* قائمة الإشعارات */}
      {showNotifications && (
        <Card className="absolute left-0 top-12 w-80 max-h-96 overflow-y-auto z-50 shadow-lg animate-fade-in-scale">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">الإشعارات</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                  <Check className="w-4 h-4" />
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => setShowNotifications(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                لا توجد إشعارات جديدة
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getNotificationColor(notification.type, notification.priority)} 
                      ${!notification.read ? 'font-medium' : 'opacity-75'} 
                      hover:bg-opacity-80 transition-colors cursor-pointer`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <span className="font-semibold text-sm">{notification.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-6 h-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{notification.message}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationSystem;
