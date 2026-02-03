import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Home, 
  CheckCircle, 
  FileText, 
  Users,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  key: string;
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

interface DashboardSidebarProps {
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

export function DashboardSidebar({ isMobileMenuOpen = false, onMobileMenuClose }: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    {
      key: 'dashboard',
      icon: LayoutDashboard,
      label: t('sidebar.dashboard') || 'Dashboard',
      path: '/dashboard',
    },
    {
      key: 'properties',
      icon: Home,
      label: t('sidebar.myProperties') || 'Mijn Accommodaties',
      path: '/dashboard/properties',
    },
    {
      key: 'checkins',
      icon: CheckCircle,
      label: t('sidebar.checkinOverview') || 'Check-in Overzicht',
      path: '/dashboard/checkins',
    },
    {
      key: 'templates',
      icon: FileText,
      label: t('sidebar.templates') || 'Sjablonen',
      path: '/dashboard/templates',
    },
    {
      key: 'guests',
      icon: Users,
      label: t('sidebar.guestManagement') || 'Gasten Beheer',
      path: '/dashboard/guests',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  const sidebarContent = (
    <nav className="p-4 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        
        return (
          <button
            key={item.key}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
              active
                ? 'bg-gradient-to-r from-coral-50 to-coral-100 dark:from-coral-950/30 dark:to-coral-900/30 text-coral-600 dark:text-coral-400 shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon 
              className={cn(
                'h-5 w-5 flex-shrink-0',
                active ? 'text-coral-600 dark:text-coral-400' : ''
              )} 
            />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 bg-coral-500 text-white text-xs font-bold rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden lg:block w-64 bg-card border-r border-border flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={onMobileMenuClose}
          />
          
          {/* Sidebar Drawer */}
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50 overflow-y-auto animate-in slide-in-from-left duration-300">
            {/* Close button */}
            <div className="p-4 flex justify-between items-center border-b border-border">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={onMobileMenuClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}