
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Video, Upload, Coins, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VideoSimulation = () => {
  const [userCoins, setUserCoins] = useState(
    JSON.parse(localStorage.getItem('currentUser') || '{}').coins || 0
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = () => {
    if (!imageFile || !videoFile) {
      toast({
        title: 'Missing Files',
        description: 'Please upload both an image and video file.',
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

    // Show confirmation dialog
    const confirmed = window.confirm(
      `This will cost 5 coins to process your live video simulation. Continue?`
    );

    if (!confirmed) return;

    setIsProcessing(true);

    // Simulate processing
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
      
      toast({
        title: 'Processing Started',
        description: '5 coins deducted. Redirecting to processing dashboard...'
      });

      // Redirect to placeholder
      setTimeout(() => {
        window.open('#placeholder-video-simulation', '_blank');
        // Reset form
        setImageFile(null);
        setVideoFile(null);
      }, 1000);
    }, 3000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Live Video Simulation</h1>
          <p className="text-gray-400">Upload image and video to create realistic live simulations</p>
        </div>

        {/* Cost Warning */}
        <Card className="bg-purple-900/20 border-purple-500/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Tool Cost & Process</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    Processing costs <strong>5 coins</strong> per simulation
                  </p>
                  <p className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-400" />
                    Requires both image and video files for processing
                  </p>
                  <p className="text-sm text-yellow-300 bg-yellow-900/20 p-2 rounded">
                    <strong>Educational Purpose:</strong> This tool is for creating educational content and awareness demonstrations only.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Balance */}
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

        {/* Upload Form */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label htmlFor="image-upload" className="text-gray-300 text-lg">
                  Profile Image
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
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </label>
                </div>
                {imageFile && (
                  <Badge className="bg-green-500/20 text-green-400">
                    Image uploaded successfully
                  </Badge>
                )}
              </div>

              {/* Video Upload */}
              <div className="space-y-3">
                <Label htmlFor="video-upload" className="text-gray-300 text-lg">
                  Video Sample
                </Label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <Video className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-gray-400">
                        {videoFile ? videoFile.name : 'Click to upload video'}
                      </p>
                      <p className="text-xs text-gray-500">MP4, AVI, MOV up to 50MB</p>
                    </div>
                  </label>
                </div>
                {videoFile && (
                  <Badge className="bg-green-500/20 text-green-400">
                    Video uploaded successfully
                  </Badge>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!imageFile || !videoFile || isProcessing || userCoins < 5}
                className="bg-purple-500 hover:bg-purple-600 px-8 py-3 text-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Coins className="h-4 w-4 mr-2" />
                    Create Simulation (5 coins)
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
                  You need at least 5 coins to create a live video simulation. 
                  Please top up your account to continue.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Video className="h-5 w-5" />
              How Video Simulation Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Process:</h4>
                <ol className="text-gray-300 space-y-1 text-sm">
                  <li>1. Upload a profile image (face photo)</li>
                  <li>2. Upload a video sample for voice/mannerisms</li>
                  <li>3. Confirm payment of 5 coins</li>
                  <li>4. AI processing creates live simulation</li>
                  <li>5. Receive link to interactive simulation</li>
                </ol>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Features:</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Real-time facial animation</li>
                  <li>• Voice synthesis and matching</li>
                  <li>• Interactive live video interface</li>
                  <li>• High-quality video output</li>
                  <li>• Educational demonstration ready</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-gray-300 text-sm">
                <strong>Note:</strong> Processing typically takes 5-15 minutes depending on file sizes and current queue. 
                You'll receive a notification when your simulation is ready. The placeholder link below will be replaced 
                with your actual simulation dashboard.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Placeholder: files/dashboard.js:line 134
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VideoSimulation;
