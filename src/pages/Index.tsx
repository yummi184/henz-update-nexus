
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
        <div className="bg-yellow-600 text-black p-2 sm:p-3 text-center relative">
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="font-semibold text-xs sm:text-sm">FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY</span>
          </div>
          <button
            onClick={() => setShowDisclaimer(false)}
            className="absolute right-2 sm:right-4 top-2 sm:top-3 text-black hover:text-gray-700 text-lg"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <header className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">Henz Update Hub</h1>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link to="/register">
              <Button variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-blue-500 hover:bg-blue-600 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Advanced Digital Research
            <span className="text-blue-400"> Platform</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            A comprehensive educational platform designed for cybersecurity research, 
            digital literacy training, and security awareness demonstrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/register">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16 px-2">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </div>
              <CardTitle className="text-white text-lg sm:text-xl">Security Research</CardTitle>
              <CardDescription className="text-gray-400 text-sm sm:text-base">
                Advanced tools for cybersecurity education and vulnerability assessment training.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
              </div>
              <CardTitle className="text-white text-lg sm:text-xl">Educational Platform</CardTitle>
              <CardDescription className="text-gray-400 text-sm sm:text-base">
                Learn about digital security through hands-on educational simulations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              </div>
              <CardTitle className="text-white text-lg sm:text-xl">Research Tools</CardTitle>
              <CardDescription className="text-gray-400 text-sm sm:text-base">
                Comprehensive toolkit for academic research and security awareness.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Disclaimer Section */}
        <Card className="bg-red-900/20 border-red-500/50 backdrop-blur mb-6 sm:mb-8 mx-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">Important Disclaimer</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
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
      <footer className="border-t border-slate-800 mt-8 sm:mt-16">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 Henz Update Hub. All rights reserved.</p>
            <p className="mt-2 text-xs sm:text-sm">Educational and Research Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
