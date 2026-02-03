import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) return null;
  
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const criteriaCount = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar
  ].filter(Boolean).length;
  
  if (criteriaCount <= 2) return 'weak';
  if (criteriaCount === 3 || criteriaCount === 4) return 'medium';
  return 'strong';
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { t } = useTranslation();
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return 'bg-neutral-400';
      case 'medium':
        return 'bg-amber-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-neutral-300';
    }
  };

  const getStrengthWidth = () => {
    switch (strength) {
      case 'weak':
        return 'w-1/3';
      case 'medium':
        return 'w-2/3';
      case 'strong':
        return 'w-full';
      default:
        return 'w-0';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 'weak':
        return t('auth.passwordStrength.weak');
      case 'medium':
        return t('auth.passwordStrength.medium');
      case 'strong':
        return t('auth.passwordStrength.strong');
      default:
        return '';
    }
  };

  const getTextColor = () => {
    switch (strength) {
      case 'weak':
        return 'text-neutral-600 dark:text-neutral-400';
      case 'medium':
        return 'text-amber-600 dark:text-amber-500';
      case 'strong':
        return 'text-green-600 dark:text-green-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-1 animate-in fade-in-0 slide-in-from-top-1 duration-200">
      <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            getStrengthColor(),
            getStrengthWidth()
          )}
        />
      </div>
      <p className={cn('text-xs font-medium transition-colors duration-200', getTextColor())}>
        {getStrengthText()}
      </p>
    </div>
  );
}
