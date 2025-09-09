import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Search, ArrowRight, ShoppingCart, Heart, Truck, Car, Ambulance, Bus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliverySearch = () => {
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedBaladiya, setSelectedBaladiya] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const wilayas = [
    'الجزائر', 'وهران', 'قسنطينة', 'عنابة', 'باتنة', 'سطيف', 'سيدي بلعباس', 'بسكرة', 
    'تلمسان', 'بجاية', 'تيزي وزو', 'الشلف', 'جيجل', 'المسيلة', 'المدية', 'معسكر',
    'غرداية', 'ورقلة', 'تمنراست', 'أدرار', 'إليزي', 'تندوف'
  ];

  const baladiyat = {
    'الجزائر': ['الجزائر الوسط', 'باب الزوار', 'الحراش', 'بئر مراد رايس', 'الدرارية'],
    'وهران': ['وهران', 'السانيا', 'عين الترك', 'بطيوة', 'مرسى الكبير'],
    'قسنطينة': ['قسنطينة', 'الخروب', 'عين عبيد', 'ديدوش مراد', 'زيغود يوسف'],
    'غرداية': ['غرداية', 'المليكة', 'العطف', 'بنورة', 'القرارة', 'مطليلي', 'الضاية بن ضحوة', 'زلفانة'],
    'عنابة': ['عنابة', 'الحدجار', 'عين الباردة', 'البوني', 'سيدي عمار'],
    'باتنة': ['باتنة', 'عين التوتة', 'آريس', 'تيمقاد', 'مروانة'],
    'سطيف': ['سطيف', 'العلمة', 'عين ولمان', 'جميلة', 'بني عزيز'],
    'ورقلة': ['ورقلة', 'حاسي مسعود', 'الرويسات', 'عين البيضاء', 'تقرت'],
    'تلمسان': ['تلمسان', 'المنصورة', 'شتوان', 'الرمشي', 'مغنية']
  };

  const serviceTypes = [
    // Delivery Services
    { id: 'pharmacy', name: 'الأدوية والصيدليات', icon: Heart, color: 'text-red-500', category: 'delivery' },
    { id: 'grocery', name: 'البقالة والمواد الغذائية', icon: ShoppingCart, color: 'text-green-500', category: 'delivery' },
    { id: 'household', name: 'اللوازم المنزلية', icon: Truck, color: 'text-blue-500', category: 'delivery' },
    // Transport Services
    { id: 'residential-transport', name: 'النقل السكني', icon: Car, color: 'text-purple-500', category: 'transport' },
    { id: 'medical-transport', name: 'النقل الطبي', icon: Ambulance, color: 'text-teal-500', category: 'transport' },
    { id: 'accessible-transport', name: 'النقل المُيَسَّر', icon: Bus, color: 'text-orange-500', category: 'transport' }
  ];

  const isFormComplete = selectedWilaya && selectedBaladiya && selectedService;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Header />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5 text-orange-600" />
                <span className="text-orange-800 font-medium">البحث عن المحلات</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ابحث عن الخدمات في منطقتك
            </h1>
            <p className="text-gray-600 text-lg">
              حدد موقعك ونوع الخدمة للعثور على أقرب مقدمي الخدمات (محلات أو وسائل نقل)
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                معلومات البحث
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Type Selection */}
              <div>
                <Label className="text-lg font-medium text-gray-900 mb-4 block">
                  نوع الخدمة المطلوبة
                </Label>
                
                {/* Delivery Services */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-800 mb-3">خدمات التوصيل</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {serviceTypes.filter(service => service.category === 'delivery').map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <div
                          key={service.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedService === service.id
                              ? 'border-orange-400 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className={`h-6 w-6 ${service.color}`} />
                            <span className="font-medium text-gray-900">{service.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Transport Services */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">خدمات النقل والتنقل</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {serviceTypes.filter(service => service.category === 'transport').map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <div
                          key={service.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedService === service.id
                              ? 'border-orange-400 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className={`h-6 w-6 ${service.color}`} />
                            <span className="font-medium text-gray-900">{service.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Location Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="wilaya" className="text-lg font-medium text-gray-900">
                    الولاية
                  </Label>
                  <Select value={selectedWilaya} onValueChange={setSelectedWilaya}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="اختر الولاية" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {wilayas.map((wilaya) => (
                        <SelectItem key={wilaya} value={wilaya} className="hover:bg-gray-100">
                          {wilaya}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="baladiya" className="text-lg font-medium text-gray-900">
                    البلدية
                  </Label>
                  <Select 
                    value={selectedBaladiya} 
                    onValueChange={setSelectedBaladiya}
                    disabled={!selectedWilaya}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder={selectedWilaya ? "اختر البلدية" : "اختر الولاية أولاً"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {selectedWilaya && baladiyat[selectedWilaya as keyof typeof baladiyat]?.map((baladiya) => (
                        <SelectItem key={baladiya} value={baladiya} className="hover:bg-gray-100">
                          {baladiya}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Button */}
              <div className="text-center pt-4">
                <Link to={isFormComplete ? `/stores?wilaya=${selectedWilaya}&baladiya=${selectedBaladiya}&service=${selectedService}` : '#'}>
                  <Button 
                    size="lg"
                    disabled={!isFormComplete}
                    className={`text-lg px-8 py-6 rounded-xl transition-all duration-300 ${
                      isFormComplete 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    البحث عن مقدمي الخدمة
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3">كيفية استخدام الخدمة:</h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-800">
                <li>اختر نوع الخدمة التي تحتاجها (توصيل أو نقل)</li>
                <li>حدد الولاية والبلدية التي تسكن فيها</li>
                <li>اضغط على "البحث عن مقدمي الخدمة" لعرض الخيارات القريبة</li>
                <li>للتوصيل: اختر المحل المناسب وتصفح المنتجات المتاحة</li>
                <li>للنقل: اختر نوع المركبة المناسبة لحالتك الصحية</li>
                <li>ادفع بالبطاقة الذهبية واستمتع بالخدمة</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DeliverySearch;