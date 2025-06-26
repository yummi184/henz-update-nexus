
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Video, Upload, Coins, Shield, AlertTriangle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VideoSimulation = () => {
  const [userCoins, setUserCoins] = useState(
    JSON.parse(localStorage.getItem('currentUser') || '{}').coins || 0
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [speechText, setSpeechText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
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

      setIsProcessing(false);
      setVideoReady(true);
      
      toast({
        title: 'Video Generated!',
        description: '5 coins deducted. Your talking video is ready for download.'
      });
    }, 4000);
  };

  const downloadVideo = () => {
    // Simulate video download
    const link = document.createElement('a');
    link.href = '#'; // In real implementation, this would be the generated video URL
    link.download = `talking-video-${Date.now()}.mp4`;
    
    toast({
      title: 'Download Started',
      description: 'Your talking video is being downloaded.'
    });
    
    // Reset form
    setImageFile(null);
    setSpeechText('');
    setVideoReady(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Live Video Simulation</h1>
          <p className="text-gray-400">Upload image and enter text to create talking videos</p>
        </div>

        <Card className="bg-purple-900/20 border-purple-500/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Tool Cost & Process</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    Processing costs <strong>5 coins</strong> per video
                  </p>
                  <p className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-400" />
                    Upload a photo and enter text to make it speak
                  </p>
                  <p className="text-sm text-yellow-300 bg-yellow-900/20 p-2 rounded">
                    <strong>Educational Purpose:</strong> This tool is for creating educational content and awareness demonstrations only.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Your Balance:</span>
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="text-xl font-bold text-white">{userCoins} coins</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {!videoReady ? (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Create Talking Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="image-upload" className="text-gray-300 text-lg">
                  Upload Photo
                </Label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-gray-400">
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
                <Label htmlFor="speech-text" className="text-gray-300 text-lg">
                  Text to Speak
                </Label>
                <Textarea
                  id="speech-text"
                  placeholder="Enter the text you want the person in the image to say..."
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  className="min-h-[120px] bg-slate-700 border-slate-600 text-white"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500">{speechText.length}/500 characters</p>
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!imageFile || !speechText.trim() || isProcessing || userCoins < 5}
                  className="bg-purple-500 hover:bg-purple-600 px-8 py-3 text-lg"
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
                    <span className="font-semibold">Insufficient Balance</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
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
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Ready!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Your Talking Video is Ready!</h3>
              <p className="text-gray-400 mb-6">The AI has successfully generated your talking video.</p>
              
              <Button
                onClick={downloadVideo}
                className="bg-green-500 hover:bg-green-600 px-8 py-3 text-lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Video
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default VideoSimulation;
