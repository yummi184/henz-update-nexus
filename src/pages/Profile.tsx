
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Coins, 
  Copy, 
  Eye, 
  EyeOff,
  History,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser') || '{}')
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    password: ''
  });
  
  const { toast } = useToast();

  const copyUserId = () => {
    navigator.clipboard.writeText(currentUser.id);
    toast({
      title: 'Copied!',
      description: 'User ID copied to clipboard'
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      email: formData.email
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(updatedUser));
    
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account settings and information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Full Name</Label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-slate-700 px-3 py-2 rounded-md">
                      {currentUser.name || 'Not set'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Email Address</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-slate-700 px-3 py-2 rounded-md">
                      {currentUser.email || 'Not set'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">User ID</Label>
                  <div className="flex items-center gap-2">
                    <p className="text-white bg-slate-700 px-3 py-2 rounded-md flex-1">
                      {currentUser.id}
                    </p>
                    <Button
                      size="sm"
                      onClick={copyUserId}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <Label className="text-gray-300">New Password (Optional)</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="Enter new password"
                        className="bg-slate-700 border-slate-600 text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="bg-transparent border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats & Info */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white text-lg">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">Available Coins</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    {currentUser.coins || 0}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">Member Since</span>
                  </div>
                  <span className="text-white text-sm">
                    {currentUser.joinDate ? formatDate(currentUser.joinDate) : 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Status</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    {currentUser.status || 'Active'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentUser.transactions && currentUser.transactions.length > 0 ? (
                  <div className="space-y-2">
                    {currentUser.transactions.slice(0, 5).map((transaction: any, index: number) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                        <span className="text-gray-300 text-sm">{transaction.description}</span>
                        <span className={`text-sm ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} coins
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No transactions yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
