import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Badge } from '@/app/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import {
  Check,
  CheckCircle,
  Building2,
  Home,
  Link as LinkIcon,
  Copy,
  Download,
  Wifi,
  KeyRound,
  FileText,
  LogOut,
  HelpCircle,
  ArrowRight,
  Calendar,
  AlertCircle
} from 'lucide-react';
const logoImage = "/vite.svg";

type OnboardingStep = 1 | 2 | 3 | 4;

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: string;
  timezone: string;
}

interface HostData {
  hostType: 'individual' | 'property_manager' | '';
  businessName: string;
  vatNumber: string;
  billingEmail: string;
}

interface PropertyData {
  name: string;
  city: string;
  country: string;
  maxGuests: string;
  type: string;
  generateQR: boolean;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | ''>('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: 'host@example.com', // Pre-filled from login
    phone: '',
    language: 'nl',
    timezone: 'Europe/Amsterdam'
  });

  const [hostData, setHostData] = useState<HostData>({
    hostType: '',
    businessName: '',
    vatNumber: '',
    billingEmail: ''
  });

  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: '',
    city: '',
    country: 'Nederland',
    maxGuests: '',
    type: '',
    generateQR: true
  });

  const steps = [
    { number: 1, label: 'Profiel', completed: currentStep > 1 },
    { number: 2, label: 'Bedrijf/Host', completed: currentStep > 2 },
    { number: 3, label: 'Accommodatie', completed: currentStep > 3 },
    { number: 4, label: 'Publiceer link', completed: currentStep > 4 }
  ];

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'Voornaam is verplicht';
    }
    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Achternaam is verplicht';
    }
    if (!profileData.email.trim()) {
      newErrors.email = 'E-mail is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Ongeldig e-mailadres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!hostData.hostType) {
      newErrors.hostType = 'Selecteer een host type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!propertyData.name.trim()) {
      newErrors.propertyName = 'Accommodatienaam is verplicht';
    }
    if (!propertyData.city.trim()) {
      newErrors.city = 'Stad is verplicht';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
      if (isValid) {
        // Generate unique link
        const propertySlug = propertyData.name.toLowerCase().replace(/\s+/g, '-');
        const uniqueId = Math.random().toString(36).substring(2, 8);
        setGeneratedLink(`https://checkinlynk.com/g/${propertySlug}-${uniqueId}`);
      }
    }

    if (isValid && currentStep < 4) {
      setSaveStatus('saving');
      setTimeout(() => {
        setSaveStatus('saved');
        setCurrentStep((currentStep + 1) as OnboardingStep);
        setTimeout(() => setSaveStatus(''), 1500);
      }, 500);
    }
  };

  const handleSkipLater = () => {
    navigate('/dashboard');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQR = () => {
    const svg = document.querySelector('.qr-code-container svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'checkinlynk-qr.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <img
              src={logoImage}
              alt="CheckinLynk"
              className="h-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            />
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                <LogOut className="h-4 w-4 mr-2" />
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="bg-muted/30 border-b border-border py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Stepper */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-all ${step.completed
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                          ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {step.completed ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${currentStep === step.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-1 rounded-full ${step.completed ? 'bg-green-500' : 'bg-muted'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Stepper */}
          <div className="md:hidden">
            <div className="text-center mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                Stap {currentStep} van 4
              </span>
            </div>
            <div className="flex gap-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex-1 h-2 rounded-full transition-all ${step.completed ? 'bg-green-500' : currentStep === step.number ? 'bg-primary' : 'bg-muted'
                    }`}
                />
              ))}
            </div>
          </div>

          {saveStatus === 'saved' && (
            <div className="mt-4 text-center">
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <Check className="h-3 w-3 mr-1" />
                Opgeslagen
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Profile */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                Welkom bij CheckinLynk — laten we je account klaarzetten
              </h1>
              <p className="text-lg text-muted-foreground">
                Dit duurt ± 3 minuten. Je kunt alles later aanpassen.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Jouw profiel</CardTitle>
                <CardDescription>Vul je persoonlijke gegevens in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Voornaam <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Jan"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Achternaam <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Jansen"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-mail <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefoon (optioneel)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+31 6 12345678"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Taal</Label>
                    <Select value={profileData.language} onValueChange={(value) => setProfileData({ ...profileData, language: value })}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nl">Nederlands</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Tijdzone</Label>
                    <Select value={profileData.timezone} onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}>
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Amsterdam">CET (Amsterdam)</SelectItem>
                        <SelectItem value="Europe/Brussels">CET (Brussels)</SelectItem>
                        <SelectItem value="Europe/Paris">CET (Paris)</SelectItem>
                        <SelectItem value="Europe/Berlin">CET (Berlin)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Button variant="outline" onClick={handleSkipLater}>
                Later afmaken
              </Button>
              <Button onClick={handleNext} size="lg" className="bg-primary">
                Opslaan & verder
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Host Type */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">Hoe gebruik je CheckinLynk?</h1>
              <p className="text-lg text-muted-foreground">
                Dit helpt ons je ervaring te personaliseren
              </p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <RadioGroup value={hostData.hostType} onValueChange={(value) => setHostData({ ...hostData, hostType: value as 'individual' | 'property_manager' })}>
                    <Card className={`cursor-pointer transition-all ${hostData.hostType === 'individual' ? 'border-primary border-2 bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <RadioGroupItem value="individual" id="individual" className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-10 w-10 rounded-lg bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center">
                                <Home className="h-5 w-5 text-coral-600 dark:text-coral-400" />
                              </div>
                              <Label htmlFor="individual" className="text-lg font-semibold cursor-pointer">
                                Particuliere host
                              </Label>
                            </div>
                            <p className="text-sm text-muted-foreground ml-13">
                              1–3 accommodaties. Ideaal voor persoonlijke verhuur.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer transition-all ${hostData.hostType === 'property_manager' ? 'border-primary border-2 bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <RadioGroupItem value="property_manager" id="property_manager" className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-10 w-10 rounded-lg bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-coral-600 dark:text-coral-400" />
                              </div>
                              <Label htmlFor="property_manager" className="text-lg font-semibold cursor-pointer">
                                Property manager
                              </Label>
                            </div>
                            <p className="text-sm text-muted-foreground ml-13">
                              4+ accommodaties. Voor professionele beheerders.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>

                  {errors.hostType && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.hostType}
                    </p>
                  )}
                </div>

                {/* Conditional Fields for Property Manager */}
                {hostData.hostType === 'property_manager' && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Bedrijfsnaam</Label>
                      <Input
                        id="businessName"
                        placeholder="Jouw bedrijfsnaam"
                        value={hostData.businessName}
                        onChange={(e) => setHostData({ ...hostData, businessName: e.target.value })}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vatNumber">BTW-nummer (optioneel)</Label>
                        <Input
                          id="vatNumber"
                          placeholder="NL123456789B01"
                          value={hostData.vatNumber}
                          onChange={(e) => setHostData({ ...hostData, vatNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingEmail">Facturatie e-mail (optioneel)</Label>
                        <Input
                          id="billingEmail"
                          type="email"
                          placeholder="facturen@bedrijf.nl"
                          value={hostData.billingEmail}
                          onChange={(e) => setHostData({ ...hostData, billingEmail: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Vorige
              </Button>
              <Button onClick={handleNext} size="lg" className="bg-primary">
                Verder naar accommodatie
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: First Property */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">Maak je eerste accommodatie aan</h1>
              <p className="text-lg text-muted-foreground">
                Na deze stap krijg je meteen je unieke CheckinLynk-link.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Accommodatie details</CardTitle>
                <CardDescription>Vul de basisinformatie in van je eerste accommodatie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyName">
                    Accommodatienaam <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="propertyName"
                    placeholder="Chalet Ardennen"
                    value={propertyData.name}
                    onChange={(e) => setPropertyData({ ...propertyData, name: e.target.value })}
                    className={errors.propertyName ? 'border-destructive' : ''}
                  />
                  {errors.propertyName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.propertyName}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      Stad <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="Amsterdam"
                      value={propertyData.city}
                      onChange={(e) => setPropertyData({ ...propertyData, city: e.target.value })}
                      className={errors.city ? 'border-destructive' : ''}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Land</Label>
                    <Select value={propertyData.country} onValueChange={(value) => setPropertyData({ ...propertyData, country: value })}>
                      <SelectTrigger id="country">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nederland">Nederland</SelectItem>
                        <SelectItem value="België">België</SelectItem>
                        <SelectItem value="Frankrijk">Frankrijk</SelectItem>
                        <SelectItem value="Duitsland">Duitsland</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxGuests">Aantal gasten (optioneel)</Label>
                    <Input
                      id="maxGuests"
                      type="number"
                      placeholder="4"
                      value={propertyData.maxGuests}
                      onChange={(e) => setPropertyData({ ...propertyData, maxGuests: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type accommodatie</Label>
                    <Select value={propertyData.type} onValueChange={(value) => setPropertyData({ ...propertyData, type: value })}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecteer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="huis">Huis</SelectItem>
                        <SelectItem value="chalet">Chalet</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="bnb">B&B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="qr-toggle" className="cursor-pointer">Genereer QR voor print</Label>
                    <p className="text-sm text-muted-foreground">Handig om op locatie te plaatsen</p>
                  </div>
                  <Switch
                    id="qr-toggle"
                    checked={propertyData.generateQR}
                    onCheckedChange={(checked) => setPropertyData({ ...propertyData, generateQR: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Vorige
              </Button>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="ghost" onClick={handleSkipLater}>
                  Overslaan
                </Button>
                <Button onClick={handleNext} size="lg" className="bg-primary">
                  Accommodatie aanmaken
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">Je CheckinLynk is klaar!</h1>
              <p className="text-lg text-muted-foreground">
                Deel de link met je gasten en bespaar tijd op herhaalde vragen.
              </p>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Jouw unieke CheckinLynk</CardTitle>
                <CardDescription>
                  Deel deze link in Airbnb/Booking berichten of plaats de QR code op locatie
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Link */}
                <div className="space-y-2">
                  <Label>Link naar gastenpagina</Label>
                  <div className="flex gap-2">
                    <Input value={generatedLink} readOnly className="font-mono text-sm" />
                    <Button onClick={() => copyToClipboard(generatedLink)} variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* QR Code */}
                {propertyData.generateQR && (
                  <div className="space-y-2">
                    <Label>QR Code</Label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="qr-code-container p-4 bg-white rounded-lg border border-border">
                        <QRCodeSVG value={generatedLink} size={128} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-3">
                          Download de QR code en print deze uit. Gasten kunnen scannen om direct naar hun CheckinLynk te gaan.
                        </p>
                        <Button onClick={downloadQR} variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download QR
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Volgende stappen</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="border-border hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <Wifi className="h-8 w-8 text-coral-500 mb-3" />
                    <h4 className="font-semibold mb-1">WiFi & parkeren</h4>
                    <p className="text-sm text-muted-foreground">Vul de meest gestelde info in</p>
                  </CardContent>
                </Card>

                <Card className="border-border hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <KeyRound className="h-8 w-8 text-coral-500 mb-3" />
                    <h4 className="font-semibold mb-1">Check-in instructies</h4>
                    <p className="text-sm text-muted-foreground">Voeg aankomst info toe</p>
                  </CardContent>
                </Card>

                <Card className="border-border hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <FileText className="h-8 w-8 text-coral-500 mb-3" />
                    <h4 className="font-semibold mb-1">Huisregels</h4>
                    <p className="text-sm text-muted-foreground">Zet je regels klaar</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tip */}
            <Card className="bg-coral-50 dark:bg-coral-900/10 border-coral-200 dark:border-coral-800">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-coral-500 flex items-center justify-center flex-shrink-0">
                    <LinkIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Tip: deel je link in je bevestigingsberichten</h4>
                    <p className="text-sm text-muted-foreground">
                      Voeg je CheckinLynk toe aan je Airbnb of Booking.com berichten.
                      Gasten vinden dan alles zelf en je bespaart uren per week.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-primary">
                Ga naar dashboard
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Plan een online consult
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}