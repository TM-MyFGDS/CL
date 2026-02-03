import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  KeyRound, Wifi, Car, FileText, Phone, MapPin, Clock, CheckCircle, ChevronDown,
  Eye, EyeOff, ShieldAlert, UtensilsCrossed, ShoppingCart, Coffee, MapPinned,
  Cross, DoorOpen, MapPinIcon, Timer
} from 'lucide-react';
import { getPropertyByToken } from "@/lib/firestore";
import type { Property } from "@/lib/firestore";
import type { Booking } from '@/types';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { HouseRulesAccordion } from '@/app/components/HouseRulesAccordion';
import { CheckinForm } from '@/app/components/CheckinForm';
import { CheckinSuccess } from '@/app/components/CheckinSuccess';
import { CheckoutConfirmation } from '@/app/components/CheckoutConfirmation';
import { CheckoutSuccess } from '@/app/components/CheckoutSuccess';
import { toast } from 'sonner';
import * as firestoreService from '@/lib/firestore';
const logoImage = "/vite.svg";

interface GuestViewProps {
  previewData?: Property | null;
}

export default function GuestView({ previewData }: GuestViewProps = {}) {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  // Property state
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking state
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [loadingBooking, setLoadingBooking] = useState(true);

  // Accordion states
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [keyCodeOpen, setKeyCodeOpen] = useState(false);
  const [alarmCodeOpen, setAlarmCodeOpen] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);
  const [parkingOpen, setParkingOpen] = useState(false);
  const [houseRulesOpen, setHouseRulesOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [localTipsOpen, setLocalTipsOpen] = useState(false);
  const [restaurantsOpen, setRestaurantsOpen] = useState(false);
  const [supermarketsOpen, setSupermarketsOpen] = useState(false);
  const [barsOpen, setBarsOpen] = useState(false);
  const [poisOpen, setPoisOpen] = useState(false);
  const [medicalOpen, setMedicalOpen] = useState(false);

  // Reveal states for codes
  const [keyCodeRevealed, setKeyCodeRevealed] = useState(false);
  const [alarmCodeRevealed, setAlarmCodeRevealed] = useState(false);

  // Modal states
  const [showCheckinForm, setShowCheckinForm] = useState(false);
  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  useEffect(() => {
    if (previewData) {
      setProperty(previewData);
      setLoading(false);
      setLoadingBooking(false);
    } else {
      loadPropertyData();
    }
  }, [token, previewData]);

  const loadPropertyData = async () => {
    if (!token) {
      toast.error(t('guestView.errors.invalidLink'));
      navigate('/');
      return;
    }

    try {
      setLoading(true);
      const propertyData = await getPropertyByToken(token);

      if (!propertyData) {
        toast.error(t('guestView.errors.propertyNotFound'));
        navigate('/');
        return;
      }

      setProperty(propertyData);

      // Load booking status
      await loadBookingStatus(propertyData.id);
    } catch (error: any) {
      toast.error(t('guestView.errors.loadFailed'));
      console.error(error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadBookingStatus = async (propertyId: string) => {
    try {
      setLoadingBooking(true);
      const booking = await firestoreService.getCurrentBooking(propertyId);
      setCurrentBooking(booking);
    } catch (error) {
      console.error('Failed to load booking status:', error);
    } finally {
      setLoadingBooking(false);
    }
  };

  const handleCheckin = async (checkinData: any) => {
    if (!property) return;

    try {
      const booking = await firestoreService.checkin(property.id, property.name, checkinData);
      setCurrentBooking(booking);
      setShowCheckinForm(false);
      setShowCheckinSuccess(true);
      toast.success(t('guestView.checkInSuccess'));
    } catch (error: any) {
      console.error('Check-in error:', error);
      toast.error(error.message || t('guestView.checkInFailed'));
      throw error;
    }
  };

  const handleCheckout = async () => {
    if (!property) return;

    try {
      await firestoreService.checkout(property.id);
      setCurrentBooking(null);
      setShowCheckoutConfirm(false);
      setShowCheckoutSuccess(true);
      toast.success(t('guestView.checkOutSuccess'));
    } catch (error: any) {
      console.error('Check-out error:', error);
      toast.error(error.message || t('guestView.checkOutFailed'));
      throw error;
    }
  };

  const getTimeUntilCheckout = () => {
    if (!currentBooking) return null;

    const now = new Date();
    const departureDate = new Date(currentBooking.departureDate);
    const diff = departureDate.getTime() - now.getTime();

    if (diff < 0) return t('guestView.checkOutTimePassed');

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return t('guestView.timeRemainingWithDays', {
        days,
        hours,
        dayLabel: t('common.day', { count: days }),
        hourLabel: t('common.hour', { count: hours })
      });
    }
    return t('guestView.timeRemainingHours', {
      hours,
      hourLabel: t('common.hour', { count: hours })
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center">
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

  const isCheckedIn = currentBooking && currentBooking.status === 'checked_in';

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
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
        {/* Check-in/Checked-in Status Section */}
        {!loadingBooking && (
          <>
            {!isCheckedIn ? (
              // Pre Check-in State - Show Check-in Button
              <Card className="mb-8 overflow-hidden shadow-xl">
                <div className="bg-gradient-to-br from-coral-50 to-orange-50 dark:from-coral-950/30 dark:to-orange-950/30 p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">
                      {t('guestView.welcomeTitle')}
                    </h2>
                    <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent">
                      {property.name}
                    </h3>

                    <Button
                      onClick={() => setShowCheckinForm(true)}
                      className="w-full sm:w-auto h-16 px-12 text-lg font-bold !text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 shadow-[0_8px_24px_rgba(242,115,112,0.35)] hover:shadow-[0_12px_32px_rgba(242,115,112,0.45)] hover:scale-105 transition-all duration-200"
                      style={{ color: 'white' }}
                    >
                      <MapPinIcon className="h-6 w-6 mr-3" />
                      <div className="text-left">
                        <div className="text-xl">{t('guestView.checkInCtaTitle')}</div>
                        <div className="text-xs opacity-80 font-normal">{t('guestView.checkInCtaSubtitle')}</div>
                      </div>
                    </Button>

                    {property.checkInTime && (
                      <p className="mt-6 text-sm text-muted-foreground">
                        {t('guestView.checkInTimeLabel', { time: property.checkInTime })}
                        {property.checkInInfo?.checkOutTime && (
                          ` - ${t('guestView.checkOutTimeLabel', { time: property.checkInInfo.checkOutTime })}`
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              // Checked-in State - Show Status Badge
              <Card className="mb-8 overflow-hidden border-2 border-green-200 dark:border-green-800 shadow-xl">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="h-10 px-4 text-base bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      {t('guestView.checkedInBadge')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {t('guestView.checkedInSince', {
                        date: new Date(currentBooking.checkinTime).toLocaleDateString(locale, {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Timer className="h-5 w-5" />
                    <span className="font-medium">
                      {t('guestView.checkOutCountdownLabel')}{' '}
                      <span className="text-foreground font-bold">{getTimeUntilCheckout()}</span>
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {t('guestView.departureLabel', {
                      date: new Date(currentBooking.departureDate).toLocaleDateString(locale, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })
                    })}
                    {property.checkInInfo?.checkOutTime && (
                      ` • ${t('guestView.departureBefore', { time: property.checkInInfo.checkOutTime })}`
                    )}
                  </div>
                </div>
              </Card>
            )}
          </>
        )}

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
        <Card className="mb-6 shadow-md">
          <CardHeader className="bg-accent/30">
            <CardTitle className="text-xl">{t('guest.propertyInfo')}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Host Profile */}
            {property.hostProfile && (
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {t('guestView.yourHost')}
                </p>
                <div className="flex items-start gap-4">
                  {property.hostProfile.avatarUrl ? (
                    <img
                      src={property.hostProfile.avatarUrl}
                      alt={property.hostProfile.displayName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {property.hostProfile.displayName?.charAt(0).toUpperCase() || t('host.defaultInitial')}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{property.hostProfile.displayName}</h3>
                    {property.hostProfile.bio && (
                      <p className="text-muted-foreground text-sm mb-3">{property.hostProfile.bio}</p>
                    )}
                    <div className="space-y-2 text-sm">
                      {property.hostProfile.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{t('common.emailLabel')}</span>
                          <a href={`mailto:${property.hostProfile.email}`} className="text-primary hover:underline">
                            {property.hostProfile.email}
                          </a>
                        </div>
                      )}
                      {property.hostProfile.phone && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{t('common.phoneLabel')}</span>
                          <a href={`tel:${property.hostProfile.phone}`} className="text-primary hover:underline font-mono">
                            {property.hostProfile.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">{t('common.address')}</p>
                <p className="font-medium">
                  {property.address.streetName} {property.address.houseNumber}<br />
                  {property.address.postalCode} {property.address.city}<br />
                  {property.address.country}
                </p>
              </div>
            </div>
            {property.description && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-muted-foreground mb-2">{t('common.description')}</p>
                <p className="text-foreground leading-relaxed">{property.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Check-in Instructions Accordion */}
        {property.checkInInstructions && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setCheckInOpen(!checkInOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <KeyRound className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.checkInOutTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${checkInOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {checkInOpen && (
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {property.checkInTime && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('guestView.checkInTime')}</p>
                      <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{property.checkInTime}</span>
                      </div>
                    </div>
                  )}
                  {property.checkInInfo?.checkOutTime && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('guestView.checkOutTime')}</p>
                      <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{property.checkInInfo.checkOutTime}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {property.checkInInstructions}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Key Code Accordion */}
        {property.checkInInfo?.keyCode && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setKeyCodeOpen(!keyCodeOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <KeyRound className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.keyCodeTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${keyCodeOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {keyCodeOpen && (
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted px-4 py-3 rounded font-mono text-lg font-medium">
                    {keyCodeRevealed ? property.checkInInfo.keyCode : '••••••'}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setKeyCodeRevealed(!keyCodeRevealed)}
                    className="flex-shrink-0"
                  >
                    {keyCodeRevealed ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Alarm Code Accordion */}
        {property.checkInInfo?.alarmCode && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setAlarmCodeOpen(!alarmCodeOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <ShieldAlert className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.alarmCodeTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${alarmCodeOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {alarmCodeOpen && (
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted px-4 py-3 rounded font-mono text-lg font-medium">
                    {alarmCodeRevealed ? property.checkInInfo.alarmCode : '••••••'}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAlarmCodeRevealed(!alarmCodeRevealed)}
                    className="flex-shrink-0"
                  >
                    {alarmCodeRevealed ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* WiFi Accordion */}
        {property.wifiNetwork && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setWifiOpen(!wifiOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <Wifi className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.wifiAccessTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${wifiOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {wifiOpen && (
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('guestView.networkName')}</p>
                    <p className="font-mono font-medium bg-muted px-3 py-2 rounded">{property.wifiNetwork}</p>
                  </div>
                  {property.wifiPassword && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('auth.password')}</p>
                      <p className="font-mono font-medium bg-muted px-3 py-2 rounded">{property.wifiPassword}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Parking Accordion */}
        {property.parkingInstructions && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setParkingOpen(!parkingOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.parkingInstructionsTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${parkingOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {parkingOpen && (
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {property.parkingInstructions}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* House Rules Accordion */}
        {property.houseRules && property.houseRules.length > 0 && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setHouseRulesOpen(!houseRulesOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.houseRulesTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${houseRulesOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {houseRulesOpen && (
              <CardContent className="pt-6">
                <HouseRulesAccordion
                  categories={property.houseRules}
                  onRuleToggle={() => { }}
                  readOnly
                />
              </CardContent>
            )}
          </Card>
        )}

        {/* Emergency Contacts Accordion */}
        {property.emergencyContacts && property.emergencyContacts.length > 0 && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setEmergencyOpen(!emergencyOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.emergencyContactsTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${emergencyOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {emergencyOpen && (
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {property.emergencyContacts
                    .filter(contact => contact.visibleToGuest && contact.name && contact.phone)
                    .map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">{contact.name}</span>
                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline font-mono">
                          {contact.phone}
                        </a>
                      </div>
                    ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Local Tips Accordion */}
        {property.localTips && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setLocalTipsOpen(!localTipsOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.localTipsTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${localTipsOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {localTipsOpen && (
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {property.localTips}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Restaurants Accordion */}
        {property.restaurants && property.restaurants.length > 0 && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setRestaurantsOpen(!restaurantsOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <UtensilsCrossed className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.restaurantsTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${restaurantsOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {restaurantsOpen && (
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {property.restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-lg mb-1">{restaurant.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{restaurant.address}</p>
                      {restaurant.description && (
                        <p className="text-sm">{restaurant.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Supermarkets Accordion */}
        {property.supermarkets && property.supermarkets.length > 0 && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setSupermarketsOpen(!supermarketsOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.supermarketsTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${supermarketsOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {supermarketsOpen && (
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {property.supermarkets.map((supermarket) => (
                    <div key={supermarket.id} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-1">{supermarket.name}</h4>
                      <p className="text-sm text-muted-foreground">{supermarket.address}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Bars & Cafes Accordion */}
        {property.bars && property.bars.length > 0 && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setBarsOpen(!barsOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <Coffee className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.barsTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${barsOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {barsOpen && (
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {property.bars.map((bar) => (
                    <div key={bar.id} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-1">{bar.name}</h4>
                      <p className="text-sm text-muted-foreground">{bar.address}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Points of Interest Accordion */}
        {property.pointsOfInterest && property.pointsOfInterest.length > 0 && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setPoisOpen(!poisOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <MapPinned className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.pointsOfInterestTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${poisOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {poisOpen && (
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {property.pointsOfInterest.map((poi) => (
                    <div key={poi.id} className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-lg mb-1">{poi.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{poi.address}</p>
                      {poi.recommendation && (
                        <p className="text-sm">{poi.recommendation}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Medical Contacts Accordion */}
        {property.medicalContacts && property.medicalContacts.length > 0 && (
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader
              className="bg-accent/30 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setMedicalOpen(!medicalOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <Cross className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t('guestView.medicalContactsTitle')}</CardTitle>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${medicalOpen ? 'transform rotate-180' : ''
                    }`}
                />
              </div>
            </CardHeader>
            {medicalOpen && (
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {property.medicalContacts.map((contact) => (
                    <div key={contact.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{contact.name}</h4>
                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline font-mono text-sm">
                          {contact.phone}
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.address}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Check-out Button (only shown when checked in) */}
        {isCheckedIn && (
          <Card className="mb-8 overflow-hidden border-2 border-coral-200 dark:border-coral-800 shadow-xl">
            <div className="bg-gradient-to-br from-coral-50 to-orange-50 dark:from-coral-950/30 dark:to-orange-950/30 p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">{t('guestView.readyToLeave')}</h3>
                <Button
                  onClick={() => setShowCheckoutConfirm(true)}
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-2 border-coral-500 text-coral-600 dark:text-coral-400 hover:bg-coral-50 dark:hover:bg-coral-950/30"
                >
                  <DoorOpen className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="text-lg">{t('guestView.checkOutCtaTitle')}</div>
                    <div className="text-xs opacity-70 font-normal">{t('guestView.checkOutCtaSubtitle')}</div>
                  </div>
                </Button>
                {property.checkInInfo?.checkOutTime && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t('guestView.checkOutBefore', { time: property.checkInInfo.checkOutTime })}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {t('guest.dashboard.contactHost')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('guestView.footerPoweredBy', { tagline: t('tagline') })}
          </p>
        </div>
      </main>

      {/* Modals */}
      <CheckinForm
        open={showCheckinForm}
        onClose={() => setShowCheckinForm(false)}
        onSubmit={handleCheckin}
        propertyName={property.name}
      />

      <CheckinSuccess
        open={showCheckinSuccess}
        onClose={() => setShowCheckinSuccess(false)}
        booking={currentBooking}
      />

      <CheckoutConfirmation
        open={showCheckoutConfirm}
        onClose={() => setShowCheckoutConfirm(false)}
        onConfirm={handleCheckout}
      />

      <CheckoutSuccess
        open={showCheckoutSuccess}
        onClose={() => setShowCheckoutSuccess(false)}
      />
    </div>
  );
}
