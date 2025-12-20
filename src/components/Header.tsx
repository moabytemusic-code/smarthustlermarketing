import { BookOpen, Sparkles } from 'lucide-react';
export const Header = () => {
  return <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">PinPress Pro</h1>
            <p className="text-xs text-muted-foreground">KDP Book Pins</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-gold" />
          <span>Create stunning Pinterest pins for your books</span>
        </div>
      </div>
    </header>;
};