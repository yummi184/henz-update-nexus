
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';
import ToolCard from '@/components/ToolCard';

const DownloadersTools = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { name: 'Text to Font', icon: '🔤', endpoint: 'font', type: 'font' as const },
    { name: 'Code Obfuscator', icon: '🔒', endpoint: 'obf', type: 'obfuscator' as const }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Tools</h1>
          <p className="text-gray-400">Use various utility tools</p>
        </div>

        {/* Tools */}
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
      </div>
    </Layout>
  );
};

export default DownloadersTools;
