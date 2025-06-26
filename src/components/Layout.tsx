
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
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const copyUserId = () => {
    if (currentUser.id) {
      navigator.clipboard.writeText(currentUser.id);
      toast({
        title: 'Copied!',
        description: 'User ID copied to clipboard'
      });
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/topup', label: 'Top-Up', icon: CreditCard },
    { path: '/inbox', label: 'Inbox', icon: Inbox },
    { path: '/banking-request', label: 'Banking', icon: Banknote },
    { path: '/crypto-request', label: 'Crypto', icon: Wallet },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: Settings });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Top Bar */}
      <header className="bg-slate-800/50 backdrop-blur border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-white font-semibold hidden sm:block">Henz Update Hub</span>
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-3">
              {currentUser.id && (
                <div className="hidden sm:flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-lg">
                  <span className="text-gray-300 text-sm">ID: {currentUser.id}</span>
                  <button onClick={copyUserId} className="text-blue-400 hover:text-blue-300">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-white font-medium">{currentUser.name || 'User'}</p>
                  <p className="text-yellow-400 text-sm">{currentUser.coins || 0} coins</p>
                </div>
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
          <nav className="p-4 mt-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full bg-transparent border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
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
