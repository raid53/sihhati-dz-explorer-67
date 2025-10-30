import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

const STORAGE_KEY = 'demo_disclaimer_accepted';

interface DisclaimerModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const DisclaimerModal = ({ forceOpen = false, onClose }: DisclaimerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleRemindLater();
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleAccept = () => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    setIsOpen(false);
    onClose?.();
  };

  const handleRemindLater = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimerTitle"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleRemindLater();
      }}
    >
      <div
        className="relative w-full max-w-[min(92vw,600px)] max-h-[85vh] overflow-y-auto bg-background border border-border rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="disclaimerTitle"
              className="text-2xl font-bold text-foreground leading-tight"
              dir="rtl"
            >
              تنبيه قانوني / Legal Notice
            </h2>
            <button
              onClick={handleRemindLater}
              className="shrink-0 p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Arabic Content */}
          <div dir="rtl" className="space-y-4 text-right">
            <p className="text-base leading-relaxed text-foreground">
              هذا الموقع هو جزء من مشروع تخرج أكاديمي ضمن إطار مؤسسة ناشئة، تم تطويره لغرض تعليمي وبحثي بحت لعرض نموذج أولي لفكرة رقمية.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              كلّ البيانات والمعلومات المعروضة، بما في ذلك أسماء العيادات، المستشفيات، الأسعار، ومعلومات الاتصال، هي أمثلة افتراضية وتوضيحية لا تمثل أي جهة أو خدمة حقيقية.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              وفي حال تم الإشارة إلى عيادات أو مستشفيات حقيقية بالاسم، فذلك يأتي لأغراض تعليمية وتوضيحية فقط لتوضيح شكل الفكرة والنموذج الأولي، دون أي علاقة أو ارتباط فعلي بهذه الجهات.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              لا تتم عبر هذا الموقع أي عمليات دفع، حجز، أو تواصل فعلي، وجميع البيانات افتراضية بالكامل.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              يُستخدم المحتوى حصريًا لعرض المشروع الأكاديمي وتقييمه في سياق بحثي وتجريبي.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              قد تُذكر أسماء أو علامات تجارية لأغراض تدريبية فقط، وجميع الحقوق محفوظة لأصحابها.
            </p>
            <p className="text-base leading-relaxed font-semibold text-foreground">
              باستخدامك هذا الموقع، فأنت تقر وتفهم أن الغرض منه تعليمي وتجريبي بالكامل ضمن مشروع أكاديمي.
            </p>
          </div>

          {/* Separator */}
          <div className="border-t border-border" />

          {/* English Content */}
          <div dir="ltr" className="space-y-4 text-left">
            <p className="text-base leading-relaxed text-muted-foreground">
              This website is part of an academic graduation project developed within a startup framework, created solely for educational and research demonstration purposes to showcase a prototype concept.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              All displayed data—including clinic names, hospitals, prices, and contact details—are illustrative and fictional examples, not representing any real entities or services.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              If real clinic or hospital names are mentioned, this is strictly for educational and conceptual illustration only, with no endorsement or affiliation whatsoever.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              No real payments, bookings, or communications occur through this site.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              All materials are presented for academic evaluation and prototype demonstration purposes only.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Any trademarks or brand names appear for training use, and all rights remain with their respective owners.
            </p>
            <p className="text-base leading-relaxed font-semibold text-muted-foreground">
              By using this site, you acknowledge and understand its educational and experimental nature under an academic framework.
            </p>
          </div>

          {/* Don't Show Again Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-md" dir="rtl">
            <Checkbox
              id="dontShowAgain"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <label
              htmlFor="dontShowAgain"
              className="text-sm font-medium cursor-pointer select-none flex-1"
            >
              عدم إظهار هذه الرسالة مرة أخرى / Don't show again
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-background border-t border-border p-6 pt-4">
          <div className="flex flex-col sm:flex-row gap-3" dir="rtl">
            <Button
              onClick={handleAccept}
              className="flex-1 sm:order-2"
              size="lg"
            >
              أفهم / Understand
            </Button>
            <Button
              onClick={handleRemindLater}
              variant="outline"
              className="flex-1 sm:order-1"
              size="lg"
            >
              ذكّرني لاحقًا / Remind me later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Global function to open disclaimer manually
if (typeof window !== 'undefined') {
  (window as any).openDisclaimer = () => {
    const event = new CustomEvent('openDisclaimer');
    window.dispatchEvent(event);
  };
}
