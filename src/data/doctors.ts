export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  nextAvailable: string;
  image: string;
  specialties?: string[];
}

export const defaultDoctors: Doctor[] = [
  {
    id: 1,
    name: 'د. كريم الزهراني',
    specialty: 'طبيب قلب',
    experience: '15 سنة خبرة',
    location: 'الجزائر العاصمة',
    rating: 4.9,
    reviews: 234,
    price: '3000 دج',
    nextAvailable: 'غداً 10:00 ص',
    image: '/src/assets/doctor-male-1.jpg'
  },
  {
    id: 2,
    name: 'د. نادية السعدي',
    specialty: 'طبيبة أطفال',
    experience: '12 سنة خبرة',
    location: 'وهران',
    rating: 4.8,
    reviews: 189,
    price: '2500 دج',
    nextAvailable: 'اليوم 14:30',
    image: '/src/assets/doctor-female-2.jpg'
  },
  {
    id: 3,
    name: 'د. ياسين المنصوري',
    specialty: 'طبيب عظام',
    experience: '20 سنة خبرة',
    location: 'قسنطينة',
    rating: 4.7,
    reviews: 156,
    price: '3500 دج',
    nextAvailable: 'بعد غد 09:00 ص',
    image: '/src/assets/doctor-male-2.jpg'
  },
  {
    id: 4,
    name: 'د. ليلى الوردي',
    specialty: 'طبيبة جلدية',
    experience: '8 سنوات خبرة',
    location: 'عنابة',
    rating: 4.6,
    reviews: 98,
    price: '2800 دج',
    nextAvailable: 'الأسبوع المقبل',
    image: '/src/assets/doctor-female-1.jpg'
  },
  {
    id: 5,
    name: 'د. رشيد القاسمي',
    specialty: 'أخصائي قلب وأوعية دموية',
    experience: '15 سنة خبرة',
    location: 'غرداية',
    rating: 4.8,
    reviews: 156,
    price: '3200 دج',
    nextAvailable: 'بعد غد 9:00 ص',
    image: '/src/assets/doctor-male-1.jpg'
  },
  {
    id: 6,
    name: 'د. عماد الفاسي',
    specialty: 'طب التغذية وطب التجميل',
    experience: '18 سنة خبرة - دراسة في فرنسا',
    location: 'غرداية',
    rating: 4.9,
    reviews: 167,
    price: '4000 دج',
    nextAvailable: 'اليوم 15:00',
    image: '/src/assets/doctor-male-2.jpg',
    specialties: ['معالجة السمنة وسوء التغذية', 'طب التجميل', 'العلاج بالليزر', 'الأمراض العامة']
  },
  {
    id: 7,
    name: 'د. أحمد بن علي',
    specialty: 'طبيب عام',
    experience: '12 سنة خبرة',
    location: 'الجزائر العاصمة',
    rating: 4.9,
    reviews: 178,
    price: '2000 دج',
    nextAvailable: 'متاح الآن',
    image: '/src/assets/doctor-male-1.jpg',
    specialties: ['طب عن بعد', 'استشارات عامة']
  },
  {
    id: 8,
    name: 'د. فاطمة محمدي',
    specialty: 'طبيبة نفسية',
    experience: '8 سنوات خبرة',
    location: 'وهران',
    rating: 4.8,
    reviews: 145,
    price: '2500 دج',
    nextAvailable: 'متاح الآن',
    image: '/src/assets/doctor-female-1.jpg',
    specialties: ['طب عن بعد', 'صحة نفسية']
  },
  {
    id: 9,
    name: 'د. محمد العربي',
    specialty: 'طبيب جلدية',
    experience: '15 سنة خبرة',
    location: 'قسنطينة',
    rating: 4.7,
    reviews: 134,
    price: '3000 دج',
    nextAvailable: 'غداً 10:00 ص',
    image: '/src/assets/doctor-male-2.jpg',
    specialties: ['طب عن بعد', 'أمراض جلدية']
  },
  {
    id: 10,
    name: 'د. محمد بن عبد الله بومدين',
    specialty: 'طب الباطنة العام',
    experience: '15 سنة خبرة',
    location: 'الجزائر العاصمة',
    rating: 4.9,
    reviews: 210,
    price: '3000 دج',
    nextAvailable: 'اليوم 09:00 ص',
    image: '/src/assets/doctor-male-1.jpg',
    specialties: ['طب عن بعد', 'باطنة', 'استشارات عامة']
  },
  {
    id: 11,
    name: 'د. عائشة بن زيان',
    specialty: 'طب النساء والتوليد',
    experience: '12 سنة خبرة',
    location: 'وهران',
    rating: 4.8,
    reviews: 187,
    price: '3500 دج',
    nextAvailable: 'اليوم 08:00 ص',
    image: '/src/assets/doctor-female-2.jpg',
    specialties: ['طب عن بعد', 'نساء وتوليد', 'طب تناسلي']
  },
  {
    id: 12,
    name: 'د. عبد الرزاق بلعيد',
    specialty: 'طب الأطفال',
    experience: '10 سنوات خبرة',
    location: 'قسنطينة',
    rating: 4.7,
    reviews: 165,
    price: '2800 دج',
    nextAvailable: 'اليوم 09:00 ص',
    image: '/src/assets/doctor-male-2.jpg',
    specialties: ['طب عن بعد', 'طب أطفال', 'تغذية علاجية']
  },
  {
    id: 13,
    name: 'د. خديجة مصطفاي',
    specialty: 'الطب النفسي',
    experience: '8 سنوات خبرة',
    location: 'الجزائر العاصمة',
    rating: 4.9,
    reviews: 192,
    price: '4000 دج',
    nextAvailable: 'اليوم 10:00 ص',
    image: '/src/assets/doctor-female-1.jpg',
    specialties: ['طب عن بعد', 'طب نفسي', 'علاج معرفي سلوكي']
  }
];
