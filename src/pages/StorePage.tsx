import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingCart, Star, MapPin, Clock, Truck, Phone, Plus, Minus, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import PaymentCardForm from '@/components/PaymentCardForm';
import OrderProcessing from '@/components/OrderProcessing';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  inStock: boolean;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const StorePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, getCartQuantity, getTotalPrice, clearCart, userInfo, paymentInfo } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState('golden-card');

  // Store data mapped from StoreList - get store info based on ID
  const getAllStores = () => {
    const stores = [];
    
    // غرداية stores
    stores.push(
      { id: 101, name: 'صيدلية النور', type: 'pharmacy', address: 'شارع الأمير عبد القادر، غرداية', distance: '0.5 كم', rating: 4.9, reviews: 142, deliveryTime: '15-25 دقيقة', phone: '029-87-65-43', goldenCardAccepted: true },
      { id: 102, name: 'صيدلية الصحة المزابية', type: 'pharmacy', address: 'حي البستان، المليكة', distance: '2.3 كم', rating: 4.7, reviews: 89, deliveryTime: '25-35 دقيقة', phone: '029-54-32-10', goldenCardAccepted: true },
      { id: 103, name: 'صيدلية أطلس الصحراء', type: 'pharmacy', address: 'شارع محمد بوضياف، بني يزقن', distance: '4.2 كم', rating: 4.8, reviews: 156, deliveryTime: '30-40 دقيقة', phone: '029-76-88-99', goldenCardAccepted: true },
      { id: 104, name: 'سوبر ماركت الواحة المزابية', type: 'grocery', address: 'ساحة السوق، غرداية', distance: '0.8 كم', rating: 4.6, reviews: 203, deliveryTime: '20-30 دقيقة', phone: '029-76-54-32', goldenCardAccepted: true },
      { id: 105, name: 'بقالة أولاد الحاج منصور', type: 'grocery', address: 'شارع الجمهورية، العطف', distance: '3.1 كم', rating: 4.4, reviews: 67, deliveryTime: '35-45 دقيقة', phone: '029-98-76-54', goldenCardAccepted: true },
      { id: 106, name: 'محل الخير للمواد الغذائية', type: 'grocery', address: 'حي النصر، غرداية', distance: '1.7 كم', rating: 4.5, reviews: 134, deliveryTime: '25-35 دقيقة', phone: '029-33-44-55', goldenCardAccepted: true },
      { id: 107, name: 'مطعم الأصالة المزابية', type: 'restaurant', address: 'شارع ابن باديس، غرداية', distance: '0.9 كم', rating: 4.7, reviews: 289, deliveryTime: '35-50 دقيقة', phone: '029-11-22-33', goldenCardAccepted: true },
      { id: 108, name: 'مطعم نخلة الصحراء', type: 'restaurant', address: 'طريق الأغواط، غرداية', distance: '2.1 كم', rating: 4.6, reviews: 167, deliveryTime: '40-55 دقيقة', phone: '029-99-88-77', goldenCardAccepted: true },
      { id: 109, name: 'متجر التكنولوجيا الحديثة', type: 'electronics', address: 'شارع العربي بن مهيدي، غرداية', distance: '1.3 كم', rating: 4.4, reviews: 92, deliveryTime: '45-60 دقيقة', phone: '029-77-66-55', goldenCardAccepted: true },
      { id: 110, name: 'بوتيك الأناقة المزابية', type: 'clothing', address: 'شارع المقاومة، غرداية', distance: '0.6 كم', rating: 4.8, reviews: 178, deliveryTime: '30-45 دقيقة', phone: '029-44-55-66', goldenCardAccepted: true },
      { id: 111, name: 'مخبزة الفجر', type: 'bakery', address: 'حي السلام، غرداية', distance: '0.7 كم', rating: 4.9, reviews: 234, deliveryTime: '15-25 دقيقة', phone: '029-22-33-44', goldenCardAccepted: true },
      { id: 112, name: 'محل ورود الصحراء', type: 'flowers', address: 'شارع الاستقلال، غرداية', distance: '1.1 كم', rating: 4.6, reviews: 87, deliveryTime: '25-35 دقيقة', phone: '029-66-77-88', goldenCardAccepted: true },
      { id: 113, name: 'متجر الأثاث العصري', type: 'household', address: 'شارع 1 نوفمبر، غرداية', distance: '1.5 كم', rating: 4.5, reviews: 91, deliveryTime: '45-60 دقيقة', phone: '029-65-43-21', goldenCardAccepted: true }
    );
    
    // الجزائر العاصمة stores  
    stores.push(
      { id: 201, name: 'صيدلية العاصمة المركزية', type: 'pharmacy', address: 'شارع الاستقلال، الجزائر الوسط', distance: '0.3 كم', rating: 4.9, reviews: 345, deliveryTime: '10-20 دقيقة', phone: '021-12-34-56', goldenCardAccepted: true },
      { id: 202, name: 'صيدلية حيدرة الشعبية', type: 'pharmacy', address: 'حي حيدرة، الجزائر', distance: '2.8 كم', rating: 4.7, reviews: 198, deliveryTime: '25-35 دقيقة', phone: '021-78-90-12', goldenCardAccepted: true },
      { id: 203, name: 'صيدلية باب الوادي', type: 'pharmacy', address: 'شارع العربي بن مهيدي، باب الوادي', distance: '1.9 كم', rating: 4.8, reviews: 267, deliveryTime: '20-30 دقيقة', phone: '021-34-56-78', goldenCardAccepted: true },
      { id: 204, name: 'هايبر ماركت الجزائر الكبير', type: 'grocery', address: 'شارع ديدوش مراد، الجزائر', distance: '1.2 كم', rating: 4.6, reviews: 567, deliveryTime: '30-45 دقيقة', phone: '021-56-78-90', goldenCardAccepted: true },
      { id: 205, name: 'سوق الفلاح', type: 'grocery', address: 'بلكور، الجزائر', distance: '0.9 كم', rating: 4.5, reviews: 234, deliveryTime: '25-35 دقيقة', phone: '021-11-22-33', goldenCardAccepted: true },
      { id: 206, name: 'مطعم دار السلام', type: 'restaurant', address: 'القصبة، الجزائر', distance: '0.7 كم', rating: 4.8, reviews: 445, deliveryTime: '35-50 دقيقة', phone: '021-99-88-77', goldenCardAccepted: true },
      { id: 207, name: 'مطعم البحر الأبيض', type: 'restaurant', address: 'شاطئ سيدي فرج، الجزائر', distance: '15.3 كم', rating: 4.7, reviews: 312, deliveryTime: '60-75 دقيقة', phone: '021-66-77-88', goldenCardAccepted: true },
      { id: 208, name: 'متجر التكنولوجيا المتقدمة', type: 'electronics', address: 'رياض الفتح، الجزائر', distance: '3.4 كم', rating: 4.6, reviews: 189, deliveryTime: '45-60 دقيقة', phone: '021-44-55-66', goldenCardAccepted: true },
      { id: 209, name: 'محل الالكترونيات الحديثة', type: 'electronics', address: 'حي بلكور، الجزائر', distance: '1.7 كم', rating: 4.4, reviews: 134, deliveryTime: '30-45 دقيقة', phone: '021-77-88-99', goldenCardAccepted: true },
      { id: 210, name: 'بوتيك الأزياء العالمية', type: 'clothing', address: 'شارع ديدوش مراد، الجزائر', distance: '1.8 كم', rating: 4.7, reviews: 298, deliveryTime: '30-45 دقيقة', phone: '021-22-33-44', goldenCardAccepted: true },
      { id: 211, name: 'مكتبة ابن خلدون', type: 'bookstore', address: 'شارع بن مهيدي، الجزائر', distance: '0.8 كم', rating: 4.9, reviews: 167, deliveryTime: '25-35 دقيقة', phone: '021-55-66-77', goldenCardAccepted: true },
      { id: 212, name: 'مخبزة النجمة', type: 'bakery', address: 'حي بئر مراد رايس، الجزائر', distance: '4.2 كم', rating: 4.8, reviews: 345, deliveryTime: '35-45 دقيقة', phone: '021-88-99-00', goldenCardAccepted: true },
      { id: 213, name: 'مقهى القهوة الذهبية', type: 'coffee', address: 'شارع الأمير عبد القادر، الجزائر', distance: '0.5 كم', rating: 4.6, reviews: 223, deliveryTime: '20-30 دقيقة', phone: '021-33-44-55', goldenCardAccepted: true }
    );
    
    // الأغواط stores
    stores.push(
      { id: 301, name: 'صيدلية الهضاب العليا', type: 'pharmacy', address: 'شارع الاستقلال، الأغواط', distance: '0.4 كم', rating: 4.8, reviews: 167, deliveryTime: '15-25 دقيقة', phone: '029-93-12-34', goldenCardAccepted: true },
      { id: 302, name: 'صيدلية العافية', type: 'pharmacy', address: 'حي النصر، الأغواط', distance: '1.8 كم', rating: 4.6, reviews: 89, deliveryTime: '25-35 دقيقة', phone: '029-93-56-78', goldenCardAccepted: true },
      { id: 303, name: 'سوبر ماركت الهضاب', type: 'grocery', address: 'المركز التجاري، الأغواط', distance: '0.9 كم', rating: 4.5, reviews: 198, deliveryTime: '20-30 دقيقة', phone: '029-93-90-12', goldenCardAccepted: true },
      { id: 304, name: 'بقالة أهل الأغواط', type: 'grocery', address: 'شارع محمد بوضياف، الأغواط', distance: '2.1 كم', rating: 4.4, reviews: 124, deliveryTime: '30-40 دقيقة', phone: '029-93-34-56', goldenCardAccepted: true },
      { id: 305, name: 'مطعم أهل الأغواط التراثي', type: 'restaurant', address: 'وسط المدينة، الأغواط', distance: '0.6 كم', rating: 4.7, reviews: 234, deliveryTime: '35-50 دقيقة', phone: '029-93-78-90', goldenCardAccepted: true },
      { id: 306, name: 'مطعم رياح الصحراء', type: 'restaurant', address: 'طريق غرداية، الأغواط', distance: '3.2 كم', rating: 4.6, reviews: 156, deliveryTime: '45-60 دقيقة', phone: '029-93-12-35', goldenCardAccepted: true },
      { id: 307, name: 'محل التقنيات الحديثة', type: 'electronics', address: 'شارع العربي بن مهيدي، الأغواط', distance: '1.3 كم', rating: 4.3, reviews: 67, deliveryTime: '40-55 دقيقة', phone: '029-93-56-79', goldenCardAccepted: true },
      { id: 308, name: 'متجر الأناقة الجبلية', type: 'clothing', address: 'السوق المغطى، الأغواط', distance: '0.7 كم', rating: 4.5, reviews: 134, deliveryTime: '25-35 دقيقة', phone: '029-93-90-13', goldenCardAccepted: true },
      { id: 309, name: 'مخبزة الفجر الجديد', type: 'bakery', address: 'حي السعادة، الأغواط', distance: '1.6 كم', rating: 4.7, reviews: 189, deliveryTime: '20-30 دقيقة', phone: '029-93-34-57', goldenCardAccepted: true },
      { id: 310, name: 'محل الصناعات التقليدية', type: 'crafts', address: 'المدينة القديمة، الأغواط', distance: '0.8 كم', rating: 4.8, reviews: 98, deliveryTime: '30-45 دقيقة', phone: '029-93-78-91', goldenCardAccepted: true },
      { id: 311, name: 'محل قطع غيار السيارات', type: 'automotive', address: 'الطريق الوطني، الأغواط', distance: '4.1 كم', rating: 4.4, reviews: 76, deliveryTime: '50-65 دقيقة', phone: '029-93-12-36', goldenCardAccepted: true }
    );
    
    // ورقلة stores
    stores.push(
      { id: 401, name: 'صيدلية النخيل الذهبية', type: 'pharmacy', address: 'شارع الاستقلال، ورقلة', distance: '0.5 كم', rating: 4.9, reviews: 234, deliveryTime: '15-25 دقيقة', phone: '029-71-23-45', goldenCardAccepted: true },
      { id: 402, name: 'صيدلية واحة الصحة', type: 'pharmacy', address: 'حي البدر، ورقلة', distance: '2.3 كم', rating: 4.7, reviews: 145, deliveryTime: '25-35 دقيقة', phone: '029-71-67-89', goldenCardAccepted: true },
      { id: 403, name: 'سوبر ماركت الصحراء الكبير', type: 'grocery', address: 'المركز التجاري، ورقلة', distance: '1.1 كم', rating: 4.6, reviews: 312, deliveryTime: '20-30 دقيقة', phone: '029-71-90-12', goldenCardAccepted: true },
      { id: 404, name: 'بقالة نخلة الواحة', type: 'grocery', address: 'حي النصر، ورقلة', distance: '1.8 كم', rating: 4.4, reviews: 167, deliveryTime: '30-40 دقيقة', phone: '029-71-34-56', goldenCardAccepted: true },
      { id: 405, name: 'مطعم قصر الصحراء', type: 'restaurant', address: 'وسط المدينة، ورقلة', distance: '0.7 كم', rating: 4.8, reviews: 289, deliveryTime: '35-50 دقيقة', phone: '029-71-78-90', goldenCardAccepted: true },
      { id: 406, name: 'مطعم نجمة الجنوب', type: 'restaurant', address: 'طريق تقرت، ورقلة', distance: '4.2 كم', rating: 4.5, reviews: 198, deliveryTime: '50-65 دقيقة', phone: '029-71-12-35', goldenCardAccepted: true },
      { id: 407, name: 'متجر التكنولوجيا الصحراوية', type: 'electronics', address: 'شارع العربي بن مهيدي، ورقلة', distance: '1.4 كم', rating: 4.5, reviews: 134, deliveryTime: '40-55 دقيقة', phone: '029-71-56-79', goldenCardAccepted: true },
      { id: 408, name: 'بوتيك أزياء الصحراء', type: 'clothing', address: 'السوق المغطى، ورقلة', distance: '0.9 كم', rating: 4.6, reviews: 178, deliveryTime: '25-35 دقيقة', phone: '029-71-90-13', goldenCardAccepted: true },
      { id: 409, name: 'مخبزة التمور والعسل', type: 'bakery', address: 'حي النخيل، ورقلة', distance: '2.1 كم', rating: 4.8, reviews: 234, deliveryTime: '25-35 دقيقة', phone: '029-71-34-57', goldenCardAccepted: true },
      { id: 410, name: 'متجر تمور ورقلة الأصيلة', type: 'dates', address: 'سوق التمور، ورقلة', distance: '0.6 كم', rating: 4.9, reviews: 445, deliveryTime: '20-30 دقيقة', phone: '029-71-78-91', goldenCardAccepted: true },
      { id: 411, name: 'محل العسل الصحراوي', type: 'honey', address: 'شارع محمد بوضياف، ورقلة', distance: '1.7 كم', rating: 4.7, reviews: 167, deliveryTime: '30-40 دقيقة', phone: '029-71-12-36', goldenCardAccepted: true },
      { id: 412, name: 'عطارة الأندلس', type: 'perfumes', address: 'المدينة القديمة، ورقلة', distance: '1.2 كم', rating: 4.8, reviews: 189, deliveryTime: '25-35 دقيقة', phone: '029-71-45-67', goldenCardAccepted: true }
    );

    return stores;
  };

  // Find store by ID
  const allStores = getAllStores();
  const store = allStores.find(s => s.id === parseInt(id || '1')) || {
    id: 1,
    name: 'صيدلية الأمل',
    type: 'pharmacy',
    address: 'شارع الاستقلال، الجزائر الوسط',
    distance: '0.8 كم',
    rating: 4.8,
    reviews: 156,
    deliveryTime: '20-30 دقيقة',
    phone: '021-12-34-56',
    goldenCardAccepted: true
  };

  // Products database - categorized by store type
  const getProductsByStoreType = (storeType: string): Product[] => {
    const productDatabase = {
      pharmacy: [
        { id: 1, name: 'باراسيتامول 500 مغ', price: 120, unit: 'علبة', category: 'أدوية الألم', inStock: true, description: 'مسكن للألم وخافض للحرارة' },
        { id: 2, name: 'فيتامين د 1000 وحدة', price: 850, unit: 'علبة', category: 'فيتامينات', inStock: true, description: 'مكمل غذائي لتقوية العظام' },
        { id: 3, name: 'شراب السعال للأطفال', price: 450, unit: 'زجاجة', category: 'أدوية الأطفال', inStock: true, description: 'شراب طبيعي لعلاج السعال عند الأطفال' },
        { id: 4, name: 'كريم مرطب للبشرة', price: 680, unit: 'أنبوب', category: 'العناية بالبشرة', inStock: true, description: 'كريم مرطب للبشرة الجافة والحساسة' },
        { id: 5, name: 'مضاد حيوي أموكسيسيلين', price: 320, unit: 'علبة', category: 'مضادات حيوية', inStock: true, description: 'مضاد حيوي واسع الطيف' },
        { id: 6, name: 'أقراص فيتامين C', price: 280, unit: 'علبة', category: 'فيتامينات', inStock: true, description: 'فيتامين سي لتقوية المناعة' },
        { id: 7, name: 'شامبو طبي للشعر', price: 1200, unit: 'زجاجة', category: 'العناية بالشعر', inStock: false, description: 'شامبو علاجي لمشاكل فروة الرأس' },
        { id: 8, name: 'جهاز قياس السكري', price: 4500, unit: 'جهاز', category: 'أجهزة طبية', inStock: true, description: 'جهاز رقمي لقياس مستوى السكر' }
      ],
      grocery: [
        { id: 21, name: 'أرز أبيض طويل الحبة', price: 280, unit: 'كيلوغرام', category: 'حبوب ونشويات', inStock: true, description: 'أرز عالي الجودة مستورد' },
        { id: 22, name: 'زيت الزيتون البكر', price: 1200, unit: 'لتر', category: 'زيوت وتوابل', inStock: true, description: 'زيت زيتون بكر ممتاز من الجزائر' },
        { id: 23, name: 'لحم بقري طازج', price: 1800, unit: 'كيلوغرام', category: 'لحوم وأسماك', inStock: true, description: 'لحم بقري طازج من المسلخ' },
        { id: 24, name: 'خبز أبيض طازج', price: 35, unit: 'رغيف', category: 'مخبوزات', inStock: true, description: 'خبز طازج يومي من المخبزة' },
        { id: 25, name: 'حليب كامل الدسم', price: 80, unit: 'لتر', category: 'منتجات ألبان', inStock: true, description: 'حليب طبيعي كامل الدسم' },
        { id: 26, name: 'طماطم طازجة', price: 150, unit: 'كيلوغرام', category: 'خضار وفواكه', inStock: true, description: 'طماطم حمراء طازجة من الحقل' },
        { id: 27, name: 'تفاح أحمر', price: 320, unit: 'كيلوغرام', category: 'خضار وفواكه', inStock: true, description: 'تفاح أحمر طازج ومقرمش' },
        { id: 28, name: 'جبن أبيض طبيعي', price: 450, unit: 'قطعة', category: 'منتجات ألبان', inStock: true, description: 'جبن أبيض طبيعي من مزرعة محلية' },
        { id: 29, name: 'شاي أخضر', price: 180, unit: 'علبة', category: 'مشروبات', inStock: false, description: 'شاي أخضر عالي الجودة' },
        { id: 30, name: 'سكر أبيض', price: 120, unit: 'كيلوغرام', category: 'حبوب ونشويات', inStock: true, description: 'سكر أبيض مكرر' }
      ],
      restaurant: [
        { id: 41, name: 'كسكس باللحم والخضار', price: 800, unit: 'طبق', category: 'أطباق رئيسية', inStock: true, description: 'كسكس تقليدي باللحم والخضار الطازجة' },
        { id: 42, name: 'شوربة الحريرة', price: 300, unit: 'طبق', category: 'شوربات', inStock: true, description: 'شوربة حريرة تقليدية مغربية' },
        { id: 43, name: 'مشوي مشكل', price: 1200, unit: 'طبق', category: 'مشاوي', inStock: true, description: 'مشوي مشكل من اللحم والدجاج والكفتة' },
        { id: 44, name: 'دولمة بالخضار', price: 650, unit: 'طبق', category: 'أطباق نباتية', inStock: true, description: 'دولمة محشية بالأرز والخضار' },
        { id: 45, name: 'سلطة جزائرية', price: 280, unit: 'طبق', category: 'سلطات', inStock: true, description: 'سلطة مشكلة من الخضار الطازجة' },
        { id: 46, name: 'عصير برتقال طازج', price: 180, unit: 'كوب', category: 'مشروبات', inStock: true, description: 'عصير برتقال طبيعي طازج' },
        { id: 47, name: 'قهوة عربية', price: 120, unit: 'فنجان', category: 'مشروبات ساخنة', inStock: true, description: 'قهوة عربية أصيلة مع الهيل' },
        { id: 48, name: 'بقلاوة بالفستق', price: 350, unit: 'قطعة', category: 'حلويات', inStock: false, description: 'بقلاوة محضرة بالفستق والعسل' }
      ],
      electronics: [
        { id: 61, name: 'هاتف ذكي سامسونغ', price: 45000, unit: 'جهاز', category: 'هواتف ذكية', inStock: true, description: 'هاتف ذكي بمواصفات عالية وكاميرا متقدمة' },
        { id: 62, name: 'لابتوب HP', price: 85000, unit: 'جهاز', category: 'أجهزة كمبيوتر', inStock: true, description: 'لابتوب للأعمال والدراسة' },
        { id: 63, name: 'سماعات بلوتوث', price: 3500, unit: 'جهاز', category: 'اكسسوارات', inStock: true, description: 'سماعات لاسلكية عالية الجودة' },
        { id: 64, name: 'شاشة تلفزيون 43 بوصة', price: 65000, unit: 'جهاز', category: 'أجهزة منزلية', inStock: true, description: 'شاشة LED عالية الوضوح' },
        { id: 65, name: 'كاميرا رقمية', price: 35000, unit: 'جهاز', category: 'كاميرات', inStock: false, description: 'كاميرا رقمية احترافية للتصوير' },
        { id: 66, name: 'شاحن محمول', price: 2500, unit: 'جهاز', category: 'اكسسوارات', inStock: true, description: 'شاحن محمول سعة عالية' }
      ],
      clothing: [
        { id: 81, name: 'قميص رجالي أبيض', price: 2800, unit: 'قطعة', category: 'ملابس رجالية', inStock: true, description: 'قميص قطني أبيض كلاسيكي' },
        { id: 82, name: 'فستان صيفي نسائي', price: 4500, unit: 'قطعة', category: 'ملابس نسائية', inStock: true, description: 'فستان صيفي أنيق وخفيف' },
        { id: 83, name: 'حذاء رياضي', price: 6500, unit: 'زوج', category: 'أحذية', inStock: true, description: 'حذاء رياضي مريح للجري' },
        { id: 84, name: 'جلباب تقليدي', price: 5200, unit: 'قطعة', category: 'ملابس تقليدية', inStock: true, description: 'جلباب جزائري تقليدي فاخر' },
        { id: 85, name: 'حقيبة يد نسائية', price: 3800, unit: 'قطعة', category: 'اكسسوارات', inStock: false, description: 'حقيبة يد من الجلد الطبيعي' },
        { id: 86, name: 'ساعة يد رجالية', price: 8500, unit: 'قطعة', category: 'اكسسوارات', inStock: true, description: 'ساعة أنيقة من الستانلس ستيل' }
      ],
      bakery: [
        { id: 101, name: 'خبز فرنسي طازج', price: 40, unit: 'رغيف', category: 'خبز', inStock: true, description: 'خبز فرنسي مقرمش ومخبوز طازج' },
        { id: 102, name: 'كرواسان بالزبدة', price: 80, unit: 'قطعة', category: 'معجنات', inStock: true, description: 'كرواسان محضر بالزبدة الطبيعية' },
        { id: 103, name: 'كعك العيد بالتمر', price: 250, unit: 'قطعة', category: 'حلويات', inStock: true, description: 'كعك العيد محشي بالتمر والمكسرات' },
        { id: 104, name: 'تارت الفواكه', price: 350, unit: 'قطعة', category: 'حلويات', inStock: true, description: 'تارت طازجة مزينة بالفواكه الموسمية' },
        { id: 105, name: 'بيتزا مارغريتا', price: 650, unit: 'قطعة', category: 'معجنات مالحة', inStock: true, description: 'بيتزا إيطالية بالطماطم والجبن' },
        { id: 106, name: 'مامول بالجوز', price: 180, unit: 'قطعة', category: 'حلويات', inStock: false, description: 'مامول محشي بالجوز والسكر' }
      ],
      bookstore: [
        { id: 121, name: 'رواية "موسم الهجرة إلى الشمال"', price: 1200, unit: 'كتاب', category: 'أدب', inStock: true, description: 'رواية عربية كلاسيكية للطيب صالح' },
        { id: 122, name: 'كتاب تعلم الفرنسية', price: 850, unit: 'كتاب', category: 'تعليم', inStock: true, description: 'كتاب شامل لتعلم اللغة الفرنسية' },
        { id: 123, name: 'دفتر ملاحظات جلدي', price: 450, unit: 'دفتر', category: 'قرطاسية', inStock: true, description: 'دفتر أنيق بغلاف جلدي' },
        { id: 124, name: 'أقلام حبر ملونة', price: 280, unit: 'علبة', category: 'قرطاسية', inStock: true, description: 'مجموعة أقلام حبر بألوان متنوعة' },
        { id: 125, name: 'كتاب الطبخ الجزائري', price: 950, unit: 'كتاب', category: 'طبخ', inStock: true, description: 'كتاب شامل للأطباق الجزائرية التقليدية' },
        { id: 126, name: 'معجم عربي-فرنسي', price: 1500, unit: 'كتاب', category: 'مراجع', inStock: false, description: 'قاموس شامل للترجمة' }
      ],
      coffee: [
        { id: 141, name: 'قهوة إسبريسو', price: 180, unit: 'فنجان', category: 'قهوة ساخنة', inStock: true, description: 'قهوة إسبريسو إيطالية أصيلة' },
        { id: 142, name: 'كابتشينو بالحليب', price: 220, unit: 'كوب', category: 'قهوة ساخنة', inStock: true, description: 'كابتشينو كريمي بالحليب المبخر' },
        { id: 143, name: 'عصير ليمون طازج', price: 150, unit: 'كوب', category: 'عصائر', inStock: true, description: 'عصير ليمون طبيعي منعش' },
        { id: 144, name: 'كعك بالشوكولاتة', price: 280, unit: 'قطعة', category: 'حلويات', inStock: true, description: 'كعك محضر بالشوكولاتة الداكنة' },
        { id: 145, name: 'شاي أخضر بالنعناع', price: 120, unit: 'كوب', category: 'شاي', inStock: true, description: 'شاي أخضر منعش بالنعناع الطازج' },
        { id: 146, name: 'فطيرة التفاح', price: 320, unit: 'قطعة', category: 'حلويات', inStock: false, description: 'فطيرة منزلية بالتفاح والقرفة' }
      ],
      flowers: [
        { id: 161, name: 'باقة ورود حمراء', price: 2500, unit: 'باقة', category: 'ورود', inStock: true, description: 'باقة رومانسية من الورود الحمراء الطازجة' },
        { id: 162, name: 'نبتة صبار صغيرة', price: 450, unit: 'نبتة', category: 'نباتات داخلية', inStock: true, description: 'نبتة صبار سهلة العناية للمنزل' },
        { id: 163, name: 'ترتيبة زهور مشكلة', price: 1800, unit: 'ترتيبة', category: 'ترتيبات', inStock: true, description: 'ترتيبة أنيقة من الزهور الملونة' },
        { id: 164, name: 'نبتة النعناع', price: 180, unit: 'نبتة', category: 'أعشاب', inStock: true, description: 'نبتة نعناع طازجة للمطبخ' },
        { id: 165, name: 'سماد طبيعي للنباتات', price: 320, unit: 'كيس', category: 'مستلزمات', inStock: true, description: 'سماد عضوي لتغذية النباتات' },
        { id: 166, name: 'أصيص فخاري مزخرف', price: 650, unit: 'قطعة', category: 'مستلزمات', inStock: false, description: 'أصيص من الفخار بزخارف تقليدية' }
      ],
      household: [
        { id: 181, name: 'مكنسة كهربائية', price: 15000, unit: 'جهاز', category: 'أجهزة تنظيف', inStock: true, description: 'مكنسة كهربائية قوية وصامتة' },
        { id: 182, name: 'طقم أواني طبخ', price: 8500, unit: 'طقم', category: 'أدوات مطبخ', inStock: true, description: 'طقم كامل من أواني الطبخ الستانلس' },
        { id: 183, name: 'مساحيق غسيل الملابس', price: 450, unit: 'علبة', category: 'مستلزمات تنظيف', inStock: true, description: 'مسحوق غسيل فعال لجميع أنواع الملابس' },
        { id: 184, name: 'طقم مفارش سرير', price: 3200, unit: 'طقم', category: 'مفروشات', inStock: true, description: 'طقم مفارش قطني ناعم وأنيق' },
        { id: 185, name: 'مروحة سقف', price: 4500, unit: 'جهاز', category: 'أجهزة كهربائية', inStock: false, description: 'مروحة سقف هادئة وموفرة للطاقة' },
        { id: 186, name: 'مصابيح LED موفرة', price: 180, unit: 'قطعة', category: 'إضاءة', inStock: true, description: 'مصابيح LED موفرة للطاقة وطويلة الأمد' }
      ],
      crafts: [
        { id: 201, name: 'سجادة مزابية يدوية', price: 15000, unit: 'قطعة', category: 'منسوجات', inStock: true, description: 'سجادة تقليدية منسوجة يدوياً بألوان زاهية' },
        { id: 202, name: 'إناء فخاري مزخرف', price: 1200, unit: 'قطعة', category: 'فخار', inStock: true, description: 'إناء من الفخار الجزائري بزخارف أمازيغية' },
        { id: 203, name: 'حقيبة جلدية تقليدية', price: 3500, unit: 'قطعة', category: 'جلديات', inStock: true, description: 'حقيبة من الجلد المدبوغ تقليدياً' },
        { id: 204, name: 'تحفة نحاسية', price: 2800, unit: 'قطعة', category: 'معادن', inStock: true, description: 'تحفة فنية من النحاس المطروق' },
        { id: 205, name: 'مسبحة خشبية', price: 450, unit: 'قطعة', category: 'خشبيات', inStock: true, description: 'مسبحة من الخشب الطبيعي المنقوش' },
        { id: 206, name: 'لوحة فنية تراثية', price: 5500, unit: 'قطعة', category: 'فنون', inStock: false, description: 'لوحة فنية تجسد التراث الجزائري' }
      ],
      automotive: [
        { id: 221, name: 'زيت محرك 5W30', price: 3200, unit: 'علبة', category: 'زيوت وسوائل', inStock: true, description: 'زيت محرك عالي الجودة مناسب لجميع الفصول' },
        { id: 222, name: 'فلتر هواء للسيارة', price: 850, unit: 'قطعة', category: 'فلاتر', inStock: true, description: 'فلتر هواء أصلي عالي الكفاءة' },
        { id: 223, name: 'بطارية سيارة 60 أمبير', price: 12000, unit: 'قطعة', category: 'بطاريات', inStock: true, description: 'بطارية موثوقة بضمان سنتين' },
        { id: 224, name: 'إطار سيارة 195/65 R15', price: 8500, unit: 'قطعة', category: 'إطارات', inStock: true, description: 'إطار عالي الجودة مقاوم للانزلاق' },
        { id: 225, name: 'مصابيح LED للسيارة', price: 650, unit: 'زوج', category: 'إضاءة', inStock: false, description: 'مصابيح LED ساطعة وموفرة للطاقة' },
        { id: 226, name: 'سائل تنظيف الزجاج', price: 280, unit: 'زجاجة', category: 'مواد تنظيف', inStock: true, description: 'سائل فعال لتنظيف زجاج السيارة' }
      ],
      dates: [
        { id: 241, name: 'تمر دقلة نور فاخر', price: 1500, unit: 'كيلوغرام', category: 'تمور طازجة', inStock: true, description: 'تمر دقلة نور من ورقلة عالي الجودة' },
        { id: 242, name: 'تمر محشي باللوز', price: 2200, unit: 'كيلوغرام', category: 'تمور محضرة', inStock: true, description: 'تمر فاخر محشي باللوز المقشر' },
        { id: 243, name: 'عجوة المدينة', price: 3500, unit: 'كيلوغرام', category: 'تمور مقدسة', inStock: true, description: 'عجوة المدينة المنورة الأصلية' },
        { id: 244, name: 'تمر مجفف بالشمس', price: 1200, unit: 'كيلوغرام', category: 'تمور مجففة', inStock: true, description: 'تمر مجفف طبيعياً تحت أشعة الشمس' },
        { id: 245, name: 'مربى التمر الطبيعي', price: 650, unit: 'برطمان', category: 'منتجات التمر', inStock: true, description: 'مربى طبيعي من التمر بدون إضافات' },
        { id: 246, name: 'دبس التمر الأصلي', price: 850, unit: 'زجاجة', category: 'منتجات التمر', inStock: false, description: 'دبس تمر طبيعي 100% غني بالفيتامينات' }
      ],
      honey: [
        { id: 261, name: 'عسل السدر الجبلي', price: 4500, unit: 'برطمان', category: 'عسل طبيعي', inStock: true, description: 'عسل السدر النقي من جبال الأوراس' },
        { id: 262, name: 'عسل الطلح الصحراوي', price: 3200, unit: 'برطمان', category: 'عسل طبيعي', inStock: true, description: 'عسل الطلح الأصلي من الصحراء الكبرى' },
        { id: 263, name: 'غذاء ملكات النحل', price: 8500, unit: 'علبة', category: 'منتجات النحل', inStock: true, description: 'غذاء ملكات النحل الطازج والمغذي' },
        { id: 264, name: 'شمع عسل طبيعي', price: 1200, unit: 'قطعة', category: 'منتجات النحل', inStock: true, description: 'شمع عسل نقي للاستخدامات المتعددة' },
        { id: 265, name: 'عسل الأوكالبتوس', price: 2800, unit: 'برطمان', category: 'عسل طبيعي', inStock: false, description: 'عسل الأوكالبتوس المفيد للجهاز التنفسي' },
        { id: 266, name: 'حبوب اللقاح المجففة', price: 1800, unit: 'علبة', category: 'منتجات النحل', inStock: true, description: 'حبوب اللقاح الطبيعية المليئة بالفيتامينات' }
      ],
      perfumes: [
        { id: 281, name: 'عطر العود الكمبودي', price: 8500, unit: 'زجاجة', category: 'عطور شرقية', inStock: true, description: 'عطر العود الفاخر من كمبوديا' },
        { id: 282, name: 'ماء الورد الطبيعي', price: 450, unit: 'زجاجة', category: 'مياه عطرة', inStock: true, description: 'ماء الورد الطبيعي من بلاد الشام' },
        { id: 283, name: 'بخور الصندل الأبيض', price: 1200, unit: 'علبة', category: 'بخور', inStock: true, description: 'بخور الصندل الأبيض عالي الجودة' },
        { id: 284, name: 'زيت الياسمين العطري', price: 2800, unit: 'زجاجة', category: 'زيوت عطرية', inStock: true, description: 'زيت الياسمين الطبيعي للعلاج العطري' },
        { id: 285, name: 'مسك الغزال الأصلي', price: 6500, unit: 'قطعة', category: 'عطور طبيعية', inStock: true, description: 'مسك الغزال الطبيعي الفاخر' },
        { id: 286, name: 'عنبر خالص', price: 12000, unit: 'قطعة', category: 'عطور نادرة', inStock: false, description: 'عنبر خالص نادر وثمين' }
      ]
    };

    return productDatabase[storeType] || productDatabase.pharmacy;
  };

  // Get products based on store type
  const products: Product[] = getProductsByStoreType(store.type);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      category: product.category,
      inStock: product.inStock,
      description: product.description
    });
    
    toast.success(`تم إضافة ${product.name} إلى السلة`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('السلة فارغة');
      return;
    }
    
    // Check if user info exists, if not ask for it
    if (!userInfo) {
      toast.error('يرجى إضافة معلومات التوصيل أولاً');
      navigate('/order-booking', { 
        state: { 
          serviceType: 'delivery', 
          serviceName: `طلب من ${store.name}`,
          items: cart 
        } 
      });
      return;
    }
    
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = () => {
    // Validate payment data
    if (paymentMethod === 'golden-card') {
      if (!paymentData.goldenCardId || !paymentData.cardHolder || !paymentData.expiryMonth || !paymentData.expiryYear || !paymentData.cvv) {
        toast.error('يرجى ملء جميع بيانات البطاقة الذهبية');
        return;
      }
    } else {
      if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryMonth || !paymentData.expiryYear || !paymentData.cvv) {
        toast.error('يرجى ملء جميع بيانات البطاقة البنكية');
        return;
      }
    }
    
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    // Create order from cart
    const mockOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      type: 'delivery' as const,
      service: `طلب من ${store.name}`,
      status: 'pending' as const,
      createdAt: new Date().toLocaleString('ar-DZ'),
      estimatedTime: store.deliveryTime,
      currentLocation: 'تم استلام الطلب',
      address: userInfo ? `${userInfo.address}, ${userInfo.baladiya}, ${userInfo.wilaya}` : 'العنوان غير محدد',
      amount: paymentMethod === 'golden-card' ? Math.round(getTotalPrice() * 0.8) : getTotalPrice(), // 20% discount for golden card
      paymentMethod: paymentMethod === 'golden-card' ? 'البطاقة الذهبية' : 'بطاقة بنكية',
      customerInfo: userInfo,
      paymentDetails: paymentData,
      items: cart,
      steps: [
        { title: 'تم استلام الطلب', completed: true, time: new Date().toLocaleTimeString('ar-DZ'), location: store.name },
        { title: 'تم تأكيد الطلب', completed: false },
        { title: 'جاري التحضير', completed: false },
        { title: 'في الطريق', completed: false },
        { title: 'تم التسليم', completed: false }
      ]
    };

    // Save to localStorage
    localStorage.setItem('currentOrder', JSON.stringify(mockOrder));
    
    toast.success('تم تأكيد طلبك بنجاح!', {
      description: `رقم الطلبية: ${mockOrder.id}`
    });

    // Clear cart and close modals
    clearCart();
    setShowPaymentForm(false);
    setIsProcessing(false);
    
    // Navigate to order tracking
    navigate('/order-tracking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Header />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Store Header */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl text-gray-900 mb-2">{store.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>{store.rating} ({store.reviews} تقييم)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    <Truck className="h-4 w-4 mr-1" />
                    توصيل مجاني
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Clock className="h-4 w-4 mr-1" />
                    {store.deliveryTime}
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <CreditCard className="h-4 w-4 mr-1" />
                    البطاقة الذهبية
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">الفئات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category === 'all' ? 'جميع المنتجات' : category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className={`${!product.inStock ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                          <Badge variant="outline" className="mt-2">
                            {product.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-green-600">
                            {product.price} دج
                          </span>
                          <p className="text-sm text-gray-500">/{product.unit}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {product.inStock ? (
                        <div className="flex items-center gap-3">
                          {getCartQuantity(product.id) > 0 ? (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(product.id, getCartQuantity(product.id) - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {getCartQuantity(product.id)}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(product.id, getCartQuantity(product.id) + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                           ) : (
                             <Button 
                               onClick={() => handleAddToCart(product)}
                               className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                             >
                              <Plus className="h-4 w-4 mr-2" />
                              إضافة للسلة
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Badge variant="destructive">غير متوفر</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    السلة ({cart.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">السلة فارغة</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">{item.price} دج × {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">المجموع:</span>
                          <span className="text-xl font-bold text-green-600">
                            {getTotalPrice()} دج
                          </span>
                        </div>
                        
                        <Button 
                          onClick={handleCheckout}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          size="lg"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          إتمام الطلب والدفع
                        </Button>
                        
                        <p className="text-xs text-gray-500 text-center mt-2">
                          توصيل مجاني - الدفع عند الاستلام
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">إتمام عملية الدفع</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">اختر طريقة الدفع</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    variant={paymentMethod === 'golden-card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('golden-card')}
                    className="p-4 h-auto flex-col"
                  >
                    <CreditCard className="mb-2" />
                    <span>البطاقة الذهبية</span>
                    <span className="text-sm text-green-600 font-bold">خصم 20%</span>
                  </Button>
                  <Button
                    variant={paymentMethod === 'bank-card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('bank-card')}
                    className="p-4 h-auto flex-col"
                  >
                    <CreditCard className="mb-2" />
                    <span>البطاقة البنكية</span>
                  </Button>
                </div>
              </div>

              {/* Payment Form */}
              <PaymentCardForm 
                paymentMethod={paymentMethod}
                onCardDataChange={setPaymentData}
                savedPaymentInfo={paymentInfo}
              />

              {/* Order Summary */}
              <Card className="mt-6 bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">ملخص الطلب</h4>
                  <div className="space-y-2 text-sm">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{item.price * item.quantity} دج</span>
                      </div>
                    ))}
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>المجموع الفرعي:</span>
                      <span>{getTotalPrice()} دج</span>
                    </div>
                    {paymentMethod === 'golden-card' && (
                      <>
                        <div className="flex justify-between text-green-600">
                          <span>خصم البطاقة الذهبية (20%):</span>
                          <span>-{Math.round(getTotalPrice() * 0.2)} دج</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>المجموع النهائي:</span>
                          <span className="text-green-600">{Math.round(getTotalPrice() * 0.8)} دج</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
                <Button 
                  onClick={handlePaymentSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'جاري المعالجة...' : 'تأكيد الدفع'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Modal */}
      {isProcessing && (
        <OrderProcessing onProcessingComplete={handleProcessingComplete} />
      )}

      <Footer />
    </div>
  );
};

export default StorePage;