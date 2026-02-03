import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import {
  Link as LinkIcon,
  Smartphone,
  KeyRound,
  Eye,
  MapPin,
  FileText,
  Sparkles,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  MessageCircle,
  Star,
  Shield,
  Zap,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Wifi,
  Rocket,
  HeadphonesIcon,
  Lightbulb
} from 'lucide-react';
const logoImage = "/vite.svg";

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [earlyAccessFormData, setEarlyAccessFormData] = useState({
    name: '',
    email: '',
    accommodations: '',
    city: ''
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: LinkIcon,
      title: t('landing.features.feature1.title'),
      description: t('landing.features.feature1.description')
    },
    {
      icon: Smartphone,
      title: t('landing.features.feature2.title'),
      description: t('landing.features.feature2.description')
    },
    {
      icon: KeyRound,
      title: t('landing.features.feature3.title'),
      description: t('landing.features.feature3.description')
    },
    {
      icon: Eye,
      title: t('landing.features.feature4.title'),
      description: t('landing.features.feature4.description')
    },
    {
      icon: MapPin,
      title: t('landing.features.feature5.title'),
      description: t('landing.features.feature5.description')
    },
    {
      icon: FileText,
      title: t('landing.features.feature6.title'),
      description: t('landing.features.feature6.description')
    },
    {
      icon: Sparkles,
      title: t('landing.features.feature7.title'),
      description: t('landing.features.feature7.description')
    },
    {
      icon: Users,
      title: t('landing.features.feature8.title'),
      description: t('landing.features.feature8.description')
    }
  ];

  const steps = [
    {
      number: '01',
      title: t('landing.howItWorks.step1.title'),
      description: t('landing.howItWorks.step1.description')
    },
    {
      number: '02',
      title: t('landing.howItWorks.step2.title'),
      description: t('landing.howItWorks.step2.description')
    },
    {
      number: '03',
      title: t('landing.howItWorks.step3.title'),
      description: t('landing.howItWorks.step3.description')
    }
  ];

  const pricingPlans = [
    {
      name: t('landing.pricing.starter.name'),
      price: { monthly: 9, yearly: 90 },
      description: t('landing.pricing.starter.description'),
      features: [
        t('landing.pricing.starter.feature1'),
        t('landing.pricing.starter.feature2'),
        t('landing.pricing.starter.feature3'),
        t('landing.pricing.starter.feature4'),
        t('landing.pricing.starter.feature5')
      ],
      cta: t('landing.pricing.starter.cta'),
      popular: false
    },
    {
      name: t('landing.pricing.pro.name'),
      price: { monthly: 24, yearly: 240 },
      description: t('landing.pricing.pro.description'),
      features: [
        t('landing.pricing.pro.feature1'),
        t('landing.pricing.pro.feature2'),
        t('landing.pricing.pro.feature3'),
        t('landing.pricing.pro.feature4'),
        t('landing.pricing.pro.feature5'),
        t('landing.pricing.pro.feature6'),
        t('landing.pricing.pro.feature7')
      ],
      cta: t('landing.pricing.pro.cta'),
      popular: true
    },
    {
      name: t('landing.pricing.business.name'),
      price: { monthly: null, yearly: null },
      description: t('landing.pricing.business.description'),
      features: [
        t('landing.pricing.business.feature1'),
        t('landing.pricing.business.feature2'),
        t('landing.pricing.business.feature3'),
        t('landing.pricing.business.feature4'),
        t('landing.pricing.business.feature5'),
        t('landing.pricing.business.feature6')
      ],
      cta: t('landing.pricing.business.cta'),
      popular: false
    }
  ];

  const testimonials = [
    {
      quote: t('landing.testimonials.testimonial1.quote'),
      author: t('landing.testimonials.testimonial1.author'),
      role: t('landing.testimonials.testimonial1.role')
    },
    {
      quote: t('landing.testimonials.testimonial2.quote'),
      author: t('landing.testimonials.testimonial2.author'),
      role: t('landing.testimonials.testimonial2.role')
    },
    {
      quote: t('landing.testimonials.testimonial3.quote'),
      author: t('landing.testimonials.testimonial3.author'),
      role: t('landing.testimonials.testimonial3.role')
    }
  ];

  const faqs = [
    {
      question: t('landing.faq.q1'),
      answer: t('landing.faq.a1')
    },
    {
      question: t('landing.faq.q2'),
      answer: t('landing.faq.a2')
    },
    {
      question: t('landing.faq.q3'),
      answer: t('landing.faq.a3')
    },
    {
      question: t('landing.faq.q4'),
      answer: t('landing.faq.a4')
    },
    {
      question: t('landing.faq.q5'),
      answer: t('landing.faq.a5')
    },
    {
      question: t('landing.faq.q6'),
      answer: t('landing.faq.a6')
    },
    {
      question: t('landing.faq.q7'),
      answer: t('landing.faq.a7')
    },
    {
      question: t('landing.faq.q8'),
      answer: t('landing.faq.a8')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <img
                src={logoImage}
                alt="CheckinLynk"
                className="h-8 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              />
              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('landing.nav.features')}
                </button>
                <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('landing.nav.pricing')}
                </button>
                <button onClick={() => scrollToSection('consultation')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('landing.nav.demo')}
                </button>
                <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('landing.nav.faq')}
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button variant="ghost" onClick={() => navigate('/login')}>
                {t('landing.nav.login')}
              </Button>
              <Button onClick={() => scrollToSection('pricing')} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('landing.nav.register')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coral-50 via-white to-orange-50 dark:from-coral-950/20 dark:via-background dark:to-orange-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-coral-100 text-coral-700 dark:bg-coral-900 dark:text-coral-300 border-coral-200 dark:border-coral-800">
                <Sparkles className="h-3 w-3 mr-1" />
                {t('landing.hero.badge')}
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('landing.hero.title')}
              </h1>
              <p className="text-2xl lg:text-4xl font-bold mb-6 leading-tight">
                {t('landing.hero.subtitle')}{' '}
                <span className="bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent">
                  {t('landing.hero.checkIn')}
                </span>
                {' '}{t('landing.hero.and')}
              </p>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('landing.hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" onClick={() => scrollToSection('pricing')} className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8">
                  <Zap className="h-5 w-5 mr-2" />
                  {t('landing.hero.cta')}
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('consultation')} className="text-lg h-14 px-8">
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('landing.hero.consultation')}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-foreground mb-1">80%</div>
                  <div className="text-sm text-muted-foreground">{t('landing.hero.stat1')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground mb-1">5 min</div>
                  <div className="text-sm text-muted-foreground">{t('landing.hero.stat2')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground mb-1">4.8★</div>
                  <div className="text-sm text-muted-foreground">{t('landing.hero.stat3')}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Card className="shadow-2xl border-2 border-border/50 overflow-hidden">
                  <div className="bg-gradient-to-br from-coral-500 to-coral-600 p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Home className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Zonnig Appartement</div>
                        <div className="text-sm opacity-90">Amsterdam Centrum</div>
                      </div>
                    </div>
                    <Badge className="bg-white/20 border-white/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Gast ingecheckt
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Wifi className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">WiFi Network</div>
                        <div className="text-xs text-muted-foreground">Sunshine_5G</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <KeyRound className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Sleutelcode</div>
                        <div className="text-xs text-muted-foreground">Tap to reveal</div>
                      </div>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Lokale tips</div>
                        <div className="text-xs text-muted-foreground">12 aanbevelingen</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-coral-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              {t('landing.problem.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.problem.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-coral-600 dark:text-coral-400" />
                </div>
                <CardTitle className="text-xl">{t('landing.problem.card1.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('landing.problem.card1.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center mb-4">
                  <LinkIcon className="h-6 w-6 text-coral-600 dark:text-coral-400" />
                </div>
                <CardTitle className="text-xl">{t('landing.problem.card2.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('landing.problem.card2.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-coral-600 dark:text-coral-400" />
                </div>
                <CardTitle className="text-xl">{t('landing.problem.card3.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('landing.problem.card3.description')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => scrollToSection('pricing')} variant="outline">
              {t('landing.problem.cta')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-coral-100 text-coral-700 dark:bg-coral-900 dark:text-coral-300 border-coral-200 dark:border-coral-800">
              {t('landing.features.badge')}
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-all hover:shadow-md">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-coral-500 to-coral-600 text-white text-2xl font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-coral-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => scrollToSection('pricing')} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Zap className="h-5 w-5 mr-2" />
              {t('landing.howItWorks.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-coral-100 text-coral-700 dark:bg-coral-900 dark:text-coral-300 border-coral-200 dark:border-coral-800">
              Pricing
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Transparante prijzen
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Geen verborgen kosten. Opzeggen wanneer je wilt.
            </p>

            <div className="inline-flex items-center gap-3 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setPricingPeriod('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${pricingPeriod === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Maandelijks
              </button>
              <button
                onClick={() => setPricingPeriod('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${pricingPeriod === 'yearly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Jaarlijks
                <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                  -17%
                </Badge>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular
                    ? 'border-2 border-primary shadow-xl scale-105'
                    : 'border-border'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-coral-500 to-coral-600 text-white">
                      Meest gekozen
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-6">
                    {plan.price.monthly !== null ? (
                      <>
                        <div className="text-4xl font-bold">
                          €{pricingPeriod === 'monthly' ? plan.price.monthly : Math.round(plan.price.yearly / 12)}
                        </div>
                        <div className="text-sm text-muted-foreground">per maand</div>
                        {pricingPeriod === 'yearly' && (
                          <div className="text-xs text-muted-foreground mt-1">
                            (€{plan.price.yearly} jaarlijks)
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-2xl font-bold">Op maat</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : ''
                      }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.name === 'Starter' || plan.name === 'Pro') {
                        window.open('http://www.stripe.com/', '_blank');
                      } else {
                        scrollToSection('consultation');
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Veilig betalen via Polar</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>7 dagen gratis proberen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Consultation */}
      <section id="consultation" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Plan een online consult en krijg je setup live
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wil je CheckinLynk in actie zien? Plan een kort online consult van 15-20 minuten.
              We laten je een live demo zien, beantwoorden al je vragen, geven pricing advies en helpen je meteen aan de slag.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Online Consult – CheckinLynk</CardTitle>
                <CardDescription className="text-base">
                  <Clock className="inline h-4 w-4 mr-1" />
                  15-20 minuten • Via Google Meet of Zoom
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Wat je krijgt:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Live demo van het platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Pricing advies op maat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Setup tips en best practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Antwoord op al je vragen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Hulp bij eerste accommodatie instellen</span>
                    </li>
                  </ul>
                </div>
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Calendar className="h-5 w-5 mr-2" />
                  Kies datum & tijd
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Geen verplichtingen. Gewoon kennismaken en kijken of CheckinLynk bij je past.
                </p>
              </CardContent>
            </Card>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Selecteer een datum</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Simple calendar placeholder */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4 rotate-90" />
                      </Button>
                      <div className="font-semibold">Maart 2025</div>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                      {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(day => (
                        <div key={day} className="text-muted-foreground font-medium">{day}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <button
                          key={day}
                          className={`aspect-square rounded-lg text-sm font-medium transition-colors ${day === 15
                              ? 'bg-primary text-primary-foreground'
                              : day % 7 === 0 || day % 7 === 6
                                ? 'text-muted-foreground/50'
                                : 'hover:bg-muted'
                            }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 text-sm">Beschikbare tijden (CET)</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(time => (
                          <button
                            key={time}
                            className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-coral-100 text-coral-700 dark:bg-coral-900 dark:text-coral-300 border-coral-200 dark:border-coral-800">
              Reviews
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Wat zeggen andere hosts?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access / Testprogramma */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-coral-500 to-coral-600 text-white border-0">
              <Rocket className="h-3 w-3 mr-1" />
              Early Access
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Word één van de eerste CheckinLynk-hosts
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Schrijf je in voor het testprogramma en help ons CheckinLynk te verbeteren.
              Als early adopter krijg je <strong className="text-foreground">3 maanden gratis</strong> en prioritaire support tijdens je onboarding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">3 maanden gratis</h3>
                <p className="text-muted-foreground">
                  Test CheckinLynk zonder risico en betaal pas na de proefperiode.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center mb-4">
                  <HeadphonesIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Snelle onboarding</h3>
                <p className="text-muted-foreground">
                  We zetten samen je eerste accommodatie live in minder dan 30 minuten.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Invloed op de roadmap</h3>
                <p className="text-muted-foreground">
                  Jouw feedback bepaalt welke features we als volgende bouwen.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Schrijf je in voor het testprogramma</CardTitle>
                <CardDescription>
                  Vul je gegevens in en we nemen binnen 24 uur contact met je op
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Naam *
                    </label>
                    <Input
                      id="name"
                      placeholder="Je volledige naam"
                      value={earlyAccessFormData.name}
                      onChange={(e) => setEarlyAccessFormData({ ...earlyAccessFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="je@email.com"
                      value={earlyAccessFormData.email}
                      onChange={(e) => setEarlyAccessFormData({ ...earlyAccessFormData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="accommodations" className="text-sm font-medium">
                      Aantal accommodaties *
                    </label>
                    <Select
                      value={earlyAccessFormData.accommodations}
                      onValueChange={(value) => setEarlyAccessFormData({ ...earlyAccessFormData, accommodations: value })}
                    >
                      <SelectTrigger id="accommodations">
                        <SelectValue placeholder="Selecteer aantal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 accommodaties</SelectItem>
                        <SelectItem value="4-10">4-10 accommodaties</SelectItem>
                        <SelectItem value="11+">11+ accommodaties</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      Stad/Regio
                    </label>
                    <Input
                      id="city"
                      placeholder="Bijvoorbeeld: Amsterdam"
                      value={earlyAccessFormData.city}
                      onChange={(e) => setEarlyAccessFormData({ ...earlyAccessFormData, city: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-coral-500 to-coral-600 text-white hover:from-coral-600 hover:to-coral-700 mt-6"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Aanmelden (3 maanden gratis)
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Beperkte plaatsen. Geen verplichtingen. Opzeggen kan altijd.
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection('features')}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Bekijk hoe het werkt
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Veelgestelde vragen
            </h2>
            <p className="text-xl text-muted-foreground">
              Alles wat je moet weten over CheckinLynk
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-border">
                <CardHeader
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold pr-4">{faq.question}</CardTitle>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-coral-50 via-white to-orange-50 dark:from-coral-950/20 dark:via-background dark:to-orange-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Minder berichten. Meer rust.
            <br />
            <span className="bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent">
              Betere gastenervaring.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Sluit je aan bij honderden hosts die hun gasteninformatie professioneel delen met CheckinLynk
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={() => scrollToSection('pricing')} className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-10">
              <Zap className="h-5 w-5 mr-2" />
              Start gratis
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="text-lg h-14 px-10">
              Log in
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span>Veilige betaling via Polar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span>GDPR-ready</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span>Support binnen 24u</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logoImage} alt="CheckinLynk" className="h-8 mb-4" />
              <p className="text-sm text-muted-foreground">
                Eén link voor alle gasteninformatie. Professioneler. Simpeler. Beter.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-foreground transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-foreground transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToSection('consultation')} className="hover:text-foreground transition-colors">Demo</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-foreground transition-colors">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bedrijf</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Over ons</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Voorwaarden</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => navigate('/login')} className="hover:text-foreground transition-colors">Log in</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-foreground transition-colors">Registreer</button></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 CheckinLynk. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>
    </div>
  );
}