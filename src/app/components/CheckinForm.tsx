import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { CheckCircle, Minus, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import type { CheckinData } from '@/types';
import { useTranslation } from '@/lib/i18n';

interface CheckinFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CheckinData) => Promise<void>;
  propertyName: string;
}

export function CheckinForm({ open, onClose, onSubmit, propertyName }: CheckinFormProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckinData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    country: '',
    numberOfGuests: 2,
    arrivalDate: new Date().toISOString().split('T')[0],
    departureDate: '',
    comments: '',
    acceptedHouseRules: false,
  });

  const countryOptions = useMemo(
    () => [
      { value: 'netherlands', label: t('checkinForm.country.netherlands') },
      { value: 'belgium', label: t('checkinForm.country.belgium') },
      { value: 'germany', label: t('checkinForm.country.germany') },
      { value: 'france', label: t('checkinForm.country.france') },
      { value: 'spain', label: t('checkinForm.country.spain') },
      { value: 'uk', label: t('checkinForm.country.uk') },
      { value: 'usa', label: t('checkinForm.country.usa') },
      { value: 'other', label: t('checkinForm.country.other') },
    ],
    [t]
  );

  const getCountryLabel = (value: string) =>
    countryOptions.find((option) => option.value === value)?.label ?? value;

  const handleInputChange = (field: keyof CheckinData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.streetAddress || 
        !formData.postalCode || !formData.city || !formData.country || !formData.arrivalDate || !formData.departureDate) {
      toast.error(t('checkinForm.validationRequired'));
      return;
    }

    if (!formData.acceptedHouseRules) {
      toast.error(t('checkinForm.validationAcceptRules'));
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        ...formData,
        country: getCountryLabel(formData.country)
      });
    } catch (error) {
      console.error('Check-in error:', error);
      toast.error(t('checkinForm.errorSubmit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="checkin-form-description">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">{t('checkinForm.title')}</DialogTitle>
          </div>
          <DialogDescription id="checkin-form-description" className="text-sm text-muted-foreground">
            {t('checkinForm.description', { propertyName })}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Guest Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📋 {t('checkinForm.guestInfoTitle')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('checkinForm.firstNameLabel')}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder={t('checkinForm.firstNamePlaceholder')}
                  className="h-[52px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{t('checkinForm.lastNameLabel')}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder={t('checkinForm.lastNamePlaceholder')}
                  className="h-[52px]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('checkinForm.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t('checkinForm.emailPlaceholder')}
                className="h-[52px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('checkinForm.phoneLabel')}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t('checkinForm.phonePlaceholder')}
                className="h-[52px]"
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📍 {t('checkinForm.addressTitle')}
            </h3>

            <div className="space-y-2">
              <Label htmlFor="streetAddress">{t('checkinForm.streetAddressLabel')}</Label>
              <Input
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                placeholder={t('checkinForm.streetAddressPlaceholder')}
                className="h-[52px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">{t('checkinForm.postalCodeLabel')}</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder={t('checkinForm.postalCodePlaceholder')}
                  className="h-[52px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">{t('checkinForm.cityLabel')}</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder={t('checkinForm.cityPlaceholder')}
                  className="h-[52px]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">{t('checkinForm.countryLabel')}</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)} required>
                <SelectTrigger className="h-[52px]">
                  <SelectValue placeholder={t('checkinForm.countryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              👥 {t('checkinForm.guestCountTitle')}
            </h3>
            <div className="flex items-center justify-center gap-4 bg-muted rounded-xl p-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => formData.numberOfGuests > 1 && handleInputChange('numberOfGuests', formData.numberOfGuests - 1)}
                disabled={formData.numberOfGuests <= 1}
                className="h-12 w-12 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl font-semibold min-w-[120px] text-center">
                {t('checkinForm.guestCount', { count: formData.numberOfGuests })}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleInputChange('numberOfGuests', formData.numberOfGuests + 1)}
                className="h-12 w-12 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stay Period */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📅 {t('checkinForm.stayPeriodTitle')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arrivalDate">{t('checkinForm.arrivalLabel')}</Label>
                <Input
                  id="arrivalDate"
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                  className="h-[52px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departureDate">{t('checkinForm.departureLabel')}</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  min={formData.arrivalDate}
                  className="h-[52px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              💬 {t('checkinForm.commentsTitle')}
            </h3>
            <Textarea
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              placeholder={t('checkinForm.commentsPlaceholder')}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* House Rules Acceptance */}
          <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
            <Checkbox
              id="acceptRules"
              checked={formData.acceptedHouseRules}
              onCheckedChange={(checked) => handleInputChange('acceptedHouseRules', checked)}
              required
            />
            <Label htmlFor="acceptRules" className="text-sm leading-relaxed cursor-pointer">
              {t('checkinForm.acceptRulesLabel')}
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 shadow-lg hover:shadow-xl transition-all"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {isSubmitting ? t('checkinForm.submitting') : t('checkinForm.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
