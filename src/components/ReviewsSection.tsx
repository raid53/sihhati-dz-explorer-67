
import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Flag, User, Calendar, MoreHorizontal, Filter, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WriteReviewModal from './WriteReviewModal';

interface Review {
  id: number;
  patientName: string;
  patientAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  clinicResponse?: string;
  verified: boolean;
  specialty: string;
  images?: string[];
  tags?: string[];
}

const ReviewsSection = ({ clinicId }: { clinicId: number }) => {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      patientName: 'أحمد محمد',
      rating: 5,
      date: '2024-01-15',
      comment: 'تجربة ممتازة جداً. الطبيب محترف ومتفهم، والعيادة نظيفة ومنظمة. أنصح بشدة.',
      helpful: 12,
      verified: true,
      specialty: 'طب القلب',
      clinicResponse: 'شكراً لك على هذا التقييم الرائع. نسعد دائماً بخدمة مرضانا بأفضل ما لدينا.',
      images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'],
      tags: ['نظيف', 'محترف', 'سريع']
    },
    {
      id: 2,
      patientName: 'فاطمة علي',
      rating: 4,
      date: '2024-01-10',
      comment: 'خدمة جيدة جداً والموظفون ودودون. الانتظار كان قليلاً أطول من المتوقع لكن النتيجة كانت مرضية.',
      helpful: 8,
      verified: true,
      specialty: 'طب الأطفال',
      tags: ['ودود', 'جيد']
    },
    {
      id: 3,
      patientName: 'محمد حسين',
      rating: 5,
      date: '2024-01-05',
      comment: 'أفضل عيادة زرتها في حياتي. التشخيص دقيق والعلاج فعال. الأجهزة حديثة والطاقم مهني.',
      helpful: 15,
      verified: true,
      specialty: 'الطب الباطني',
      images: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=200&fit=crop'
      ],
      tags: ['دقيق', 'حديث', 'مهني']
    }
  ]);

  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const specialties = ['all', ...Array.from(new Set(reviews.map(r => r.specialty)))];
  const commonTags = ['نظيف', 'محترف', 'سريع', 'ودود', 'جيد', 'دقيق', 'حديث', 'مهني'];

  const getRatingPercentage = (rating: number) => {
    const count = reviews.filter(review => review.rating === rating).length;
    return (count / reviews.length) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-DZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredReviews = reviews.filter(review => {
    if (filterBy !== 'all' && review.rating.toString() !== filterBy) return false;
    if (selectedSpecialty !== 'all' && review.specialty !== selectedSpecialty) return false;
    return true;
  });

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-slide-in-top">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            تقييمات ومراجعات المرضى
          </h2>
          <p className="text-gray-600 text-lg">
            اكتشف تجارب المرضى الحقيقية
          </p>
        </div>

        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="reviews">المراجعات</TabsTrigger>
            <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
            <TabsTrigger value="insights">التحليلات</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Rating Summary */}
              <div className="lg:col-span-1">
                <Card className="bg-white border-0 shadow-lg animate-fade-in-scale">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.floor(averageRating) 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">
                        بناءً على {reviews.length} تقييم
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <span className="text-sm text-gray-600 w-8">{rating}</span>
                          <Star className="w-4 h-4 text-yellow-500 fill-current mx-1" />
                          <div className="flex-1 mx-2">
                            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-yellow-500 h-full transition-all duration-500 ease-out"
                                style={{ width: `${getRatingPercentage(rating)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {reviews.filter(r => r.rating === rating).length}
                          </span>
                        </div>
                      ))}
                    </div>

                    <WriteReviewModal 
                      clinicId={clinicId} 
                      clinicName="عيادة الأمل الطبية" 
                    />
                  </CardContent>
                </Card>

                {/* الكلمات المتكررة */}
                <Card className="bg-white border-0 shadow-lg mt-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">الكلمات الأكثر تكراراً</h3>
                    <div className="flex flex-wrap gap-2">
                      {commonTags.map((tag, index) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2">
                {/* Advanced Filters */}
                <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">فلترة:</span>
                    </div>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
                    >
                      <option value="newest">الأحدث</option>
                      <option value="oldest">الأقدم</option>
                      <option value="highest">أعلى تقييم</option>
                      <option value="lowest">أقل تقييم</option>
                      <option value="helpful">الأكثر إفادة</option>
                    </select>

                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">جميع التقييمات</option>
                      <option value="5">5 نجوم</option>
                      <option value="4">4 نجوم</option>
                      <option value="3">3 نجوم</option>
                      <option value="2">2 نجوم</option>
                      <option value="1">1 نجمة</option>
                    </select>

                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">جميع التخصصات</option>
                      {specialties.slice(1).map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-6">
                  {filteredReviews.map((review, index) => (
                    <Card key={review.id} className={`bg-white border-0 shadow-lg hover-lift animate-slide-rotate stagger-${index + 1}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={review.patientAvatar} />
                              <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                                {review.patientName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">{review.patientName}</h4>
                                {review.verified && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    متحقق
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating 
                                          ? 'text-yellow-500 fill-current' 
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-blue-600">{review.specialty}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {review.comment}
                        </p>

                        {/* Tags */}
                        {review.tags && review.tags.length > 0 && (
                          <div className="flex gap-2 mb-4">
                            {review.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2 mb-4">
                            {review.images.map((image, i) => (
                              <img
                                key={i}
                                src={image}
                                alt={`صورة المراجعة ${i + 1}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                              />
                            ))}
                          </div>
                        )}

                        {/* Clinic Response */}
                        {review.clinicResponse && (
                          <div className="bg-green-50 p-4 rounded-lg mb-4 border-r-4 border-green-500">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">ع</span>
                              </div>
                              <span className="font-semibold text-green-800">رد العيادة</span>
                            </div>
                            <p className="text-green-700 text-sm">{review.clinicResponse}</p>
                          </div>
                        )}

                        {/* Review Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                              <ThumbsUp className="w-4 h-4 ml-1" />
                              مفيد ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                              <MessageCircle className="w-4 h-4 ml-1" />
                              رد
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                            <Flag className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    عرض المزيد من التقييمات
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">متوسط التقييم</div>
              </Card>
              
              <Card className="text-center p-6">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.rating >= 4).length}
                </div>
                <div className="text-sm text-gray-600">تقييمات إيجابية</div>
              </Card>
              
              <Card className="text-center p-6">
                <User className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.verified).length}
                </div>
                <div className="text-sm text-gray-600">مراجعات متحققة</div>
              </Card>
              
              <Card className="text-center p-6">
                <MessageCircle className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.clinicResponse).length}
                </div>
                <div className="text-sm text-gray-600">ردود العيادة</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">تحليلات التقييمات</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-medium">نقاط القوة الأكثر ذكراً</span>
                  <span className="text-green-600">النظافة، الاحترافية، السرعة</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium">التخصص الأكثر تقييماً</span>
                  <span className="text-blue-600">طب القلب</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-medium">متوسط وقت الرد</span>
                  <span className="text-purple-600">24 ساعة</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ReviewsSection;
