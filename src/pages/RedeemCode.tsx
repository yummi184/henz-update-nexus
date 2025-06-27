
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Gift, Clock, Coins, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RedeemCode = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redeemedCodes, setRedeemedCodes] = useState<string[]>([]);
  const { toast } = useToast();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    // Load user's redeemed codes
    const userRedeemed = JSON.parse(localStorage.getItem(`redeemed_${currentUser.id}`) || '[]');
    setRedeemedCodes(userRedeemed);
  }, [currentUser.id]);

  const redeemCode = async () => {
    if (!code.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a redeem code.',
        variant: 'destructive'
      });
      return;
    }

    if (redeemedCodes.includes(code.trim().toUpperCase())) {
      toast({
        title: 'Already Redeemed',
        description: 'You have already redeemed this code.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get all active redeem codes from admin
      const redeemCodes = JSON.parse(localStorage.getItem('redeemCodes') || '[]');
      const activeCode = redeemCodes.find((rc: any) => 
        rc.code.toUpperCase() === code.trim().toUpperCase() && 
        rc.expiresAt > Date.now() && 
        rc.isActive
      );

      if (!activeCode) {
        toast({
          title: 'Invalid Code',
          description: 'This redeem code is invalid or has expired.',
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
      }

      // Add coins to user account
      const updatedUser = {
        ...currentUser,
        coins: (currentUser.coins || 0) + activeCode.coinAmount,
        transactions: [
          ...(currentUser.transactions || []),
          {
            description: `Redeem code: ${activeCode.code} (+${activeCode.coinAmount} coins)`,
            amount: activeCode.coinAmount,
            timestamp: Date.now()
          }
        ]
      };

      // Update user data
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(updatedUser));

      // Mark code as redeemed by this user
      const updatedRedeemed = [...redeemedCodes, code.trim().toUpperCase()];
      setRedeemedCodes(updatedRedeemed);
      localStorage.setItem(`redeemed_${currentUser.id}`, JSON.stringify(updatedRedeemed));

      setCode('');
      toast({
        title: 'Success!',
        description: `You've received ${activeCode.coinAmount} coins!`
      });

      // Reload page to update coin balance
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('Redeem error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Redeem Code</h1>
          <p className="text-gray-400">Enter your redeem code to get free coins</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Enter Redeem Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="text-white text-sm">Current Balance: {currentUser.coins || 0} coins</span>
                </div>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Enter redeem code (e.g., HENZ2024)"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="bg-slate-700 border-slate-600 text-white text-center text-lg font-mono"
                />
                
                <Button
                  onClick={redeemCode}
                  disabled={isLoading || !code.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
                >
                  {isLoading ? 'Redeeming...' : 'Redeem Code'}
                </Button>
              </div>

              {/* Recently Redeemed Codes */}
              {redeemedCodes.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Recently Redeemed:</h3>
                  <div className="space-y-2">
                    {redeemedCodes.slice(-5).reverse().map((redeemedCode, index) => (
                      <div key={index} className="flex items-center gap-2 bg-slate-700/50 p-2 rounded">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300 font-mono">{redeemedCode}</span>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">Redeemed</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div className="text-sm text-blue-200">
                    <p className="font-semibold mb-1">How to get redeem codes:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Follow our social media channels</li>
                      <li>Join our community events</li>
                      <li>Watch for special announcements</li>
                      <li>Participate in giveaways</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RedeemCode;
