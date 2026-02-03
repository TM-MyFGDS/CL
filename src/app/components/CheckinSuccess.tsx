import { Dialog, DialogContent, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { CheckCircle, Home } from 'lucide-react';
import type { Booking } from '@/types';
import { useTranslation } from '@/lib/i18n';

interface CheckinSuccessProps {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export function CheckinSuccess({ open, onClose, booking }: CheckinSuccessProps) {
  const { t, i18n } = useTranslation();

  if (!booking) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language, { day: 'numeric', month: 'short' });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md" aria-describedby="checkin-success-description">
        <DialogDescription id="checkin-success-description" className="sr-only">
          {t('checkinSuccess.srDescription')}
        </DialogDescription>
        <div className="text-center py-6">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold mb-2">{t('checkinSuccess.title')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('checkinSuccess.message')}<br />
            <span className="font-semibold text-foreground">{booking.propertyName}</span>
          </p>

          {/* Booking Details Card */}
          <div className="bg-muted rounded-xl p-6 space-y-3 text-left mb-6">
            <div className="flex items-center gap-3 text-sm">
              <span>📅</span>
              <span>
                {formatDate(booking.arrivalDate)} - {formatDate(booking.departureDate)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span>👥</span>
              <span>{t('checkinSuccess.guests', { count: booking.numberOfGuests })}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span>🕐</span>
              <span>{t('checkinSuccess.checkedInAt', { time: formatTime(booking.checkinTime) })}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onClose}
              className="w-full h-12 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700"
            >
              <Home className="h-5 w-5 mr-2" />
              {t('checkinSuccess.ctaHome')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
