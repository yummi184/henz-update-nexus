
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ToolCardProps {
  name: string;
  icon: string;
  endpoint: string;
  type: 'font' | 'obfuscator';
  isActive: boolean;
  onActivate: () => void;
}

const ToolCard = ({ name, icon, endpoint, type, isActive, onActivate }: ToolCardProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!inputValue.trim()) {
      toast({
        title: 'Error',
        description: `Please enter ${type === 'font' ? 'text' : 'code'} to process`,
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const param = type === 'font' ? 'text' : 'code';
      const apiUrl = `https://auth-service-emmyhenz-api.hf.space/api/${endpoint}?${param}=${encodeURIComponent(inputValue)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      setResult(data.result || data.obfuscated || JSON.stringify(data));
      toast({
        title: 'Success',
        description: `${name} processed successfully!`
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: 'Copied!',
      description: 'Result copied to clipboard'
    });
  };

  const downloadResult = () => {
    const extension = type === 'obfuscator' ? 'js' : 'txt';
    const filename = type === 'obfuscator' ? 'henzobsfucator.js' : 'font_result.txt';
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            {type === 'obfuscator' ? (
              <textarea
                placeholder="Enter code to obfuscate"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-20 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white resize-none"
              />
            ) : (
              <Input
                placeholder="Enter text to convert"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-slate-600 border-slate-500 text-white"
              />
            )}
            
            <Button
              onClick={handleProcess}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              {isLoading ? 'Processing...' : 'Process'}
            </Button>

            {result && (
              <div className="mt-4 space-y-2">
                <div className={`bg-slate-600 p-3 rounded text-white font-mono text-sm ${
                  type === 'obfuscator' ? 'max-h-32 overflow-y-auto' : ''
                } break-all`}>
                  <pre className="whitespace-pre-wrap">{result}</pre>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  {type === 'obfuscator' && (
                    <Button
                      onClick={downloadResult}
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ToolCard;
