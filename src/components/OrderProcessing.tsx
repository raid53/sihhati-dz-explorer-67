import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, CreditCard, Package, Truck, Shield } from 'lucide-react';

interface OrderProcessingProps {
  onProcessingComplete: () => void;
}

const OrderProcessing = ({ onProcessingComplete }: OrderProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const processingSteps = [
    { icon: CreditCard, title: 'التحقق من معلومات الدفع', duration: 2000 },
    { icon: Shield, title: 'تأمين المعاملة', duration: 1500 },
    { icon: Package, title: 'تأكيد الطلب', duration: 1800 },
    { icon: Truck, title: 'إشعار فريق التوصيل', duration: 1200 },
    { icon: CheckCircle, title: 'تم بنجاح!', duration: 1000 }
  ];

  useEffect(() => {
    let totalDuration = 0;
    let currentDuration = 0;

    const processSteps = async () => {
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentStep(i);
        totalDuration += processingSteps[i].duration;
        
        // Animate progress for current step
        const stepProgress = ((i + 1) / processingSteps.length) * 100;
        
        const progressInterval = setInterval(() => {
          currentDuration += 50;
          const newProgress = Math.min((currentDuration / totalDuration) * 100, stepProgress);
          setProgress(newProgress);
          
          if (newProgress >= stepProgress) {
            clearInterval(progressInterval);
          }
        }, 50);

        await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration));
      }

      setTimeout(() => {
        onProcessingComplete();
      }, 500);
    };

    processSteps();
  }, [onProcessingComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 animate-fade-scale">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            {React.createElement(processingSteps[currentStep].icon, {
              className: "w-8 h-8 text-primary animate-pulse"
            })}
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              جاري معالجة طلبك
            </h3>
            <p className="text-muted-foreground">
              {processingSteps[currentStep].title}
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% مكتمل
            </p>
          </div>

          <div className="space-y-2">
            {processingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 text-sm p-2 rounded-lg transition-all duration-300 ${
                  index < currentStep 
                    ? 'text-green-600 bg-green-50' 
                    : index === currentStep 
                      ? 'text-primary bg-primary/5 animate-pulse' 
                      : 'text-muted-foreground'
                }`}
              >
                {React.createElement(step.icon, {
                  className: `w-4 h-4 ${index < currentStep ? 'text-green-500' : index === currentStep ? 'text-primary' : 'text-muted-foreground'}`
                })}
                <span>{step.title}</span>
                {index < currentStep && (
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderProcessing;