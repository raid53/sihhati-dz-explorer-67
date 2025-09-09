
import { Heart, User, MapPin, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Heart,
      number: '4,250',
      label: 'مقدم خدمة صحية',
      color: 'text-red-500'
    },
    {
      icon: User,
      number: '52,000',
      label: 'مريض راضٍ',
      color: 'text-blue-500'
    },
    {
      icon: MapPin,
      number: '49',
      label: 'ولاية مغطاة',
      color: 'text-green-500'
    },
    {
      icon: Star,
      number: '4.8',
      label: 'متوسط التقييم',
      color: 'text-yellow-500'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            أرقام تتحدث عن نفسها
          </h2>
          <p className="text-gray-600 text-lg">
            نفخر بثقة عملائنا وجودة خدماتنا
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-50 transition-colors duration-300">
                <stat.icon className={`w-10 h-10 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
