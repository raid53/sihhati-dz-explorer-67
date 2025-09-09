
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Lightbulb, TrendingUp, Calendar, Clock, Star } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'lifestyle' | 'prevention' | 'nutrition';
  priority: 'high' | 'medium' | 'low';
  personalizedFor: string[];
  tips: string[];
  estimatedTime: string;
}

interface UserProfile {
  age: number;
  conditions: string[];
  goals: string[];
  lifestyle: string;
}

const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const mockUserProfile: UserProfile = {
    age: 35,
    conditions: ['ارتفاع ضغط الدم', 'السكري النوع الثاني'],
    goals: ['فقدان الوزن', 'تحسين اللياقة'],
    lifestyle: 'مكتبي'
  };

  const mockRecommendations: Recommendation[] = [
    {
      id: '1',
      title: 'برنامج تمارين القلب المخصص',
      description: 'برنامج تمارين مصمم خصيصاً لمرضى ارتفاع ضغط الدم',
      category: 'health',
      priority: 'high',
      personalizedFor: ['ارتفاع ضغط الدم'],
      tips: [
        'ابدأ بـ 15 دقيقة يومياً',
        'تجنب التمارين الشاقة',
        'راقب ضغط الدم قبل وبعد التمرين',
        'استشر الطبيب قبل زيادة شدة التمارين'
      ],
      estimatedTime: '15-30 دقيقة يومياً'
    },
    {
      id: '2',
      title: 'نظام غذائي لمرضى السكري',
      description: 'خطة تغذية متوازنة للتحكم في مستوى السكر في الدم',
      category: 'nutrition',
      priority: 'high',
      personalizedFor: ['السكري النوع الثاني'],
      tips: [
        'تناول 5-6 وجبات صغيرة يومياً',
        'تجنب السكريات المكررة',
        'أكثر من الألياف والبروتين',
        'اشرب الماء بكثرة'
      ],
      estimatedTime: 'يومياً'
    },
    {
      id: '3',
      title: 'تقنيات إدارة التوتر',
      description: 'طرق فعالة لتقليل التوتر وتحسين الصحة النفسية',
      category: 'lifestyle',
      priority: 'medium',
      personalizedFor: ['العمل المكتبي'],
      tips: [
        'تمارين التنفس العميق',
        'التأمل لمدة 10 دقائق يومياً',
        'أخذ فترات راحة منتظمة',
        'ممارسة هواية مفضلة'
      ],
      estimatedTime: '10-20 دقيقة يومياً'
    },
    {
      id: '4',
      title: 'فحوصات دورية مهمة',
      description: 'جدول الفحوصات الطبية الضرورية حسب عمرك وحالتك الصحية',
      category: 'prevention',
      priority: 'high',
      personalizedFor: ['عمر 35+'],
      tips: [
        'فحص ضغط الدم شهرياً',
        'فحص السكري كل 3 أشهر',
        'فحص الكوليسترول كل 6 أشهر',
        'فحص شامل سنوياً'
      ],
      estimatedTime: 'حسب الجدول'
    }
  ];

  useEffect(() => {
    // محاكاة تحميل التوصيات المخصصة
    const loadRecommendations = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRecommendations(mockRecommendations);
      setLoading(false);
    };

    loadRecommendations();
  }, []);

  const categories = [
    { id: 'all', name: 'الكل', icon: Star },
    { id: 'health', name: 'صحية', icon: Heart },
    { id: 'nutrition', name: 'تغذية', icon: TrendingUp },
    { id: 'lifestyle', name: 'نمط حياة', icon: Lightbulb },
    { id: 'prevention', name: 'وقائية', icon: Calendar }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-blue-100 text-blue-800';
      case 'nutrition': return 'bg-green-100 text-green-800';
      case 'lifestyle': return 'bg-purple-100 text-purple-800';
      case 'prevention': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  if (loading) {
    return (
      <Card className="animate-fade-in-scale">
        <CardContent className="p-8 text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحليل ملفك الصحي وإنشاء التوصيات المخصصة...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            التوصيات الطبية الذكية
          </CardTitle>
          <p className="text-sm text-gray-600">
            توصيات مخصصة بناءً على ملفك الصحي وأهدافك
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          <div className="grid gap-4">
            {filteredRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{recommendation.title}</h3>
                        <Badge className={getPriorityColor(recommendation.priority)}>
                          {recommendation.priority === 'high' && 'عالية الأولوية'}
                          {recommendation.priority === 'medium' && 'متوسطة الأولوية'}
                          {recommendation.priority === 'low' && 'منخفضة الأولوية'}
                        </Badge>
                        <Badge className={getCategoryColor(recommendation.category)}>
                          {categories.find(cat => cat.id === recommendation.category)?.name}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{recommendation.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recommendation.estimatedTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          مخصص لـ: {recommendation.personalizedFor.join(', ')}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium mb-2 text-sm">نصائح للتطبيق:</h4>
                        <ul className="space-y-1">
                          {recommendation.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;
