import { useState, useCallback } from 'react';
import { Book } from '@/types/book';

const STORAGE_KEY = 'kdp-pinterest-books';

const loadBooks = (): Book[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const books = JSON.parse(stored);
      return books.map((book: Book) => ({
        ...book,
        createdAt: new Date(book.createdAt),
      }));
    }
  } catch (e) {
    console.error('Failed to load books:', e);
  }
  return [];
};

const saveBooks = (books: Book[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (e) {
    console.error('Failed to save books:', e);
  }
};

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>(loadBooks);

  const addBook = useCallback((book: Omit<Book, 'id' | 'createdAt'>) => {
    const newBook: Book = {
      ...book,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setBooks((prev) => {
      const updated = [newBook, ...prev];
      saveBooks(updated);
      return updated;
    });
    return newBook;
  }, []);

  const updateBook = useCallback((id: string, updates: Partial<Book>) => {
    setBooks((prev) => {
      const updated = prev.map((book) =>
        book.id === id ? { ...book, ...updates } : book
      );
      saveBooks(updated);
      return updated;
    });
  }, []);

  const deleteBook = useCallback((id: string) => {
    setBooks((prev) => {
      const updated = prev.filter((book) => book.id !== id);
      saveBooks(updated);
      return updated;
    });
  }, []);

  const getBook = useCallback(
    (id: string) => books.find((book) => book.id === id),
    [books]
  );

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBook,
  };
};
