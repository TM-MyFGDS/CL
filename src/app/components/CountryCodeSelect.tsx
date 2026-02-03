import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const PRIORITY_COUNTRIES = [
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
];

const OTHER_COUNTRIES = [
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
];

const ALL_COUNTRIES = [...PRIORITY_COUNTRIES, ...OTHER_COUNTRIES];

interface CountryCodeSelectProps {
  value: string;
  onChange: (dialCode: string) => void;
  className?: string;
}

export function CountryCodeSelect({ value, onChange, className }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = ALL_COUNTRIES.find(c => c.dialCode === value) || PRIORITY_COUNTRIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: Country) => {
    onChange(country.dialCode);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 min-w-[120px] px-3 py-2 flex items-center gap-2 border border-input rounded-lg bg-input-background hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <span className="text-base">{selectedCountry.flag}</span>
        <span className="text-base md:text-sm font-medium text-foreground">{selectedCountry.dialCode}</span>
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-44 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
          <div className="max-h-64 overflow-y-auto">
            {/* Popular Countries */}
            <div className="py-1.5">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">
                Popular
              </div>
              {PRIORITY_COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 hover:bg-accent transition-colors duration-150",
                    selectedCountry.code === country.code && "bg-accent/50"
                  )}
                >
                  <span className="text-sm font-semibold text-foreground w-7 flex-shrink-0">{country.code}</span>
                  <span className="text-sm text-muted-foreground flex-shrink-0">{country.dialCode}</span>
                  {selectedCountry.code === country.code && (
                    <Check className="h-4 w-4 text-primary ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
              <div className="h-px bg-border my-2 mx-3" />
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">
                All Countries
              </div>
            </div>
            
            {/* All Other Countries */}
            <div className="pb-1.5">
              {OTHER_COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 hover:bg-accent transition-colors duration-150",
                    selectedCountry.code === country.code && "bg-accent/50"
                  )}
                >
                  <span className="text-sm font-semibold text-foreground w-7 flex-shrink-0">{country.code}</span>
                  <span className="text-sm text-muted-foreground flex-shrink-0">{country.dialCode}</span>
                  {selectedCountry.code === country.code && (
                    <Check className="h-4 w-4 text-primary ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}