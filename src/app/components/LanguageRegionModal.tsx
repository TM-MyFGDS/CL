import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Search, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';

// All European languages - ONE per language (no region variants)
export const allLanguages = [
  // Top 3 - Quick select (blijven bovenaan)
  { code: 'nl', name: 'Nederlands', region: '', flag: '🇳🇱', popular: true },
  { code: 'en', name: 'English', region: '', flag: '🇬🇧', popular: true },
  { code: 'fr', name: 'Français', region: '', flag: '🇫🇷', popular: true },
  
  // Rest - Alfabetisch gesorteerd op naam (ONE per language)
  { code: 'bg', name: 'Български', region: '', flag: '🇧🇬', popular: false },
  { code: 'cs', name: 'Čeština', region: '', flag: '🇨🇿', popular: false },
  { code: 'cy', name: 'Cymraeg', region: '', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', popular: false },
  { code: 'da', name: 'Dansk', region: '', flag: '🇩🇰', popular: false },
  { code: 'de', name: 'Deutsch', region: '', flag: '🇩🇪', popular: false },
  { code: 'et', name: 'Eesti', region: '', flag: '🇪🇪', popular: false },
  { code: 'el', name: 'Ελληνικά', region: '', flag: '🇬🇷', popular: false },
  { code: 'es', name: 'Español', region: '', flag: '🇪🇸', popular: false },
  { code: 'fi', name: 'Suomi', region: '', flag: '🇫🇮', popular: false },
  { code: 'ga', name: 'Gaeilge', region: '', flag: '🇮🇪', popular: false },
  { code: 'hr', name: 'Hrvatski', region: '', flag: '🇭🇷', popular: false },
  { code: 'it', name: 'Italiano', region: '', flag: '🇮🇹', popular: false },
  { code: 'lv', name: 'Latviešu', region: '', flag: '🇱🇻', popular: false },
  { code: 'lt', name: 'Lietuvių', region: '', flag: '🇱🇹', popular: false },
  { code: 'hu', name: 'Magyar', region: '', flag: '🇭🇺', popular: false },
  { code: 'mt', name: 'Malti', region: '', flag: '🇲🇹', popular: false },
  { code: 'no', name: 'Norsk', region: '', flag: '🇳🇴', popular: false },
  { code: 'pl', name: 'Polski', region: '', flag: '🇵🇱', popular: false },
  { code: 'pt', name: 'Português', region: '', flag: '🇵🇹', popular: false },
  { code: 'ro', name: 'Română', region: '', flag: '🇷🇴', popular: false },
  { code: 'sk', name: 'Slovenčina', region: '', flag: '🇸🇰', popular: false },
  { code: 'sl', name: 'Slovenščina', region: '', flag: '🇸🇮', popular: false },
  { code: 'sv', name: 'Svenska', region: '', flag: '🇸🇪', popular: false },
  { code: 'tr', name: 'Türkçe', region: '', flag: '🇹🇷', popular: false },
];

interface LanguageRegionModalProps {
  open: boolean;
  onClose: () => void;
  onSelectLanguage: (code: string) => void;
  currentLanguage: string;
}

export function LanguageRegionModal({ 
  open, 
  onClose, 
  onSelectLanguage,
  currentLanguage 
}: LanguageRegionModalProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (code: string) => {
    onSelectLanguage(code);
    onClose();
  };

  // Filter languages based on search
  const filteredLanguages = searchQuery
    ? allLanguages.filter(lang => 
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allLanguages;

  // Get base language code (without region) for comparison
  const getBaseCode = (code: string) => code.split('-')[0];
  const currentBaseCode = getBaseCode(currentLanguage);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {t('languageModal.title')}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('languageModal.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </DialogHeader>

        {/* Language Grid */}
        <div className="overflow-y-auto px-6 py-6 max-h-[calc(85vh-180px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredLanguages.map((lang) => {
              const isSelected = currentLanguage === lang.code || currentBaseCode === getBaseCode(lang.code);
              
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`
                    group relative flex items-center gap-3 p-4 rounded-lg border-2 transition-all
                    hover:border-primary hover:bg-accent/50
                    ${isSelected 
                      ? 'border-primary bg-accent/30' 
                      : 'border-border bg-card'
                    }
                  `}
                >
                  {/* Language Code */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground uppercase">
                      {lang.code.split('-')[0]}
                    </span>
                  </div>
                  
                  {/* Language Info */}
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-foreground text-sm truncate">
                      {lang.name}
                    </div>
                  </div>

                  {/* Check Icon */}
                  {isSelected && (
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* No results */}
          {filteredLanguages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t('languageModal.noResults')}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            {t('languageModal.footer')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}