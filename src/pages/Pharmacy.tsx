import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart, Star, Plus, Minus, Pill, Heart, Shield, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AlgerianPaymentMethods from '@/components/AlgerianPaymentMethods';
import MedicationRequest from '@/components/MedicationRequest';
import pharmacyImg from '@/assets/pharmacy.jpg';

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const medications = [
    {
      id: 1,
      name: 'باراسيتامول 500 مغ',
      category: 'painkillers',
      price: 250,
      originalPrice: 300,
      description: 'مسكن للألم وخافض للحرارة',
      manufacturer: 'صيدال الجزائر',
      stock: 150,
      prescription: false,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 2,
      name: 'أموكسيسيلين 250 مغ',
      category: 'antibiotics',
      price: 450,
      originalPrice: 500,
      description: 'مضاد حيوي واسع الطيف',
      manufacturer: 'مختبرات الحكمة',
      stock: 85,
      prescription: true,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 3,
      name: 'فيتامين د 1000 وحدة',
      category: 'vitamins',
      price: 800,
      originalPrice: 950,
      description: 'مكمل فيتامين د لصحة العظام',
      manufacturer: 'صحتي للأدوية',
      stock: 200,
      prescription: false,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 189
    },
    {
      id: 4,
      name: 'دواء السكري - ميتفورمين',
      category: 'diabetes',
      price: 1200,
      originalPrice: 1350,
      description: 'دواء لعلاج السكري النوع الثاني',
      manufacturer: 'مختبرات الفارابي',
      stock: 67,
      prescription: true,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 98
    },
    {
      id: 5,
      name: 'شراب السعال للأطفال',
      category: 'pediatric',
      price: 350,
      originalPrice: 400,
      description: 'شراب طبيعي لعلاج السعال عند الأطفال',
      manufacturer: 'أطفال الجزائر',
      stock: 120,
      prescription: false,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 145
    },
    {
      id: 6,
      name: 'مرهم للجروح والحروق',
      category: 'topical',
      price: 650,
      originalPrice: 750,
      description: 'مرهم طبي لعلاج الجروح والحروق الطفيفة',
      manufacturer: 'العناية الطبية',
      stock: 95,
      prescription: false,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 167
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الأدوية' },
    { id: 'painkillers', name: 'مسكنات الألم' },
    { id: 'antibiotics', name: 'المضادات الحيوية' },
    { id: 'vitamins', name: 'الفيتامينات' },
    { id: 'diabetes', name: 'أدوية السكري' },
    { id: 'pediatric', name: 'أدوية الأطفال' },
    { id: 'topical', name: 'الكريمات والمراهم' }
  ];

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicationId: number) => {
    setCart(prev => ({
      ...prev,
      [medicationId]: (prev[medicationId] || 0) + 1
    }));
  };

  const removeFromCart = (medicationId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[medicationId] > 1) {
        newCart[medicationId] -= 1;
      } else {
        delete newCart[medicationId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [medId, count]) => {
      const medication = medications.find(m => m.id === parseInt(medId));
      return total + (medication?.price || 0) * count;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <Pill className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    صيدلية رابط الرعاية
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                  أدوية أصلية وموثوقة مع خدمة التوصيل المجاني داخل الجزائر العاصمة
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">أدوية مضمونة 100%</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/5">
                    <Truck className="w-5 h-5 text-secondary" />
                    <span className="font-semibold">توصيل مجاني +3000 دج</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/20">
                    <Heart className="w-5 h-5 text-accent-foreground" />
                    <span className="font-semibold">خدمة عملاء 24/7</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img 
                    src={pharmacyImg} 
                    alt="الصيدليات"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 text-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="ابحث عن دواء أو مكمل غذائي..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background/95 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Medications Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                {filteredMedications.length} دواء متاح
              </h2>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  فلتر متقدم
                </Button>
                {getTotalItems() > 0 && (
                  <Button className="flex items-center gap-2 relative">
                    <ShoppingCart className="w-4 h-4" />
                    <span>السلة ({getTotalItems()})</span>
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[20px] h-5 flex items-center justify-center text-xs">
                      {getTotalPrice()} دج
                    </Badge>
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedications.map((medication) => (
                <Card key={medication.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-card border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={medication.image} 
                      alt={medication.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {medication.prescription && (
                        <Badge className="bg-orange-500 text-white">
                          وصفة طبية
                        </Badge>
                      )}
                      {medication.originalPrice > medication.price && (
                        <Badge className="bg-green-500 text-white">
                          خصم {Math.round((1 - medication.price / medication.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/80 hover:bg-background"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {medication.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{medication.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{medication.manufacturer}</p>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{medication.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">({medication.reviews} تقييم)</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">المخزون:</span>
                        <span className={`text-sm font-medium ${medication.stock < 50 ? 'text-orange-500' : 'text-green-500'}`}>
                          {medication.stock} حبة متاحة
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{medication.price} دج</span>
                        {medication.originalPrice > medication.price && (
                          <span className="text-sm text-muted-foreground line-through">{medication.originalPrice} دج</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {cart[medication.id] > 0 && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => removeFromCart(medication.id)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-medium min-w-[20px] text-center">{cart[medication.id]}</span>
                          </>
                        )}
                        <Button 
                          size="sm"
                          onClick={() => addToCart(medication.id)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Plus className="w-4 h-4" />
                          {cart[medication.id] > 0 ? '' : 'أضف للسلة'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMedications.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  لم يتم العثور على أدوية تطابق بحثك
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  إعادة تعيين البحث
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* External Medication Help */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <MedicationRequest />
          </div>
        </section>

        {/* Payment Methods */}
        {getTotalItems() > 0 && (
          <section className="py-16 px-6 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                طرق الدفع المتاحة
              </h2>
              <AlgerianPaymentMethods 
                amount={getTotalPrice()} 
                onPaymentSuccess={() => {
                  setCart({});
                  alert('تم الدفع بنجاح! سيتم توصيل طلبك قريباً');
                }} 
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Pharmacy;