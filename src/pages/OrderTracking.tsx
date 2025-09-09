import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderTracker from '@/components/OrderTracker';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderTracking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/delivery-search">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                تتبع الطلبية
              </h1>
              <p className="text-gray-600">
                تابع حالة طلبك خطوة بخطوة
              </p>
            </div>
          </div>
          
          <OrderTracker />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;