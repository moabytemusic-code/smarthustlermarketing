import { ExternalLink, Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  onSelect: (book: Book) => void;
  isSelected?: boolean;
}

export const BookCard = ({ book, onDelete, onSelect, isSelected }: BookCardProps) => {
  return (
    <Card
      className={`group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? 'border-primary shadow-glow'
          : 'border-transparent hover:border-primary/30'
      }`}
      onClick={() => onSelect(book)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                window.open(book.amazonUrl, '_blank');
              }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Amazon
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(book.id);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        {book.genre && (
          <div className="absolute left-2 top-2">
            <span className="rounded-full bg-primary/90 px-2.5 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
              {book.genre}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground line-clamp-1">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
          {book.description}
        </p>
      </CardContent>
    </Card>
  );
};
