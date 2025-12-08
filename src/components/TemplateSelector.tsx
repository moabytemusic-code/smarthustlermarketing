import { PinTemplate } from '@/types/book';
import { cn } from '@/lib/utils';

const templates: PinTemplate[] = [
  { id: '0', name: 'Cover Only', style: 'cover' },
  { id: '1', name: 'Classic', style: 'classic' },
  { id: '2', name: 'Modern', style: 'modern' },
  { id: '3', name: 'Minimal', style: 'minimal' },
  { id: '4', name: 'Bold', style: 'bold' },
  { id: '5', name: 'Elegant', style: 'elegant' },
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
    <div className="space-y-3">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Choose Template
      </h3>
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              selectedTemplate.id === template.id
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export { templates };
