import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/AuthContext';
import { getProperty, updateProperty, getUserProfile, updateUserProfile, regenerateGuestToken } from "@/lib/firestore";
import type { Property, CheckInInfo, WiFiInfo, ParkingInfo, EmergencyContact, HouseRuleCategory, HostProfile, Restaurant, Supermarket, Bar, PointOfInterest, MedicalContact } from "@/lib/firestore";
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ArrowLeft, Copy, RefreshCw, Save, Edit3, Eye } from 'lucide-react';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { SecureCodeInput } from '@/app/components/SecureCodeInput';
import { EmergencyContactsEditor } from '@/app/components/EmergencyContactsEditor';
import { RestaurantsEditor } from '@/app/components/RestaurantsEditor';
import { SupermarketsEditor } from '@/app/components/SupermarketsEditor';
import { BarsEditor } from '@/app/components/BarsEditor';
import { PointsOfInterestEditor } from '@/app/components/PointsOfInterestEditor';
import { MedicalContactsEditor } from '@/app/components/MedicalContactsEditor';
import { HouseRulesAccordion } from '@/app/components/HouseRulesAccordion';
import { HostProfileSettings } from '@/app/components/HostProfileSettings';
const logoImage = "/vite.svg";
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/clipboard';
import { Checkbox } from '@/app/components/ui/checkbox';
import GuestView from '@/app/pages/GuestView';

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hostProfile, setHostProfile] = useState<HostProfile>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Property fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ streetName: '', houseNumber: '', postalCode: '', country: '' });
  const [description, setDescription] = useState('');

  // Check-in info
  const [checkInInfo, setCheckInInfo] = useState<CheckInInfo>({ checkInTime: '', checkOutTime: '' });

  // WiFi info
  const [wifiInfo, setWifiInfo] = useState<WiFiInfo>({ ssid: '', password: '' });

  // Parking info
  const [parkingInfo, setParkingInfo] = useState<ParkingInfo>({ address: '', type: 'free' });

  // Emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

  // House rules
  const [houseRules, setHouseRules] = useState<HouseRuleCategory[]>([]);

  // New content sections
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
  const [bars, setBars] = useState<Bar[]>([]);
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>([]);
  const [medicalContacts, setMedicalContacts] = useState<MedicalContact[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
      return;
    }

    if (user && id) {
      loadPropertyData();
      loadHostProfile();
    }
  }, [user, authLoading, id, navigate]);

  const loadPropertyData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const propertyData = await getProperty(id);

      if (!propertyData) {
        toast.error('Property not found');
        navigate('/dashboard');
        return;
      }

      setProperty(propertyData);
      setName(propertyData.name);
      setAddress(propertyData.address);
      setDescription(propertyData.description || '');
      setCheckInInfo(propertyData.checkInInfo || { checkInTime: '', checkOutTime: '' });
      setWifiInfo(propertyData.wifiInfo || { ssid: '', password: '' });
      setParkingInfo(propertyData.parkingInfo || { address: '', type: 'free' });
      setEmergencyContacts(propertyData.emergencyContacts || []);
      setHouseRules(propertyData.houseRules || []);
      setPointsOfInterest(propertyData.pointsOfInterest || []);
      setRestaurants(propertyData.restaurants || []);
      setSupermarkets(propertyData.supermarkets || []);
      setBars(propertyData.bars || []);
      setMedicalContacts(propertyData.medicalContacts || []);
    } catch (error: any) {
      toast.error('Failed to load property: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadHostProfile = async () => {
    if (!user) return;
    try {
      const profile = await getUserProfile(user.id);
      if (profile?.hostProfile) {
        setHostProfile(profile.hostProfile);
      }
    } catch (error: any) {
      // Silently handle permission errors - they're expected in demo environments
      console.log('Could not load host profile:', error);
    }
  };

  const handleSave = async () => {
    if (!property) return;

    setSaving(true);
    try {
      await updateProperty(property.id, {
        name,
        address,
        description,
        checkInInfo,
        wifiInfo,
        parkingInfo,
        emergencyContacts,
        houseRules,
        pointsOfInterest,
        restaurants,
        supermarkets,
        bars,
        medicalContacts,
      });
      toast.success('Property updated successfully!');
      loadPropertyData(); // Reload to get updated data
    } catch (error: any) {
      toast.error('Failed to update property: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = async () => {
    if (!property) return;
    const fullGuestLink = `${window.location.origin}/g/${property.guestToken}`;
    const success = await copyToClipboard(fullGuestLink);
    if (success) {
      toast.success(t('property.linkCopied'));
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleRegenerateToken = async () => {
    if (!property) return;
    if (!confirm('Are you sure? This will invalidate the current guest link.')) return;

    try {
      const newToken = await regenerateGuestToken(property.id);
      setProperty({ ...property, guestToken: newToken });
      toast.success('Guest link regenerated successfully!');
    } catch (error: any) {
      toast.error('Failed to regenerate link: ' + error.message);
    }
  };

  const handleRuleToggle = (categoryId: string, ruleId: string, enabled: boolean) => {
    setHouseRules(houseRules.map(category =>
      category.id === categoryId
        ? {
          ...category,
          rules: category.rules.map(rule =>
            rule.id === ruleId ? { ...rule, enabled } : rule
          ),
        }
        : category
    ));
  };

  const handleRuleVisibilityToggle = (categoryId: string, ruleId: string, visible: boolean) => {
    setHouseRules(houseRules.map(category =>
      category.id === categoryId
        ? {
          ...category,
          rules: category.rules.map(rule =>
            rule.id === ruleId ? { ...rule, visibleToGuest: visible } : rule
          ),
        }
        : category
    ));
  };

  const handleHostProfileUpdate = async (profile: HostProfile) => {
    if (!user) return;
    try {
      await updateUserProfile(user.id, { hostProfile: profile });
      setHostProfile(profile);
    } catch (error: any) {
      toast.error('Failed to update profile: ' + error.message);
    }
  };

  // Helper function to get current property data including unsaved edits
  const getPreviewData = (): Property | null => {
    if (!property) return null;

    return {
      ...property,
      name,
      address,
      description,
      checkInInstructions: checkInInfo.instructions || '',
      checkInTime: checkInInfo.checkInTime || '',
      wifiNetwork: wifiInfo.ssid || '',
      wifiPassword: wifiInfo.password || '',
      parkingInstructions: parkingInfo.instructions || '',
      emergencyContacts: emergencyContacts || [],
      houseRules: houseRules || [],
      localTips: property.localTips || '',
      hostProfile: {
        ...hostProfile,
        displayName: hostProfile.displayName || 'Host',
      },
      pointsOfInterest: pointsOfInterest || [],
      restaurants: restaurants || [],
      supermarkets: supermarkets || [],
      bars: bars || [],
      medicalContacts: medicalContacts || [],
    };
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

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Property not found</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            {t('common.back')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-2 min-w-0 flex-shrink">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="flex-shrink-0">
                <ArrowLeft className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">{t('common.back')}</span>
              </Button>
              <button
                onClick={() => navigate('/')}
                className="hover:opacity-80 transition-opacity flex-shrink-0"
              >
                <img
                  src={logoImage}
                  alt="CheckinLynk"
                  className="h-6 cursor-pointer"
                />
              </button>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!isPreviewMode ? (
                <>
                  <Button
                    onClick={() => setIsPreviewMode(true)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview Guest View</span>
                    <span className="sm:hidden">Preview</span>
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsPreviewMode(false)}
                  variant="outline"
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Back To Edit Mode</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPreviewMode ? (
          <>
            {/* Guest View Preview - using the property with edited values */}
            <GuestView previewData={getPreviewData()} />
          </>
        ) : (
          <>
            {/* Property Header */}
            <div className="mb-8">
              <h1 className="text-3xl mb-2">{property.name}</h1>
              <p className="text-muted-foreground">
                {property.address.streetName} {property.address.houseNumber}, {property.address.postalCode} {property.address.country}
              </p>
            </div>

            {/* Guest Link Card */}
            <Card className="mb-8 bg-gradient-to-r from-coral-50 to-coral-100 dark:from-coral-900/20 dark:to-coral-800/20 border-coral-200 dark:border-coral-800">
              <CardHeader>
                <CardTitle className="text-lg">{t('property.guestLink')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleCopyLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Guest Link
                  </Button>
                  <Button onClick={handleRegenerateToken} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate Link
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Share this secure link with your guests. You can regenerate it anytime for security.
                </p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 h-auto">
                <TabsTrigger value="details" className="text-xs sm:text-sm px-2 py-2.5">
                  <span className="hidden sm:inline">Property Details</span>
                  <span className="sm:hidden">Details</span>
                </TabsTrigger>
                <TabsTrigger value="info" className="text-xs sm:text-sm px-2 py-2.5">
                  <span className="hidden sm:inline">Guest Info</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger value="rules" className="text-xs sm:text-sm px-2 py-2.5">
                  <span className="hidden sm:inline">House Rules</span>
                  <span className="sm:hidden">Rules</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs sm:text-sm px-2 py-2.5">Settings</TabsTrigger>
              </TabsList>

              {/* Property Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Property Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-input-background"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Street Name"
                        value={address.streetName}
                        onChange={(e) => setAddress({ ...address, streetName: e.target.value })}
                        className="bg-input-background"
                      />
                      <Input
                        placeholder="House Number"
                        value={address.houseNumber}
                        onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Postal Code"
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        className="bg-input-background"
                      />
                      <Input
                        placeholder="Country"
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>

                    <Textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-input-background min-h-32"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Guest Info Tab */}
              <TabsContent value="info" className="space-y-6">
                {/* Check-in Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Check-in / Check-out</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Check-in Time (e.g., 3:00 PM)"
                        value={checkInInfo.checkInTime}
                        onChange={(e) => setCheckInInfo({ ...checkInInfo, checkInTime: e.target.value })}
                        className="bg-input-background"
                      />
                      <Input
                        placeholder="Check-out Time (e.g., 11:00 AM)"
                        value={checkInInfo.checkOutTime}
                        onChange={(e) => setCheckInInfo({ ...checkInInfo, checkOutTime: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                    <SecureCodeInput
                      label="Key Code"
                      value={checkInInfo.keyCode || ''}
                      onChange={(value) => setCheckInInfo({ ...checkInInfo, keyCode: value })}
                      placeholder="••••••"
                    />
                    <SecureCodeInput
                      label="Alarm Code"
                      value={checkInInfo.alarmCode || ''}
                      onChange={(value) => setCheckInInfo({ ...checkInInfo, alarmCode: value })}
                      placeholder="••••••"
                    />
                    <Textarea
                      placeholder="Check-in Instructions (optional)"
                      value={checkInInfo.instructions || ''}
                      onChange={(e) => setCheckInInfo({ ...checkInInfo, instructions: e.target.value })}
                      className="bg-input-background min-h-24"
                    />
                  </CardContent>
                </Card>

                {/* WiFi Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>WiFi Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      placeholder="Network Name (SSID)"
                      value={wifiInfo.ssid}
                      onChange={(e) => setWifiInfo({ ...wifiInfo, ssid: e.target.value })}
                      className="bg-input-background"
                    />
                    <Input
                      placeholder="Password"
                      value={wifiInfo.password}
                      onChange={(e) => setWifiInfo({ ...wifiInfo, password: e.target.value })}
                      className="bg-input-background"
                    />
                  </CardContent>
                </Card>

                {/* Parking Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Parking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      placeholder="Parking Address / Location"
                      value={parkingInfo.address}
                      onChange={(e) => setParkingInfo({ ...parkingInfo, address: e.target.value })}
                      className="bg-input-background"
                    />
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="parking-free"
                          checked={parkingInfo.type === 'free'}
                          onCheckedChange={() => setParkingInfo({ ...parkingInfo, type: 'free' })}
                        />
                        <label htmlFor="parking-free" className="cursor-pointer">Free</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="parking-paid"
                          checked={parkingInfo.type === 'paid'}
                          onCheckedChange={() => setParkingInfo({ ...parkingInfo, type: 'paid' })}
                        />
                        <label htmlFor="parking-paid" className="cursor-pointer">Paid</label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmergencyContactsEditor
                      contacts={emergencyContacts}
                      onChange={setEmergencyContacts}
                    />
                  </CardContent>
                </Card>

                {/* Restaurants */}
                <RestaurantsEditor
                  restaurants={restaurants}
                  onChange={setRestaurants}
                />

                {/* Supermarkets */}
                <SupermarketsEditor
                  supermarkets={supermarkets}
                  onChange={setSupermarkets}
                />

                {/* Bars */}
                <BarsEditor
                  bars={bars}
                  onChange={setBars}
                />

                {/* Points of Interest */}
                <PointsOfInterestEditor
                  pointsOfInterest={pointsOfInterest}
                  onChange={setPointsOfInterest}
                />

                {/* Medical Contacts */}
                <MedicalContactsEditor
                  medicalContacts={medicalContacts}
                  onChange={setMedicalContacts}
                />
              </TabsContent>

              {/* House Rules Tab */}
              <TabsContent value="rules" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>House Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HouseRulesAccordion
                      categories={houseRules}
                      onRuleToggle={handleRuleToggle}
                      onRuleVisibilityToggle={handleRuleVisibilityToggle}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <HostProfileSettings
                  profile={hostProfile}
                  userEmail={user?.email}
                  onUpdate={handleHostProfileUpdate}
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}