
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  count: string;
  route: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  count,
  route 
}) => {
  return (
    <Link to={route}>
      <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-lift">
        <CardContent className="p-6">
          <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              {count}
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Icon className="w-4 h-4 text-green-600" />
            </div>
          </div>
          
          {/* شريط التقدم */}
          <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full group-hover:animate-gradient-x transition-all duration-500" 
                 style={{ width: '70%' }}></div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
