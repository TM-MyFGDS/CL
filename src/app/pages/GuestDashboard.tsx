import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Key, Wifi, Car, FileText, Phone, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { getProperty, getContentBlocks } from "@/lib/firestore";
import type { Property, ContentBlock } from "@/lib/firestore";
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { toast } from 'sonner';
const logoImage = "/vite.svg"; // Placeholder for logo

const iconMap: Record<string, any> = {
  checkIn: Key,
  wifi: Wifi,
  parking: Car,
  houseRules: FileText,
  emergency: Phone,
  localTips: MapPin,
};

export default function GuestDashboard() {
  const { id } = useParams(); // property ID
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [property, setProperty] = useState<Property | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if guest has registered
    const guestEmail = sessionStorage.getItem('guestEmail');
    const storedPropertyId = sessionStorage.getItem('propertyId');

    if (!guestEmail || storedPropertyId !== id) {
      // Redirect to registration
      navigate(`/guest/${id}`);
      return;
    }

    loadPropertyData();
  }, [id, navigate]);

  const loadPropertyData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [propertyData, contentBlocks] = await Promise.all([
        getProperty(id),
        getContentBlocks(id)
      ]);

      if (!propertyData) {
        toast.error('Property not found');
        navigate('/');
        return;
      }

      setProperty(propertyData);
      setBlocks(contentBlocks);
    } catch (error: any) {
      toast.error('Failed to load property information');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-coral-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coral-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={logoImage}
              alt="CheckinLynk"
              className="h-8 cursor-pointer"
            />
          </button>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-coral-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{t('guest.welcome')} {property.name}!</h1>
                <p className="text-white/90">
                  All the information you need for your stay is right here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Photo */}
        {property.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={property.imageUrl}
              alt={property.name}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Property Details */}
        <Card className="mb-8 shadow-md">
          <CardHeader className="bg-accent/30">
            <CardTitle className="text-xl">{t('guest.propertyInfo')}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">{t('common.address')}</p>
                <p className="font-medium">{property.address}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('property.guestCapacity')}</p>
                <p className="font-medium">
                  {t('guest.dashboard.guestCount', { count: property.guestCapacity })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('property.bedrooms')}</p>
                <p className="font-medium">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('property.bathrooms')}</p>
                <p className="font-medium">{property.bathrooms}</p>
              </div>
            </div>
            {property.description && (
              <div className="mt-4">
                <p className="text-muted-foreground mb-2">{t('common.description')}</p>
                <p className="text-foreground">{property.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Blocks */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t('guest.essentialInfo')}</h2>

          {blocks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">{t('guest.dashboard.noBlocks')}</p>
              </CardContent>
            </Card>
          ) : (
            blocks.map((block) => {
              const Icon = iconMap[block.type];
              return (
                <Card key={block.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-accent/30">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{block.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                        {block.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {t('guest.dashboard.contactHost')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('guest.dashboard.poweredBy')}
          </p>
        </div>
      </main>
    </div>
  );
}
