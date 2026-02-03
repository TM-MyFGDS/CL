import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { HostAvatarDropdown } from '@/app/components/HostAvatarDropdown';
import { useAuth } from '@/lib/AuthContext';
const logoImage = "/vite.svg";

interface AppHeaderProps {
  onMobileMenuClick?: () => void;
  showMobileMenu?: boolean;
}

export function AppHeader({ onMobileMenuClick, showMobileMenu = false }: AppHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button - only visible on mobile when showMobileMenu is true */}
            {showMobileMenu && (
              <button
                onClick={onMobileMenuClick}
                className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={logoImage}
                alt="CheckinLynk"
                className="h-8 cursor-pointer"
              />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />

            {user ? (
              <HostAvatarDropdown
                userEmail={user?.email}
                userName={user?.displayName}
              />
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-flex"
                >
                  {t('landing.nav.login')}
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white"
                >
                  {t('landing.nav.register')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}