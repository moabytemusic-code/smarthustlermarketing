import { PinTemplate } from '@/types/book';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const templateConfigs: { template: PinTemplate; previewStyle: string }[] = [
  { 
    template: { id: '1', name: 'Classic', style: 'classic' }, 
    previewStyle: 'classic'
  },
  { 
    template: { id: '2', name: 'Modern', style: 'modern' }, 
    previewStyle: 'modern'
  },
  { 
    template: { id: '3', name: 'Minimal', style: 'minimal' }, 
    previewStyle: 'minimal'
  },
  { 
    template: { id: '4', name: 'Bold', style: 'bold' }, 
    previewStyle: 'bold'
  },
  { 
    template: { id: '5', name: 'Elegant', style: 'elegant' }, 
    previewStyle: 'elegant'
  },
];

interface TemplateSelectorProps {
  selectedTemplate: PinTemplate;
  onSelect: (template: PinTemplate) => void;
}

// Mini preview component that mimics each template style
const TemplatePreview = ({ style }: { style: string }) => {
  switch (style) {
    case 'classic':
      return (
        <div className="h-full w-full flex flex-col overflow-hidden rounded-lg bg-[#FDF8F3]">
          <div className="relative h-[60%] bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-2">
                <div className="text-[6px] text-white/70 font-medium">BESTSELLER</div>
                <div className="text-[10px] font-bold text-white mt-0.5 leading-tight">THE NIGHT</div>
                <div className="text-[10px] font-bold text-white leading-tight">SHE DISAPPEARED</div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#FDF8F3]" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center px-2 pb-2">
            <div className="text-[7px] font-semibold text-foreground text-center">Book Title</div>
            <div className="text-[5px] text-muted-foreground">by Author</div>
            <div className="mt-1 rounded-full bg-primary px-2 py-0.5 text-[4px] text-primary-foreground">
              Amazon
            </div>
          </div>
        </div>
      );

    case 'modern':
      return (
        <div className="h-full w-full flex flex-col overflow-hidden rounded-lg bg-slate-900 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-slate-900" />
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-2">
            <div className="w-8 h-12 rounded bg-gradient-to-br from-orange-400 to-red-500 shadow-lg" />
            <div className="text-[6px] font-bold text-white mt-2 text-center">Modern Title</div>
            <div className="text-[4px] text-white/60">by Author</div>
          </div>
          <div className="relative z-10 bg-primary py-1 text-center">
            <span className="text-[4px] text-primary-foreground">📚 Get Now</span>
          </div>
        </div>
      );

    case 'minimal':
      return (
        <div className="h-full w-full flex flex-col overflow-hidden rounded-lg border-2 border-border bg-background p-1.5">
          <div className="flex-1">
            <div className="h-full w-full rounded bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-end p-1">
              <div className="text-[5px] text-white font-medium leading-tight">THE WAY HOME</div>
            </div>
          </div>
          <div className="mt-1 border-t border-border pt-1">
            <div className="text-[6px] font-semibold text-foreground truncate">Title</div>
            <div className="text-[4px] text-muted-foreground">Author</div>
          </div>
        </div>
      );

    case 'bold':
      return (
        <div className="h-full w-full flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-rose-600 to-pink-700">
          <div className="p-2 flex-1">
            <div className="rounded-full bg-amber-400 px-1.5 py-0.5 text-[4px] font-bold text-slate-900 inline-block">
              NEW
            </div>
            <div className="text-[8px] font-bold text-white mt-1 leading-tight">BOLD</div>
            <div className="text-[8px] font-bold text-white leading-tight">TITLE</div>
            <div className="text-[4px] text-white/80 mt-0.5">by Author</div>
          </div>
          <div className="h-[45%] bg-gradient-to-br from-blue-400 to-purple-500">
            <div className="h-full w-full bg-slate-900/20 flex items-end justify-center pb-1">
              <span className="text-[4px] text-white bg-slate-900/80 px-1.5 py-0.5 rounded">⭐ Amazon</span>
            </div>
          </div>
        </div>
      );

    case 'elegant':
      return (
        <div className="h-full w-full flex flex-col overflow-hidden rounded-lg bg-[#FDF8F3] relative">
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-amber-200/40 to-amber-300/40" />
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-2">
            <div className="w-5 h-0.5 bg-amber-400 mb-1" />
            <div className="text-[4px] text-muted-foreground uppercase tracking-widest">A Novel by</div>
            <div className="text-[5px] text-foreground font-medium">Author Name</div>
            <div className="my-2 w-7 h-10 rounded shadow-md ring-2 ring-amber-300/50 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <div className="text-[4px] text-amber-300 font-serif">Title</div>
            </div>
            <div className="text-[6px] font-bold text-foreground">Elegant Title</div>
            <div className="w-5 h-0.5 bg-amber-400 mt-1" />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const TemplateSelector = ({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Choose Template
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {templateConfigs.map(({ template, previewStyle }) => {
          const isSelected = selectedTemplate.id === template.id;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={cn(
                'group relative flex flex-col gap-2 transition-all duration-300',
                'hover:scale-105 hover:-translate-y-1'
              )}
            >
              {/* Pin preview card */}
              <div
                className={cn(
                  'relative aspect-[2/3] w-full overflow-hidden rounded-xl transition-all duration-300',
                  'shadow-md hover:shadow-xl',
                  isSelected
                    ? 'ring-3 ring-primary ring-offset-2 ring-offset-background shadow-lg shadow-primary/25'
                    : 'ring-1 ring-border/50 hover:ring-primary/50'
                )}
              >
                <TemplatePreview style={previewStyle} />
                
                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
              
              {/* Template name */}
              <span
                className={cn(
                  'text-xs font-medium text-center transition-colors duration-300',
                  isSelected ? 'text-primary' : 'text-foreground/70 group-hover:text-foreground'
                )}
              >
                {template.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const templates = templateConfigs.map(t => t.template);
export { templates };
