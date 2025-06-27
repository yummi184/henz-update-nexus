
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Link as LinkIcon, FileText, Music, Video, Image, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DownloadersTools = () => {
  const [activeTab, setActiveTab] = useState('social');
  const [inputUrl, setInputUrl] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const socialDownloaders = [
    { name: 'Facebook', icon: '📘', endpoint: 'fbdl', param: 'url' },
    { name: 'Instagram', icon: '📷', endpoint: 'instadl', param: 'url' },
    { name: 'Twitter', icon: '🐦', endpoint: 'twitterdl', param: 'url' },
    { name: 'TikTok', icon: '🎵', endpoint: 'tkdl', param: 'url' },
    { name: 'YouTube', icon: '📺', endpoint: 'ytmp4', param: 'url' },
    { name: 'Spotify', icon: '🎵', endpoint: 'spotifydl', param: 'url' },
    { name: 'Pinterest', icon: '📌', endpoint: 'pinterest', param: 'q' }
  ];

  const fileDownloaders = [
    { name: 'MediaFire', icon: '📁', endpoint: 'mediafire', param: 'url' }
  ];

  const tools = [
    { name: 'Text to Font', icon: '🔤', endpoint: 'font', param: 'text' },
    { name: 'Code Obfuscator', icon: '🔒', endpoint: 'obf', param: 'code' }
  ];

  const handleDownload = async (endpoint: string, param: string, value: string) => {
    if (!value.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid URL or text',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = `https://auth-service-emmyhenz-api.hf.space/api/${endpoint}?${param}=${encodeURIComponent(value)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      setResult(data);
      
      toast({
        title: 'Success',
        description: 'Content processed successfully!'
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process content. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Downloaders & Tools</h1>
          <p className="text-gray-400">Download content from social media and use various tools</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800/50 rounded-lg p-1">
            <Button
              onClick={() => setActiveTab('social')}
              className={`mr-2 ${activeTab === 'social' ? 'bg-blue-500' : 'bg-transparent'}`}
            >
              Social Media
            </Button>
            <Button
              onClick={() => setActiveTab('files')}
              className={`mr-2 ${activeTab === 'files' ? 'bg-blue-500' : 'bg-transparent'}`}
            >
              File Downloads
            </Button>
            <Button
              onClick={() => setActiveTab('tools')}
              className={activeTab === 'tools' ? 'bg-blue-500' : 'bg-transparent'}
            >
              Tools
            </Button>
          </div>
        </div>

        {/* Social Media Downloaders */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Social Media Downloaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {socialDownloaders.map((platform) => (
                    <Card key={platform.name} className="bg-slate-700/50 border-slate-600">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{platform.icon}</div>
                        <h3 className="text-white font-semibold mb-3">{platform.name}</h3>
                        <div className="space-y-2">
                          <Input
                            placeholder={platform.param === 'url' ? 'Enter URL' : 'Enter search term'}
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            className="bg-slate-600 border-slate-500 text-white"
                          />
                          <Button
                            onClick={() => handleDownload(platform.endpoint, platform.param, inputUrl)}
                            disabled={isLoading}
                            className="w-full bg-blue-500 hover:bg-blue-600"
                          >
                            {isLoading ? 'Processing...' : 'Download'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* File Downloaders */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  File Downloaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fileDownloaders.map((platform) => (
                    <Card key={platform.name} className="bg-slate-700/50 border-slate-600">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{platform.icon}</div>
                        <h3 className="text-white font-semibold mb-3">{platform.name}</h3>
                        <div className="space-y-2">
                          <Input
                            placeholder="Enter file URL"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            className="bg-slate-600 border-slate-500 text-white"
                          />
                          <Button
                            onClick={() => handleDownload(platform.endpoint, platform.param, inputUrl)}
                            disabled={isLoading}
                            className="w-full bg-blue-500 hover:bg-blue-600"
                          >
                            {isLoading ? 'Processing...' : 'Download'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tools */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Utility Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-2">🔤</div>
                        <h3 className="text-white font-semibold">Text to Font</h3>
                      </div>
                      <div className="space-y-2">
                        <Input
                          placeholder="Enter text to convert"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                        <Button
                          onClick={() => handleDownload('font', 'text', inputText)}
                          disabled={isLoading}
                          className="w-full bg-green-500 hover:bg-green-600"
                        >
                          {isLoading ? 'Converting...' : 'Convert'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-2">🔒</div>
                        <h3 className="text-white font-semibold">Code Obfuscator</h3>
                      </div>
                      <div className="space-y-2">
                        <textarea
                          placeholder="Enter code to obfuscate"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          className="w-full h-20 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white resize-none"
                        />
                        <Button
                          onClick={() => handleDownload('obf', 'code', inputCode)}
                          disabled={isLoading}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          {isLoading ? 'Obfuscating...' : 'Obfuscate'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {result && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <pre className="text-white text-sm overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
                {result.downloadUrl && (
                  <Button
                    onClick={() => downloadFile(result.downloadUrl, 'download')}
                    className="mt-4 bg-green-500 hover:bg-green-600"
                  >
                    Download File
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DownloadersTools;
