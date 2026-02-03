import { useState, useRef, useEffect } from 'react';
import { X, Camera, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { toast } from 'sonner';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  avatarUrl?: string;
}

const AVAILABLE_LANGUAGES = [
  { id: 'nl', label: 'Nederlands' },
  { id: 'en', label: 'Engels' },
  { id: 'de', label: 'Duits' },
  { id: 'fr', label: 'Frans' },
  { id: 'es', label: 'Spaans' },
  { id: 'it', label: 'Italiaans' },
  { id: 'pt', label: 'Portugees' },
  { id: 'other', label: 'Anders' },
];

export function ProfileSettingsModal({
  isOpen,
  onClose,
  userEmail = '',
  userName = '',
  avatarUrl: initialAvatarUrl,
}: ProfileSettingsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['nl']);
  const [otherLanguage, setOtherLanguage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (userName) {
      const names = userName.split(' ');
      setFirstName(names[0] || '');
      setLastName(names.slice(1).join(' ') || '');
    }
  }, [userName]);

  useEffect(() => {
    setAvatarUrl(initialAvatarUrl || '');
  }, [initialAvatarUrl]);

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName.slice(0, 2).toUpperCase();
    }
    if (userEmail) {
      return userEmail.slice(0, 2).toUpperCase();
    }
    return 'H';
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Upload alleen afbeeldingsbestanden (JPG, PNG)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Afbeelding moet kleiner zijn dan 5MB');
      return;
    }

    setIsUploading(true);
    setAvatarFile(file);

    try {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        toast.success('Foto toegevoegd');
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast.error('Foto uploaden mislukt');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Foto uploaden mislukt');
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl('');
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Foto verwijderd');
  };

  const handleLanguageToggle = (languageId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId]
    );
  };

  const handleSave = () => {
    // Validate required fields
    if (!firstName.trim()) {
      toast.error('Voornaam is verplicht');
      return;
    }
    if (!lastName.trim()) {
      toast.error('Achternaam is verplicht');
      return;
    }

    // Here you would normally save to backend
    // For now, just show success message
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    toast.success('Profiel opgeslagen');
    
    // In production, you would:
    // 1. Upload avatar to storage if avatarFile exists
    // 2. Save profile data to database
    // 3. Update auth user profile if needed
    
    console.log('Saving profile:', {
      firstName,
      lastName,
      phone,
      bio,
      selectedLanguages,
      otherLanguage,
      avatarUrl,
    });
    
    onClose();
  };

  const handleCancel = () => {
    // Reset form to initial values
    setAvatarUrl(initialAvatarUrl || '');
    setAvatarFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-[600px] max-h-[80vh] md:max-h-[80vh] p-0 overflow-hidden \n                   bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 \n                   rounded-2xl md:rounded-2xl m-4 md:m-0"
        aria-describedby="profile-settings-description"
      >
        <DialogTitle className="sr-only">Profielinstellingen</DialogTitle>
        <DialogDescription id="profile-settings-description" className="sr-only">
          Bewerk je profielgegevens, upload een foto en pas je taalinstellingen aan
        </DialogDescription>
        
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 \n                      dark:border-gray-700 px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              Profielinstellingen
            </h2>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg \n                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-180px)] px-4 md:px-8 py-4 md:py-6">
          <div className="space-y-6">
            {/* Profile Photo Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Profielfoto
              </Label>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-[120px] w-[120px] border-4 border-gray-200 dark:border-gray-700">
                  <AvatarImage src={avatarUrl} alt="Profile" />
                  <AvatarFallback
                    className="text-3xl font-semibold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                    }}
                  >
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button
                      type="button"
                      onClick={handleAvatarClick}
                      disabled={isUploading}
                      className="bg-gradient-to-r from-coral-600 to-coral-500 hover:from-coral-700 \n                               hover:to-coral-600 text-white"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {isUploading ? 'Uploaden...' : 'Foto uploaden'}
                    </Button>
                    {avatarUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleRemoveAvatar}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 \n                                 dark:text-red-500 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Verwijderen
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    JPG, PNG max 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Persoonlijke informatie
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm text-gray-900 dark:text-white">
                    Voornaam
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jan"
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm text-gray-900 dark:text-white">
                    Achternaam
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="de Vries"
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-900 dark:text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 \n                           cursor-not-allowed opacity-60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm text-gray-900 dark:text-white">
                  Telefoonnummer <span className="text-gray-500">(optioneel)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+31 6 12345678"
                  className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Languages Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  Welke talen spreek je?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gasten zien welke talen je spreekt
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AVAILABLE_LANGUAGES.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lang-${language.id}`}
                      checked={selectedLanguages.includes(language.id)}
                      onCheckedChange={() => handleLanguageToggle(language.id)}
                    />
                    <label
                      htmlFor={`lang-${language.id}`}
                      className="text-sm text-gray-900 dark:text-white cursor-pointer"
                    >
                      {language.label}
                    </label>
                  </div>
                ))}
              </div>

              {selectedLanguages.includes('other') && (
                <div className="space-y-2">
                  <Label htmlFor="otherLang" className="text-sm text-gray-900 dark:text-white">
                    Andere taal
                  </Label>
                  <Input
                    id="otherLang"
                    value={otherLanguage}
                    onChange={(e) => setOtherLanguage(e.target.value)}
                    placeholder="Bijv. Pools, Russisch..."
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm text-gray-900 dark:text-white">
                Bio <span className="text-gray-500">(optioneel)</span>
              </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Vertel iets over jezelf als host..."
                maxLength={500}
                rows={4}
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 \n                         resize-none"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 text-right">
                {bio.length}/500
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 \n                      dark:border-gray-700 px-4 md:px-8 py-4">
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 \n                       dark:hover:bg-gray-800"
            >
              Annuleren
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-gradient-to-r from-coral-600 to-coral-500 hover:from-coral-700 \n                       hover:to-coral-600 text-white"
            >
              Opslaan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}