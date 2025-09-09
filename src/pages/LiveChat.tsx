import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Phone, Video, Minimize2, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'doctor' | 'support';
  timestamp: Date;
  type?: 'text' | 'image' | 'file';
}

const LiveChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeChat, setActiveChat] = useState<'doctor' | 'support'>('doctor');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      content: activeChat === 'doctor' 
        ? 'مرحباً بك! أنا الدكتور أحمد المختص في الطب العام. كيف يمكنني مساعدتك اليوم؟'
        : 'مرحباً بك في خدمة الدعم الفني. نحن هنا لمساعدتك في أي استفسار. كيف يمكنني خدمتك؟',
      sender: activeChat,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [activeChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const responses = activeChat === 'doctor' ? [
        'شكراً لك على استفسارك. دعني أساعدك في هذا الأمر.',
        'هذا سؤال مهم. أنصحك بـ...',
        'بناءً على ما ذكرت، أعتقد أن...',
        'هل يمكنك إخباري أكثر عن الأعراض؟'
      ] : [
        'تم تسجيل طلبك بنجاح. سنعود إليك قريباً.',
        'شكراً لتواصلك معنا. كيف يمكنني مساعدتك أكثر؟',
        'هذا الأمر يتطلب مراجعة. سأقوم بالتحقق وأعود إليك.',
        'تمت معالجة طلبك بنجاح.'
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: activeChat,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                العودة
              </Button>
              <h1 className="text-2xl font-bold">المحادثة المباشرة</h1>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={activeChat === 'doctor' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChat('doctor')}
              >
                استشارة طبية
              </Button>
              <Button
                variant={activeChat === 'support' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChat('support')}
              >
                الدعم الفني
              </Button>
            </div>
          </div>

          {/* Chat Container */}
          <Card className="bg-card border border-border">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage 
                    src={activeChat === 'doctor' ? '/doctor-avatar.png' : '/support-avatar.png'} 
                    alt={activeChat === 'doctor' ? 'Doctor' : 'Support'} 
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {activeChat === 'doctor' ? 'د' : 'د'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">
                    {activeChat === 'doctor' ? 'د. أحمد محمد' : 'فريق الدعم'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={isConnected ? 'default' : 'secondary'} 
                      className="text-xs"
                    >
                      {isConnected ? 'متصل' : 'غير متصل'}
                    </Badge>
                    {activeChat === 'doctor' && (
                      <span className="text-xs text-muted-foreground">
                        مختص في الطب العام
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {activeChat === 'doctor' && (
                  <>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground/70'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-muted/30">
              {activeChat === 'support' && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {['مشكلة في الحجز', 'استفسار عام', 'مشكلة تقنية', 'شكوى'].map((quick) => (
                    <Badge
                      key={quick}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setNewMessage(quick)}
                    >
                      {quick}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1"
                  dir="rtl"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Professional Features */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">الخصوصية والأمان</h3>
              <p className="text-sm text-muted-foreground">
                جميع المحادثات مشفرة ومحمية وفقاً لأعلى معايير الأمان الطبي
              </p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">استجابة فورية</h3>
              <p className="text-sm text-muted-foreground">
                فريقنا الطبي متاح 24/7 لتقديم الاستشارات العاجلة
              </p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">خبرة معتمدة</h3>
              <p className="text-sm text-muted-foreground">
                أطباء مختصون ومعتمدون من وزارة الصحة
              </p>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LiveChat;