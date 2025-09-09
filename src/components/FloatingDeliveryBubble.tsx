import { Truck, Heart, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FloatingDeliveryBubble = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);

  useEffect(() => {
    const checkActiveOrder = () => {
      const activeOrder = localStorage.getItem('currentOrder');
      setHasActiveOrder(!!activeOrder);
    };

    checkActiveOrder();
    // Check every few seconds for order updates
    const interval = setInterval(checkActiveOrder, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Link 
      to={hasActiveOrder ? "/order-tracking" : "/delivery-search"}
      className="fixed bottom-6 left-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Tooltip */}
        <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card border rounded-lg px-3 py-2 shadow-lg transition-all duration-300 whitespace-nowrap ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <p className="text-sm font-medium text-foreground">
            {hasActiveOrder ? "تتبع طلبيتك" : "خدمات التوصيل والنقل للمسنين"}
          </p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
        </div>

        {/* Main Bubble */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
          hasActiveOrder 
            ? 'bg-gradient-to-br from-green-500 to-blue-500 animate-pulse' 
            : 'bg-gradient-to-br from-orange-500 to-red-500 animate-pulse'
        }`}>
          <div className="relative">
            {hasActiveOrder ? (
              <>
                <Bell className="w-7 h-7 text-white" />
                <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1 -right-1 animate-bounce"></div>
              </>
            ) : (
              <>
                <Truck className="w-7 h-7 text-white" />
                <Heart className="w-4 h-4 text-white absolute -top-1 -right-1 animate-bounce" />
              </>
            )}
          </div>
        </div>

        {/* Ripple Effect */}
        <div className={`absolute inset-0 w-16 h-16 rounded-full animate-ping ${
          hasActiveOrder ? 'bg-green-400/30' : 'bg-orange-400/30'
        }`}></div>
      </div>
    </Link>
  );
};

export default FloatingDeliveryBubble;