import { useState, useEffect } from 'react';
import { Key, ExternalLink, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { toast } from 'sonner';

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeySet: () => void;
}

export const ApiKeyModal = ({ open, onOpenChange, onKeySet }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState('');
  const [hasExistingKey, setHasExistingKey] = useState(false);

  useEffect(() => {
    const existingKey = FirecrawlService.getApiKey();
    setHasExistingKey(!!existingKey);
    if (existingKey) {
      setApiKey('••••••••••••••••');
    }
  }, [open]);

  const handleSave = () => {
    if (!apiKey || apiKey === '••••••••••••••••') {
      toast.error('Please enter a valid API key');
      return;
    }
    FirecrawlService.saveApiKey(apiKey);
    toast.success('API key saved successfully');
    onKeySet();
    onOpenChange(false);
  };

  const handleClear = () => {
    FirecrawlService.clearApiKey();
    setApiKey('');
    setHasExistingKey(false);
    toast.success('API key removed');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Key className="h-5 w-5 text-primary" />
            Firecrawl API Key
          </DialogTitle>
          <DialogDescription>
            Enter your Firecrawl API key to enable Amazon book importing. Your key is stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="fc-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            <a
              href="https://firecrawl.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get your free API key at firecrawl.dev
            </a>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="hero" className="flex-1">
              <Check className="h-4 w-4" />
              Save Key
            </Button>
            {hasExistingKey && (
              <Button onClick={handleClear} variant="outline">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
