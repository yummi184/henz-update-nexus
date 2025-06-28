import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, 
  Home, 
  User, 
  MessageSquare, 
  Gift, 
  CreditCard, 
  LogOut, 
  Coins,
  Settings,
  Mail
} from 'lucide-react';
import { useClickSound } from '@/hooks/useClickSound';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { playClickSound } = useClickSound();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, [location]);

  const handleLogout = () => {
    playClickSound();
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    playClickSound();
    setIsOpen(false);
    navigate(path);
  };

  const handleLinkClick = () => {
    playClickSound();
    setIsOpen(false);
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: Home
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: User
    },
    {
      label: 'Support',
      path: '/support',
      icon: MessageSquare
    },
    {
      label: 'Redeem Code',
      path: '/redeem',
      icon: Gift
    },
    {
      label: 'Subscription',
      path: '/subscription',
      icon: CreditCard
    },
    {
      label: 'Admin Panel',
      path: '/admin',
      icon: Settings,
      adminOnly: true
    },
    {
      label: 'Inbox',
      path: '/inbox',
      icon: Mail
    }
  ];

  const isAdmin = user?.email === 'EmmyHenz17@gmail.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur supports-[backdrop-filter]:bg-slate-800/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white"
              onClick={playClickSound}
            >
              HenzTech
            </Link>
            
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden md:flex items-center gap-3">
                  <Badge className="bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {user.coins || 0} coins
                  </Badge>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profilePhoto} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm">{user.name}</span>
                </div>
              )}
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-slate-700"
                    onClick={playClickSound}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-slate-800 border-slate-700 w-80">
                  <div className="py-6">
                    {user && (
                      <div className="mb-6 pb-4 border-b border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.profilePhoto} />
                            <AvatarFallback className="bg-purple-600 text-white">
                              {user.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-semibold">{user.name}</p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 flex items-center gap-1 w-fit">
                          <Coins className="h-3 w-3" />
                          {user.coins || 0} coins
                        </Badge>
                      </div>
                    )}
                    
                    <nav className="space-y-2">
                      {navigationItems.map((item) => {
                        if (item.adminOnly && !isAdmin) return null;
                        
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        
                        return (
                          <button
                            key={item.path}
                            onClick={() => handleNavClick(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              isActive 
                                ? 'bg-purple-600 text-white' 
                                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </button>
                        );
                      })}
                      
                      <Button
                        onClick={handleLogout}
                        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
