
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Video, Upload, Coins, Shield, AlertTriangle, Download, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VideoSimulation = () => {
  const [userCoins, setUserCoins] = useState(
    JSON.parse(localStorage.getItem('currentUser') || '{}').coins || 0
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [speechText, setSpeechText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!imageFile || !speechText.trim()) {
      toast({
        title: 'Missing Requirements',
        description: 'Please upload an image and enter the text to speak.',
        variant: 'destructive'
      });
      return;
    }

    if (userCoins < 5) {
      toast({
        title: 'Insufficient Coins',
        description: 'You need 5 coins to create a live video simulation.',
        variant: 'destructive'
      });
      return;
    }

    const confirmed = window.confirm(
      `This will cost 5 coins to process your video simulation. Continue?`
    );

    if (!confirmed) return;

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      // Deduct coins
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const updatedUser = {
        ...currentUser,
        coins: currentUser.coins - 5,
        transactions: [
          ...(currentUser.transactions || []),
          {
            description: 'Live Video Simulation processing',
            amount: -5,
            timestamp: Date.now()
          }
        ]
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(updatedUser));
      setUserCoins(updatedUser.coins);

      // Create a simple talking video simulation (placeholder)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 640;
      canvas.height = 480;
      
      if (ctx && imagePreview) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Add text overlay
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          
          const words = speechText.split(' ');
          const lines = [];
          let currentLine = '';
          
          words.forEach(word => {
            const testLine = currentLine + word + ' ';
            if (ctx.measureText(testLine).width > canvas.width - 40) {
              lines.push(currentLine);
              currentLine = word + ' ';
            } else {
              currentLine = testLine;
            }
          });
          lines.push(currentLine);
          
          lines.forEach((line, index) => {
            const y = canvas.height - 100 + (index * 30);
            ctx.strokeText(line, canvas.width / 2, y);
            ctx.fillText(line, canvas.width / 2, y);
          });
          
          const videoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          setVideoUrl(videoDataUrl);
        };
        img.src = imagePreview;
      }

      setIsProcessing(false);
      setVideoReady(true);
      
      toast({
        title: 'Video Generated!',
        description: '5 coins deducted. Your talking video is ready for preview and download.'
      });
    }, 4000);
  };

  const downloadVideo = () => {
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `talking-video-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Download Started',
        description: 'Your talking video has been downloaded.'
      });
    }
    
    // Reset form
    setImageFile(null);
    setSpeechText('');
    setVideoReady(false);
    setVideoUrl('');
    setImagePreview('');
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Live Video Simulation</h1>
          <p className="text-gray-400 text-sm sm:text-base">Upload image and enter text to create talking videos</p>
        </div>

        <Card className="bg-purple-900/20 border-purple-500/50 backdrop-blur">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-purple-400 mb-2">Tool Cost & Process</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    Processing costs <strong>5 coins</strong> per video
                  </p>
                  <p className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-400" />
                    Upload a photo and enter text to make it speak
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm sm:text-base">Your Balance:</span>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <span className="text-lg sm:text-xl font-bold text-white">{userCoins} coins</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {!videoReady ? (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Upload className="h-5 w-5" />
                Create Talking Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <Label htmlFor="image-upload" className="text-gray-300 text-base sm:text-lg">
                  Upload Photo
                </Label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 sm:p-6 text-center hover:border-slate-500 transition-colors">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    <div className="space-y-2">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mx-auto" />
                      ) : (
                        <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mx-auto" />
                      )}
                      <p className="text-gray-400 text-sm">
                        {imageFile ? imageFile.name : 'Click to upload image'}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </label>
                </div>
                {imageFile && (
                  <Badge className="bg-green-500/20 text-green-400">
                    Image uploaded successfully
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="speech-text" className="text-gray-300 text-base sm:text-lg">
                  Text to Speak
                </Label>
                <Textarea
                  id="speech-text"
                  placeholder="Enter the text you want the person in the image to say..."
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  className="min-h-[100px] sm:min-h-[120px] bg-slate-700 border-slate-600 text-white text-sm sm:text-base"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500">{speechText.length}/500 characters</p>
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!imageFile || !speechText.trim() || isProcessing || userCoins < 5}
                  className="bg-purple-500 hover:bg-purple-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg w-full sm:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Video...
                    </>
                  ) : (
                    <>
                      <Coins className="h-4 w-4 mr-2" />
                      Generate Video (5 coins)
                    </>
                  )}
                </Button>
              </div>

              {userCoins < 5 && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-semibold text-sm">Insufficient Balance</span>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">
                    You need at least 5 coins to create a talking video. 
                    Please top up your account to continue.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Video className="h-5 w-5" />
                Video Ready!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6 sm:py-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Video className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">Your Talking Video is Ready!</h3>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">The AI has successfully generated your talking video.</p>
              
              {videoUrl && (
                <div className="mb-4 sm:mb-6">
                  <img src={videoUrl} alt="Generated Video" className="max-w-full h-auto rounded-lg mx-auto" style={{ maxHeight: '300px' }} />
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={downloadVideo}
                  className="bg-green-500 hover:bg-green-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Video
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default VideoSimulation;
