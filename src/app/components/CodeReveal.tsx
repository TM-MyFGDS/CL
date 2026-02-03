import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface CodeRevealProps {
  code: string;
  label: string;
  readOnly?: boolean;
}

export function CodeReveal({ code, label, readOnly = false }: CodeRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!code) return null;

  const displayValue = isRevealed ? code : '••••••';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <div className="flex-1 px-4 py-2 bg-muted rounded-lg font-mono text-sm">
          {displayValue}
        </div>
        {!readOnly && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRevealed(!isRevealed)}
            className="flex-shrink-0"
          >
            {isRevealed ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
