import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Package, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderTrackingButton = () => {
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkActiveOrders = () => {
      const currentOrder = localStorage.getItem('currentOrder');
      const completedOrders = localStorage.getItem('completedOrders');
      
      if (currentOrder) {
        setHasActiveOrder(true);
        setOrderCount(1);
      } else {
        setHasActiveOrder(false);
        // Check for completed orders to show count
        if (completedOrders) {
          try {
            const orders = JSON.parse(completedOrders);
            setOrderCount(orders.length);
          } catch (error) {
            console.error('Error parsing completed orders:', error);
            setOrderCount(0);
          }
        } else {
          setOrderCount(0);
        }
      }
    };

    // Check immediately
    checkActiveOrders();

    // Listen for storage changes (when orders are created/updated)
    window.addEventListener('storage', checkActiveOrders);
    
    // Also check periodically in case of same-tab updates
    const interval = setInterval(checkActiveOrders, 2000);

    return () => {
      window.removeEventListener('storage', checkActiveOrders);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    if (hasActiveOrder) {
      navigate('/order-tracking');
    } else {
      // Navigate to orders history or show empty state
      navigate('/profile'); // Assuming profile has orders section
    }
  };

  if (!hasActiveOrder && orderCount === 0) {
    return null; // Don't show button if no orders
  }

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        variant={hasActiveOrder ? "default" : "outline"}
        className={`
          flex items-center gap-2 relative
          ${hasActiveOrder 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white animate-pulse' 
            : ''
          }
        `}
      >
        {hasActiveOrder ? (
          <>
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">تتبع الطلب</span>
          </>
        ) : (
          <>
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">طلباتي</span>
          </>
        )}
      </Button>
      
      {orderCount > 0 && (
        <Badge 
          className={`
            absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs
            ${hasActiveOrder 
              ? 'bg-red-500 text-white animate-bounce' 
              : 'bg-blue-500 text-white'
            }
          `}
        >
          {orderCount}
        </Badge>
      )}
      
      {hasActiveOrder && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingButton;