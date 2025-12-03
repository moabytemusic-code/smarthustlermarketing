import { useRef, useState } from 'react';
import { Download, Loader2, Image } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PinPreview, PinPreviewRef } from './PinPreview';
import { TemplateSelector, templates } from './TemplateSelector';
import { Book, PinTemplate } from '@/types/book';
import { toast } from 'sonner';

interface PinGeneratorProps {
  book: Book | null;
}

export const PinGenerator = ({ book }: PinGeneratorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PinTemplate>(templates[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const pinRef = useRef<PinPreviewRef>(null);

  const handleDownload = async () => {
    if (!pinRef.current || !book) return;

    const element = pinRef.current.getElement();
    if (!element) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `${book.title.replace(/\s+/g, '-')}-pinterest-pin.png`;
      link.href = dataUrl;
      link.click();

      toast.success('Pin downloaded successfully!');
    } catch (error) {
      console.error('Failed to download pin:', error);
      toast.error('Failed to download pin. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!book) {
    return (
      <Card className="border-border/50 bg-gradient-card">
        <CardContent className="flex min-h-[500px] flex-col items-center justify-center p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Image className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
            No Book Selected
          </h3>
          <p className="mt-2 max-w-xs text-center text-sm text-muted-foreground">
            Add a book or select one from your library to start creating Pinterest pins
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-gradient-card">
      <CardHeader>
        <CardTitle className="font-display text-xl">Pin Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={setSelectedTemplate}
        />

        <div className="flex justify-center">
          <div className="transform scale-[0.65] origin-top rounded-2xl shadow-2xl">
            <PinPreview
              ref={pinRef}
              book={book}
              template={selectedTemplate}
            />
          </div>
        </div>

        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          variant="hero"
          size="lg"
          className="w-full"
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Pin
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
