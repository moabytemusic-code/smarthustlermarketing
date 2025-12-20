import { useRef, useState } from 'react';
import { Download, Loader2, Image } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PinPreview, PinPreviewRef } from './PinPreview';
import { TemplateSelector, templates } from './TemplateSelector';
import { Book, PinTemplate } from '@/types/book';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PinGeneratorProps {
  book: Book | null;
}

export const PinGenerator = ({ book }: PinGeneratorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PinTemplate>(templates[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPinning, setIsPinning] = useState(false);
  const pinRef = useRef<PinPreviewRef>(null);

  const generatePinImage = async () => {
    if (!pinRef.current || !book) return null;

    const element = pinRef.current.getElement();
    if (!element) return null;

    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
    });

    return dataUrl;
  };

  const handleDownload = async () => {
    if (!book) return;

    setIsDownloading(true);
    try {
      const dataUrl = await generatePinImage();
      if (!dataUrl) throw new Error('Failed to generate image');

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

  const handlePinIt = async () => {
    if (!book) return;

    setIsPinning(true);
    try {
      // Generate the pin image
      const dataUrl = await generatePinImage();
      if (!dataUrl) throw new Error('Failed to generate image');

      // Upload to storage via edge function
      const { data, error } = await supabase.functions.invoke('upload-pin-image', {
        body: {
          imageBase64: dataUrl,
          fileName: `${book.title.replace(/\s+/g, '-')}-pin.png`
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No URL returned from upload');

      // Build Pinterest share URL
      const pinterestUrl = new URL('https://pinterest.com/pin/create/button/');
      pinterestUrl.searchParams.set('url', book.amazonUrl || window.location.href);
      pinterestUrl.searchParams.set('media', data.url);
      pinterestUrl.searchParams.set('description', `${book.title} by ${book.author} - ${book.description || 'Check it out on Amazon!'}`);

      // Open Pinterest share dialog
      window.open(pinterestUrl.toString(), '_blank', 'width=750,height=600');

      toast.success('Pinterest share dialog opened!');
    } catch (error) {
      console.error('Failed to share to Pinterest:', error);
      toast.error('Failed to share to Pinterest. Please try again.');
    } finally {
      setIsPinning(false);
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

        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            disabled={isDownloading || isPinning}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </Button>

          <Button
            onClick={handlePinIt}
            disabled={isDownloading || isPinning}
            size="lg"
            className="flex-1 bg-[#E60023] hover:bg-[#ad081b] text-white"
          >
            {isPinning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
                Pin It
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
