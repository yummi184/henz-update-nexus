
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloaderCardProps {
  name: string;
  icon: string;
  endpoint: string;
  param: string;
  isActive: boolean;
  onActivate: () => void;
}

const DownloaderCard = ({ name, icon, endpoint, param, isActive, onActivate }: DownloaderCardProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!inputValue.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid URL or search term',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = `https://auth-service-emmyhenz-api.hf.space/api/${endpoint}?${param}=${encodeURIComponent(inputValue)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.downloadUrl || data.url || data.link) {
        setDownloadUrl(data.downloadUrl || data.url || data.link);
        setDownloadReady(true);
        toast({
          title: 'Ready for Download!',
          description: 'Your content is ready to download'
        });
      } else {
        toast({
          title: 'Processing Complete',
          description: 'Content processed but no download link available'
        });
      }
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

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${name.toLowerCase()}_download`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card 
      className={`bg-slate-700/50 border-slate-600 cursor-pointer transition-all ${
        isActive ? 'ring-2 ring-blue-500' : 'hover:bg-slate-700'
      }`}
      onClick={onActivate}
    >
      <CardContent className="p-4 text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-white font-semibold mb-3">{name}</h3>
        
        {isActive && (
          <div className="space-y-3 mt-4" onClick={(e) => e.stopPropagation()}>
            <Input
              placeholder={param === 'url' ? 'Enter URL' : 'Enter search term'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-slate-600 border-slate-500 text-white"
            />
            {!downloadReady ? (
              <Button
                onClick={handleProcess}
                disabled={isLoading}
                className="w-full bg-green-500/50 hover:bg-green-600 text-white opacity-60"
              >
                {isLoading ? 'Processing...' : 'Process'}
              </Button>
            ) : (
              <Button
                onClick={handleDownload}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DownloaderCard;
