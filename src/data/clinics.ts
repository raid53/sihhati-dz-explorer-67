export interface Clinic {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  distance: string;
  nextAvailable: string;
  price: string;
  verified: boolean;
  type: 'clinic' | 'hospital' | 'center';
  doctors?: string[];
  services?: string[];
  phone?: string;
  address?: string;
  hours?: string;
  description?: string;
}

export const defaultClinics: Clinic[] = [
  {
    id: 1,
    name: 'عيادة الدكتور محمد شاوي',
    specialty: 'طب الأسنان',
    rating: 4.8,
    reviews: 124,
    location: 'حي بومعراف، الجزائر العاصمة',
    image: '/src/assets/clinic-1.jpg',
    distance: '2.5 كم',
    nextAvailable: 'اليوم 3:30 م',
    price: 'من 3000 دج',
    verified: true,
    type: 'clinic',
    doctors: ['د. محمد شاوي'],
    services: ['تبييض الأسنان', 'تقويم الأسنان', 'زراعة الأسنان'],
    phone: '+213 21 123 456',
    address: 'حي بومعراف، الجزائر العاصمة',
    hours: 'السبت-الخميس: 8:00-18:00',
    description: 'عيادة متخصصة في طب الأسنان بأحدث التقنيات'
  },
  {
    id: 2,
    name: 'مستشفى الشهيد خليل عمران',
    specialty: 'طب القلب والأوعية الدموية',
    rating: 4.9,
    reviews: 89,
    location: 'وسط المدينة، وهران',
    image: '/src/assets/hospital-1.jpg',
    distance: '1.2 كم',
    nextAvailable: 'غداً 10:00 ص',
    price: 'من 4500 دج',
    verified: true,
    type: 'hospital',
    doctors: ['د. خليل عمران', 'د. سارة بوزيد'],
    services: ['قسطرة قلبية', 'تخطيط قلب', 'استشارات قلبية'],
    phone: '+213 41 234 567',
    address: 'وسط المدينة، وهران',
    hours: '24/7',
    description: 'مستشفى متخصص في أمراض القلب والأوعية الدموية'
  },
  {
    id: 3,
    name: 'عيادة الدكتورة فاطمة مداني',
    specialty: 'طب الأطفال والرضع',
    rating: 4.7,
    reviews: 156,
    location: 'حي الجامعة، قسنطينة',
    image: '/src/assets/clinic-2.jpg',
    distance: '3.8 كم',
    nextAvailable: 'اليوم 5:00 م',
    price: 'من 2500 دج',
    verified: true,
    type: 'clinic',
    doctors: ['د. فاطمة مداني'],
    services: ['فحوصات الأطفال', 'تطعيمات', 'متابعة النمو'],
    phone: '+213 31 345 678',
    address: 'حي الجامعة، قسنطينة',
    hours: 'السبت-الخميس: 9:00-17:00',
    description: 'عيادة متخصصة في طب الأطفال والرضع'
  },
  {
    id: 4,
    name: 'مركز الشفاء للعلاج الطبيعي',
    specialty: 'العلاج الطبيعي وإعادة التأهيل',
    rating: 4.6,
    reviews: 123,
    location: 'حي النصر، سطيف',
    image: '/src/assets/hospital-2.jpg',
    distance: '4.2 كم',
    nextAvailable: 'غداً 2:00 م',
    price: 'من 2000 دج',
    verified: false,
    type: 'center',
    doctors: ['د. أمين بوزيد', 'د. ليلى حمدي'],
    services: ['علاج طبيعي', 'تأهيل حركي', 'تدليك علاجي'],
    phone: '+213 36 456 789',
    address: 'حي النصر، سطيف',
    hours: 'السبت-الخميس: 8:00-19:00',
    description: 'مركز متخصص في العلاج الطبيعي وإعادة التأهيل'
  },
  {
    id: 5,
    name: 'عيادة الدكتور عبد الرحمن زروقي',
    specialty: 'طب العيون',
    rating: 4.8,
    reviews: 198,
    location: 'شارع الاستقلال، عنابة',
    image: '/src/assets/clinic-1.jpg',
    distance: '3.1 كم',
    nextAvailable: 'اليوم 4:30 م',
    price: 'من 3500 دج',
    verified: true,
    type: 'clinic',
    doctors: ['د. عبد الرحمن زروقي'],
    services: ['فحص نظر', 'عمليات الليزك', 'علاج المياه البيضاء'],
    phone: '+213 38 567 890',
    address: 'شارع الاستقلال، عنابة',
    hours: 'السبت-الخميس: 9:00-18:00',
    description: 'عيادة متخصصة في طب وجراحة العيون'
  },
  {
    id: 6,
    name: 'مركز الأمل للصحة النفسية',
    specialty: 'الطب النفسي والعلاج النفسي',
    rating: 4.5,
    reviews: 87,
    location: 'حي البدر، تلمسان',
    image: '/src/assets/hospital-1.jpg',
    distance: '5.7 كم',
    nextAvailable: 'غداً 11:00 ص',
    price: 'من 4000 دج',
    verified: true,
    type: 'center',
    doctors: ['د. رشيد بن عمر', 'د. سميرة الحاج'],
    services: ['استشارات نفسية', 'علاج نفسي', 'إعادة تأهيل'],
    phone: '+213 43 678 901',
    address: 'حي البدر، تلمسان',
    hours: 'السبت-الخميس: 9:00-17:00',
    description: 'مركز متخصص في الصحة النفسية والعلاج النفسي'
  },
  {
    id: 7,
    name: 'عيادة السعادة الطبية',
    specialty: 'الطب العام والباطنية',
    rating: 4.7,
    reviews: 142,
    location: 'وسط المدينة، غرداية',
    image: '/src/assets/clinic-2.jpg',
    distance: '2.8 كم',
    nextAvailable: 'اليوم 2:00 م',
    price: 'من 2500 دج',
    verified: true,
    type: 'clinic',
    doctors: ['د. يوسف السعيد', 'د. نادية قاسم'],
    services: ['فحص عام', 'استشارات طبية', 'تحاليل'],
    phone: '+213 29 789 012',
    address: 'وسط المدينة، غرداية',
    hours: 'السبت-الخميس: 8:00-19:00',
    description: 'عيادة طبية عامة تقدم خدمات طبية شاملة'
  },
  {
    id: 8,
    name: 'عيادة الحكيم بوعلام لطرش',
    specialty: 'معالجة السمنة وسوء التغذية وطب التجميل',
    rating: 4.9,
    reviews: 95,
    location: 'وسط المدينة، غرداية',
    image: '/src/assets/clinic-1.jpg',
    distance: '1.5 كم',
    nextAvailable: 'اليوم 4:00 م',
    price: 'من 4000 دج',
    verified: true,
    type: 'clinic',
    doctors: ['د. بوعلام لطرش'],
    services: ['علاج السمنة', 'طب تجميل', 'تغذية علاجية'],
    phone: '+213 29 890 123',
    address: 'وسط المدينة، غرداية',
    hours: 'السبت-الخميس: 9:00-18:00',
    description: 'عيادة متخصصة في معالجة السمنة وطب التجميل'
  },
  {
    id: 9,
    name: 'مصحة السعادة',
    specialty: 'جراحة متخصصة',
    rating: 4.8,
    reviews: 87,
    location: 'قرب المطار، غرداية',
    image: '/src/assets/hospital-2.jpg',
    distance: '8.2 كم',
    nextAvailable: 'غداً 9:00 ص',
    price: 'من 5000 دج',
    verified: true,
    type: 'hospital',
    doctors: ['د. أحمد المهدي', 'د. سعاد بن علي'],
    services: ['جراحة عامة', 'جراحة تجميلية', 'عمليات متخصصة'],
    phone: '+213 29 901 234',
    address: 'قرب المطار، غرداية',
    hours: '24/7',
    description: 'مصحة متخصصة في الجراحة والعمليات المعقدة'
  }
];
