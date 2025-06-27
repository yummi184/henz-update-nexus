
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageCircle, Send, CheckCircle, Settings, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [toolLinks, setToolLinks] = useState({
    freeHacks: '',
    walletFlasher: '',
    bankFlasher: '',
    socialFlasher: '',
    apiDashboard: ''
  });
  const [tempLinks, setTempLinks] = useState({
    freeHacks: '',
    walletFlasher: '',
    bankFlasher: '',
    socialFlasher: '',
    apiDashboard: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
    loadSupportMessages();
    loadToolLinks();
  }, []);

  const loadUsers = () => {
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        const userData = JSON.parse(localStorage.getItem(key) || '{}');
        allUsers.push(userData);
      }
    }
    setUsers(allUsers);
  };

  const loadSupportMessages = () => {
    const messages = JSON.parse(localStorage.getItem('adminSupport') || '[]');
    setSupportMessages(messages);
  };

  const loadToolLinks = () => {
    const links = JSON.parse(localStorage.getItem('toolLinks') || '{}');
    setToolLinks({
      freeHacks: links.freeHacks || '',
      walletFlasher: links.walletFlasher || '',
      bankFlasher: links.bankFlasher || '',
      socialFlasher: links.socialFlasher || '',
      apiDashboard: links.apiDashboard || ''
    });
    setTempLinks({
      freeHacks: links.freeHacks || '',
      walletFlasher: links.walletFlasher || '',
      bankFlasher: links.bankFlasher || '',
      socialFlasher: links.socialFlasher || '',
      apiDashboard: links.apiDashboard || ''
    });
  };

  const sendReply = (userId: string) => {
    if (!replyMessage.trim()) return;

    const adminReply = {
      id: Date.now(),
      userId: userId,
      userName: 'Admin',
      message: replyMessage.trim(),
      timestamp: Date.now(),
      isAdmin: true,
      status: 'sent'
    };

    // Add to user's support messages
    const userMessages = JSON.parse(localStorage.getItem(`support_${userId}`) || '[]');
    userMessages.push(adminReply);
    localStorage.setItem(`support_${userId}`, JSON.stringify(userMessages));

    setReplyMessage('');
    setSelectedUserId(null);
    toast({
      title: 'Reply Sent',
      description: 'Your reply has been sent to the user.'
    });
  };

  const saveToolLinks = () => {
    localStorage.setItem('toolLinks', JSON.stringify(tempLinks));
    setToolLinks(tempLinks);
    toast({
      title: 'Links Updated',
      description: 'Tool links have been updated successfully.'
    });
  };

  const clearLink = (tool: string) => {
    setTempLinks(prev => ({ ...prev, [tool]: '' }));
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const toolNames = {
    freeHacks: 'Free Hacks',
    walletFlasher: 'Wallet Mail Flasher',
    bankFlasher: 'Bank Mail Flasher',
    socialFlasher: 'Social Media Flasher',
    apiDashboard: 'API Dashboard'
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage users, support, and system settings</p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="links">Tool Links</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Users ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                          <p className="text-gray-400 text-sm">Coins: {user.coins || 0}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-500/20 text-green-400">
                            {user.role || 'User'}
                          </Badge>
                          <p className="text-gray-400 text-xs mt-1">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Support Messages ({supportMessages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportMessages.map((msg) => (
                    <div key={msg.id} className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-semibold">{msg.userName}</h4>
                          <p className="text-gray-400 text-sm">{formatTime(msg.timestamp)}</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {msg.status}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-3">{msg.message}</p>
                      
                      {selectedUserId === msg.userId ? (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your reply..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="flex-1 bg-slate-600 border-slate-500 text-white"
                          />
                          <Button
                            onClick={() => sendReply(msg.userId)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => setSelectedUserId(null)}
                            variant="outline"
                            className="border-slate-500 text-gray-400"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setSelectedUserId(msg.userId)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Reply
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Tool Links Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(toolNames).map(([key, name]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-white font-semibold">{name}</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Enter link for ${name}`}
                          value={tempLinks[key as keyof typeof tempLinks]}
                          onChange={(e) => setTempLinks(prev => ({ ...prev, [key]: e.target.value }))}
                          className="flex-1 bg-slate-600 border-slate-500 text-white"
                        />
                        <Button
                          onClick={() => clearLink(key)}
                          variant="outline"
                          className="border-slate-500 text-gray-400"
                        >
                          Clear
                        </Button>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Current: {toolLinks[key as keyof typeof toolLinks] || 'Not set (shows "Coming Soon")'}
                      </p>
                    </div>
                  ))}
                  
                  <Button
                    onClick={saveToolLinks}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    Save All Links
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Admin Credentials</h3>
                    <p className="text-gray-300">Email: EmmyHenz17@gmail.com</p>
                    <p className="text-gray-300">Role: Administrator</p>
                  </div>
                  
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">System Stats</h3>
                    <p className="text-gray-300">Total Users: {users.length}</p>
                    <p className="text-gray-300">Support Messages: {supportMessages.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
