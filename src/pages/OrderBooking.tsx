import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const OrderBooking = () => {
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get('type') as 'delivery' | 'transport' || 'delivery';
  const serviceName = searchParams.get('service') || 'خدمة';
  const storeId = searchParams.get('storeId') || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              إكمال الطلب
            </h1>
            <p className="text-gray-600">
              املأ البيانات المطلوبة لإكمال طلبك
            </p>
          </div>
          
          <BookingForm 
            serviceType={serviceType}
            serviceName={serviceName}
            storeId={storeId}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderBooking;