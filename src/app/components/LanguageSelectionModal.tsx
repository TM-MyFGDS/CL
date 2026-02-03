import { useState } from 'react';
import { X, Globe, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from 'sonner';

interface LanguageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_LANGUAGES = [
  { id: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { id: 'en', label: 'Engels', flag: '🇬🇧' },
  { id: 'de', label: 'Duits', flag: '🇩🇪' },
  { id: 'fr', label: 'Frans', flag: '🇫🇷' },
  { id: 'es', label: 'Spaans', flag: '🇪🇸' },
  { id: 'it', label: 'Italiaans', flag: '🇮🇹' },
  { id: 'pt', label: 'Portugees', flag: '🇵🇹' },
  { id: 'other', label: 'Anders', flag: '🌍' },
];

export function LanguageSelectionModal({ isOpen, onClose }: LanguageSelectionModalProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['nl']);
  const [otherLanguage, setOtherLanguage] = useState('');

  const handleLanguageToggle = (languageId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId]
    );
  };

  const handleSave = () => {
    if (selectedLanguages.length === 0) {
      toast.error('Selecteer minimaal één taal');
      return;
    }

    if (selectedLanguages.includes('other') && !otherLanguage.trim()) {
      toast.error('Vul de andere taal in');
      return;
    }

    // Here you would save to backend
    console.log('Saving languages:', {
      selectedLanguages,
      otherLanguage: selectedLanguages.includes('other') ? otherLanguage : '',
    });

    toast.success('Talen opgeslagen');
    onClose();
  };

  const getSelectedLanguagesText = () => {
    const selected = AVAILABLE_LANGUAGES.filter((lang) =>
      selectedLanguages.includes(lang.id) && lang.id !== 'other'
    );
    const labels = selected.map((lang) => lang.label);
    
    if (selectedLanguages.includes('other') && otherLanguage) {
      labels.push(otherLanguage);
    }

    if (labels.length === 0) return 'Geen talen geselecteerd';
    if (labels.length === 1) return labels[0];
    if (labels.length === 2) return `${labels[0]} en ${labels[1]}`;
    return `${labels.slice(0, -1).join(', ')} en ${labels[labels.length - 1]}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[500px] p-0 overflow-hidden bg-white dark:bg-gray-900
                   border border-gray-200 dark:border-gray-700 rounded-2xl"
        aria-describedby="language-selection-description"
      >
        <DialogTitle className="sr-only">Talen & communicatie</DialogTitle>
        <DialogDescription id="language-selection-description" className="sr-only">
          Selecteer de talen die je spreekt om gasten te laten weten hoe je kunt communiceren
        </DialogDescription>
        
        {/* Modal Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 
                      dark:border-gray-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                }}
              >
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Talen & communicatie
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gasten zien welke talen je spreekt
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Selected Languages Summary */}
          {selectedLanguages.length > 0 && (
            <div className="bg-coral-50 dark:bg-coral-900/20 border border-coral-200 
                          dark:border-coral-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-coral-600 dark:text-coral-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Geselecteerde talen
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {getSelectedLanguagesText()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Language Selection Grid */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-900 dark:text-white">
              Selecteer alle talen die je spreekt
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_LANGUAGES.map((language) => (
                <div
                  key={language.id}
                  className={`relative flex items-center gap-3 p-3 rounded-lg border-2 
                            transition-all cursor-pointer ${
                              selectedLanguages.includes(language.id)
                                ? 'border-coral-500 bg-coral-50 dark:bg-coral-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                  onClick={() => handleLanguageToggle(language.id)}
                >
                  <Checkbox
                    id={`lang-${language.id}`}
                    checked={selectedLanguages.includes(language.id)}
                    onCheckedChange={() => handleLanguageToggle(language.id)}
                    className={selectedLanguages.includes(language.id) 
                      ? 'border-coral-500 data-[state=checked]:bg-coral-600' 
                      : ''}
                  />
                  <label
                    htmlFor={`lang-${language.id}`}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <span className="text-xl">{language.flag}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {language.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Other Language Input */}
          {selectedLanguages.includes('other') && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label htmlFor="otherLang" className="text-sm text-gray-900 dark:text-white">
                Welke andere taal spreek je?
              </Label>
              <Input
                id="otherLang"
                value={otherLanguage}
                onChange={(e) => setOtherLanguage(e.target.value)}
                placeholder="Bijv. Pools, Russisch, Arabisch..."
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          )}

          {/* Helper Text */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 
                        dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              💡 <strong>Tip:</strong> Gasten voelen zich meer welkom wanneer ze weten dat je hun taal spreekt. 
              Dit kan ook helpen bij het beantwoorden van vragen.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 
                      dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                       dark:hover:bg-gray-700"
            >
              Annuleren
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={selectedLanguages.length === 0}
              className="bg-gradient-to-r from-coral-600 to-coral-500 hover:from-coral-700 
                       hover:to-coral-600 text-white disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              Opslaan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}