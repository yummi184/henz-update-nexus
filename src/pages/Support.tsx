
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const { toast } = useToast();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    // Load existing messages for this user
    const userMessages = JSON.parse(localStorage.getItem(`support_${currentUser.id}`) || '[]');
    setMessages(userMessages);
  }, [currentUser.id]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      message: message.trim(),
      timestamp: Date.now(),
      isAdmin: false,
      status: 'sent'
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`support_${currentUser.id}`, JSON.stringify(updatedMessages));

    // Also add to admin support queue
    const adminSupport = JSON.parse(localStorage.getItem('adminSupport') || '[]');
    adminSupport.push(newMessage);
    localStorage.setItem('adminSupport', JSON.stringify(adminSupport));

    setMessage('');
    toast({
      title: 'Message Sent',
      description: 'Your message has been sent to support.'
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Support Chat</h1>
          <p className="text-gray-400">Chat with our support team</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat with Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <div className="bg-slate-700/50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.isAdmin 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-600 text-white'
                      }`}>
                        {msg.isAdmin && (
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-semibold">Admin</span>
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </div>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-slate-600 border-slate-500 text-white"
              />
              <Button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Support;
