
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wallet, Plus, Minus, History, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const DigitalWallet: React.FC = () => {
  const { toast } = useToast();
  const [balance] = useState(25000);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'debit',
      amount: 3500,
      description: 'دفع موعد - د. سارة أحمد',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'credit',
      amount: 10000,
      description: 'شحن المحفظة',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'debit',
      amount: 2000,
      description: 'دفع استشارة طبية',
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: 'TXN004',
      type: 'credit',
      amount: 5000,
      description: 'مكافأة الإحالة',
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  const handleTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال مبلغ صحيح",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    toast({
      title: "تم شحن المحفظة!",
      description: `تم إضافة ${parseFloat(topUpAmount).toLocaleString()} دج إلى محفظتك`,
    });

    setTopUpAmount('');
  };

  return (
    <div className="space-y-6">
      {/* رصيد المحفظة */}
      <Card className="animate-fade-in-scale bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 mb-2">رصيد المحفظة</p>
              <p className="text-3xl font-bold">{balance.toLocaleString()} دج</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="animate-fade-in-scale stagger-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الإيداعات</p>
                <p className="font-bold">15,000 دج</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale stagger-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي المصروفات</p>
                <p className="font-bold">5,500 دج</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale stagger-3">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <History className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">عدد المعاملات</p>
                <p className="font-bold">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* شحن المحفظة */}
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            شحن المحفظة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="أدخل المبلغ"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTopUp} disabled={loading}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  شحن
                </>
              )}
            </Button>
          </div>
          
          {/* مبالغ سريعة */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">مبالغ سريعة:</p>
            <div className="grid grid-cols-4 gap-2">
              {[1000, 5000, 10000, 20000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setTopUpAmount(amount.toString())}
                  className="text-xs"
                >
                  {amount.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* تاريخ المعاملات */}
      <Card className="animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            تاريخ المعاملات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount.toLocaleString()} دج
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {transaction.status === 'completed' ? 'مكتملة' : 
                     transaction.status === 'pending' ? 'قيد المعالجة' : 'فشلت'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalWallet;
