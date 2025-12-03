import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Book } from '@/types/book';
import { PinTemplate } from '@/types/book';

interface PinPreviewProps {
  book: Book;
  template: PinTemplate;
}

export interface PinPreviewRef {
  getElement: () => HTMLDivElement | null;
}

export const PinPreview = forwardRef<PinPreviewRef, PinPreviewProps>(
  ({ book, template }, ref) => {
    const pinRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      getElement: () => pinRef.current,
    }));

    const renderTemplate = () => {
      switch (template.style) {
        case 'classic':
          return (
            <div
              ref={pinRef}
              className="relative flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl bg-cream"
            >
              <div className="relative h-[65%] overflow-hidden">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent" />
              </div>
              <div className="flex flex-1 flex-col justify-center px-6 pb-6 text-center">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {book.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  by {book.author}
                </p>
                <div className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Available on Amazon
                </div>
              </div>
            </div>
          );

        case 'modern':
          return (
            <div
              ref={pinRef}
              className="relative flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl bg-foreground"
            >
              <div className="absolute inset-0 opacity-20">
                <img
                  src={book.coverUrl}
                  alt=""
                  className="h-full w-full object-cover blur-2xl"
                />
              </div>
              <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8">
                <div className="aspect-[2/3] w-48 overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mt-6 text-center font-display text-2xl font-bold text-primary-foreground">
                  {book.title}
                </h2>
                <p className="mt-2 text-center text-sm text-primary-foreground/70">
                  by {book.author}
                </p>
                <p className="mt-4 line-clamp-3 text-center text-xs text-primary-foreground/60">
                  {book.description}
                </p>
              </div>
              <div className="relative z-10 bg-primary p-4 text-center">
                <span className="text-sm font-semibold text-primary-foreground">
                  📚 Get Your Copy Now
                </span>
              </div>
            </div>
          );

        case 'minimal':
          return (
            <div
              ref={pinRef}
              className="relative flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border-4 border-border bg-background p-6"
            >
              <div className="flex-1">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-lg">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <h2 className="font-display text-xl font-bold text-foreground">
                  {book.title}
                </h2>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
            </div>
          );

        case 'bold':
          return (
            <div
              ref={pinRef}
              className="relative flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl bg-gradient-hero"
            >
              <div className="flex-1 p-6">
                <div className="mb-4 inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-foreground">
                  {book.genre || 'NEW RELEASE'}
                </div>
                <h2 className="font-display text-3xl font-bold leading-tight text-primary-foreground">
                  {book.title}
                </h2>
                <p className="mt-2 text-lg text-primary-foreground/80">
                  by {book.author}
                </p>
              </div>
              <div className="relative h-[55%]">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-foreground/90 p-4">
                  <p className="text-center text-sm font-medium text-primary-foreground">
                    ⭐ Available on Amazon Kindle
                  </p>
                </div>
              </div>
            </div>
          );

        case 'elegant':
          return (
            <div
              ref={pinRef}
              className="relative flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl bg-cream"
            >
              <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-gold opacity-30" />
              <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8">
                <div className="mb-6 h-px w-16 bg-gold" />
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  A Novel by
                </p>
                <p className="mt-1 font-display text-lg text-foreground">
                  {book.author}
                </p>
                <div className="my-6 aspect-[2/3] w-44 overflow-hidden rounded shadow-lg ring-4 ring-gold/30">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="text-center font-display text-2xl font-bold text-foreground">
                  {book.title}
                </h2>
                <div className="mt-6 h-px w-16 bg-gold" />
                <p className="mt-4 text-xs text-muted-foreground">
                  Available Now on Amazon
                </p>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return renderTemplate();
  }
);

PinPreview.displayName = 'PinPreview';
