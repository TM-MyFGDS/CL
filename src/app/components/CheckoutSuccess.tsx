import { Dialog, DialogContent, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Hand, Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface CheckoutSuccessProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutSuccess({ open, onClose }: CheckoutSuccessProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md" aria-describedby="checkout-success-description">
        <DialogDescription id="checkout-success-description" className="sr-only">
          {t('checkoutSuccess.srDescription')}
        </DialogDescription>
        <div className="text-center py-6">
          {/* Goodbye Icon */}
          <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <Hand className="h-12 w-12 text-primary" />
          </div>

          {/* Goodbye Message */}
          <h2 className="text-3xl font-bold mb-2">{t('checkoutSuccess.title')}</h2>
          <p className="text-muted-foreground mb-8 text-lg whitespace-pre-line">
            {t('checkoutSuccess.message')}
          </p>

          {/* Optional: Review Button */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-6">
            <Star className="h-8 w-8 text-amber-500 mx-auto mb-3" />
            <p className="text-sm text-foreground mb-4">{t('checkoutSuccess.reviewPrompt')}</p>
            <Button
              variant="outline"
              className="w-full border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30"
            >
              <Star className="h-4 w-4 mr-2" />
              {t('checkoutSuccess.reviewCta')}
            </Button>
          </div>

          <Button
            onClick={onClose}
            className="w-full h-12"
          >
            {t('checkoutSuccess.close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
