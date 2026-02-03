import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as firestoreService from '@/lib/firestore';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { CountryCodeSelect } from '@/app/components/CountryCodeSelect';
import { PasswordStrengthIndicator, calculatePasswordStrength } from '@/app/components/PasswordStrengthIndicator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
const logoImage = "/vite.svg";

type AuthMode = 'signin' | 'signup';

export default function EnhancedAuth() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [loading, setLoading] = useState(false);

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('+31');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordStrength = calculatePasswordStrength(password);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(t('auth.welcomeBack'));
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);

      // Better error messages
      if (error.message?.includes('invalid-credential') || error.code === 'auth/invalid-credential') {
        toast.error(
          <div className="space-y-2">
            <p className="font-semibold">Unable to sign in</p>
            <p className="text-sm">Please check your email and password, or create a new account if you haven't registered yet.</p>
          </div>,
          { duration: 5000 }
        );
      } else {
        toast.error(error.message || 'Sign in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error(t('auth.invalidEmail'));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t('auth.passwordsDontMatch'));
      return;
    }

    if (passwordStrength === 'weak') {
      toast.error('Please use a stronger password');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Create user profile in Firestore
      await firestoreService.createUserProfile(user.uid, {
        email: user.email || '',
        hostProfile: {
          displayName: `${firstName} ${lastName}`,
          email: user.email || '',
          phone: `${countryCode}${phoneNumber}`
        }
      });

      toast.success('Account created successfully!');
      navigate('/onboarding');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success(t('auth.welcomeBack'));
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
    }
  };

  const handleAppleLogin = async () => {
    try {
      const provider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, provider);
      toast.success(t('auth.welcomeBack'));
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Apple');
    }
  };

  const handleQuickTestLogin = () => {
    // Fill in test credentials
    setEmail('test@checkinlynk.com');
    setPassword('TestPassword123!');
    toast.info('Test credentials filled. Click Sign In or create this account first.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Logo */}
        <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-500">
          <img
            src={logoImage}
            alt="CheckinLynk"
            className="h-16 mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          />
          <p className="text-muted-foreground text-sm">{t('tagline')}</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-border/50 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500">
          {/* Mode Toggle */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setMode('signin')}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-all duration-200",
                mode === 'signin'
                  ? 'text-primary border-b-2 border-primary bg-accent/50'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
              )}
            >
              {t('auth.signIn')}
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-all duration-200",
                mode === 'signup'
                  ? 'text-primary border-b-2 border-primary bg-accent/50'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
              )}
            >
              {t('auth.signUp')}
            </button>
          </div>

          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl">
              {mode === 'signin' ? t('auth.welcomeBack') : t('auth.createYourAccount')}
            </CardTitle>
            <CardDescription>
              {mode === 'signin' ? t('auth.signInToManage') : t('auth.signUpToStart')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {mode === 'signin' ? (
              // Sign In Form
              <form onSubmit={handleSignIn} className="space-y-4 animate-in fade-in-0 slide-in-from-right-2 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input-background pr-10 transition-all duration-200 focus:scale-[1.01]"
                    />
                    {email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isValidEmail ? (
                          <Check className="h-4 w-4 text-green-500 animate-in zoom-in-0 duration-200" />
                        ) : (
                          <X className="h-4 w-4 text-destructive animate-in zoom-in-0 duration-200" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <button
                      type="button"
                      className="text-xs text-primary hover:text-primary-hover transition-colors duration-200 hover:underline"
                    >
                      {t('auth.forgotPassword')}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-input-background pr-10 transition-all duration-200 focus:scale-[1.01]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-coral-600 to-coral-500 hover:from-coral-700 hover:to-coral-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('auth.loading')}
                    </span>
                  ) : (
                    t('auth.signIn')
                  )}
                </Button>
              </form>
            ) : (
              // Sign Up Form
              <form onSubmit={handleSignUp} className="space-y-4 animate-in fade-in-0 slide-in-from-left-2 duration-300">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-input-background transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('auth.lastName')}</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-input-background transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t('auth.email')}</Label>
                  <div className="relative">
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input-background pr-10 transition-all duration-200 focus:scale-[1.01]"
                    />
                    {email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isValidEmail ? (
                          <Check className="h-4 w-4 text-green-500 animate-in zoom-in-0 duration-200" />
                        ) : (
                          <X className="h-4 w-4 text-destructive animate-in zoom-in-0 duration-200" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('auth.phoneNumber')}</Label>
                  <div className="flex gap-2">
                    <CountryCodeSelect
                      value={countryCode}
                      onChange={setCountryCode}
                      className="shrink-0"
                    />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="612345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="bg-input-background flex-1 transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('auth.password')}</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-input-background pr-10 transition-all duration-200 focus:scale-[1.01]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {password && <PasswordStrengthIndicator password={password} />}
                  <p className="text-xs text-muted-foreground">{t('auth.passwordRequirements')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-input-background pr-10 transition-all duration-200 focus:scale-[1.01]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword && (
                    <div className={cn(
                      "flex items-center gap-1.5 text-xs font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200",
                      passwordsMatch ? "text-green-600 dark:text-green-500" : "text-destructive"
                    )}>
                      {passwordsMatch ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          {t('auth.passwordsMatch')}
                        </>
                      ) : (
                        <>
                          <X className="h-3.5 w-3.5" />
                          {t('auth.passwordsDontMatch')}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-coral-600 to-coral-500 hover:from-coral-700 hover:to-coral-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('auth.loading')}
                    </span>
                  ) : (
                    t('auth.createAccount')
                  )}
                </Button>
              </form>
            )}

            {/* SSO Buttons */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{t('auth.orContinueWith')}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent hover:scale-[1.02] transition-all duration-200"
                  onClick={handleGoogleLogin}
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent hover:scale-[1.02] transition-all duration-200"
                  onClick={handleAppleLogin}
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z\" />
                  </svg>
                  Apple
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © 2026 CheckinLynk. All rights reserved.
        </p>
      </div>
    </div>
  );
}