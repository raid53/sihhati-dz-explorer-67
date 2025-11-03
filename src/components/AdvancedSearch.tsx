
import { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, Clock, DollarSign, X, Heart, Phone, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';

interface FilterOptions {
  specialties: string[];
  wilayas: string[];
  priceRange: { min: number; max: number };
  rating: number;
  availability: string;
  serviceTypes: string[];
  sortBy: string;
}

interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  createdAt: string;
}

interface Provider {
  id: string;
  userId: string;
  speciality: string;
  licenseNumber: string;
  experience: string;
  serviceType: 'clinic' | 'hospital' | 'home_nursing' | 'addiction_center';
  description: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  userType: 'patient' | 'provider';
}

const AdvancedSearch = () => {
  const { getEnabledWilayas } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    specialties: [],
    wilayas: [],
    priceRange: { min: 0, max: 50000 },
    rating: 0,
    availability: '',
    serviceTypes: [],
    sortBy: 'newest'
  });

  // تحميل البيانات من localStorage
  useEffect(() => {
    const allServices = JSON.parse(localStorage.getItem('services') || '[]');
    const allProviders = JSON.parse(localStorage.getItem('providers') || '[]');
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    setServices(allServices);
    setProviders(allProviders);
    setUsers(allUsers);
  }, []);

  const specialties = [
    'طب القلب والأوعية الدموية',
    'طب الأطفال',
    'طب النساء والتوليد',
    'الطب الباطني',
    'جراحة العظام',
    'الأمراض الجلدية',
    'طب العيون',
    'طب الأنف والأذن والحنجرة',
    'الطب النفسي',
    'طب الأسنان',
    'الأشعة التشخيصية',
    'التحاليل الطبية'
  ];

  // الحصول على الولايات المفعلة فقط من لوحة الإدارة
  const enabledWilayas = getEnabledWilayas();
  const wilayas = enabledWilayas.map(w => w.nameAr);

  const serviceTypes = [
    { value: 'clinic', label: 'عيادة طبية' },
    { value: 'hospital', label: 'مستشفى' },
    { value: 'home_nursing', label: 'تمريض منزلي' },
    { value: 'addiction_center', label: 'مركز علاج إدمان' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'الأحدث' },
    { value: 'oldest', label: 'الأقدم' },
    { value: 'price_low', label: 'السعر: من الأقل للأعلى' },
    { value: 'price_high', label: 'السعر: من الأعلى للأقل' },
    { value: 'rating', label: 'التقييم الأعلى' },
    { value: 'alphabetical', label: 'أبجدياً' }
  ];

  const getProviderInfo = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      const user = users.find(u => u.id === provider.userId);
      return { provider, user };
    }
    return null;
  };

  const getServiceTypeLabel = (serviceType: string) => {
    const labels = {
      'clinic': 'عيادة طبية',
      'hospital': 'مستشفى',
      'home_nursing': 'تمريض منزلي',
      'addiction_center': 'مركز علاج إدمان'
    };
    return labels[serviceType as keyof typeof labels] || serviceType;
  };

  // دالة الترتيب
  const sortServices = (services: Service[], sortBy: string) => {
    const sorted = [...services];
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'price_low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        // ترتيب حسب التقييم (مؤقتاً نستخدم random للعرض)
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted;
    }
  };

  // دالة البحث والفلترة المحسنة
  const performSearch = () => {
    let filteredServices = services;

    // البحث النصي
    if (searchQuery) {
      filteredServices = filteredServices.filter(service => {
        const providerInfo = getProviderInfo(service.providerId);
        const searchTerm = searchQuery.toLowerCase();
        
        return (
          service.title.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm) ||
          service.category.toLowerCase().includes(searchTerm) ||
          (providerInfo?.provider.speciality.toLowerCase().includes(searchTerm)) ||
          (providerInfo?.user?.name.toLowerCase().includes(searchTerm))
        );
      });
    }

    // فلترة حسب الولاية
    if (selectedWilaya) {
      filteredServices = filteredServices.filter(service => {
        const providerInfo = getProviderInfo(service.providerId);
        return providerInfo?.user?.address.includes(selectedWilaya);
      });
    }

    // فلترة حسب التخصص
    if (filters.specialties.length > 0) {
      filteredServices = filteredServices.filter(service => {
        const providerInfo = getProviderInfo(service.providerId);
        return filters.specialties.some(specialty => 
          providerInfo?.provider.speciality.includes(specialty) ||
          service.category.includes(specialty)
        );
      });
    }

    // فلترة حسب نوع الخدمة
    if (filters.serviceTypes.length > 0) {
      filteredServices = filteredServices.filter(service => {
        const providerInfo = getProviderInfo(service.providerId);
        return filters.serviceTypes.includes(providerInfo?.provider.serviceType || '');
      });
    }

    // فلترة حسب السعر
    filteredServices = filteredServices.filter(service => 
      service.price >= filters.priceRange.min && 
      service.price <= filters.priceRange.max
    );

    // ترتيب النتائج
    const sortedResults = sortServices(filteredServices, filters.sortBy);
    
    setSearchResults(sortedResults);
    setShowResults(true);
  };

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const toggleServiceType = (serviceType: string) => {
    setFilters(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(serviceType)
        ? prev.serviceTypes.filter(s => s !== serviceType)
        : [...prev.serviceTypes, serviceType]
    }));
  };

  const clearFilters = () => {
    setFilters({
      specialties: [],
      wilayas: [],
      priceRange: { min: 0, max: 50000 },
      rating: 0,
      availability: '',
      serviceTypes: [],
      sortBy: 'newest'
    });
    setSelectedWilaya('');
    setSearchQuery('');
    setShowResults(false);
  };

  const getActiveFiltersCount = () => {
    return filters.specialties.length + 
           filters.serviceTypes.length +
           (selectedWilaya ? 1 : 0) +
           (filters.rating > 0 ? 1 : 0) + 
           (filters.availability ? 1 : 0);
  };

  // البحث التلقائي عند تغيير الفلاتر
  useEffect(() => {
    if (showResults) {
      performSearch();
    }
  }, [filters.sortBy]);

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500 rounded-full animate-float stagger-2"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500 rounded-full animate-float stagger-4"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-slide-in-top">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ابحث عن الخدمة الصحية المناسبة لك
          </h2>
          <p className="text-gray-600 text-lg">
            أكثر من {services.length} خدمة صحية متاحة في جميع أنحاء الجزائر
          </p>
        </div>

        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto mb-6 animate-fade-in-scale">
          <div className="flex-1 relative">
            <Input
              placeholder="ابحث عن طبيب، عيادة، أو خدمة صحية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 text-lg pr-14 pl-6 border-2 border-green-200 focus:border-green-400 rounded-xl shadow-lg"
            />
            <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-green-500 w-6 h-6" />
          </div>
          
          <div className="lg:w-56">
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className="w-full h-14 px-6 border-2 border-green-200 focus:border-green-400 rounded-xl text-lg shadow-lg"
            >
              <option value="">اختر الولاية</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya} value={wilaya}>{wilaya}</option>
              ))}
            </select>
          </div>

          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline" 
            className="h-14 px-6 border-2 border-green-200 hover:bg-green-50 rounded-xl relative"
          >
            <SlidersHorizontal className="w-5 h-5 ml-2" />
            فلترة متقدمة
            {getActiveFiltersCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center p-0 animate-pulse">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
          
          <Button 
            onClick={performSearch}
            className="h-14 px-8 text-lg health-gradient rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-green"
          >
            بحث
          </Button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-2xl animate-slide-in-bottom mb-6">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">فلترة متقدمة</h3>
              <div className="flex gap-2">
                <Button 
                  onClick={clearFilters}
                  variant="outline" 
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  مسح الكل
                </Button>
                <Button 
                  onClick={() => setShowFilters(false)}
                  variant="ghost" 
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* التخصصات */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <Star className="w-4 h-4 ml-2 text-green-600" />
                  التخصص
                </h4>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {specialties.map((specialty) => (
                    <label key={specialty} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer hover:bg-green-50 p-2 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={filters.specialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* نوع الخدمة */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <MapPin className="w-4 h-4 ml-2 text-green-600" />
                  نوع الخدمة
                </h4>
                <div className="space-y-2">
                  {serviceTypes.map((type) => (
                    <label key={type.value} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer hover:bg-green-50 p-2 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={filters.serviceTypes.includes(type.value)}
                        onChange={() => toggleServiceType(type.value)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* نطاق السعر */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <DollarSign className="w-4 h-4 ml-2 text-green-600" />
                  نطاق السعر (د.ج)
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">الحد الأدنى</label>
                    <Input
                      type="number"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: Number(e.target.value) }
                      }))}
                      className="mt-1"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">الحد الأقصى</label>
                    <Input
                      type="number"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                      }))}
                      className="mt-1"
                      placeholder="50000"
                    />
                  </div>
                </div>
              </div>

              {/* الترتيب */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <ArrowUpDown className="w-4 h-4 ml-2 text-green-600" />
                  ترتيب النتائج
                </h4>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-green-400"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">الفلاتر النشطة:</h5>
                <div className="flex flex-wrap gap-2">
                  {filters.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                      {specialty}
                      <X 
                        className="w-3 h-3 mr-1 cursor-pointer" 
                        onClick={() => toggleSpecialty(specialty)}
                      />
                    </Badge>
                  ))}
                  {filters.serviceTypes.map((serviceType) => (
                    <Badge key={serviceType} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {getServiceTypeLabel(serviceType)}
                      <X 
                        className="w-3 h-3 mr-1 cursor-pointer" 
                        onClick={() => toggleServiceType(serviceType)}
                      />
                    </Badge>
                  ))}
                  {selectedWilaya && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {selectedWilaya}
                      <X 
                        className="w-3 h-3 mr-1 cursor-pointer" 
                        onClick={() => setSelectedWilaya('')}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-2xl animate-fade-in-scale">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-gray-900">
                  نتائج البحث ({searchResults.length} نتيجة)
                </h3>
                {searchResults.length > 0 && (
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:border-green-400"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <Button 
                onClick={() => setShowResults(false)}
                variant="ghost" 
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h4>
                <p className="text-gray-500 mb-4">جرب تعديل معايير البحث أو الفلاتر</p>
                <Button onClick={clearFilters} variant="outline">
                  مسح جميع الفلاتر
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((service) => {
                  const providerInfo = getProviderInfo(service.providerId);
                  
                  return (
                    <Link key={service.id} to={`/service/${service.id}`}>
                      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white border-0 shadow-md overflow-hidden">
                        <div className="relative">
                          {service.image ? (
                            <img 
                              src={service.image} 
                              alt={service.title}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-40 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                              <Heart className="w-12 h-12 text-green-600" />
                            </div>
                          )}
                          
                          <div className="absolute top-3 right-3 flex gap-2">
                            {providerInfo?.provider.isVerified && (
                              <Badge className="bg-green-500 text-white text-xs">
                                ✓ موثق
                              </Badge>
                            )}
                            <Badge variant="secondary" className="bg-white/90 text-xs">
                              {service.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                              {service.title}
                            </h3>
                            {providerInfo && (
                              <p className="text-gray-600 text-sm">
                                د. {providerInfo.user?.name} - {providerInfo.provider.speciality}
                              </p>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {service.description}
                          </p>

                          {providerInfo && (
                            <div className="space-y-1 mb-3">
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-3 h-3" />
                                <span className="text-xs">{getServiceTypeLabel(providerInfo.provider.serviceType)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-3 h-3" />
                                <span className="text-xs">{providerInfo.user?.phone}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">
                              {service.price.toLocaleString()} دج
                            </span>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                              عرض التفاصيل
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvancedSearch;
