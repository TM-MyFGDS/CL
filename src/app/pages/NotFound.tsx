import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-foreground mb-4">{t('notFound.title')}</h2>
        <p className="text-muted-foreground mb-8">
          {t('notFound.description')}
        </p>
        <Button onClick={() => navigate('/')} size="lg">
          <Home className="mr-2 h-5 w-5" />
          {t('notFound.backHome')}
        </Button>
      </div>
    </div>
  );
}
