import { useState } from 'react';
import { Book, Plus, Link, User, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Book as BookType } from '@/types/book';

interface BookFormProps {
  onSubmit: (book: Omit<BookType, 'id' | 'createdAt'>) => void;
  initialData?: BookType;
}

export const BookForm = ({ onSubmit, initialData }: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    description: initialData?.description || '',
    coverUrl: initialData?.coverUrl || '',
    amazonUrl: initialData?.amazonUrl || '',
    genre: initialData?.genre || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        title: '',
        author: '',
        description: '',
        coverUrl: '',
        amazonUrl: '',
        genre: '',
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="animate-fade-up border-border/50 bg-gradient-card shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Book className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-display text-xl">
              {initialData ? 'Edit Book' : 'Add New Book'}
            </CardTitle>
            <CardDescription>
              Enter your KDP book details to create Pinterest pins
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                Book Title
              </Label>
              <Input
                id="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="h-11 bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                Author Name
              </Label>
              <Input
                id="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                required
                className="h-11 bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              Book Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter a compelling description for your book..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              rows={3}
              className="resize-none bg-background/50"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="coverUrl" className="flex items-center gap-2 text-sm font-medium">
                <Link className="h-3.5 w-3.5 text-muted-foreground" />
                Cover Image URL
              </Label>
              <Input
                id="coverUrl"
                type="url"
                placeholder="https://..."
                value={formData.coverUrl}
                onChange={(e) => handleChange('coverUrl', e.target.value)}
                required
                className="h-11 bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amazonUrl" className="flex items-center gap-2 text-sm font-medium">
                <Link className="h-3.5 w-3.5 text-muted-foreground" />
                Amazon Book URL
              </Label>
              <Input
                id="amazonUrl"
                type="url"
                placeholder="https://amazon.com/..."
                value={formData.amazonUrl}
                onChange={(e) => handleChange('amazonUrl', e.target.value)}
                required
                className="h-11 bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              Genre (optional)
            </Label>
            <Input
              id="genre"
              placeholder="e.g., Romance, Thriller, Self-Help"
              value={formData.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
              className="h-11 bg-background/50"
            />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full">
            <Plus className="h-4 w-4" />
            {initialData ? 'Update Book' : 'Add Book'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
