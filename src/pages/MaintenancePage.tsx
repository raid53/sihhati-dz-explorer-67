import React from 'react';
import { Construction, Wrench } from 'lucide-react';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Construction className="w-24 h-24 text-primary animate-pulse" />
            <Wrench className="w-12 h-12 text-secondary absolute -bottom-2 -right-2 animate-bounce" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            الموقع قيد التطوير
          </h1>
          <p className="text-xl text-muted-foreground" dir="ltr">
            Site Under Development
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-lg space-y-4">
          <p className="text-lg text-foreground leading-relaxed">
            نعمل حاليًا على تحسين وتطوير المنصة لتقديم أفضل تجربة ممكنة.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed" dir="ltr">
            We are currently working on improving and developing the platform to provide the best possible experience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span>جاري العمل على التحديثات</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center gap-2" dir="ltr">
            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
            <span>Working on updates</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground pt-8">
          شكراً لتفهمكم | Thank you for your understanding
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
