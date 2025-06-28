
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  CreditCard, 
  Inbox, 
  Menu, 
  X, 
  LogOut, 
  Copy,
  Settings,
  Banknote,
  Wallet,
  MessageCircle,
  Gift,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useClickSound } from '@/hooks/useClickSound';
import { jsonStorage } from '@/utils/jsonStorage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { playClickSound } = useClickSound();

  const currentUser = JSON.parse(jsonStorage.getItem('currentUser') || '{}');
  const isAdmin = currentUser.email === 'EmmyHenz17@gmail.com';

  const handleLogout = () => {
    playClickSound();
    jsonStorage.removeItem('currentUser');
    jsonStorage.removeItem('isAdmin');
    navigate('/');
  };

  const copyUserId = () => {
    playClickSound();
    if (currentUser.id) {
      navigator.clipboard.writeText(currentUser.id);
      toast({
        title: 'Copied!',
        description: 'User ID copied to clipboard'
      });
    }
  };

  const handleJoinChannel = () => {
    playClickSound();
    window.open('https://t.me/+DFTqvLsv_zc4NDY0', '_blank');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/topup', label: 'Top-Up', icon: CreditCard },
    { path: '/inbox', label: 'Inbox', icon: Inbox },
    { path: '/banking-request', label: 'Banking', icon: Banknote },
    { path: '/crypto-request', label: 'Crypto', icon: Wallet },
    { path: '/support', label: 'Support', icon: MessageCircle },
    { path: '/redeem-code', label: 'Redeem Code', icon: Gift },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: Settings });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Top Bar */}
      <header className="bg-slate-800/50 backdrop-blur border-b border-slate-700">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2" onClick={playClickSound}>
              <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">H</span>
              </div>
              <span className="text-white font-semibold hidden sm:block text-sm sm:text-base">Henz Update Hub</span>
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-2 sm:gap-3">
              {currentUser.id && (
                <div className="hidden sm:flex items-center gap-2 bg-slate-700 px-2 sm:px-3 py-1 rounded-lg">
                  <span className="text-gray-300 text-xs sm:text-sm">ID: {currentUser.id}</span>
                  <button onClick={copyUserId} className="text-blue-400 hover:text-blue-300 p-1">
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-white font-medium text-xs sm:text-sm">{currentUser.name || 'User'}</p>
                  <p className="text-yellow-400 text-xs">{currentUser.coins || 0} coins</p>
                </div>
                
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src={currentUser.profilePhoto} alt={currentUser.name || 'User'} />
                  <AvatarFallback className="bg-blue-500 text-white text-xs sm:text-sm">
                    {(currentUser.name || 'User').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden text-white p-2"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-800/50 backdrop-blur border-r border-slate-700 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-3 sm:p-4 mt-2 sm:mt-4">
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => {
                        playClickSound();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg transition-colors min-h-[44px] touch-manipulation
                        ${isActive 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm sm:text-base">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Join Channel Button */}
            <div className="mt-4">
              <button
                onClick={handleJoinChannel}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 animate-pulse"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm font-medium">Join Channel</span>
              </button>
            </div>

            <div className="mt-6 sm:mt-8">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full bg-transparent border-red-500 text-red-400 hover:bg-red-500 hover:text-white h-11 text-sm font-medium touch-manipulation"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
