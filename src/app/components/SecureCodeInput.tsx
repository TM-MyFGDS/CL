import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface SecureCodeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function SecureCodeInput({ 
  label, 
  value, 
  onChange, 
  placeholder = '••••••',
  readOnly = false 
}: SecureCodeInputProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2 mt-1">
        <Input
          type={isRevealed ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={readOnly}
          className="font-mono"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setIsRevealed(!isRevealed)}
          className="flex-shrink-0"
        >
          {isRevealed ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
