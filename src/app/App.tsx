import { RouterProvider } from 'react-router';
import { Toaster } from '@/app/components/ui/sonner';
import { router } from '@/app/routes';
import { AuthProvider } from '@/lib/AuthContext';
import '@/lib/i18n'; // Initialize i18n
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    }>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </Suspense>
  );
}
