
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Globe, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Security Research',
      description: 'Educational tools for learning about cybersecurity and digital forensics'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of security researchers and ethical hackers'
    },
    {
      icon: Globe,
      title: 'Web-Based Platform',
      description: 'Access tools directly from your browser without downloads'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="text-white font-semibold text-xl">Henz Update Hub</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/register">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link 
              to="/login" 
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Security Research
          <span className="text-blue-400 block">Made Simple</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Access professional-grade security tools and educational resources in one comprehensive platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-3">
              Start Learning
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-3">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Choose Henz Update Hub?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-12 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of security researchers and start your learning journey today.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-3">
              Create Your Account
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-700">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Henz Update Hub. All rights reserved.</p>
          <p className="mt-2 text-sm">Educational purposes only. Use responsibly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
