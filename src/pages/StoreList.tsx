import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Star, Clock, Truck, Phone, ShoppingCart, Heart, Package } from 'lucide-react';

const StoreList = () => {
  const [searchParams] = useSearchParams();
  const wilaya = searchParams.get('wilaya');
  const baladiya = searchParams.get('baladiya');
  const service = searchParams.get('service');

  // Mock store data - Enhanced with 50+ diverse Algerian stores across 4 cities
  const storesByLocation = {
    // غرداية - 13 خدمة
    'غرداية': {
      pharmacy: [
        { id: 101, name: 'صيدلية النور', type: 'pharmacy', address: 'شارع الأمير عبد القادر، غرداية', distance: '0.5 كم', rating: 4.9, reviews: 142, deliveryTime: '15-25 دقيقة', phone: '029-87-65-43', image: '/placeholder.svg', specialties: ['أدوية الأطفال', 'مستلزمات السكري', 'منتجات العناية'], goldenCardAccepted: true },
        { id: 102, name: 'صيدلية الصحة المزابية', type: 'pharmacy', address: 'حي البستان، المليكة', distance: '2.3 كم', rating: 4.7, reviews: 89, deliveryTime: '25-35 دقيقة', phone: '029-54-32-10', image: '/placeholder.svg', specialties: ['أدوية القلب', 'فيتامينات', 'مستلزمات طبية'], goldenCardAccepted: true },
        { id: 103, name: 'صيدلية أطلس الصحراء', type: 'pharmacy', address: 'شارع محمد بوضياف، بني يزقن', distance: '4.2 كم', rating: 4.8, reviews: 156, deliveryTime: '30-40 دقيقة', phone: '029-76-88-99', image: '/placeholder.svg', specialties: ['أدوية الحساسية', 'مستحضرات التجميل', 'أعشاب طبية'], goldenCardAccepted: true }
      ],
      grocery: [
        { id: 104, name: 'سوبر ماركت الواحة المزابية', type: 'grocery', address: 'ساحة السوق، غرداية', distance: '0.8 كم', rating: 4.6, reviews: 203, deliveryTime: '20-30 دقيقة', phone: '029-76-54-32', image: '/placeholder.svg', specialties: ['تمور مزاب', 'خضار طازجة', 'لحوم حلال'], goldenCardAccepted: true },
        { id: 105, name: 'بقالة أولاد الحاج منصور', type: 'grocery', address: 'شارع الجمهورية، العطف', distance: '3.1 كم', rating: 4.4, reviews: 67, deliveryTime: '35-45 دقيقة', phone: '029-98-76-54', image: '/placeholder.svg', specialties: ['منتجات محلية', 'حبوب وبقوليات', 'منتجات ألبان'], goldenCardAccepted: true },
        { id: 106, name: 'محل الخير للمواد الغذائية', type: 'grocery', address: 'حي النصر، غرداية', distance: '1.7 كم', rating: 4.5, reviews: 134, deliveryTime: '25-35 دقيقة', phone: '029-33-44-55', image: '/placeholder.svg', specialties: ['مخبوزات طازجة', 'حلويات مزابية', 'عسل طبيعي'], goldenCardAccepted: true }
      ],
      restaurant: [
        { id: 107, name: 'مطعم الأصالة المزابية', type: 'restaurant', address: 'شارع ابن باديس، غرداية', distance: '0.9 كم', rating: 4.7, reviews: 289, deliveryTime: '35-50 دقيقة', phone: '029-11-22-33', image: '/placeholder.svg', specialties: ['الكسكس المزابي', 'الشواء', 'الحلويات التقليدية'], goldenCardAccepted: true },
        { id: 108, name: 'مطعم نخلة الصحراء', type: 'restaurant', address: 'طريق الأغواط، غرداية', distance: '2.1 كم', rating: 4.6, reviews: 167, deliveryTime: '40-55 دقيقة', phone: '029-99-88-77', image: '/placeholder.svg', specialties: ['المشاوي', 'البيتزا', 'العصائر الطبيعية'], goldenCardAccepted: true }
      ],
      electronics: [
        { id: 109, name: 'متجر التكنولوجيا الحديثة', type: 'electronics', address: 'شارع العربي بن مهيدي، غرداية', distance: '1.3 كم', rating: 4.4, reviews: 92, deliveryTime: '45-60 دقيقة', phone: '029-77-66-55', image: '/placeholder.svg', specialties: ['هواتف ذكية', 'أجهزة كمبيوتر', 'اكسسوارات'], goldenCardAccepted: true }
      ],
      clothing: [
        { id: 110, name: 'بوتيك الأناقة المزابية', type: 'clothing', address: 'شارع المقاومة، غرداية', distance: '0.6 كم', rating: 4.8, reviews: 178, deliveryTime: '30-45 دقيقة', phone: '029-44-55-66', image: '/placeholder.svg', specialties: ['ملابس تقليدية', 'عبايات', 'أحذية جلدية'], goldenCardAccepted: true }
      ],
      bakery: [
        { id: 111, name: 'مخبزة الفجر', type: 'bakery', address: 'حي السلام، غرداية', distance: '0.7 كم', rating: 4.9, reviews: 234, deliveryTime: '15-25 دقيقة', phone: '029-22-33-44', image: '/placeholder.svg', specialties: ['خبز طازج', 'حلويات شرقية', 'كعك العيد'], goldenCardAccepted: true }
      ],
      flowers: [
        { id: 112, name: 'محل ورود الصحراء', type: 'flowers', address: 'شارع الاستقلال، غرداية', distance: '1.1 كم', rating: 4.6, reviews: 87, deliveryTime: '25-35 دقيقة', phone: '029-66-77-88', image: '/placeholder.svg', specialties: ['باقات ورود', 'نباتات الزينة', 'هدايا'], goldenCardAccepted: true }
      ],
      household: [
        { id: 113, name: 'متجر الأثاث العصري', type: 'household', address: 'شارع 1 نوفمبر، غرداية', distance: '1.5 كم', rating: 4.5, reviews: 91, deliveryTime: '45-60 دقيقة', phone: '029-65-43-21', image: '/placeholder.svg', specialties: ['أدوات المطبخ', 'مستلزمات التنظيف', 'أجهزة منزلية'], goldenCardAccepted: true }
      ]
    },
    
    // الجزائر العاصمة - 13 خدمة  
    'الجزائر': {
      pharmacy: [
        { id: 201, name: 'صيدلية العاصمة المركزية', type: 'pharmacy', address: 'شارع الاستقلال، الجزائر الوسط', distance: '0.3 كم', rating: 4.9, reviews: 345, deliveryTime: '10-20 دقيقة', phone: '021-12-34-56', image: '/placeholder.svg', specialties: ['أدوية مستوردة', 'مستحضرات تجميل', 'فيتامينات'], goldenCardAccepted: true },
        { id: 202, name: 'صيدلية حيدرة الشعبية', type: 'pharmacy', address: 'حي حيدرة، الجزائر', distance: '2.8 كم', rating: 4.7, reviews: 198, deliveryTime: '25-35 دقيقة', phone: '021-78-90-12', image: '/placeholder.svg', specialties: ['أدوية عامة', 'مستلزمات الأطفال', 'معدات طبية'], goldenCardAccepted: true },
        { id: 203, name: 'صيدلية باب الوادي', type: 'pharmacy', address: 'شارع العربي بن مهيدي، باب الوادي', distance: '1.9 كم', rating: 4.8, reviews: 267, deliveryTime: '20-30 دقيقة', phone: '021-34-56-78', image: '/placeholder.svg', specialties: ['أدوية مزمنة', 'منتجات طبيعية', 'مكملات غذائية'], goldenCardAccepted: true }
      ],
      grocery: [
        { id: 204, name: 'هايبر ماركت الجزائر الكبير', type: 'grocery', address: 'شارع ديدوش مراد، الجزائر', distance: '1.2 كم', rating: 4.6, reviews: 567, deliveryTime: '30-45 دقيقة', phone: '021-56-78-90', image: '/placeholder.svg', specialties: ['مواد غذائية متنوعة', 'لحوم مجمدة', 'منتجات عضوية'], goldenCardAccepted: true },
        { id: 205, name: 'سوق الفلاح', type: 'grocery', address: 'بلكور، الجزائر', distance: '0.9 كم', rating: 4.5, reviews: 234, deliveryTime: '25-35 دقيقة', phone: '021-11-22-33', image: '/placeholder.svg', specialties: ['خضار وفواكه طازجة', 'أسماك البحر', 'منتجات الألبان'], goldenCardAccepted: true }
      ],
      restaurant: [
        { id: 206, name: 'مطعم دار السلام', type: 'restaurant', address: 'القصبة، الجزائر', distance: '0.7 كم', rating: 4.8, reviews: 445, deliveryTime: '35-50 دقيقة', phone: '021-99-88-77', image: '/placeholder.svg', specialties: ['الكسكس الجزائري', 'المحشي', 'الباكلاوة'], goldenCardAccepted: true },
        { id: 207, name: 'مطعم البحر الأبيض', type: 'restaurant', address: 'شاطئ سيدي فرج، الجزائر', distance: '15.3 كم', rating: 4.7, reviews: 312, deliveryTime: '60-75 دقيقة', phone: '021-66-77-88', image: '/placeholder.svg', specialties: ['أسماك وثمار البحر', 'السلطات', 'المشروبات الباردة'], goldenCardAccepted: true }
      ],
      electronics: [
        { id: 208, name: 'متجر التكنولوجيا المتقدمة', type: 'electronics', address: 'رياض الفتح، الجزائر', distance: '3.4 كم', rating: 4.6, reviews: 189, deliveryTime: '45-60 دقيقة', phone: '021-44-55-66', image: '/placeholder.svg', specialties: ['أجهزة كمبيوتر', 'ألعاب فيديو', 'كاميرات'], goldenCardAccepted: true },
        { id: 209, name: 'محل الالكترونيات الحديثة', type: 'electronics', address: 'حي بلكور، الجزائر', distance: '1.7 كم', rating: 4.4, reviews: 134, deliveryTime: '30-45 دقيقة', phone: '021-77-88-99', image: '/placeholder.svg', specialties: ['هواتف ذكية', 'أجهزة منزلية', 'اكسسوارات'], goldenCardAccepted: true }
      ],
      clothing: [
        { id: 210, name: 'بوتيك الأزياء العالمية', type: 'clothing', address: 'شارع ديدوش مراد، الجزائر', distance: '1.8 كم', rating: 4.7, reviews: 298, deliveryTime: '30-45 دقيقة', phone: '021-22-33-44', image: '/placeholder.svg', specialties: ['أزياء نسائية', 'ملابس رجالية', 'اكسسوارات'], goldenCardAccepted: true }
      ],
      bookstore: [
        { id: 211, name: 'مكتبة ابن خلدون', type: 'bookstore', address: 'شارع بن مهيدي، الجزائر', distance: '0.8 كم', rating: 4.9, reviews: 167, deliveryTime: '25-35 دقيقة', phone: '021-55-66-77', image: '/placeholder.svg', specialties: ['كتب علمية', 'أدب جزائري', 'قواميس'], goldenCardAccepted: true }
      ],
      bakery: [
        { id: 212, name: 'مخبزة النجمة', type: 'bakery', address: 'حي بئر مراد رايس، الجزائر', distance: '4.2 كم', rating: 4.8, reviews: 345, deliveryTime: '35-45 دقيقة', phone: '021-88-99-00', image: '/placeholder.svg', specialties: ['المعجنات الفرنسية', 'الحلويات الجزائرية', 'الخبز الطازج'], goldenCardAccepted: true }
      ],
      coffee: [
        { id: 213, name: 'مقهى القهوة الذهبية', type: 'coffee', address: 'شارع الأمير عبد القادر، الجزائر', distance: '0.5 كم', rating: 4.6, reviews: 223, deliveryTime: '20-30 دقيقة', phone: '021-33-44-55', image: '/placeholder.svg', specialties: ['قهوة عربية', 'حلويات شرقية', 'عصائر طبيعية'], goldenCardAccepted: true }
      ]
    },

    // الأغواط - 12 خدمة
    'الأغواط': {
      pharmacy: [
        { id: 301, name: 'صيدلية الهضاب العليا', type: 'pharmacy', address: 'شارع الاستقلال، الأغواط', distance: '0.4 كم', rating: 4.8, reviews: 167, deliveryTime: '15-25 دقيقة', phone: '029-93-12-34', image: '/placeholder.svg', specialties: ['أدوية الجهاز التنفسي', 'مستلزمات المسنين', 'أعشاب طبية'], goldenCardAccepted: true },
        { id: 302, name: 'صيدلية العافية', type: 'pharmacy', address: 'حي النصر، الأغواط', distance: '1.8 كم', rating: 4.6, reviews: 89, deliveryTime: '25-35 دقيقة', phone: '029-93-56-78', image: '/placeholder.svg', specialties: ['أدوية الأطفال', 'مكملات غذائية', 'منتجات تجميل'], goldenCardAccepted: true }
      ],
      grocery: [
        { id: 303, name: 'سوبر ماركت الهضاب', type: 'grocery', address: 'المركز التجاري، الأغواط', distance: '0.9 كم', rating: 4.5, reviews: 198, deliveryTime: '20-30 دقيقة', phone: '029-93-90-12', image: '/placeholder.svg', specialties: ['منتجات الجبال', 'لحوم طازجة', 'حبوب محلية'], goldenCardAccepted: true },
        { id: 304, name: 'بقالة أهل الأغواط', type: 'grocery', address: 'شارع محمد بوضياف، الأغواط', distance: '2.1 كم', rating: 4.4, reviews: 124, deliveryTime: '30-40 دقيقة', phone: '029-93-34-56', image: '/placeholder.svg', specialties: ['منتجات تقليدية', 'زيوت طبيعية', 'عسل الجبل'], goldenCardAccepted: true }
      ],
      restaurant: [
        { id: 305, name: 'مطعم أهل الأغواط التراثي', type: 'restaurant', address: 'وسط المدينة، الأغواط', distance: '0.6 كم', rating: 4.7, reviews: 234, deliveryTime: '35-50 دقيقة', phone: '029-93-78-90', image: '/placeholder.svg', specialties: ['الكسكس بالخضار', 'المشاوي', 'الشوربة التقليدية'], goldenCardAccepted: true },
        { id: 306, name: 'مطعم رياح الصحراء', type: 'restaurant', address: 'طريق غرداية، الأغواط', distance: '3.2 كم', rating: 4.6, reviews: 156, deliveryTime: '45-60 دقيقة', phone: '029-93-12-35', image: '/placeholder.svg', specialties: ['لحم الخروف', 'الدجاج المشوي', 'السلطات'], goldenCardAccepted: true }
      ],
      electronics: [
        { id: 307, name: 'محل التقنيات الحديثة', type: 'electronics', address: 'شارع العربي بن مهيدي، الأغواط', distance: '1.3 كم', rating: 4.3, reviews: 67, deliveryTime: '40-55 دقيقة', phone: '029-93-56-79', image: '/placeholder.svg', specialties: ['أجهزة تلفزيون', 'راديو', 'معدات كهربائية'], goldenCardAccepted: true }
      ],
      clothing: [
        { id: 308, name: 'متجر الأناقة الجبلية', type: 'clothing', address: 'السوق المغطى، الأغواط', distance: '0.7 كم', rating: 4.5, reviews: 134, deliveryTime: '25-35 دقيقة', phone: '029-93-90-13', image: '/placeholder.svg', specialties: ['ملابس شتوية', 'أحذية جبلية', 'اكسسوارات تقليدية'], goldenCardAccepted: true }
      ],
      bakery: [
        { id: 309, name: 'مخبزة الفجر الجديد', type: 'bakery', address: 'حي السعادة، الأغواط', distance: '1.6 كم', rating: 4.7, reviews: 189, deliveryTime: '20-30 دقيقة', phone: '029-93-34-57', image: '/placeholder.svg', specialties: ['خبز بلدي', 'معجنات', 'حلويات محلية'], goldenCardAccepted: true }
      ],
      crafts: [
        { id: 310, name: 'محل الصناعات التقليدية', type: 'crafts', address: 'المدينة القديمة، الأغواط', distance: '0.8 كم', rating: 4.8, reviews: 98, deliveryTime: '30-45 دقيقة', phone: '029-93-78-91', image: '/placeholder.svg', specialties: ['سجاد يدوي', 'فخاريات', 'تحف تراثية'], goldenCardAccepted: true }
      ],
      automotive: [
        { id: 311, name: 'محل قطع غيار السيارات', type: 'automotive', address: 'الطريق الوطني، الأغواط', distance: '4.1 كم', rating: 4.4, reviews: 76, deliveryTime: '50-65 دقيقة', phone: '029-93-12-36', image: '/placeholder.svg', specialties: ['قطع غيار أصلية', 'زيوت السيارات', 'بطاريات'], goldenCardAccepted: true }
      ]
    },

    // ورقلة - 12 خدمة
    'ورقلة': {
      pharmacy: [
        { id: 401, name: 'صيدلية النخيل الذهبية', type: 'pharmacy', address: 'شارع الاستقلال، ورقلة', distance: '0.5 كم', rating: 4.9, reviews: 234, deliveryTime: '15-25 دقيقة', phone: '029-71-23-45', image: '/placeholder.svg', specialties: ['أدوية الحر', 'واقيات الشمس', 'مرطبات البشرة'], goldenCardAccepted: true },
        { id: 402, name: 'صيدلية واحة الصحة', type: 'pharmacy', address: 'حي البدر، ورقلة', distance: '2.3 كم', rating: 4.7, reviews: 145, deliveryTime: '25-35 دقيقة', phone: '029-71-67-89', image: '/placeholder.svg', specialties: ['أدوية عامة', 'فيتامينات', 'مستلزمات رياضية'], goldenCardAccepted: true }
      ],
      grocery: [
        { id: 403, name: 'سوبر ماركت الصحراء الكبير', type: 'grocery', address: 'المركز التجاري، ورقلة', distance: '1.1 كم', rating: 4.6, reviews: 312, deliveryTime: '20-30 دقيقة', phone: '029-71-90-12', image: '/placeholder.svg', specialties: ['تمور دقلة نور', 'منتجات صحراوية', 'مياه معدنية'], goldenCardAccepted: true },
        { id: 404, name: 'بقالة نخلة الواحة', type: 'grocery', address: 'حي النصر، ورقلة', distance: '1.8 كم', rating: 4.4, reviews: 167, deliveryTime: '30-40 دقيقة', phone: '029-71-34-56', image: '/placeholder.svg', specialties: ['منتجات محلية', 'أعشاب صحراوية', 'حليب الناقة'], goldenCardAccepted: true }
      ],
      restaurant: [
        { id: 405, name: 'مطعم قصر الصحراء', type: 'restaurant', address: 'وسط المدينة، ورقلة', distance: '0.7 كم', rating: 4.8, reviews: 289, deliveryTime: '35-50 دقيقة', phone: '029-71-78-90', image: '/placeholder.svg', specialties: ['المشوي الصحراوي', 'الكسكس بالتمر', 'الشاي الأخضر'], goldenCardAccepted: true },
        { id: 406, name: 'مطعم نجمة الجنوب', type: 'restaurant', address: 'طريق تقرت، ورقلة', distance: '4.2 كم', rating: 4.5, reviews: 198, deliveryTime: '50-65 دقيقة', phone: '029-71-12-35', image: '/placeholder.svg', specialties: ['لحم الجمل', 'الحساء الصحراوي', 'العصائر الطبيعية'], goldenCardAccepted: true }
      ],
      electronics: [
        { id: 407, name: 'متجر التكنولوجيا الصحراوية', type: 'electronics', address: 'شارع العربي بن مهيدي، ورقلة', distance: '1.4 كم', rating: 4.5, reviews: 134, deliveryTime: '40-55 دقيقة', phone: '029-71-56-79', image: '/placeholder.svg', specialties: ['مكيفات هوائية', 'مراوح', 'أجهزة تبريد'], goldenCardAccepted: true }
      ],
      clothing: [
        { id: 408, name: 'بوتيك أزياء الصحراء', type: 'clothing', address: 'السوق المغطى، ورقلة', distance: '0.9 كم', rating: 4.6, reviews: 178, deliveryTime: '25-35 دقيقة', phone: '029-71-90-13', image: '/placeholder.svg', specialties: ['ملابس صيفية', 'عمائم تقليدية', 'أحذية صحراوية'], goldenCardAccepted: true }
      ],
      bakery: [
        { id: 409, name: 'مخبزة التمور والعسل', type: 'bakery', address: 'حي النخيل، ورقلة', distance: '2.1 كم', rating: 4.8, reviews: 234, deliveryTime: '25-35 دقيقة', phone: '029-71-34-57', image: '/placeholder.svg', specialties: ['خبز بالتمر', 'قطايف بالعسل', 'معمول'], goldenCardAccepted: true }
      ],
      dates: [
        { id: 410, name: 'متجر تمور ورقلة الأصيلة', type: 'dates', address: 'سوق التمور، ورقلة', distance: '0.6 كم', rating: 4.9, reviews: 445, deliveryTime: '20-30 دقيقة', phone: '029-71-78-91', image: '/placeholder.svg', specialties: ['دقلة نور', 'تمور مجففة', 'عجوة المدينة'], goldenCardAccepted: true }
      ],
      honey: [
        { id: 411, name: 'محل العسل الصحراوي', type: 'honey', address: 'شارع محمد بوضياف، ورقلة', distance: '1.7 كم', rating: 4.7, reviews: 167, deliveryTime: '30-40 دقيقة', phone: '029-71-12-36', image: '/placeholder.svg', specialties: ['عسل السدر', 'عسل الطلح', 'غذاء ملكات النحل'], goldenCardAccepted: true }
      ],
      perfumes: [
        { id: 412, name: 'عطارة الأندلس', type: 'perfumes', address: 'المدينة القديمة، ورقلة', distance: '1.2 كم', rating: 4.8, reviews: 189, deliveryTime: '25-35 دقيقة', phone: '029-71-45-67', image: '/placeholder.svg', specialties: ['عطور شرقية', 'بخور', 'زيوت عطرية'], goldenCardAccepted: true }
      ]
    },
    'default': [
      {
        id: 1,
        name: 'صيدلية الأمل',
        type: 'pharmacy',
        address: 'شارع الاستقلال، الجزائر الوسط',
        distance: '0.8 كم',
        rating: 4.8,
        reviews: 156,
        deliveryTime: '20-30 دقيقة',
        phone: '021-12-34-56',
        image: '/placeholder.svg',
        specialties: ['أدوية مزمنة', 'مستلزمات طبية', 'فيتامينات'],
        goldenCardAccepted: true
      },
      {
        id: 2,
        name: 'بقالة المدينة',
        type: 'grocery',
        address: 'حي السلام، باب الزوار',
        distance: '1.2 كم',
        rating: 4.6,
        reviews: 89,
        deliveryTime: '30-45 دقيقة',
        phone: '021-56-78-90',
        image: '/placeholder.svg',
        specialties: ['خضار وفواكه', 'لحوم طازجة', 'منتجات ألبان'],
        goldenCardAccepted: true
      },
      {
        id: 3,
        name: 'متجر المنزل الذكي',
        type: 'household',
        address: 'شارع ديدوش مراد، الحراش',
        distance: '2.1 كم',
        rating: 4.5,
        reviews: 67,
        deliveryTime: '45-60 دقيقة',
        phone: '021-98-76-54',
        image: '/placeholder.svg',
        specialties: ['أدوات تنظيف', 'أجهزة منزلية', 'مستلزمات المطبخ'],
        goldenCardAccepted: true
      }
    ]
  };

  // Get stores based on location and service type
  const getStoresForLocation = () => {
    const cityKey = wilaya === 'الجزائر العاصمة' ? 'الجزائر' : wilaya;
    if (cityKey && storesByLocation[cityKey as keyof typeof storesByLocation]) {
      const cityStores = storesByLocation[cityKey as keyof typeof storesByLocation];
      if (cityStores && typeof cityStores === 'object' && service in cityStores) {
        return cityStores[service as keyof typeof cityStores] || [];
      }
      // If service type doesn't exist for this city, return all stores of that type from the city
      return Object.values(cityStores).flat().filter((store: any) => store.type === service);
    }
    return storesByLocation.default.filter(store => store.type === service);
  };

  const stores = getStoresForLocation();

  const serviceNames = {
    pharmacy: 'الأدوية والصيدليات',
    grocery: 'البقالة والمواد الغذائية',  
    household: 'اللوازم المنزلية',
    restaurant: 'المطاعم والوجبات السريعة',
    electronics: 'الإلكترونيات والتكنولوجيا',
    clothing: 'الملابس والأزياء',
    bakery: 'المخابز والحلويات',
    bookstore: 'الكتب والقرطاسية',
    coffee: 'المقاهي والمشروبات',
    flowers: 'الورود والنباتات',
    crafts: 'الصناعات التقليدية',
    automotive: 'قطع غيار السيارات',
    dates: 'التمور والفواكه المجففة',
    honey: 'العسل والمنتجات الطبيعية',
    perfumes: 'العطور والبخور'
  };

  const serviceIcons = {
    pharmacy: Heart,
    grocery: ShoppingCart,
    household: Package,
    restaurant: ShoppingCart,
    electronics: Package,
    clothing: Heart,
    bakery: ShoppingCart,
    bookstore: Package,
    coffee: ShoppingCart,
    flowers: Heart,
    crafts: Package,
    automotive: Package,
    dates: ShoppingCart,
    honey: Heart,
    perfumes: Heart
  };

  const filteredStores = stores;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Header />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                {baladiya} - {wilaya}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {serviceNames[service as keyof typeof serviceNames]}
            </h1>
            <p className="text-gray-600 text-lg">
              وجدنا {filteredStores.length} محل يوفر خدمة التوصيل في منطقتك
            </p>
          </div>

          {/* Store Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStores.map((store) => {
              const ServiceIcon = serviceIcons[store.type as keyof typeof serviceIcons];
              return (
                <Card key={store.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-102">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <ServiceIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                            {store.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-medium text-gray-700">{store.rating}</span>
                              <span className="text-gray-500 text-sm">({store.reviews} تقييم)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {store.goldenCardAccepted && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          البطاقة الذهبية
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Address & Distance */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{store.address}</span>
                      <Badge variant="outline" className="ml-auto">
                        {store.distance}
                      </Badge>
                    </div>

                    {/* Delivery Info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Truck className="h-4 w-4" />
                        <span>توصيل مجاني</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Clock className="h-4 w-4" />
                        <span>{store.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{store.phone}</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">التخصصات:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 space-y-2">
                      <Link to={`/store/${store.id}`}>
                        <Button 
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 hover:scale-105"
                          size="lg"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          تصفح المنتجات والأسعار
                        </Button>
                      </Link>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          اتصل
                        </Button>
                        <Link 
                          to={`/order-booking?type=delivery&service=${encodeURIComponent(store.name)}&storeId=${store.id}`}
                          className="flex-1"
                        >
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            اطلب الآن
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                لا توجد محلات متاحة
              </h3>
              <p className="text-gray-600">
                عذراً، لا توجد محلات تقدم هذه الخدمة في المنطقة المحددة حالياً
              </p>
              <Link to="/delivery-search">
                <Button className="mt-4" variant="outline">
                  البحث في منطقة أخرى
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StoreList;