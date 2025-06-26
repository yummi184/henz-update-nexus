
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Disclaimer Banner */}
      {showDisclaimer && (
        <div className="bg-yellow-600 text-black p-3 text-center relative">
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="font-semibold">FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY</span>
          </div>
          <button
            onClick={() => setShowDisclaimer(false)}
            className="absolute right-4 top-3 text-black hover:text-gray-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Henz Update Hub</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/register">
              <Button variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Advanced Digital Research
            <span className="text-blue-400"> Platform</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A comprehensive educational platform designed for cybersecurity research, 
            digital literacy training, and security awareness demonstrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 px-8 py-4 text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">Security Research</CardTitle>
              <CardDescription className="text-gray-400">
                Advanced tools for cybersecurity education and vulnerability assessment training.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Educational Platform</CardTitle>
              <CardDescription className="text-gray-400">
                Learn about digital security through hands-on educational simulations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Research Tools</CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive toolkit for academic research and security awareness.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Disclaimer Section */}
        <Card className="bg-red-900/20 border-red-500/50 backdrop-blur mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Important Disclaimer</h3>
                <p className="text-gray-300 leading-relaxed">
                  This platform is strictly for educational and research purposes only. All tools and simulations 
                  are designed to enhance cybersecurity awareness and digital literacy. Users must comply with 
                  all applicable laws and regulations. Misuse of this platform for illegal activities is strictly 
                  prohibited and may result in account termination and legal action.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Henz Update Hub. All rights reserved.</p>
            <p className="mt-2 text-sm">Educational and Research Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
