import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Plus, LogOut, Users, Eye, Star, ExternalLink, Link2, MapPin, Home,
  CheckCircle, Clock, Settings, Trash2, AlertTriangle, Circle,
  User, Calendar, Mail, Phone
} from 'lucide-react';
import * as firestoreService from '@/lib/firestore';
import { getPropertiesByHost, deleteProperty } from "@/lib/firestore";
import type { Property } from "@/lib/firestore";
import type { Booking, PropertyStatus } from '@/types';
import { useAuth } from '@/lib/AuthContext';
import { auth } from '@/lib/firebase';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { FirebaseSetupGuide } from '@/app/components/FirebaseSetupGuide';
import { DashboardSidebar } from '@/app/components/DashboardSidebar';
import { AppHeader } from '@/app/components/AppHeader';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/clipboard';

interface PropertyWithStatus {
  property: Property;
  status: PropertyStatus;
  currentBooking?: Booking | null;
  lastCheckout?: string | null;
}

export default function HostDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesWithStatus, setPropertiesWithStatus] = useState<PropertyWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [permissionError, setPermissionError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      loadProperties();
    }
  }, [user, authLoading, navigate]);

  const loadProperties = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setPermissionError(false);
      const props = await getPropertiesByHost(user.id);
      setProperties(props);

      // Load status for each property
      await loadPropertiesStatus(props);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'permission-denied') {
        setPermissionError(true);
      } else {
        toast.error('Failed to load properties');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadPropertiesStatus = async (props: Property[]) => {
    const statusPromises = props.map(async (property) => {
      try {
        const { status, currentBooking, lastCheckout } = await firestoreService.getPropertyStatus(property.id);
        return {
          property,
          status,
          currentBooking,
          lastCheckout,
        };
      } catch (error) {
        console.error(`Failed to load status for ${property.id}:`, error);
        return {
          property,
          status: 'vacant' as PropertyStatus,
          currentBooking: null,
          lastCheckout: null,
        };
      }
    });

    const results = await Promise.all(statusPromises);
    setPropertiesWithStatus(results);
  };

  const handlePropertyClick = (id: string) => {
    navigate(`/properties/${id}`);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error('Failed to sign out');
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await deleteProperty(id);
      toast.success('Property deleted successfully');
      loadProperties();
    } catch (error: any) {
      toast.error('Failed to delete property');
      console.error(error);
    }
  };

  const handleMarkCleaned = async (propertyId: string) => {
    try {
      await firestoreService.markPropertyCleaned(propertyId);
      toast.success('Property marked as cleaned');
      // Reload properties to update status
      loadProperties();
    } catch (error: any) {
      toast.error('Failed to mark property as cleaned');
      console.error(error);
    }
  };

  const filteredProperties = propertiesWithStatus.filter(({ property }) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const occupiedCount = propertiesWithStatus.filter(p => p.status === 'occupied').length;
  const needsCleaningCount = propertiesWithStatus.filter(p => p.status === 'needs_cleaning').length;
  const vacantCount = propertiesWithStatus.filter(p => p.status === 'vacant').length;

  // Get today's check-ins and check-outs
  const today = new Date().toISOString().split('T')[0];
  const todaysCheckins = propertiesWithStatus.filter(p =>
    p.currentBooking && p.currentBooking.arrivalDate === today
  ).length;
  const todaysCheckouts = propertiesWithStatus.filter(p =>
    p.currentBooking && p.currentBooking.departureDate === today
  ).length;

  const getStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case 'occupied':
        return (
          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
              BEZET
            </div>
          </Badge>
        );
      case 'needs_cleaning':
        return (
          <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            SCHOONMAAK NODIG
          </Badge>
        );
      case 'vacant':
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <Circle className="h-3 w-3 mr-1" />
            LEEG
          </Badge>
        );
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('nl-NL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Show setup guide if there's a permission error
  if (permissionError) {
    return <FirebaseSetupGuide />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <AppHeader
        showMobileMenu={true}
        onMobileMenuClick={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Overzicht van al je accommodaties en hun status</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardDescription className="text-xs sm:text-sm text-green-700 dark:text-green-400">Bezet</CardDescription>
                <CardTitle className="text-3xl sm:text-4xl text-green-700 dark:text-green-400">{occupiedCount}</CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardDescription className="text-xs sm:text-sm text-orange-700 dark:text-orange-400">Schoonmaak</CardDescription>
                <CardTitle className="text-3xl sm:text-4xl text-orange-700 dark:text-orange-400">{needsCleaningCount}</CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardDescription className="text-xs sm:text-sm text-gray-700 dark:text-gray-400">Leeg</CardDescription>
                <CardTitle className="text-3xl sm:text-4xl text-gray-700 dark:text-gray-400">{vacantCount}</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardDescription className="text-xs sm:text-sm">Vandaag</CardDescription>
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <CardTitle className="text-xl sm:text-2xl">{todaysCheckins}</CardTitle>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">in /</span>
                  <CardTitle className="text-xl sm:text-2xl">{todaysCheckouts}</CardTitle>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">uit</span>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Create New Property Button */}
          <div className="mb-6">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/properties/new')}
            >
              <Plus className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">{t('dashboard.addProperty')}</span>
              <span className="sm:hidden">Accommodatie Toevoegen</span>
            </Button>
          </div>

          {/* Search Bar */}
          {properties.length > 0 && (
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Zoek accommodaties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
          )}

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-accent p-6">
                  <Home className="h-12 w-12 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Geen accommodaties gevonden</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm
                      ? 'Probeer een andere zoekterm'
                      : 'Begin door je eerste vakantiewoning toe te voegen'}
                  </p>
                  {!searchTerm && (
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                      onClick={() => navigate('/properties/new')}
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Voeg Je Eerste Accommodatie Toe
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProperties.map(({ property, status, currentBooking, lastCheckout }) => (
                <Card
                  key={property.id}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-200 ${status === 'occupied' ? 'border-2 border-green-200 dark:border-green-800' :
                    status === 'needs_cleaning' ? 'border-2 border-orange-200 dark:border-orange-800' :
                      'border'
                    }`}
                >
                  {/* Property Image & Basic Info */}
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={property.imageUrl}
                        alt={property.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(status)}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-3 left-3 bg-card/90 dark:bg-card/80 hover:bg-card backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Weet je zeker dat je deze accommodatie wilt verwijderen?')) {
                            handleDeleteProperty(property.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{property.name}</CardTitle>
                    <CardDescription className="flex items-start gap-1">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {property.address?.streetName} {property.address?.houseNumber}, {property.address?.city}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Occupied State - Show Guest Info */}
                    {status === 'occupied' && currentBooking && (
                      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <h4 className="font-semibold text-lg">
                            {currentBooking.guestFirstName} {currentBooking.guestLastName}
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {formatDate(currentBooking.arrivalDate)} - {formatDate(currentBooking.departureDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{currentBooking.numberOfGuests} {currentBooking.numberOfGuests === 1 ? 'gast' : 'gasten'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Ingecheckt: {formatDateTime(currentBooking.checkinTime)}</span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-green-200 dark:border-green-800">
                          {currentBooking.guestEmail && (
                            <a
                              href={`mailto:${currentBooking.guestEmail}`}
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <Mail className="h-4 w-4" />
                              {currentBooking.guestEmail}
                            </a>
                          )}
                          {currentBooking.guestPhone && (
                            <a
                              href={`tel:${currentBooking.guestPhone}`}
                              className="flex items-center gap-2 text-sm text-primary hover:underline font-mono"
                            >
                              <Phone className="h-4 w-4" />
                              {currentBooking.guestPhone}
                            </a>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-green-300 dark:border-green-700"
                          onClick={() => navigate(`/properties/${property.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Bekijk Details
                        </Button>
                      </div>
                    )}

                    {/* Needs Cleaning State */}
                    {status === 'needs_cleaning' && (
                      <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                          <AlertTriangle className="h-5 w-5" />
                          <h4 className="font-semibold">Schoonmaak vereist</h4>
                        </div>

                        {lastCheckout && (
                          <p className="text-sm text-muted-foreground">
                            Vorige gast uitgecheckt: {formatDateTime(lastCheckout)}
                          </p>
                        )}

                        <Button
                          className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700"
                          onClick={() => handleMarkCleaned(property.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          MARKEER ALS SCHOON
                        </Button>
                      </div>
                    )}

                    {/* Vacant State */}
                    {status === 'vacant' && (
                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Circle className="h-5 w-5" />
                          <h4 className="font-semibold">Beschikbaar</h4>
                        </div>

                        {lastCheckout && (
                          <p className="text-sm text-muted-foreground">
                            Laatste check-out: {formatDateTime(lastCheckout)}
                          </p>
                        )}

                        <p className="text-sm text-muted-foreground">
                          Status: Schoongemaakt ✓
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handlePropertyClick(property.id)}
                      >
                        Bewerken
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(`${window.location.origin}/g/${property.guestToken}`);
                          toast.success('Link gekopieerd!');
                        }}
                      >
                        <Link2 className="h-4 w-4 mr-2" />
                        Kopieer Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}