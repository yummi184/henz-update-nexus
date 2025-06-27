
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Link as LinkIcon, FileText, Music, Video, Image, Code, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DownloadersTools = () => {
  const [activeTab, setActiveTab] = useState('social');
  const [inputUrl, setInputUrl] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);
  const [fontResult, setFontResult] = useState('');
  const [obfuscatedCode, setObfuscatedCode] = useState('');
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

  const handleDownload = async (endpoint: string, param: string, value: string) => {
    if (!value.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid URL or search term',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = `https://auth-service-emmyhenz-api.hf.space/api/${endpoint}?${param}=${encodeURIComponent(value)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      setDownloadData(data);
      
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

  const handleFontConvert = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter text to convert',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://auth-service-emmyhenz-api.hf.space/api/font?text=${encodeURIComponent(inputText)}`);
      const data = await response.json();
      
      setFontResult(data.result || JSON.stringify(data));
      toast({
        title: 'Success',
        description: 'Text converted successfully!'
      });
    } catch (error) {
      console.error('Font conversion error:', error);
      toast({
        title: 'Error',
        description: 'Failed to convert text. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleObfuscate = async () => {
    if (!inputCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter code to obfuscate',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://auth-service-emmyhenz-api.hf.space/api/obf?code=${encodeURIComponent(inputCode)}`);
      const data = await response.json();
      
      setObfuscatedCode(data.result || data.obfuscated || JSON.stringify(data));
      toast({
        title: 'Success',
        description: 'Code obfuscated successfully!'
      });
    } catch (error) {
      console.error('Obfuscation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to obfuscate code. Please try again.',
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
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Text copied to clipboard'
    });
  };

  const downloadObfuscatedCode = () => {
    const blob = new Blob([obfuscatedCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    downloadFile(url, 'henzobsfucator.js');
    URL.revokeObjectURL(url);
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
                            {isLoading ? 'Processing...' : 'Process'}
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
                            {isLoading ? 'Processing...' : 'Process'}
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
                          onClick={handleFontConvert}
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
                          onClick={handleObfuscate}
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

        {/* Download Results */}
        {downloadData && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Download Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white">Your content is ready!</span>
                  {downloadData.downloadUrl && (
                    <Button
                      onClick={() => downloadFile(downloadData.downloadUrl, downloadData.filename || 'download')}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Font Results */}
        {fontResult && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Font Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Converted Text:</span>
                  <Button
                    onClick={() => copyToClipboard(fontResult)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-slate-600 p-3 rounded text-white font-mono text-sm break-all">
                  {fontResult}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Obfuscated Code Results */}
        {obfuscatedCode && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Obfuscated Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Console Output:</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(obfuscatedCode)}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      onClick={downloadObfuscatedCode}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-black p-4 rounded text-green-400 font-mono text-sm overflow-x-auto max-h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap break-words">{obfuscatedCode}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DownloadersTools;
