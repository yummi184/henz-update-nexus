
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Code } from 'lucide-react';
import DownloaderCard from '@/components/DownloaderCard';
import ToolCard from '@/components/ToolCard';

const DownloadersTools = () => {
  const [activeTab, setActiveTab] = useState('social');
  const [activeDownloader, setActiveDownloader] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

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
    { name: 'Text to Font', icon: '🔤', endpoint: 'font', type: 'font' as const },
    { name: 'Code Obfuscator', icon: '🔒', endpoint: 'obf', type: 'obfuscator' as const }
  ];

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
              onClick={() => {
                setActiveTab('social');
                setActiveDownloader(null);
                setActiveTool(null);
              }}
              className={`mr-2 ${activeTab === 'social' ? 'bg-blue-500' : 'bg-transparent'}`}
            >
              Social Media
            </Button>
            <Button
              onClick={() => {
                setActiveTab('files');
                setActiveDownloader(null);
                setActiveTool(null);
              }}
              className={`mr-2 ${activeTab === 'files' ? 'bg-blue-500' : 'bg-transparent'}`}
            >
              File Downloads
            </Button>
            <Button
              onClick={() => {
                setActiveTab('tools');
                setActiveDownloader(null);
                setActiveTool(null);
              }}
              className={activeTab === 'tools' ? 'bg-blue-500' : 'bg-transparent'}
            >
              Tools
            </Button>
          </div>
        </div>

        {/* Social Media Downloaders */}
        {activeTab === 'social' && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Download className="h-5 w-5" />
                Social Media Downloaders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialDownloaders.map((platform) => (
                  <DownloaderCard
                    key={platform.name}
                    name={platform.name}
                    icon={platform.icon}
                    endpoint={platform.endpoint}
                    param={platform.param}
                    isActive={activeDownloader === platform.name}
                    onActivate={() => setActiveDownloader(activeDownloader === platform.name ? null : platform.name)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Downloaders */}
        {activeTab === 'files' && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Download className="h-5 w-5" />
                File Downloaders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fileDownloaders.map((platform) => (
                  <DownloaderCard
                    key={platform.name}
                    name={platform.name}
                    icon={platform.icon}
                    endpoint={platform.endpoint}
                    param={platform.param}
                    isActive={activeDownloader === platform.name}
                    onActivate={() => setActiveDownloader(activeDownloader === platform.name ? null : platform.name)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tools */}
        {activeTab === 'tools' && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code className="h-5 w-5" />
                Utility Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.name}
                    name={tool.name}
                    icon={tool.icon}
                    endpoint={tool.endpoint}
                    type={tool.type}
                    isActive={activeTool === tool.name}
                    onActivate={() => setActiveTool(activeTool === tool.name ? null : tool.name)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DownloadersTools;
