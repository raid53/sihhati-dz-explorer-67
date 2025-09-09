
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Phone, Video, X, Minimize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'doctor' | 'bot';
  timestamp: Date;
  doctorName?: string;
  isTyping?: boolean;
}

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  chatType: 'doctor' | 'support';
  doctorName?: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ 
  isOpen, 
  onClose, 
  onMinimize, 
  chatType, 
  doctorName 
}) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // الأسئلة الشائعة للبوت الذكي
  const botResponses = {
    'مرحبا': 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟',
    'مواعيد': 'يمكنك حجز موعد من خلال صفحة العيادات، أو يمكنني مساعدتك في العثور على أقرب موعد متاح.',
    'اسعار': 'تختلف الأسعار حسب نوع الخدمة والطبيب. هل تريد معرفة أسعار خدمة معينة؟',
    'طوارئ': 'في حالات الطوارئ، يرجى الاتصال فوراً بالرقم 14 أو التوجه لأقرب مستشفى.',
    'تأمين': 'نحن نتعامل مع معظم شركات التأمين المحلية. يرجى التأكد من تغطية تأمينك قبل الحجز.',
    'الغاء': 'يمكنك إلغاء أو تعديل موعدك قبل 24 ساعة على الأقل من الموعد المحدد.'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // رسالة ترحيب تلقائية
      const welcomeMessage: Message = {
        id: '1',
        content: chatType === 'doctor' 
          ? `مرحباً! الدكتور ${doctorName} متاح الآن للدردشة معك.`
          : 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
        sender: chatType === 'doctor' ? 'doctor' : 'bot',
        timestamp: new Date(),
        doctorName: chatType === 'doctor' ? doctorName : undefined
      };
      setMessages([welcomeMessage]);
      setIsConnected(true);
    }
  }, [isOpen, chatType, doctorName]);

  const handleSendMessage = async () => {
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

    // محاكاة استجابة البوت أو الطبيب
    setTimeout(() => {
      let responseContent = '';
      
      if (chatType === 'support') {
        // البحث عن إجابة البوت
        const messageKey = Object.keys(botResponses).find(key => 
          newMessage.toLowerCase().includes(key)
        );
        responseContent = messageKey ? botResponses[messageKey as keyof typeof botResponses] 
          : 'أعتذر، لم أفهم طلبك. هل يمكنك إعادة صياغته؟ أو يمكنك التحدث مع أحد ممثلي خدمة العملاء.';
      } else {
        // استجابة الطبيب
        responseContent = 'شكراً لك على رسالتك. سأراجع حالتك وأرد عليك قريباً.';
      }

      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: chatType === 'doctor' ? 'doctor' : 'bot',
        timestamp: new Date(),
        doctorName: chatType === 'doctor' ? doctorName : undefined
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col animate-slide-in-bottom">
      {/* رأس الدردشة */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          {chatType === 'doctor' ? (
            <User className="w-8 h-8 bg-white/20 rounded-full p-1" />
          ) : (
            <Bot className="w-8 h-8 bg-white/20 rounded-full p-1" />
          )}
          <div>
            <h3 className="font-semibold">
              {chatType === 'doctor' ? `د. ${doctorName}` : 'المساعد الذكي'}
            </h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-xs">متصل الآن</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {chatType === 'doctor' && (
            <>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Video className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button size="sm" variant="ghost" onClick={onMinimize} className="text-white hover:bg-white/20">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* منطقة الرسائل */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-green-500 text-white rounded-br-none'
                  : message.sender === 'doctor'
                  ? 'bg-blue-100 text-gray-800 rounded-bl-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.sender !== 'user' && (
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'doctor' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === 'doctor' ? message.doctorName : 'المساعد الذكي'}
                  </span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString('ar-DZ', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* منطقة إدخال الرسالة */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالتك..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {chatType === 'support' && (
          <div className="mt-2 flex flex-wrap gap-1">
            {Object.keys(botResponses).map((key) => (
              <Badge 
                key={key}
                variant="secondary" 
                className="cursor-pointer text-xs hover:bg-green-100"
                onClick={() => setNewMessage(key)}
              >
                {key}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSystem;
