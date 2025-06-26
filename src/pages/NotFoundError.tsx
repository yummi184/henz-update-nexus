
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundError = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-red-400 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The page you are looking for might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
        </div>
        
        <Link to="/">
          <Button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 text-lg">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundError;
