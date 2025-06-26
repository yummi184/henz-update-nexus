
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, ExternalLink, Smartphone, CreditCard } from 'lucide-react';

const TopUp = () => {
  const packages = [
    {
      coins: 5,
      price: '5k',
      popular: false,
      description: 'Perfect for trying premium tools'
    },
    {
      coins: 10,
      price: '10k',
      popular: true,
      description: 'Most popular choice for regular users'
    },
    {
      coins: 20,
      price: '20k',
      popular: false,
      description: 'Great value for power users'
    },
    {
      coins: 50,
      price: '50k',
      popular: false,
      description: 'Best value for heavy usage'
    }
  ];

  const handlePurchase = (coins: number, price: string) => {
    const message = `I want to buy ${coins} coins for ${price}`;
    const whatsappUrl = `https://wa.me/2349125042727?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Top-Up Coins</h1>
          <p className="text-gray-400">Purchase coins to access premium tools and features</p>
        </div>

        {/* Current Balance */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">Current Balance</h3>
                <p className="text-blue-100">Available coins in your account</p>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-8 w-8 text-yellow-400" />
                <span className="text-3xl font-bold text-white">
                  {JSON.parse(localStorage.getItem('currentUser') || '{}').coins || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card 
              key={pkg.coins}
              className={`bg-slate-800/50 border-slate-700 backdrop-blur hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 relative ${
                pkg.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-3">
                <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">{pkg.coins} Coins</CardTitle>
                <div className="text-3xl font-bold text-blue-400">₦{pkg.price}</div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>
                <Button
                  onClick={() => handlePurchase(pkg.coins, pkg.price)}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Buy via WhatsApp
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Info */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">How to Purchase:</h4>
              <ol className="text-gray-300 space-y-1 text-sm">
                <li>1. Click "Buy via WhatsApp" on any package</li>
                <li>2. You'll be redirected to WhatsApp with a pre-filled message</li>
                <li>3. Send the message to complete your purchase request</li>
                <li>4. Our team will process your payment and add coins to your account</li>
                <li>5. You'll receive a confirmation once coins are added</li>
              </ol>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Payment Methods:</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Bank Transfer</li>
                <li>• Mobile Money</li>
                <li>• Cryptocurrency</li>
                <li>• Other methods (contact support)</li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Processing Time:</h4>
              <p className="text-gray-300 text-sm">
                Coins are typically added to your account within 5-15 minutes after payment confirmation.
                For faster processing, include your User ID in the WhatsApp message.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TopUp;
