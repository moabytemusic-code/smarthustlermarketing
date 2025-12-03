import { useState } from 'react';
import { Header } from '@/components/Header';
import { BookForm } from '@/components/BookForm';
import { BookCard } from '@/components/BookCard';
import { PinGenerator } from '@/components/PinGenerator';
import { EmptyState } from '@/components/EmptyState';
import { useBooks } from '@/hooks/useBooks';
import { Book } from '@/types/book';
import { Toaster } from '@/components/ui/sonner';
import { Library, Wand2 } from 'lucide-react';

const Index = () => {
  const { books, addBook, deleteBook } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAddBook = (bookData: Omit<Book, 'id' | 'createdAt'>) => {
    const newBook = addBook(bookData);
    setSelectedBook(newBook);
  };

  const handleDeleteBook = (id: string) => {
    deleteBook(id);
    if (selectedBook?.id === id) {
      setSelectedBook(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Wand2 className="h-4 w-4" />
            Create stunning book pins in seconds
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Turn Your KDP Books Into
            <span className="block text-gradient-primary">Pinterest Traffic</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Generate eye-catching Pinterest pins for your Amazon KDP books. Drive more readers to your listings with beautiful, professional designs.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form & Library */}
          <div className="space-y-8">
            <BookForm onSubmit={handleAddBook} />

            {/* Book Library */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Library className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Your Books
                </h2>
                {books.length > 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {books.length}
                  </span>
                )}
              </div>

              {books.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {books.map((book, index) => (
                    <div
                      key={book.id}
                      className="animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <BookCard
                        book={book}
                        onDelete={handleDeleteBook}
                        onSelect={setSelectedBook}
                        isSelected={selectedBook?.id === book.id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Pin Generator */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PinGenerator book={selectedBook} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/50 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for KDP authors • Generate unlimited Pinterest pins for your books
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
