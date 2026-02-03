import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English', shortName: 'EN' },
    { code: 'fr', name: 'Français', shortName: 'FR' },
    { code: 'nl', name: 'Nederlands', shortName: 'NL' },
    { code: 'es', name: 'Español', shortName: 'ES' },
  ];

  // Get base language code (e.g., 'en' from 'en-US')
  const getBaseCode = (code: string) => code.split('-')[0];
  const currentBaseCode = getBaseCode(i18n.language);
  const currentLang = languages.find(lang => lang.code === currentBaseCode) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('languageSwitcher.changeLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={currentBaseCode === lang.code ? 'bg-accent' : ''}
          >
            <span className="font-medium mr-2">{lang.shortName}</span>
            <span className="text-muted-foreground">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
