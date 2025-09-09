
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Star, TrendingUp, Upload, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  createdAt: string;
}

const ProviderDashboard: React.FC = () => {
  const { user, providerProfile, updateProviderProfile } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    if (providerProfile) {
      const allServices = JSON.parse(localStorage.getItem('services') || '[]');
      const myServices = allServices.filter((s: Service) => s.providerId === providerProfile.id);
      setServices(myServices);
    }
  }, [providerProfile]);

  const handleAddService = () => {
    if (!newService.title || !newService.description || !newService.price) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const service: Service = {
      id: Date.now().toString(),
      providerId: providerProfile!.id,
      title: newService.title,
      description: newService.description,
      price: parseFloat(newService.price),
      category: newService.category,
      image: newService.image,
      createdAt: new Date().toISOString()
    };

    const allServices = JSON.parse(localStorage.getItem('services') || '[]');
    allServices.push(service);
    localStorage.setItem('services', JSON.stringify(allServices));

    setServices(prev => [...prev, service]);
    setNewService({ title: '', description: '', price: '', category: '', image: '' });
    setIsAddingService(false);
    toast.success('تم إضافة الخدمة بنجاح');
  };

  const handleDeleteService = (serviceId: string) => {
    const allServices = JSON.parse(localStorage.getItem('services') || '[]');
    const updatedServices = allServices.filter((s: Service) => s.id !== serviceId);
    localStorage.setItem('services', JSON.stringify(updatedServices));
    
    setServices(prev => prev.filter(s => s.id !== serviceId));
    toast.success('تم حذف الخدمة بنجاح');
  };

  const stats = {
    totalServices: services.length,
    totalAppointments: 12,
    totalRating: 4.8,
    monthlyRevenue: 25000
  };

  if (!user || !providerProfile) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">مرحباً د. {user.name}!</h2>
        <p className="opacity-90">إدارة خدماتك الصحية بسهولة</p>
        <div className="mt-2">
          <Badge variant={providerProfile.isVerified ? "default" : "secondary"} className="bg-white/20">
            {providerProfile.isVerified ? '✓ تم التحقق' : '⏳ في انتظار التحقق'}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الخدمات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المواعيد الشهرية</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التقييم العام</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الإيرادات الشهرية</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>إدارة الخدمات</CardTitle>
          <Button onClick={() => setIsAddingService(true)}>
            إضافة خدمة جديدة
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingService && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">إضافة خدمة جديدة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">عنوان الخدمة</Label>
                  <Input
                    id="title"
                    value={newService.title}
                    onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="مثال: فحص الأسنان الشامل"
                  />
                </div>
                <div>
                  <Label htmlFor="price">السعر (دج)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="2000"
                  />
                </div>
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <Input
                    id="category"
                    value={newService.category}
                    onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="طب الأسنان"
                  />
                </div>
                <div>
                  <Label htmlFor="image">رابط الصورة</Label>
                  <Input
                    id="image"
                    value={newService.image}
                    onChange={(e) => setNewService(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="description">وصف الخدمة</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="اكتب وصفاً مفصلاً عن الخدمة..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddService}>حفظ الخدمة</Button>
                <Button variant="outline" onClick={() => setIsAddingService(false)}>إلغاء</Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="relative">
                <CardContent className="p-4">
                  {service.image && (
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                  <p className="text-green-600 font-bold mb-2">{service.price.toLocaleString()} دج</p>
                  <Badge variant="outline" className="mb-3">{service.category}</Badge>
                  
                  <div className="flex gap-2 absolute top-2 right-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditingService(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteService(service.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {services.length === 0 && !isAddingService && (
            <div className="text-center py-8 text-gray-500">
              لم تقم بإضافة أي خدمات بعد. ابدأ بإضافة خدمتك الأولى!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
