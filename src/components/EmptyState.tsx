import { BookOpen, Plus } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-secondary">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
        No Books Yet
      </h3>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Add your first KDP book to start creating beautiful Pinterest pins that drive traffic to your Amazon listings.
      </p>
    </div>
  );
};
