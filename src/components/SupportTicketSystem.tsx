
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Ticket, Clock, AlertCircle, CheckCircle, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  userEmail: string;
}

const SupportTicketSystem: React.FC = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      title: 'مشكلة في حجز الموعد',
      description: 'لا أستطيع إكمال عملية حجز الموعد مع الطبيب',
      category: 'حجز المواعيد',
      priority: 'high',
      status: 'open',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userEmail: 'user@example.com'
    },
    {
      id: '2',
      title: 'استفسار عن التأمين',
      description: 'أريد معرفة المزيد عن شركات التأمين المقبولة',
      category: 'التأمين',
      priority: 'medium',
      status: 'in-progress',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      userEmail: 'user@example.com'
    }
  ]);

  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    userEmail: ''
  });

  const categories = [
    'حجز المواعيد',
    'مشاكل فنية',
    'التأمين',
    'الدفع والفواتير',
    'استفسارات عامة',
    'شكاوى',
    'اقتراحات'
  ];

  const priorityLabels = {
    low: { label: 'منخفضة', color: 'bg-gray-100 text-gray-800' },
    medium: { label: 'متوسطة', color: 'bg-yellow-100 text-yellow-800' },
    high: { label: 'عالية', color: 'bg-orange-100 text-orange-800' },
    urgent: { label: 'عاجلة', color: 'bg-red-100 text-red-800' }
  };

  const statusLabels = {
    open: { label: 'مفتوحة', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
    'in-progress': { label: 'قيد المعالجة', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    resolved: { label: 'محلولة', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    closed: { label: 'مغلقة', color: 'bg-gray-100 text-gray-800', icon: CheckCircle }
  };

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.description || !newTicket.category || !newTicket.userEmail) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const ticket: SupportTicket = {
      id: (tickets.length + 1).toString(),
      ...newTicket,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTickets(prev => [ticket, ...prev]);
    setNewTicket({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      userEmail: ''
    });
    setShowNewTicketForm(false);

    toast({
      title: "تم إنشاء التذكرة بنجاح!",
      description: `رقم التذكرة: #${ticket.id}. سيتم الرد عليك قريباً.`
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-DZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* رأس النظام */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">نظام تذاكر الدعم الفني</h2>
            <p className="text-gray-600">إدارة وتتبع طلبات الدعم الفني</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowNewTicketForm(!showNewTicketForm)}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          <Ticket className="w-4 h-4 mr-2" />
          تذكرة جديدة
        </Button>
      </div>

      {/* نموذج التذكرة الجديدة */}
      {showNewTicketForm && (
        <Card className="animate-fade-in-scale">
          <CardHeader>
            <CardTitle>إنشاء تذكرة دعم جديدة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ticketTitle">عنوان التذكرة</Label>
                <Input
                  id="ticketTitle"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان مختصر للمشكلة"
                />
              </div>
              <div>
                <Label htmlFor="ticketEmail">البريد الإلكتروني</Label>
                <Input
                  id="ticketEmail"
                  type="email"
                  value={newTicket.userEmail}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, userEmail: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>فئة المشكلة</Label>
                <Select value={newTicket.category} onValueChange={(value) => setNewTicket(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>الأولوية</Label>
                <Select value={newTicket.priority} onValueChange={(value: any) => setNewTicket(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(priorityLabels).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="ticketDescription">وصف المشكلة</Label>
              <Textarea
                id="ticketDescription"
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                placeholder="اشرح المشكلة بالتفصيل..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCreateTicket} className="flex-1">
                إنشاء التذكرة
              </Button>
              <Button variant="outline" onClick={() => setShowNewTicketForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* قائمة التذاكر */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">تذاكر الدعم الحالية</h3>
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد تذاكر دعم حالياً</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket) => {
              const StatusIcon = statusLabels[ticket.status].icon;
              return (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            #{ticket.id} - {ticket.title}
                          </h4>
                          <Badge className={statusLabels[ticket.status].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusLabels[ticket.status].label}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {ticket.userEmail}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(ticket.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={priorityLabels[ticket.priority].color}>
                          {priorityLabels[ticket.priority].label}
                        </Badge>
                        <Badge variant="outline">
                          {ticket.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTicketSystem;
