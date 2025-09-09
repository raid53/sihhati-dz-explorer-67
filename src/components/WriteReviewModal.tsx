
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Star, Upload, X, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WriteReviewModalProps {
  clinicId: number;
  clinicName: string;
  onReviewSubmitted?: () => void;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ 
  clinicId, 
  clinicName, 
  onReviewSubmitted 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const specialties = [
    'طب القلب', 'طب الأطفال', 'الطب الباطني', 'الجراحة العامة',
    'طب العيون', 'طب الأسنان', 'النساء والولادة', 'الطب النفسي',
    'جراحة العظام', 'الأمراض الجلدية', 'أمراض الأنف والأذن والحنجرة'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "تحذير",
        description: "يمكنك رفع 5 صور كحد أقصى",
        variant: "destructive"
      });
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار تقييم",
        variant: "destructive"
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة تعليق لا يقل عن 10 أحرف",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // محاكاة إرسال التقييم
    setTimeout(() => {
      toast({
        title: "تم بنجاح",
        description: "تم إرسال تقييمك بنجاح",
      });
      
      // إعادة تعيين النموذج
      setRating(0);
      setComment('');
      setSpecialty('');
      setImages([]);
      setIsOpen(false);
      setIsSubmitting(false);
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="health-gradient text-white">
          اكتب تقييمك
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold">
            تقييم {clinicName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-1">
          {/* التقييم بالنجوم */}
          <div className="text-center">
            <Label className="text-lg font-semibold mb-4 block">تقييمك العام</Label>
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {rating === 0 && 'اختر تقييمك'}
              {rating === 1 && 'سيء جداً'}
              {rating === 2 && 'سيء'}
              {rating === 3 && 'متوسط'}
              {rating === 4 && 'جيد'}
              {rating === 5 && 'ممتاز'}
            </p>
          </div>

          {/* التخصص */}
          <div>
            <Label className="text-sm font-medium mb-2 block">التخصص المعالج</Label>
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <Badge
                  key={spec}
                  variant={specialty === spec ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    specialty === spec 
                      ? 'bg-green-500 text-white' 
                      : 'hover:bg-green-50'
                  }`}
                  onClick={() => setSpecialty(spec)}
                >
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* التعليق */}
          <div>
            <Label htmlFor="comment" className="text-sm font-medium mb-2 block">
              تعليقك (مطلوب)
            </Label>
            <Textarea
              id="comment"
              placeholder="شاركنا تجربتك مع هذه العيادة..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 حرف
            </p>
          </div>

          {/* رفع الصور */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              صور (اختياري - حتى 5 صور)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  اضغط لرفع الصور
                </span>
              </label>
            </div>

            {/* معاينة الصور */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* أزرار الإجراء */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 health-gradient text-white"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewModal;
