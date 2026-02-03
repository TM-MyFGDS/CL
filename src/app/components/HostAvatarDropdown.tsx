import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProfileSettingsModal } from '@/app/components/ProfileSettingsModal';
import { LanguageSelectionModal } from '@/app/components/LanguageSelectionModal';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useIsMobile } from '@/app/components/ui/use-mobile';
import { useTranslation } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import {
  UserCircle,
  Camera,
  Globe,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
} from 'lucide-react';

interface HostAvatarDropdownProps {
  userEmail?: string | null;
  userName?: string | null;
  avatarUrl?: string | null;
  onLogout?: () => void;
}

export function HostAvatarDropdown({
  userEmail,
  userName,
  avatarUrl,
  onLogout,
}: HostAvatarDropdownProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const getInitials = () => {
    if (userName) {
      const names = userName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return userName.slice(0, 2).toUpperCase();
    }
    if (userEmail) {
      return userEmail.slice(0, 2).toUpperCase();
    }
    return 'H';
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success(t('host.avatar.logoutSuccess'));
      setSheetOpen(false);
      if (onLogout) {
        onLogout();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('host.avatar.logoutFailed'));
    }
  };

  const displayName = userName || userEmail?.split('@')[0] || t('host.defaultName');
  const displayEmail = userEmail || '';

  const avatarButton = (
    <button
      className="relative flex items-center justify-center h-10 w-10 rounded-full
                 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2
                 focus:ring-coral-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
        <AvatarImage src={avatarUrl || undefined} alt={displayName} />
        <AvatarFallback
          className="font-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
          }}
        >
          {getInitials()}
        </AvatarFallback>
      </Avatar>
    </button>
  );

  const menuContent = (
    <>
      {/* Profile Preview Section */}
      <div
        className="p-5 rounded-t-xl md:rounded-t-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 107, 107, 0.06) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-14 w-14 border-2 border-white dark:border-gray-700">
            <AvatarImage src={avatarUrl || undefined} alt={displayName} />
            <AvatarFallback
              className="font-semibold text-white text-lg"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
              }}
            >
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[16px] text-gray-900 dark:text-white truncate">
              {displayName}
            </p>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 truncate">
              {displayEmail}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setShowProfileModal(true);
            setSheetOpen(false);
          }}
          className="text-[13px] text-coral-600 hover:text-coral-700 dark:text-coral-500 
                   dark:hover:text-coral-400 hover:underline transition-colors"
        >
          {t('host.avatar.viewProfile')}
        </button>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 my-0" />

      {/* Main Actions */}
      <div className="py-2">
        <button
          className="w-full h-11 px-5 cursor-pointer flex items-center gap-3 
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => {
            setShowProfileModal(true);
            setSheetOpen(false);
          }}
        >
          <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          <span className="text-[14px] text-gray-900 dark:text-white">
            {t('host.avatar.profileSettings')}
          </span>
        </button>

        <button
          className="w-full h-11 px-5 cursor-pointer flex items-center gap-3 
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => {
            setShowProfileModal(true);
            setSheetOpen(false);
          }}
        >
          <Camera className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[14px] text-gray-900 dark:text-white">{t('host.avatar.uploadPhoto')}</span>
            {!avatarUrl && (
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            )}
          </div>
        </button>

        <button
          className="w-full h-11 px-5 cursor-pointer flex items-center gap-3 
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => {
            setShowLanguageModal(true);
            setSheetOpen(false);
          }}
        >
          <Globe className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] text-gray-900 dark:text-white">
              {t('host.avatar.languagesCommunication')}
            </div>
          </div>
        </button>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 my-0" />

      {/* Secondary Actions */}
      <div className="py-2">
        <button
          className="w-full h-11 px-5 cursor-pointer flex items-center gap-3 
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <SettingsIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          <span className="text-[14px] text-gray-900 dark:text-white">
            Accountinstellingen
          </span>
        </button>

        <button
          className="w-full h-11 px-5 cursor-pointer flex items-center gap-3 
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <HelpCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          <span className="text-[14px] text-gray-900 dark:text-white">{t('host.avatar.help')}</span>
        </button>

        <button
          className="w-full h-11 px-5 cursor-pointer flex items-center gap-3 
                   hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-6 w-6 text-red-600 dark:text-red-500" />
          <span className="text-[14px] text-red-600 dark:text-red-500">{t('host.avatar.logout')}</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        // Mobile: Bottom Sheet
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            {avatarButton}
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="w-full p-0 bg-white dark:bg-gray-900 border-t border-gray-200 
                     dark:border-gray-700 rounded-t-2xl"
          >
            {menuContent}
          </SheetContent>
        </Sheet>
      ) : (
        // Desktop: Dropdown Menu
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {avatarButton}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[280px] p-0 bg-white dark:bg-gray-900 border border-gray-200 
                     dark:border-gray-700 rounded-xl shadow-lg"
            style={{
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
            }}
          >
            {menuContent}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userEmail={displayEmail}
        userName={displayName}
        avatarUrl={avatarUrl || undefined}
      />

      {/* Language Selection Modal */}
      <LanguageSelectionModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </>
  );
}
