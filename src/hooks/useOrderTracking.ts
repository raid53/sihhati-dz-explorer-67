import { useState, useEffect } from 'react';

interface OrderStep {
  title: string;
  completed: boolean;
  time?: string;
  location?: string;
}

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
  steps: OrderStep[];
}

const useOrderTracking = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
      const order = JSON.parse(savedOrder);
      setCurrentOrder(order);

      // Start realistic order progression
      if (order.status === 'pending') {
        startOrderProgression(order);
      }
    }
  }, []);

  const startOrderProgression = (order: Order) => {
    // Step 1: Confirm order after 30 seconds
    setTimeout(() => {
      const updatedOrder = {
        ...order,
        status: 'confirmed' as const,
        currentLocation: 'تم تأكيد الطلب',
        steps: order.steps.map((step, index) => 
          index === 1 
            ? { ...step, completed: true, time: new Date().toLocaleTimeString('ar-DZ'), location: 'مركز العمليات' }
            : step
        )
      };
      setCurrentOrder(updatedOrder);
      localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
    }, 30000); // 30 seconds

    // Step 2: Start preparation/arrangement after 2 minutes
    setTimeout(() => {
      const savedOrder = JSON.parse(localStorage.getItem('currentOrder') || '{}');
      const updatedOrder = {
        ...savedOrder,
        status: 'in_progress' as const,
        currentLocation: order.type === 'delivery' ? 'جاري التحضير' : 'تم ترتيب المركبة',
        steps: savedOrder.steps.map((step: OrderStep, index: number) => 
          index === 2 
            ? { ...step, completed: true, time: new Date().toLocaleTimeString('ar-DZ'), location: order.type === 'delivery' ? 'المطبخ' : 'مرآب المركبات' }
            : step
        )
      };
      setCurrentOrder(updatedOrder);
      localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
    }, 120000); // 2 minutes

    // Step 3: On the way after 5 minutes
    setTimeout(() => {
      const savedOrder = JSON.parse(localStorage.getItem('currentOrder') || '{}');
      const updatedOrder = {
        ...savedOrder,
        currentLocation: order.type === 'delivery' ? 'في الطريق إليك' : 'المركبة في الطريق',
        estimatedTime: order.type === 'delivery' ? '15-20 دقيقة' : '10-15 دقيقة',
        steps: savedOrder.steps.map((step: OrderStep, index: number) => 
          index === 3 
            ? { ...step, completed: true, time: new Date().toLocaleTimeString('ar-DZ'), location: 'على بعد 2 كم من موقعك' }
            : step
        )
      };
      setCurrentOrder(updatedOrder);
      localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
    }, 300000); // 5 minutes

    // Step 4: Delivered after 8 minutes
    setTimeout(() => {
      const savedOrder = JSON.parse(localStorage.getItem('currentOrder') || '{}');
      const updatedOrder = {
        ...savedOrder,
        status: 'completed' as const,
        currentLocation: 'تم التسليم بنجاح',
        estimatedTime: 'مكتمل',
        steps: savedOrder.steps.map((step: OrderStep, index: number) => 
          index === 4 
            ? { ...step, completed: true, time: new Date().toLocaleTimeString('ar-DZ'), location: 'في موقعك' }
            : step
        )
      };
      setCurrentOrder(updatedOrder);
      localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
    }, 480000); // 8 minutes
  };

  const clearOrder = () => {
    setCurrentOrder(null);
    localStorage.removeItem('currentOrder');
  };

  return {
    currentOrder,
    clearOrder
  };
};

export default useOrderTracking;