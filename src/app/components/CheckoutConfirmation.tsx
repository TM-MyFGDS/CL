import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { DoorOpen, CheckCircle } from 'lucide-react';

interface CheckoutConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function CheckoutConfirmation({ open, onClose, onConfirm }: CheckoutConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checklist, setChecklist] = useState({
    keys: false,
    windows: false,
    trash: false,
  });

  const allChecked = checklist.keys && checklist.windows && checklist.trash;

  const handleConfirm = async () => {
    if (!allChecked) return;

    try {
      setIsSubmitting(true);
      await onConfirm();
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md" aria-describedby="checkout-confirmation-description">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-coral-100 dark:bg-coral-900/30 rounded-lg">
              <DoorOpen className="h-6 w-6 text-coral-600 dark:text-coral-400" />
            </div>
            <DialogTitle className="text-2xl">Check-out Bevestigen</DialogTitle>
          </div>
          <DialogDescription id="checkout-confirmation-description" className="text-sm text-muted-foreground">
            Weet je zeker dat je wilt uitchecken?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Controleer of je de volgende zaken hebt afgerond:
          </p>

          {/* Checklist */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Checkbox
                id="keys"
                checked={checklist.keys}
                onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, keys: !!checked }))}
              />
              <Label htmlFor="keys" className="text-sm leading-relaxed cursor-pointer flex-1">
                Ik heb de sleutels teruggelegd op de afgesproken plek
              </Label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Checkbox
                id="windows"
                checked={checklist.windows}
                onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, windows: !!checked }))}
              />
              <Label htmlFor="windows" className="text-sm leading-relaxed cursor-pointer flex-1">
                Ik heb alle ramen en deuren gesloten
              </Label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Checkbox
                id="trash"
                checked={checklist.trash}
                onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, trash: !!checked }))}
              />
              <Label htmlFor="trash" className="text-sm leading-relaxed cursor-pointer flex-1">
                Ik heb het afval buitengezet (indien van toepassing)
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleConfirm}
              disabled={!allChecked || isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 disabled:opacity-50"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {isSubmitting ? 'Bezig...' : 'BEVESTIG CHECK-OUT'}
            </Button>

            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full"
            >
              Annuleren
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}