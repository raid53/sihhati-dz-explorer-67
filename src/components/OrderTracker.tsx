import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Package, Truck, CheckCircle, Phone, Star, MessageCircle } from 'lucide-react';
import useOrderTracking from '@/hooks/useOrderTracking';

interface Order {
  id: string;
  type: 'delivery' | 'transport';
  service: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed';
  createdAt: string;
  estimatedTime: string;
  currentLocation: string;
  address: string;
  amount: number;
  paymentMethod: string;
  steps: {
    title: string;
    completed: boolean;
    time?: string;
    location?: string;
  }[];
}

const OrderTracker = () => {
  const { currentOrder, clearOrder } = useOrderTracking();

  if (!currentOrder) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">لا توجد طلبات حالية</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في انتظار التأكيد';
      case 'confirmed': return 'تم التأكيد';
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'تم الانتهاء';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Status Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                {currentOrder.type === 'delivery' ? (
                  <Package className="h-5 w-5 text-blue-600" />
                ) : (
                  <Truck className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">طلبية #{currentOrder.id}</h3>
                <p className="text-sm text-gray-600">{currentOrder.service}</p>
              </div>
            </div>
            <Badge className={getStatusColor(currentOrder.status)}>
              {getStatusText(currentOrder.status)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>الوقت المتوقع: {currentOrder.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>الموقع الحالي: {currentOrder.currentLocation}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Progress */}
      <Card>
        <CardHeader>
          <CardTitle>تتبع الطلبية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentOrder.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <span className="text-xs text-white">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${step.completed ? 'text-green-700' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                  {step.time && (
                    <p className="text-sm text-gray-500">الوقت: {step.time}</p>
                  )}
                  {step.location && (
                    <p className="text-sm text-gray-500">الموقع: {step.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل الطلبية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">العنوان:</span>
            <span className="font-medium">{currentOrder.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">المبلغ:</span>
            <span className="font-medium">{currentOrder.amount} دج</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">طريقة الدفع:</span>
            <span className="font-medium">{currentOrder.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">تاريخ الطلب:</span>
            <span className="font-medium">{currentOrder.createdAt}</span>
          </div>
        </CardContent>
      </Card>

      {/* Live Map Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>تتبع مباشر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-b from-blue-50 to-green-50 rounded-lg p-6 text-center">
            <div className="w-full h-32 bg-muted rounded-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
                الخريطة التفاعلية
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              متوقع الوصول: {currentOrder.estimatedTime}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Customer Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              مراسلة المندوب
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              اتصال مباشر
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">تحتاج مساعدة؟</p>
              <p className="text-sm text-muted-foreground">فريق الدعم متاح 24/7</p>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              1800-SEHA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Completion Actions */}
      {currentOrder.status === 'completed' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 space-y-3">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-800 mb-1">تم تسليم طلبك بنجاح!</p>
              <p className="text-sm text-green-600">نتمنى أن تكون راضياً عن خدمتنا</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                تقييم الخدمة
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearOrder}
                className="text-muted-foreground"
              >
                إنهاء المتابعة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderTracker;