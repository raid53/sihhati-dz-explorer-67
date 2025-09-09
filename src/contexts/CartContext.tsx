import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  quantity: number;
  inStock?: boolean;
  description?: string;
}

interface UserInfo {
  fullName: string;
  phone: string;
  address: string;
  wilaya: string;
  baladiya: string;
  notes: string;
}

interface PaymentInfo {
  paymentMethod: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  goldenCardId?: string;
  saveCard?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  userInfo: UserInfo | null;
  paymentInfo: PaymentInfo | null;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartQuantity: (productId: number) => number;
  saveUserInfo: (info: UserInfo) => void;
  savePaymentInfo: (info: PaymentInfo) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    const savedUserInfo = localStorage.getItem('user-info');
    const savedPaymentInfo = localStorage.getItem('payment-info');

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }

    if (savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo));
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }

    if (savedPaymentInfo) {
      try {
        setPaymentInfo(JSON.parse(savedPaymentInfo));
      } catch (error) {
        console.error('Error parsing payment info:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shopping-cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartQuantity = (productId: number) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const saveUserInfo = (info: UserInfo) => {
    setUserInfo(info);
    localStorage.setItem('user-info', JSON.stringify(info));
  };

  const savePaymentInfo = (info: PaymentInfo) => {
    if (info.saveCard) {
      setPaymentInfo(info);
      localStorage.setItem('payment-info', JSON.stringify(info));
    } else {
      // Clear saved payment info if user doesn't want to save
      setPaymentInfo(null);
      localStorage.removeItem('payment-info');
    }
  };

  const value: CartContextType = {
    cart,
    userInfo,
    paymentInfo,
    addToCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartQuantity,
    saveUserInfo,
    savePaymentInfo
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};