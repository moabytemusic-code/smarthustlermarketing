import { PinTemplate } from '@/types/book';
import { cn } from '@/lib/utils';
import { Sparkles, Zap, MinusCircle, Bold, Crown } from 'lucide-react';

const templates: { template: PinTemplate; icon: React.ElementType; gradient: string }[] = [
  { 
    template: { id: '1', name: 'Classic', style: 'classic' }, 
    icon: Sparkles, 
    gradient: 'from-amber-500 to-orange-600' 
  },
  { 
    template: { id: '2', name: 'Modern', style: 'modern' }, 
    icon: Zap, 
    gradient: 'from-violet-500 to-purple-600' 
  },
  { 
    template: { id: '3', name: 'Minimal', style: 'minimal' }, 
    icon: MinusCircle, 
    gradient: 'from-slate-400 to-slate-600' 
  },
  { 
    template: { id: '4', name: 'Bold', style: 'bold' }, 
    icon: Bold, 
    gradient: 'from-rose-500 to-red-600' 
  },
  { 
    template: { id: '5', name: 'Elegant', style: 'elegant' }, 
    icon: Crown, 
    gradient: 'from-emerald-500 to-teal-600' 
  },
];

interface TemplateSelectorProps {
  selectedTemplate: PinTemplate;
  onSelect: (template: PinTemplate) => void;
}

export const TemplateSelector = ({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Choose Template
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {templates.map(({ template, icon: Icon, gradient }) => {
          const isSelected = selectedTemplate.id === template.id;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={cn(
                'group relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-300',
                'border-2 hover:scale-105 hover:-translate-y-1',
                isSelected
                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25'
                  : 'border-border/50 bg-card hover:border-primary/50 hover:shadow-md'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300',
                  isSelected
                    ? `bg-gradient-to-br ${gradient} text-white shadow-md`
                    : 'bg-muted text-muted-foreground group-hover:bg-gradient-to-br group-hover:' + gradient + ' group-hover:text-white'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  'text-sm font-medium transition-colors duration-300',
                  isSelected ? 'text-primary' : 'text-foreground/70 group-hover:text-foreground'
                )}
              >
                {template.name}
              </span>
              {isSelected && (
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const exportedTemplates = templates.map(t => t.template);
export { exportedTemplates as templates };
