
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageCircle, Send, CheckCircle, Settings, Link as LinkIcon, Gift, Coins, Trash2, Plus } from 'lucide-react';
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
    apiDashboard: '',
    downloader: ''
  });
  const [tempLinks, setTempLinks] = useState({
    freeHacks: '',
    walletFlasher: '',
    bankFlasher: '',
    socialFlasher: '',
    apiDashboard: '',
    downloader: ''
  });
  const [redeemCodes, setRedeemCodes] = useState<any[]>([]);
  const [newCode, setNewCode] = useState('');
  const [newCodeCoins, setNewCodeCoins] = useState('');
  const [newCodeExpiry, setNewCodeExpiry] = useState('');
  const [fundUserId, setFundUserId] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
    loadSupportMessages();
    loadToolLinks();
    loadRedeemCodes();
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
      apiDashboard: links.apiDashboard || '',
      downloader: links.downloader || ''
    });
    setTempLinks({
      freeHacks: links.freeHacks || '',
      walletFlasher: links.walletFlasher || '',
      bankFlasher: links.bankFlasher || '',
      socialFlasher: links.socialFlasher || '',
      apiDashboard: links.apiDashboard || '',
      downloader: links.downloader || ''
    });
  };

  const loadRedeemCodes = () => {
    const codes = JSON.parse(localStorage.getItem('redeemCodes') || '[]');
    setRedeemCodes(codes);
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

  const addRedeemCode = () => {
    if (!newCode.trim() || !newCodeCoins || !newCodeExpiry) {
      toast({
        title: 'Error',
        description: 'Please fill all fields to create redeem code.',
        variant: 'destructive'
      });
      return;
    }

    const expiryHours = parseInt(newCodeExpiry);
    const expiryTime = Date.now() + (expiryHours * 60 * 60 * 1000);

    const codeData = {
      id: Date.now(),
      code: newCode.trim().toUpperCase(),
      coinAmount: parseInt(newCodeCoins),
      expiresAt: expiryTime,
      createdAt: Date.now(),
      isActive: true
    };

    const updatedCodes = [...redeemCodes, codeData];
    setRedeemCodes(updatedCodes);
    localStorage.setItem('redeemCodes', JSON.stringify(updatedCodes));

    setNewCode('');
    setNewCodeCoins('');
    setNewCodeExpiry('');
    toast({
      title: 'Redeem Code Created',
      description: `Code "${codeData.code}" created successfully!`
    });
  };

  const deleteRedeemCode = (codeId: number) => {
    const updatedCodes = redeemCodes.filter(code => code.id !== codeId);
    setRedeemCodes(updatedCodes);
    localStorage.setItem('redeemCodes', JSON.stringify(updatedCodes));
    toast({
      title: 'Code Deleted',
      description: 'Redeem code has been deleted.'
    });
  };

  const fundUser = () => {
    if (!fundUserId.trim() || !fundAmount) {
      toast({
        title: 'Error',
        description: 'Please enter both User ID and amount.',
        variant: 'destructive'
      });
      return;
    }

    const userData = localStorage.getItem(`user_${fundUserId.trim()}`);
    if (!userData) {
      toast({
        title: 'Error',
        description: 'User not found.',
        variant: 'destructive'
      });
      return;
    }

    const user = JSON.parse(userData);
    const amount = parseInt(fundAmount);
    user.coins = (user.coins || 0) + amount;
    user.transactions = user.transactions || [];
    user.transactions.push({
      description: `Admin funding: +${amount} coins`,
      amount: amount,
      timestamp: Date.now()
    });

    localStorage.setItem(`user_${fundUserId.trim()}`, JSON.stringify(user));
    
    // Update current user if it's the same
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id === fundUserId.trim()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }

    setFundUserId('');
    setFundAmount('');
    loadUsers();
    toast({
      title: 'User Funded',
      description: `Added ${amount} coins to user ${fundUserId.trim()}`
    });
  };

  const deleteUser = (userId: string) => {
    localStorage.removeItem(`user_${userId}`);
    localStorage.removeItem(`support_${userId}`);
    localStorage.removeItem(`redeemed_${userId}`);
    loadUsers();
    toast({
      title: 'User Deleted',
      description: 'User account has been deleted.'
    });
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
    apiDashboard: 'API Dashboard',
    downloader: 'Downloader'
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage users, support, and system settings</p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="links">Tool Links</TabsTrigger>
            <TabsTrigger value="redeem">Redeem Codes</TabsTrigger>
            <TabsTrigger value="funding">User Funding</TabsTrigger>
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
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500/20 text-green-400">
                            {user.role || 'User'}
                          </Badge>
                          <Button
                            onClick={() => deleteUser(user.id)}
                            size="sm"
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

          <TabsContent value="redeem">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Redeem Codes Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-4">Create New Redeem Code</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        placeholder="Code (e.g., HENZ2024)"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      <Input
                        placeholder="Coin Amount"
                        type="number"
                        value={newCodeCoins}
                        onChange={(e) => setNewCodeCoins(e.target.value)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      <Input
                        placeholder="Expiry (hours)"
                        type="number"
                        value={newCodeExpiry}
                        onChange={(e) => setNewCodeExpiry(e.target.value)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                    <Button
                      onClick={addRedeemCode}
                      className="w-full mt-4 bg-green-500 hover:bg-green-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Redeem Code
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Active Redeem Codes</h3>
                    {redeemCodes.map((code) => (
                      <div key={code.id} className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-semibold">{code.code}</h4>
                            <p className="text-gray-400 text-sm">Coins: {code.coinAmount}</p>
                            <p className="text-gray-400 text-sm">
                              Expires: {formatTime(code.expiresAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              code.expiresAt > Date.now() 
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }>
                              {code.expiresAt > Date.now() ? 'Active' : 'Expired'}
                            </Badge>
                            <Button
                              onClick={() => deleteRedeemCode(code.id)}
                              size="sm"
                              className="bg-red-500 hover:bg-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funding">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  User Funding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-4">Fund User Account</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="User ID"
                        value={fundUserId}
                        onChange={(e) => setFundUserId(e.target.value)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      <Input
                        placeholder="Coin Amount"
                        type="number"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                    <Button
                      onClick={fundUser}
                      className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Fund User
                    </Button>
                  </div>
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
                    <p className="text-gray-300">Active Redeem Codes: {redeemCodes.filter(c => c.expiresAt > Date.now()).length}</p>
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
