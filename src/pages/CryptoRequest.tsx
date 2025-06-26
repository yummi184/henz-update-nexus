
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wallet, Send, CheckCircle, Bitcoin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CryptoRequest = () => {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [customWallet, setCustomWallet] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const popularWallets = [
    'MetaMask',
    'Trust Wallet',
    'Binance',
    'Coinbase',
    'Exodus',
    'Atomic Wallet',
    'Ledger',
    'Trezor',
    'SafePal',
    'Phantom',
    'Kucoin',
    'Crypto.com'
  ];

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
    setCustomWallet('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const walletName = selectedWallet === 'Other' ? customWallet : selectedWallet;
    
    if (!walletName || !requestDetails.trim()) {
      toast({
        title: 'Incomplete Form',
        description: 'Please select a wallet and provide request details.',
        variant: 'destructive'
      });
      return;
    }

    // Save request to localStorage (in real app, this would go to admin)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const request = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'Crypto',
      wallet: walletName,
      details: requestDetails,
      timestamp: Date.now(),
      status: 'Pending'
    };

    const existingRequests = JSON.parse(localStorage.getItem('adminRequests') || '[]');
    existingRequests.push(request);
    localStorage.setItem('adminRequests', JSON.stringify(existingRequests));

    setIsSubmitted(true);
    toast({
      title: 'Request Submitted',
      description: 'Your crypto wallet request has been sent for admin review.'
    });
  };

  const resetForm = () => {
    setSelectedWallet('');
    setCustomWallet('');
    setRequestDetails('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Request Submitted</h2>
                <p className="text-gray-400">
                  Your crypto wallet request has been successfully submitted and is now under admin review.
                </p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-2">Request Details:</h3>
                <p className="text-gray-300"><strong>Wallet:</strong> {selectedWallet === 'Other' ? customWallet : selectedWallet}</p>
                <p className="text-gray-300 mt-2"><strong>Status:</strong> 
                  <Badge className="ml-2 bg-yellow-500/20 text-yellow-400">Pending Review</Badge>
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-gray-400 text-sm">
                  An admin will review your request and contact you shortly. 
                  You'll be notified once your request has been processed.
                </p>
                <Button onClick={resetForm} className="bg-blue-500 hover:bg-blue-600">
                  Submit Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Wallet Request</h1>
          <p className="text-gray-400">Request support for cryptocurrency wallets and services</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Crypto Wallet Service Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Wallet Selection */}
                <div className="space-y-3">
                  <Label className="text-gray-300 text-lg">Select Wallet/Service</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {popularWallets.map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => handleWalletSelect(wallet)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedWallet === wallet
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleWalletSelect('Other')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedWallet === 'Other'
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      Other
                    </button>
                  </div>
                </div>

                {/* Custom Wallet Input */}
                {selectedWallet === 'Other' && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-wallet" className="text-gray-300">
                      Specify Wallet/Service Name
                    </Label>
                    <Input
                      id="custom-wallet"
                      value={customWallet}
                      onChange={(e) => setCustomWallet(e.target.value)}
                      placeholder="Enter wallet or service name"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                )}

                {/* Request Details */}
                <div className="space-y-2">
                  <Label htmlFor="details" className="text-gray-300">
                    Request Details
                  </Label>
                  <Textarea
                    id="details"
                    value={requestDetails}
                    onChange={(e) => setRequestDetails(e.target.value)}
                    placeholder="Describe what you need help with (e.g., wallet setup, seed phrase recovery, transaction issues, staking, etc.)"
                    className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={!selectedWallet || (!customWallet && selectedWallet === 'Other')}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur mt-6">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Bitcoin className="h-5 w-5 text-orange-400" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Process:</h4>
                  <ol className="text-gray-300 space-y-1 text-sm">
                    <li>1. Select your crypto wallet/service</li>
                    <li>2. Describe your request or issue</li>
                    <li>3. Submit for admin review</li>
                    <li>4. Admin will contact you directly</li>
                    <li>5. Receive specialized crypto assistance</li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-2">Services Available:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Wallet setup and configuration</li>
                    <li>• Seed phrase and key recovery</li>
                    <li>• Transaction troubleshooting</li>
                    <li>• DeFi and staking guidance</li>
                    <li>• Security best practices</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 mt-4">
                <h4 className="text-amber-400 font-semibold mb-2">Security Notice:</h4>
                <p className="text-gray-300 text-sm">
                  Our admin team will never ask for your private keys, seed phrases, or passwords. 
                  Always verify the authenticity of any communication before sharing sensitive information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CryptoRequest;
