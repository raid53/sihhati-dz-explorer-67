
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Filter, Search } from 'lucide-react';

interface MapLocation {
  id: number;
  name: string;
  type: 'clinic' | 'hospital' | 'pharmacy';
  lat: number;
  lng: number;
  address: string;
  rating: number;
  specialty?: string;
  distance: string;
}

const InteractiveMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const locations: MapLocation[] = [
    {
      id: 1,
      name: 'عيادة النور الطبية',
      type: 'clinic',
      lat: 36.7538,
      lng: 3.0588,
      address: 'حي السلام، الجزائر العاصمة',
      rating: 4.8,
      specialty: 'طب الأسنان',
      distance: '500 م'
    },
    {
      id: 2,
      name: 'مستشفى الأمل',
      type: 'hospital',
      lat: 36.7580,
      lng: 3.0620,
      address: 'شارع ديدوش مراد، الجزائر العاصمة',
      rating: 4.9,
      specialty: 'طب القلب',
      distance: '1.2 كم'
    },
    {
      id: 3,
      name: 'صيدلية الشفاء',
      type: 'pharmacy',
      lat: 36.7520,
      lng: 3.0560,
      address: 'ساحة أول مايو، الجزائر العاصمة',
      rating: 4.5,
      distance: '300 م'
    },
    {
      id: 4,
      name: 'عيادة الأطفال المتخصصة',
      type: 'clinic',
      lat: 36.7600,
      lng: 3.0650,
      address: 'بئر مراد رايس، الجزائر العاصمة',
      rating: 4.7,
      specialty: 'طب الأطفال',
      distance: '2.1 كم'
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'clinic': return '🏥';
      case 'hospital': return '🏨';
      case 'pharmacy': return '💊';
      default: return '📍';
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'clinic': return 'bg-green-500';
      case 'hospital': return 'bg-blue-500';
      case 'pharmacy': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredLocations = filter === 'all' 
    ? locations 
    : locations.filter(loc => loc.type === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Map Area */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                الخريطة التفاعلية
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Navigation className="w-4 h-4" />
                  موقعي
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Search className="w-4 h-4" />
                  بحث
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[500px] p-0">
            {/* Simulated Map Container */}
            <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 relative rounded-lg overflow-hidden">
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="border border-gray-200" />
                  ))}
                </div>
              </div>

              {/* Location Markers */}
              {filteredLocations.map((location, index) => (
                <div
                  key={location.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-bounce-in stagger-${index + 1}`}
                  style={{
                    left: `${20 + (index * 15)}%`,
                    top: `${30 + (index * 10)}%`
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className={`w-8 h-8 ${getLocationColor(location.type)} rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform`}>
                    <span className="text-xs">{getLocationIcon(location.type)}</span>
                  </div>
                  {selectedLocation?.id === location.id && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-[200px] z-10 animate-fade-in-scale">
                      <h4 className="font-semibold text-sm mb-1">{location.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{location.address}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span>⭐ {location.rating}</span>
                        <span className="text-green-600">{location.distance}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* User Location */}
              <div
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: '25%', top: '35%' }}
              >
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 opacity-25 rounded-full animate-ping" />
              </div>

              {/* Distance Lines */}
              {selectedLocation && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="25%"
                    y1="35%"
                    x2={`${20 + (filteredLocations.findIndex(l => l.id === selectedLocation.id) * 15)}%`}
                    y2={`${30 + (filteredLocations.findIndex(l => l.id === selectedLocation.id) * 10)}%`}
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-4 h-4" />
              التصفية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { value: 'all', label: 'الكل', count: locations.length },
              { value: 'clinic', label: 'العيادات', count: locations.filter(l => l.type === 'clinic').length },
              { value: 'hospital', label: 'المستشفيات', count: locations.filter(l => l.type === 'hospital').length },
              { value: 'pharmacy', label: 'الصيدليات', count: locations.filter(l => l.type === 'pharmacy').length }
            ].map((filterOption) => (
              <Button
                key={filterOption.value}
                variant={filter === filterOption.value ? "default" : "outline"}
                size="sm"
                className="w-full justify-between"
                onClick={() => setFilter(filterOption.value)}
              >
                {filterOption.label}
                <span className="bg-white/20 px-2 py-1 rounded text-xs">
                  {filterOption.count}
                </span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Location List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">الأماكن القريبة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedLocation?.id === location.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{location.name}</h4>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {location.distance}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{location.address}</p>
                {location.specialty && (
                  <p className="text-xs text-blue-600 mb-2">{location.specialty}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs">⭐ {location.rating}</span>
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                    توجيه
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
