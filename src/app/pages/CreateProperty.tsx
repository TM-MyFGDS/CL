import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from 'react-i18next';
import { createProperty, DEFAULT_HOUSE_RULES } from '@/lib/firestore';
import type { PropertyAddress } from '@/lib/firestore';
import { toast } from 'sonner';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Upload, Check } from 'lucide-react';
const logoImage = "/vite.svg";

export default function CreateProperty() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: {
      streetName: '',
      houseNumber: '',
      postalCode: '',
      country: '',
    } as PropertyAddress,
    description: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to create a property');
      navigate('/');
      return;
    }

    // Validate address fields
    if (!formData.address.streetName || !formData.address.houseNumber ||
      !formData.address.postalCode || !formData.address.country) {
      toast.error('Please fill in all address fields');
      return;
    }

    setLoading(true);

    try {
      const propertyId = await createProperty({
        ownerId: user.id,
        name: formData.name,
        address: formData.address,
        description: formData.description,
        imageUrl: imagePreview || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
        emergencyContacts: [],
        houseRules: DEFAULT_HOUSE_RULES,
      });

      toast.success('Property created successfully!');
      navigate(`/properties/${propertyId}`);
    } catch (error: any) {
      toast.error('Failed to create property: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                {t('common.back')}
              </Button>
              <button
                onClick={() => navigate('/')}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={logoImage}
                  alt="CheckinLynk"
                  className="h-6 cursor-pointer"
                />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">{t('property.createNew')}</h1>
          <p className="text-muted-foreground">Create a unique guest link for your vacation rental</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Image */}
          <Card>
            <CardHeader>
              <CardTitle>{t('property.propertyImage')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary hover:bg-accent/20 transition-all">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Property preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="mt-4"
                        onClick={(e) => {
                          e.preventDefault();
                          setImagePreview(null);
                        }}
                      >
                        Change Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                        <Upload className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-primary font-medium">
                          Click to upload
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>{t('property.propertyDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder={t('property.propertyNameRequired')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-input-background"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder={t('property.streetNameRequired')}
                  value={formData.address.streetName}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, streetName: e.target.value }
                  })}
                  required
                  className="bg-input-background"
                />
                <Input
                  placeholder={t('property.houseNumberRequired')}
                  value={formData.address.houseNumber}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, houseNumber: e.target.value }
                  })}
                  required
                  className="bg-input-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder={t('property.postalCodeRequired')}
                  value={formData.address.postalCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, postalCode: e.target.value }
                  })}
                  required
                  className="bg-input-background"
                />
                <Input
                  placeholder={t('property.countryRequired')}
                  value={formData.address.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, country: e.target.value }
                  })}
                  required
                  className="bg-input-background"
                />
              </div>

              <Textarea
                placeholder={t('property.description')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-input-background min-h-32"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              {t('property.cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              <Check className="mr-2 h-4 w-4" />
              {loading ? t('property.creating') : t('property.createProperty')}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}