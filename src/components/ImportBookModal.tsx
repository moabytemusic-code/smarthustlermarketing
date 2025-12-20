import { useState } from 'react';
import { Link, Loader2, Download, AlertCircle, Settings } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FirecrawlService, parseAmazonBookData } from '@/utils/FirecrawlService';
import { Book } from '@/types/book';
import { toast } from 'sonner';

interface ImportBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (book: Omit<Book, 'id' | 'createdAt'>) => void;
  onOpenApiKeyModal: () => void;
}

export const ImportBookModal = ({
  open,
  onOpenChange,
  onImport,
  onOpenApiKeyModal,
}: ImportBookModalProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<Omit<Book, 'id' | 'createdAt'> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasApiKey = !!FirecrawlService.getApiKey();

  const isValidAmazonUrl = (url: string) => {
    return url.includes('amazon.com') || url.includes('amazon.co') || url.includes('amzn.');
  };

  const handleScrape = async () => {
    if (!url) {
      setError('Please enter an Amazon URL');
      return;
    }

    if (!isValidAmazonUrl(url)) {
      setError('Please enter a valid Amazon book URL');
      return;
    }

    if (!hasApiKey) {
      setError('Please set your Firecrawl API key first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPreviewData(null);

    try {
      const result = await FirecrawlService.scrapeUrl(url);

      if (!result.success) {
        setError(result.error || 'Failed to scrape the page');
        return;
      }

      const html = result.data?.data?.html || result.data?.html || '';
      const markdown = result.data?.data?.markdown || result.data?.markdown || '';

      const bookData = parseAmazonBookData(html, markdown, url);

      if (!bookData) {
        setError('Could not extract book details. Please try a different URL or enter details manually.');
        return;
      }

      setPreviewData({
        ...bookData,
        amazonUrl: url,
      });
    } catch (err) {
      console.error('Scrape error:', err);
      setError('Failed to fetch book details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    if (previewData) {
      onImport(previewData);
      toast.success('Book imported successfully!');
      handleClose();
    }
  };

  const handleClose = () => {
    setUrl('');
    setPreviewData(null);
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Download className="h-5 w-5 text-primary" />
            Import from Amazon
          </DialogTitle>
          <DialogDescription>
            Paste an Amazon book URL to automatically import title, author, and cover image.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {!hasApiKey && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>You need a Firecrawl API key to import books</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenApiKeyModal}
                >
                  <Settings className="h-3.5 w-3.5 mr-1" />
                  Set Key
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="amazonUrl" className="flex items-center gap-2">
              <Link className="h-3.5 w-3.5 text-muted-foreground" />
              Amazon Book URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="amazonUrl"
                type="url"
                placeholder="https://amazon.com/dp/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleScrape}
                disabled={isLoading || !hasApiKey}
                variant="default"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Fetch'
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {previewData && (
            <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-4 animate-fade-up">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Preview
              </h4>
              <div className="flex gap-4">
                {previewData.coverUrl && (
                  <div className="w-20 h-28 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={previewData.coverUrl}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground line-clamp-2">
                    {previewData.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    by {previewData.author}
                  </p>
                  {previewData.description && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {previewData.description}
                    </p>
                  )}
                </div>
              </div>
              <Button onClick={handleImport} variant="hero" className="w-full">
                <Download className="h-4 w-4" />
                Import This Book
              </Button>
            </div>
          )}

          {hasApiKey && (
            <button
              onClick={onOpenApiKeyModal}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Settings className="h-3 w-3" />
              Manage API Key
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
