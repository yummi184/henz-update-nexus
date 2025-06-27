
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Fish, 
  Camera, 
  Mail, 
  Building, 
  Share2, 
  Server, 
  Download,
  Coins,
  Bot,
  Code
} from 'lucide-react';

const Dashboard = () => {
  const [toolLinks, setToolLinks] = useState({
    freeHacks: '',
    walletFlasher: '',
    bankFlasher: '',
    socialFlasher: '',
    apiDashboard: '',
    downloader: ''
  });

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem('toolLinks') || '{}');
    setToolLinks(links);
  }, []);

  const tools = [
    {
      id: 'free-hacks',
      title: 'Free Hacks',
      description: 'Access basic security tools and utilities',
      icon: Shield,
      cost: 'Free',
      color: 'bg-green-500',
      link: toolLinks.freeHacks || '#placeholder-free-hacks',
      isExternal: !!toolLinks.freeHacks
    },
    {
      id: 'phishing',
      title: 'Phishing',
      description: 'Social media platform simulation tools',
      icon: Fish,
      cost: '3 coins',
      color: 'bg-orange-500',
      link: '/phishing',
      isExternal: false
    },
    {
      id: 'camera-hack',
      title: 'Camera Hack',
      description: 'Mobile carrier-based camera capture',
      icon: Camera,
      cost: '3 coins',
      color: 'bg-red-500',
      link: '/camera-hack',
      isExternal: false
    },
    {
      id: 'wallet-flasher',
      title: 'Wallet Mail Flasher',
      description: 'Wallet notification simulation',
      icon: Mail,
      cost: 'Free',
      color: 'bg-blue-500',
      link: toolLinks.walletFlasher || '#placeholder-wallet-flasher',
      isExternal: !!toolLinks.walletFlasher
    },
    {
      id: 'bank-flasher',
      title: 'Bank Mail Flasher',
      description: 'Banking notification templates',
      icon: Building,
      cost: 'Free',
      color: 'bg-purple-500',
      link: toolLinks.bankFlasher || '#placeholder-bank-flasher',
      isExternal: !!toolLinks.bankFlasher
    },
    {
      id: 'social-flasher',
      title: 'Social Media Flasher',
      description: 'Social platform notification tools',
      icon: Share2,
      cost: 'Free',
      color: 'bg-pink-500',
      link: toolLinks.socialFlasher || '#placeholder-social-flasher',
      isExternal: !!toolLinks.socialFlasher
    },
    {
      id: 'api-dashboard',
      title: 'API Dashboard',
      description: 'Advanced API management tools',
      icon: Server,
      cost: 'Free',
      color: 'bg-indigo-500',
      link: toolLinks.apiDashboard || '#placeholder-api-dashboard',
      isExternal: !!toolLinks.apiDashboard
    },
    {
      id: 'downloader',
      title: 'Downloader',
      description: 'Download content from various platforms',
      icon: Download,
      cost: 'Free',
      color: 'bg-cyan-500',
      link: toolLinks.downloader || '#placeholder-downloader',
      isExternal: !!toolLinks.downloader
    },
    {
      id: 'tools',
      title: 'Tools',
      description: 'Various utility tools',
      icon: Code,
      cost: 'Free',
      color: 'bg-yellow-500',
      link: '/downloaders-tools',
      isExternal: false
    },
    {
      id: 'gpt-40',
      title: 'GPT 4.0',
      description: 'Advanced AI chat assistant',
      icon: Bot,
      cost: 'Free',
      color: 'bg-gradient-to-r from-purple-500 to-blue-500',
      link: '/gpt',
      isExternal: false
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Choose your research and educational tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isFree = tool.cost === 'Free';
            const isPlaceholder = tool.link.startsWith('#');
            
            return (
              <Card key={tool.id} className="bg-slate-800/50 border-slate-700 backdrop-blur hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className={`h-12 w-12 ${tool.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant={isFree ? "secondary" : "default"}
                      className={isFree ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}
                    >
                      {isFree ? (
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {tool.cost}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          {tool.cost}
                        </span>
                      )}
                    </Badge>
                  </div>
                  
                  {isPlaceholder ? (
                    <Button disabled className="w-full bg-slate-600 text-gray-400">
                      Coming Soon
                    </Button>
                  ) : tool.isExternal ? (
                    <a href={tool.link} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        Access Tool
                      </Button>
                    </a>
                  ) : (
                    <Link to={tool.link}>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        Access Tool
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Available Tools</p>
                  <p className="text-white text-lg font-semibold">10 Tools</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Free Tools</p>
                  <p className="text-white text-lg font-semibold">8 Free</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Coins className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Premium Tools</p>
                  <p className="text-white text-lg font-semibold">2 Premium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
