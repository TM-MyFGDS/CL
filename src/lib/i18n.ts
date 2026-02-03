import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      "common.loading": "Loading...",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.create": "Create",
      "common.back": "Back",
      "common.next": "Next",
      "common.submit": "Submit",
      "common.search": "Search",
      
      // Auth
      "auth.welcomeBack": "Welcome back",
      "auth.signIn": "Sign In",
      "auth.signInToManage": "Sign in to manage your properties",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.continueWith": "Or continue with",
      "auth.orContinueWith": "Or continue with",
      "auth.noAccount": "Don't have an account?",
      "auth.dontHaveAccount": "Don't have an account?",
      "auth.signUp": "Sign up",
      "auth.signOut": "Sign Out",
      "auth.loading": "Loading...",
      "auth.forgotPassword": "Forgot password?",
      "auth.alreadyHaveAccount": "Already have an account?",
      "auth.createAccount": "Create Account",
      "auth.createYourAccount": "Create your account",
      "auth.signUpToStart": "Sign up to start managing your properties",
      "auth.firstName": "First Name",
      "auth.lastName": "Last Name",
      "auth.phoneNumber": "Phone Number",
      "auth.confirmPassword": "Confirm Password",
      "auth.passwordStrength.weak": "Weak password",
      "auth.passwordStrength.medium": "Medium password",
      "auth.passwordStrength.strong": "Strong password",
      "auth.passwordRequirements": "Min. 8 characters, 1 uppercase, 1 number",
      "auth.passwordsMatch": "Passwords match",
      "auth.passwordsDontMatch": "Passwords don't match",
      "auth.validEmail": "Valid email",
      "auth.invalidEmail": "Invalid email",
      "auth.selectCountry": "Select country",
      
      // Dashboard
      "dashboard.title": "My Properties",
      "dashboard.addProperty": "Add Property",
      "dashboard.emptyState": "No properties yet",
      "dashboard.emptyStateDesc": "Get started by creating your first vacation rental property",
      "dashboard.activeGuests": "Active Guests",
      "dashboard.totalViews": "Total Views",
      "dashboard.avgRating": "Avg. Rating",
      
      // Sidebar
      "sidebar.dashboard": "Dashboard",
      "sidebar.myProperties": "My Properties",
      "sidebar.checkinOverview": "Check-in Overview",
      "sidebar.templates": "Templates",
      "sidebar.guestManagement": "Guest Management",
      
      // Property Form
      "property.createNew": "Create New Property",
      "property.propertyDetails": "Property Details",
      "property.propertyName": "Property Name",
      "property.propertyNameRequired": "Property Name *",
      "property.namePlaceholder": "Beach House Paradise",
      "property.streetName": "Street Name",
      "property.streetNameRequired": "Street Name *",
      "property.houseNumber": "House Number",
      "property.houseNumberRequired": "House Number *",
      "property.postalCode": "Postal Code",
      "property.postalCodeRequired": "Postal Code *",
      "property.country": "Country",
      "property.countryRequired": "Country *",
      "property.address": "Address",
      "property.addressPlaceholder": "123 Ocean Drive, Miami, FL",
      "property.description": "Description",
      "property.descriptionPlaceholder": "Describe your property...",
      "property.guestCapacity": "Guest Capacity",
      "property.bedrooms": "Bedrooms",
      "property.bathrooms": "Bathrooms",
      "property.propertyImage": "Property Image",
      "property.uploadImage": "Upload Image",
      "property.createProperty": "Create Property",
      "property.creating": "Creating...",
      "property.cancel": "Cancel",
      
      // Property Detail
      "property.guestLink": "Guest Link",
      "property.copyLink": "Copy Link",
      "property.linkCopied": "Link copied!",
      "property.manageContent": "Manage Content",
      "property.addNewBlock": "Add New Block",
      
      // Content Blocks
      "blocks.checkIn": "Check-In Instructions",
      "blocks.wifi": "WiFi Information",
      "blocks.parking": "Parking Instructions",
      "blocks.houseRules": "House Rules",
      "blocks.emergency": "Emergency Contacts",
      "blocks.localTips": "Local Tips",
      
      // Guest Portal
      "guest.registration": "Guest Registration",
      "guest.welcome": "Welcome to",
      "guest.pleaseRegister": "Please complete your registration to access all property information",
      "guest.firstName": "First Name",
      "guest.lastName": "Last Name",
      "guest.phoneNumber": "Phone Number",
      "guest.checkInDate": "Check-In Date",
      "guest.checkOutDate": "Check-Out Date",
      "guest.numberOfGuests": "Number of Guests",
      "guest.continueToProperty": "Continue to Property Info",
      "guest.propertyInfo": "Property Information",
      "guest.essentialInfo": "Essential Information",
      
      // Guest Registration
      "guestRegistration.title": "Guest Registration",
      "guestRegistration.description": "Please complete your registration to access property information",
      "guestRegistration.firstName": "First Name",
      "guestRegistration.lastName": "Last Name",
      "guestRegistration.email": "Email",
      "guestRegistration.phoneNumber": "Phone Number",
      "guestRegistration.checkInDate": "Check-In Date",
      "guestRegistration.checkOutDate": "Check-Out Date",
      "guestRegistration.numberOfGuests": "Number of Guests",
      "guestRegistration.completeRegistration": "Complete Registration",
      "guestRegistration.infoSecure": "Your information is secure and will only be shared with the property host.",
      
      // Language
      "language.select": "Language",
      "language.english": "English",
      "language.spanish": "Spanish",
      "language.french": "French",
      "language.dutch": "Dutch",
      "language.german": "German",
      "language.italian": "Italian",
      "language.portuguese": "Portuguese",
      "language.turkish": "Turkish",
      
      // Language Switcher
      "languageSwitcher.more": "More",
      
      // Language Modal
      "languageModal.title": "Choose a language and region",
      "languageModal.searchPlaceholder": "Search languages...",
      "languageModal.noResults": "No languages found",
      "languageModal.footer": "Content will adapt to your selected language where available",
      
      // Tagline
      "tagline": "One link. All guest information. Share once and relax.",

      // Landing Page - Navigation
      "landing.nav.features": "Features",
      "landing.nav.pricing": "Pricing",
      "landing.nav.demo": "Demo/Consult",
      "landing.nav.faq": "FAQ",
      "landing.nav.login": "Log in",
      "landing.nav.register": "Register",

      // Landing Page - Hero
      "landing.hero.badge": "Digital guest experience tool for vacation rentals",
      "landing.hero.title": "CheckinLynk:",
      "landing.hero.subtitle": "one link for all",
      "landing.hero.checkIn": "check-in",
      "landing.hero.and": "and house rules",
      "landing.hero.description": "Save hours per week on repetitive questions. Share one link with all your guest information. More professional, faster check-ins, better reviews.",
      "landing.hero.cta": "Start free",
      "landing.hero.consultation": "Schedule an online consultation",
      "landing.hero.stat1": "Less repeated questions",
      "landing.hero.stat2": "Faster check-in",
      "landing.hero.stat3": "Higher reviews",
      "landing.hero.cardTitle": "Sunny Apartment",
      "landing.hero.cardLocation": "Amsterdam Center",
      "landing.hero.cardStatus": "Guest checked in",
      "landing.hero.cardWifi": "WiFi Network",
      "landing.hero.cardKeyCode": "Key code",
      "landing.hero.cardTapReveal": "Tap to reveal",
      "landing.hero.cardLocalTips": "Local tips",
      "landing.hero.cardRecommendations": "recommendations",

      // Landing Page - Problem/Solution
      "landing.problem.title": "Stop answering the same questions",
      "landing.problem.subtitle": "From chaos to control: everything consistent in one place",
      "landing.problem.card1.title": "Less repeated questions",
      "landing.problem.card1.description": "\"What is the WiFi?\" \"Where do I park?\" \"How does the heating work?\" These questions are a thing of the past. Guests find everything themselves.",
      "landing.problem.card2.title": "Everything consistent in one place",
      "landing.problem.card2.description": "No scattered info in messages, emails or PDFs. One link per property with always up-to-date information. Update once, guests see it immediately.",
      "landing.problem.card3.title": "Professional guest experience",
      "landing.problem.card3.description": "Guests appreciate clear communication. Hosts get better reviews. Cleaning team knows live when guests have left.",
      "landing.problem.cta": "View pricing",

      // Landing Page - Features
      "landing.features.badge": "Features",
      "landing.features.title": "Everything you need",
      "landing.features.subtitle": "From check-in to local tips: one platform for complete guest information",
      "landing.features.feature1.title": "Unique link per property",
      "landing.features.feature1.description": "Each vacation rental gets its own personalized CheckinLynk",
      "landing.features.feature2.title": "Mobile-friendly guest page",
      "landing.features.feature2.description": "Perfectly readable on any smartphone, tablet or desktop",
      "landing.features.feature3.title": "Check-in & check-out instructions",
      "landing.features.feature3.description": "Clear arrival and departure information always available",
      "landing.features.feature4.title": "Tap-to-reveal codes",
      "landing.features.feature4.description": "Key and alarm codes safely hidden until guests need them",
      "landing.features.feature5.title": "Local recommendations",
      "landing.features.feature5.description": "Restaurants, bars, supermarkets and attractions per property",
      "landing.features.feature6.title": "Smart house rules",
      "landing.features.feature6.description": "Show only relevant rules per property, hide what doesn't apply",
      "landing.features.feature7.title": "Real-time check-in system",
      "landing.features.feature7.description": "Guests check in digitally, hosts see live status of every property",
      "landing.features.feature8.title": "Multilingual interface",
      "landing.features.feature8.description": "Dutch, English, French, German – guests choose their language",

      // Landing Page - How it Works
      "landing.howItWorks.title": "How does it work?",
      "landing.howItWorks.subtitle": "Live with your CheckinLynk in 3 simple steps",
      "landing.howItWorks.step1.title": "Create your property",
      "landing.howItWorks.step1.description": "Add your vacation home or apartment in the dashboard",
      "landing.howItWorks.step2.title": "Fill in info once",
      "landing.howItWorks.step2.description": "WiFi, parking, house rules, local tips – everything in one place",
      "landing.howItWorks.step3.title": "Share your CheckinLynk",
      "landing.howItWorks.step3.description": "Send the unique link to your guests and enjoy more peace",
      "landing.howItWorks.cta": "Start free in 2 minutes",

      // Landing Page - Pricing
      "landing.pricing.badge": "Pricing",
      "landing.pricing.title": "Transparent pricing",
      "landing.pricing.subtitle": "No hidden costs. Cancel anytime.",
      "landing.pricing.monthly": "Monthly",
      "landing.pricing.yearly": "Yearly",
      "landing.pricing.yearlyDiscount": "-17%",
      "landing.pricing.perMonth": "per month",
      "landing.pricing.yearlyPrice": "annually",
      "landing.pricing.custom": "Custom",
      "landing.pricing.mostPopular": "Most popular",
      "landing.pricing.starter.name": "Starter",
      "landing.pricing.starter.description": "Perfect for 1 property",
      "landing.pricing.starter.feature1": "1 property",
      "landing.pricing.starter.feature2": "Unlimited guest links",
      "landing.pricing.starter.feature3": "Check-in/check-out system",
      "landing.pricing.starter.feature4": "Basic local recommendations",
      "landing.pricing.starter.feature5": "Email support",
      "landing.pricing.starter.cta": "Choose Starter",
      "landing.pricing.pro.name": "Pro",
      "landing.pricing.pro.description": "For professional rental hosts",
      "landing.pricing.pro.feature1": "Up to 5 properties",
      "landing.pricing.pro.feature2": "Unlimited guest links",
      "landing.pricing.pro.feature3": "Check-in/check-out system",
      "landing.pricing.pro.feature4": "Extended content blocks",
      "landing.pricing.pro.feature5": "Host profile customization",
      "landing.pricing.pro.feature6": "Priority support",
      "landing.pricing.pro.feature7": "Advanced analytics (coming soon)",
      "landing.pricing.pro.cta": "Choose Pro",
      "landing.pricing.business.name": "Business",
      "landing.pricing.business.description": "For property managers",
      "landing.pricing.business.feature1": "Unlimited properties",
      "landing.pricing.business.feature2": "White-label option",
      "landing.pricing.business.feature3": "API access",
      "landing.pricing.business.feature4": "Team accounts",
      "landing.pricing.business.feature5": "Dedicated support",
      "landing.pricing.business.feature6": "Custom integrations",
      "landing.pricing.business.cta": "Contact us",
      "landing.pricing.securePayment": "Secure payment via Polar",
      "landing.pricing.freeTrial": "7 days free trial",

      // Landing Page - Consultation
      "landing.consultation.title": "Schedule an online consultation and get your setup live",
      "landing.consultation.subtitle": "Want to see CheckinLynk in action? Schedule a short 15-20 minute online consultation. We'll show you a live demo, answer all your questions, give pricing advice and help you get started right away.",
      "landing.consultation.cardTitle": "Online Consultation – CheckinLynk",
      "landing.consultation.cardDuration": "15-20 minutes • Via Google Meet or Zoom",
      "landing.consultation.whatYouGet": "What you get:",
      "landing.consultation.benefit1": "Live demo of the platform",
      "landing.consultation.benefit2": "Custom pricing advice",
      "landing.consultation.benefit3": "Setup tips and best practices",
      "landing.consultation.benefit4": "Answers to all your questions",
      "landing.consultation.benefit5": "Help setting up your first property",
      "landing.consultation.cta": "Choose date & time",
      "landing.consultation.noObligations": "No obligations. Just getting to know each other and see if CheckinLynk fits you.",
      "landing.consultation.selectDate": "Select a date",
      "landing.consultation.availableTimes": "Available times (CET)",

      // Landing Page - Testimonials
      "landing.testimonials.badge": "Reviews",
      "landing.testimonials.title": "What do other hosts say?",
      "landing.testimonials.testimonial1.quote": "Since we use CheckinLynk I get 80% fewer questions about WiFi and parking. Guests find everything themselves.",
      "landing.testimonials.testimonial1.author": "Marieke V.",
      "landing.testimonials.testimonial1.role": "Host, 4 apartments Amsterdam",
      "landing.testimonials.testimonial2.quote": "Check-in now goes lightning fast. Guests scan the link, read everything and are ready. Super professional.",
      "landing.testimonials.testimonial2.author": "Thomas B.",
      "landing.testimonials.testimonial2.role": "Property Manager, 12 vacation homes",
      "landing.testimonials.testimonial3.quote": "My reviews have improved since I use CheckinLynk. Guests greatly appreciate the clear information.",
      "landing.testimonials.testimonial3.author": "Sophie L.",
      "landing.testimonials.testimonial3.role": "Superhost, 2 chalets Ardennes",

      // Landing Page - Early Access
      "landing.earlyAccess.badge": "Early Access",
      "landing.earlyAccess.title": "Be one of the first CheckinLynk hosts",
      "landing.earlyAccess.subtitle": "Sign up for the test program and help us improve CheckinLynk. As an early adopter you get 3 months free and priority support during your onboarding.",
      "landing.earlyAccess.card1.title": "3 months free",
      "landing.earlyAccess.card1.description": "Test CheckinLynk risk-free and only pay after the trial period.",
      "landing.earlyAccess.card2.title": "Fast onboarding",
      "landing.earlyAccess.card2.description": "We'll set up your first property live together in less than 30 minutes.",
      "landing.earlyAccess.card3.title": "Influence the roadmap",
      "landing.earlyAccess.card3.description": "Your feedback determines which features we build next.",
      "landing.earlyAccess.formTitle": "Sign up for the test program",
      "landing.earlyAccess.formDescription": "Fill in your details and we'll contact you within 24 hours",
      "landing.earlyAccess.name": "Name",
      "landing.earlyAccess.namePlaceholder": "Your full name",
      "landing.earlyAccess.email": "Email",
      "landing.earlyAccess.emailPlaceholder": "you@email.com",
      "landing.earlyAccess.accommodations": "Number of properties",
      "landing.earlyAccess.accommodationsPlaceholder": "Select number",
      "landing.earlyAccess.accommodations1": "1-3 properties",
      "landing.earlyAccess.accommodations2": "4-10 properties",
      "landing.earlyAccess.accommodations3": "11+ properties",
      "landing.earlyAccess.city": "City/Region",
      "landing.earlyAccess.cityPlaceholder": "For example: Amsterdam",
      "landing.earlyAccess.cta": "Sign up (3 months free)",
      "landing.earlyAccess.disclaimer": "Limited spots. No obligations. Cancel anytime.",
      "landing.earlyAccess.viewFeatures": "See how it works",

      // Landing Page - FAQ
      "landing.faq.title": "Frequently asked questions",
      "landing.faq.subtitle": "Everything you need to know about CheckinLynk",
      "landing.faq.q1": "What is CheckinLynk exactly?",
      "landing.faq.a1": "CheckinLynk is a digital guest experience tool for vacation rentals. You create one link per property where guests find all information: check-in instructions, WiFi, parking, house rules, local tips and more. No thousand messages anymore – everything professional in one place.",
      "landing.faq.q2": "Does it work with multiple properties?",
      "landing.faq.a2": "Absolutely! Each vacation rental gets its own unique CheckinLynk. You manage everything from one dashboard and can set different information per property.",
      "landing.faq.q3": "Can I hide or show house rules?",
      "landing.faq.a3": "Yes, you only activate the house rules that are relevant to your property. No dogs allowed? Then you hide that rule. So you only show what applies.",
      "landing.faq.q4": "Is there a free trial?",
      "landing.faq.a4": "Yes! You can try it for 14 days free without credit card. Experience for yourself how much time and questions it saves.",
      "landing.faq.q5": "How does payment via Polar work?",
      "landing.faq.a5": "We use Polar for secure, fast payments. You pay monthly or annually (with discount) via credit card or SEPA. You automatically receive invoices by email.",
      "landing.faq.q6": "Can I cancel anytime?",
      "landing.faq.a6": "Yes, you can cancel monthly without hassle. No long contracts or hidden costs. You only pay for the months you use it.",
      "landing.faq.q7": "Does it support multiple languages?",
      "landing.faq.a7": "Yes! Guests can use the interface in Dutch, English, French and German. The content you enter stays in your language, but menus and buttons adapt.",
      "landing.faq.q8": "Do I need to be technical to use it?",
      "landing.faq.a8": "Not at all. CheckinLynk is as simple as filling out a form. Create your property, fill in the fields, and share the link. Done in 10 minutes.",

      // Landing Page - Final CTA
      "landing.finalCta.title": "Less messages. More peace.",
      "landing.finalCta.subtitle": "Better guest experience.",
      "landing.finalCta.description": "Join hundreds of hosts who professionally share their guest information with CheckinLynk",
      "landing.finalCta.cta": "Start free",
      "landing.finalCta.login": "Log in",
      "landing.finalCta.securePayment": "Secure payment via Polar",
      "landing.finalCta.gdpr": "GDPR-ready",
      "landing.finalCta.support": "Support within 24h",

      // Landing Page - Footer
      "landing.footer.tagline": "One link for all guest information. More professional. Simpler. Better.",
      "landing.footer.product": "Product",
      "landing.footer.company": "Company",
      "landing.footer.about": "About us",
      "landing.footer.contact": "Contact",
      "landing.footer.privacy": "Privacy",
      "landing.footer.terms": "Terms",
      "landing.footer.account": "Account",
      "landing.footer.support": "Support",
      "landing.footer.copyright": "© 2025 CheckinLynk. All rights reserved."
    }
  },
  es: {
    translation: {
      // Common
      "common.loading": "Cargando...",
      "common.save": "Guardar",
      "common.cancel": "Cancelar",
      "common.delete": "Eliminar",
      "common.edit": "Editar",
      "common.create": "Crear",
      "common.back": "Atrás",
      "common.next": "Siguiente",
      "common.submit": "Enviar",
      "common.search": "Buscar",
      
      // Auth
      "auth.welcomeBack": "Bienvenido de nuevo",
      "auth.signIn": "Iniciar Sesión",
      "auth.signInToManage": "Inicia sesión para gestionar tus propiedades",
      "auth.email": "Correo Electrónico",
      "auth.password": "Contraseña",
      "auth.continueWith": "O continuar con",
      "auth.orContinueWith": "O continuar con",
      "auth.noAccount": "¿No tienes cuenta?",
      "auth.dontHaveAccount": "¿No tienes cuenta?",
      "auth.signUp": "Registrarse",
      "auth.signOut": "Cerrar Sesión",
      "auth.loading": "Cargando...",
      
      // Dashboard
      "dashboard.title": "Mis Propiedades",
      "dashboard.addProperty": "Añadir Propiedad",
      "dashboard.emptyState": "Aún no hay propiedades",
      "dashboard.emptyStateDesc": "Comienza creando tu primera propiedad de alquiler vacacional",
      "dashboard.activeGuests": "Huéspedes Activos",
      "dashboard.totalViews": "Vistas Totales",
      "dashboard.avgRating": "Calificación Promedio",
      
      // Sidebar
      "sidebar.dashboard": "Panel de Control",
      "sidebar.myProperties": "Mis Propiedades",
      "sidebar.checkinOverview": "Resumen de Check-in",
      "sidebar.templates": "Plantillas",
      "sidebar.guestManagement": "Gestión de Huéspedes",
      
      // Property Form
      "property.createNew": "Crear Nueva Propiedad",
      "property.propertyName": "Nombre de la Propiedad",
      "property.namePlaceholder": "Casa Paraíso en la Playa",
      "property.address": "Dirección",
      "property.addressPlaceholder": "Calle del Mar 123, Miami, FL",
      "property.description": "Descripción",
      "property.descriptionPlaceholder": "Describe tu propiedad...",
      "property.guestCapacity": "Capacidad de Huéspedes",
      "property.bedrooms": "Dormitorios",
      "property.bathrooms": "Baños",
      "property.propertyImage": "Imagen de la Propiedad",
      "property.uploadImage": "Subir Imagen",
      "property.createProperty": "Crear Propiedad",
      
      // Property Detail
      "property.guestLink": "Enlace para Huéspedes",
      "property.copyLink": "Copiar Enlace",
      "property.linkCopied": "¡Enlace copiado!",
      "property.manageContent": "Gestionar Contenido",
      "property.addNewBlock": "Añadir Nuevo Bloque",
      
      // Content Blocks
      "blocks.checkIn": "Instrucciones de Check-In",
      "blocks.wifi": "Información WiFi",
      "blocks.parking": "Instrucciones de Estacionamiento",
      "blocks.houseRules": "Reglas de la Casa",
      "blocks.emergency": "Contactos de Emergencia",
      "blocks.localTips": "Consejos Locales",
      
      // Guest Portal
      "guest.registration": "Registro de Huésped",
      "guest.welcome": "Bienvenido a",
      "guest.pleaseRegister": "Por favor completa tu registro para acceder a toda la información de la propiedad",
      "guest.firstName": "Nombre",
      "guest.lastName": "Apellido",
      "guest.phoneNumber": "Número de Teléfono",
      "guest.checkInDate": "Fecha de Entrada",
      "guest.checkOutDate": "Fecha de Salida",
      "guest.numberOfGuests": "Número de Huéspedes",
      "guest.continueToProperty": "Continuar a Info de Propiedad",
      "guest.propertyInfo": "Información de la Propiedad",
      "guest.essentialInfo": "Información Esencial",
      
      // Guest Registration
      "guestRegistration.title": "Registro de Huésped",
      "guestRegistration.description": "Por favor completa tu registro para acceder a la información de la propiedad",
      "guestRegistration.firstName": "Nombre",
      "guestRegistration.lastName": "Apellido",
      "guestRegistration.email": "Correo Electrónico",
      "guestRegistration.phoneNumber": "Número de Teléfono",
      "guestRegistration.checkInDate": "Fecha de Entrada",
      "guestRegistration.checkOutDate": "Fecha de Salida",
      "guestRegistration.numberOfGuests": "Número de Huéspedes",
      "guestRegistration.completeRegistration": "Completar Registro",
      "guestRegistration.infoSecure": "Tu información es segura y solo será compartida con el anfitrión de la propiedad.",
      
      // Language
      "language.select": "Idioma",
      "language.english": "Inglés",
      "language.spanish": "Español",
      "language.french": "Francés",
      "language.dutch": "Holandés",
      "language.german": "Alemán",
      "language.italian": "Italiano",
      "language.portuguese": "Portugués",
      "language.turkish": "Turco",
      
      // Language Switcher
      "languageSwitcher.more": "Más",
      
      // Language Modal
      "languageModal.title": "Elige un idioma y región",
      "languageModal.searchPlaceholder": "Buscar idiomas...",
      "languageModal.noResults": "No se encontraron idiomas",
      "languageModal.footer": "El contenido se adaptará a tu idioma seleccionado donde esté disponible",
      
      // Tagline
      "tagline": "Un enlace. Toda la información. Comparte una vez y relájate."
    }
  },
  fr: {
    translation: {
      // Common
      "common.loading": "Chargement...",
      "common.save": "Enregistrer",
      "common.cancel": "Annuler",
      "common.delete": "Supprimer",
      "common.edit": "Modifier",
      "common.create": "Créer",
      "common.back": "Retour",
      "common.next": "Suivant",
      "common.submit": "Soumettre",
      "common.search": "Rechercher",
      
      // Auth
      "auth.welcomeBack": "Bon retour",
      "auth.signIn": "Se Connecter",
      "auth.signInToManage": "Connectez-vous pour gérer vos propriétés",
      "auth.email": "E-mail",
      "auth.password": "Mot de passe",
      "auth.continueWith": "Ou continuer avec",
      "auth.orContinueWith": "Ou continuer avec",
      "auth.noAccount": "Pas de compte?",
      "auth.dontHaveAccount": "Pas de compte?",
      "auth.signUp": "S'inscrire",
      "auth.signOut": "Se Déconnecter",
      "auth.loading": "Chargement...",
      "auth.forgotPassword": "Mot de passe oublié?",
      "auth.alreadyHaveAccount": "Vous avez déjà un compte?",
      "auth.createAccount": "Créer un Compte",
      "auth.createYourAccount": "Créez votre compte",
      "auth.signUpToStart": "Inscrivez-vous pour gérer vos propriétés",
      "auth.firstName": "Prénom",
      "auth.lastName": "Nom",
      "auth.phoneNumber": "Numéro de Téléphone",
      "auth.confirmPassword": "Confirmer le Mot de passe",
      "auth.passwordStrength.weak": "Mot de passe faible",
      "auth.passwordStrength.medium": "Mot de passe moyen",
      "auth.passwordStrength.strong": "Mot de passe fort",
      "auth.passwordRequirements": "Min. 8 caractères, 1 majuscule, 1 chiffre",
      "auth.passwordsMatch": "Les mots de passe correspondent",
      "auth.passwordsDontMatch": "Les mots de passe ne correspondent pas",
      "auth.validEmail": "E-mail valide",
      "auth.invalidEmail": "E-mail invalide",
      "auth.selectCountry": "Sélectionner le pays",
      
      // Dashboard
      "dashboard.title": "Mes Propriétés",
      "dashboard.addProperty": "Ajouter une Propriété",
      "dashboard.emptyState": "Aucune propriété pour le moment",
      "dashboard.emptyStateDesc": "Commencez en créant votre première propriété de location de vacances",
      "dashboard.activeGuests": "Invités Actifs",
      "dashboard.totalViews": "Vues Totales",
      "dashboard.avgRating": "Note Moyenne",
      
      // Sidebar
      "sidebar.dashboard": "Tableau de Bord",
      "sidebar.myProperties": "Mes Propriétés",
      "sidebar.checkinOverview": "Aperçu Check-in",
      "sidebar.templates": "Modèles",
      "sidebar.guestManagement": "Gestion des Invités",
      
      // Property Form
      "property.createNew": "Créer une Nouvelle Propriété",
      "property.propertyDetails": "Détails de la Propriété",
      "property.propertyName": "Nom de la Propriété",
      "property.propertyNameRequired": "Nom de la Propriété *",
      "property.namePlaceholder": "Maison Paradis sur la Plage",
      "property.streetName": "Nom de la Rue",
      "property.streetNameRequired": "Nom de la Rue *",
      "property.houseNumber": "Numéro de Maison",
      "property.houseNumberRequired": "Numéro de Maison *",
      "property.postalCode": "Code Postal",
      "property.postalCodeRequired": "Code Postal *",
      "property.country": "Pays",
      "property.countryRequired": "Pays *",
      "property.address": "Adresse",
      "property.addressPlaceholder": "123 Avenue de l'Océan, Miami, FL",
      "property.description": "Description",
      "property.descriptionPlaceholder": "Décrivez votre propriété...",
      "property.guestCapacity": "Capacité d'Invités",
      "property.bedrooms": "Chambres",
      "property.bathrooms": "Salles de Bain",
      "property.propertyImage": "Image de la Propriété",
      "property.uploadImage": "Télécharger une Image",
      "property.createProperty": "Créer la Propriété",
      "property.creating": "Création en cours...",
      "property.cancel": "Annuler",
      
      // Property Detail
      "property.guestLink": "Lien Invité",
      "property.copyLink": "Copier le Lien",
      "property.linkCopied": "Lien copié!",
      "property.manageContent": "Gérer le Contenu",
      "property.addNewBlock": "Ajouter un Nouveau Bloc",
      
      // Content Blocks
      "blocks.checkIn": "Instructions d'Arrivée",
      "blocks.wifi": "Informations WiFi",
      "blocks.parking": "Instructions de Stationnement",
      "blocks.houseRules": "Règles de la Maison",
      "blocks.emergency": "Contacts d'Urgence",
      "blocks.localTips": "Conseils Locaux",
      
      // Guest Portal
      "guest.registration": "Inscription Invité",
      "guest.welcome": "Bienvenue à",
      "guest.pleaseRegister": "Veuillez compléter votre inscription pour accéder à toutes les informations de la propriété",
      "guest.firstName": "Prénom",
      "guest.lastName": "Nom",
      "guest.phoneNumber": "Numéro de Téléphone",
      "guest.checkInDate": "Date d'Arrivée",
      "guest.checkOutDate": "Date de Départ",
      "guest.numberOfGuests": "Nombre d'Invités",
      "guest.continueToProperty": "Continuer vers les Infos Propriété",
      "guest.propertyInfo": "Informations sur la Propriété",
      "guest.essentialInfo": "Informations Essentielles",
      
      // Guest Registration
      "guestRegistration.title": "Inscription Invité",
      "guestRegistration.description": "Veuillez compléter votre inscription pour accéder à l'information de la propriété",
      "guestRegistration.firstName": "Prénom",
      "guestRegistration.lastName": "Nom",
      "guestRegistration.email": "E-mail",
      "guestRegistration.phoneNumber": "Numéro de Téléphone",
      "guestRegistration.checkInDate": "Date d'Arrivée",
      "guestRegistration.checkOutDate": "Date de Départ",
      "guestRegistration.numberOfGuests": "Nombre d'Invités",
      "guestRegistration.completeRegistration": "Compléter l'Inscription",
      "guestRegistration.infoSecure": "Vos informations sont sécurisées et ne seront partagées qu'avec l'hôte de la propriété.",
      
      // Language
      "language.select": "Langue",
      "language.english": "Anglais",
      "language.spanish": "Espagnol",
      "language.french": "Français",
      "language.dutch": "Néerlandais",
      "language.german": "Allemand",
      "language.italian": "Italien",
      "language.portuguese": "Portugais",
      "language.turkish": "Turc",
      
      // Language Switcher
      "languageSwitcher.more": "Plus",
      
      // Language Modal
      "languageModal.title": "Choisissez un langage et une région",
      "languageModal.searchPlaceholder": "Recherchez des langages...",
      "languageModal.noResults": "Aucun langage trouvé",
      "languageModal.footer": "Le contenu s'adaptera à votre langue sélectionnée si disponible",
      
      // Tagline
      "tagline": "Un lien. Toutes les informations. Partagez une fois et détendez-vous.",

      // Landing Page - Navigation
      "landing.nav.features": "Fonctionnalités",
      "landing.nav.pricing": "Tarifs",
      "landing.nav.demo": "Démo/Consultation",
      "landing.nav.faq": "FAQ",
      "landing.nav.login": "Se connecter",
      "landing.nav.register": "S'inscrire",

      // Landing Page - Hero
      "landing.hero.badge": "Outil d'expérience client numérique pour locations de vacances",
      "landing.hero.title": "CheckinLynk:",
      "landing.hero.subtitle": "un lien pour tout",
      "landing.hero.checkIn": "check-in",
      "landing.hero.and": "et règles de la maison",
      "landing.hero.description": "Économisez des heures par semaine sur les questions répétitives. Partagez un lien avec toutes vos informations clients. Plus professionnel, check-ins plus rapides, meilleures évaluations.",
      "landing.hero.cta": "Commencer gratuitement",
      "landing.hero.consultation": "Planifier une consultation en ligne",
      "landing.hero.stat1": "Moins de questions répétées",
      "landing.hero.stat2": "Check-in plus rapide",
      "landing.hero.stat3": "Meilleures évaluations"
    }
  },
  nl: {
    translation: {
      // Common
      "common.loading": "Laden...",
      "common.save": "Opslaan",
      "common.cancel": "Annuleren",
      "common.delete": "Verwijderen",
      "common.edit": "Bewerken",
      "common.create": "Aanmaken",
      "common.back": "Terug",
      "common.next": "Volgende",
      "common.submit": "Verzenden",
      "common.search": "Zoeken",
      
      // Auth
      "auth.welcomeBack": "Welkom terug",
      "auth.signIn": "Inloggen",
      "auth.signInToManage": "Log in om je accommodaties te beheren",
      "auth.email": "E-mail",
      "auth.password": "Wachtwoord",
      "auth.continueWith": "Of ga verder met",
      "auth.orContinueWith": "Of ga verder met",
      "auth.noAccount": "Nog geen account?",
      "auth.dontHaveAccount": "Nog geen account?",
      "auth.signUp": "Registreren",
      "auth.signOut": "Uitloggen",
      "auth.loading": "Laden...",
      "auth.forgotPassword": "Wachtwoord vergeten?",
      "auth.alreadyHaveAccount": "Heb je al een account?",
      "auth.createAccount": "Account Aanmaken",
      "auth.createYourAccount": "Maak je account aan",
      "auth.signUpToStart": "Registreer om je accommodaties te beheren",
      "auth.firstName": "Voornaam",
      "auth.lastName": "Achternaam",
      "auth.phoneNumber": "Telefoonnummer",
      "auth.confirmPassword": "Bevestig Wachtwoord",
      "auth.passwordStrength.weak": "Zwak wachtwoord",
      "auth.passwordStrength.medium": "Gemiddeld wachtwoord",
      "auth.passwordStrength.strong": "Sterk wachtwoord",
      "auth.passwordRequirements": "Min. 8 tekens, 1 hoofdletter, 1 cijfer",
      "auth.passwordsMatch": "Wachtwoorden komen overeen",
      "auth.passwordsDontMatch": "Wachtwoorden komen niet overeen",
      "auth.validEmail": "Geldig e-mailadres",
      "auth.invalidEmail": "Ongeldig e-mailadres",
      "auth.selectCountry": "Selecteer land",
      
      // Dashboard
      "dashboard.title": "Mijn Accommodaties",
      "dashboard.addProperty": "Accommodatie Toevoegen",
      "dashboard.emptyState": "Nog geen accommodaties",
      "dashboard.emptyStateDesc": "Begin met het toevoegen van je eerste vakantieaccommodatie",
      
      // Sidebar
      "sidebar.dashboard": "Dashboard",
      "sidebar.myProperties": "Mijn Accommodaties",
      "sidebar.checkinOverview": "Check-in Overzicht",
      "sidebar.templates": "Sjablonen",
      "sidebar.guestManagement": "Gasten Beheer",
      "dashboard.activeGuests": "Actieve Gasten",
      "dashboard.totalViews": "Totaal Bekeken",
      "dashboard.avgRating": "Gem. Beoordeling",
      
      // Property Form
      "property.createNew": "Nieuwe Accommodatie Aanmaken",
      "property.propertyDetails": "Accommodatiegegevens",
      "property.propertyName": "Naam Accommodatie",
      "property.propertyNameRequired": "Naam Accommodatie *",
      "property.namePlaceholder": "Strandhuis Paradijs",
      "property.streetName": "Straatnaam",
      "property.streetNameRequired": "Straatnaam *",
      "property.houseNumber": "Huisnummer",
      "property.houseNumberRequired": "Huisnummer *",
      "property.postalCode": "Postcode",
      "property.postalCodeRequired": "Postcode *",
      "property.country": "Land",
      "property.countryRequired": "Land *",
      "property.address": "Adres",
      "property.addressPlaceholder": "Strandweg 123, Amsterdam",
      "property.description": "Beschrijving",
      "property.descriptionPlaceholder": "Beschrijf je accommodatie...",
      "property.guestCapacity": "Gast Capaciteit",
      "property.bedrooms": "Slaapkamers",
      "property.bathrooms": "Badkamers",
      "property.propertyImage": "Foto Accommodatie",
      "property.uploadImage": "Foto Uploaden",
      "property.createProperty": "Accommodatie Aanmaken",
      "property.creating": "Bezig met aanmaken...",
      "property.cancel": "Annuleren",
      
      // Property Detail
      "property.guestLink": "Gast Link",
      "property.copyLink": "Link Kopiëren",
      "property.linkCopied": "Link gekopieerd!",
      "property.manageContent": "Inhoud Beheren",
      "property.addNewBlock": "Nieuw Blok Toevoegen",
      
      // Content Blocks
      "blocks.checkIn": "Check-In Instructies",
      "blocks.wifi": "WiFi Informatie",
      "blocks.parking": "Parkeer Instructies",
      "blocks.houseRules": "Huisregels",
      "blocks.emergency": "Noodcontacten",
      "blocks.localTips": "Lokale Tips",
      
      // Guest Portal
      "guest.registration": "Gast Registratie",
      "guest.welcome": "Welkom bij",
      "guest.pleaseRegister": "Voltooi je registratie om toegang te krijgen tot alle accommodatie informatie",
      "guest.firstName": "Voornaam",
      "guest.lastName": "Achternaam",
      "guest.phoneNumber": "Telefoonnummer",
      "guest.checkInDate": "Check-In Datum",
      "guest.checkOutDate": "Check-Out Datum",
      "guest.numberOfGuests": "Aantal Gasten",
      "guest.continueToProperty": "Ga naar Accommodatie Info",
      "guest.propertyInfo": "Accommodatie Informatie",
      "guest.essentialInfo": "Essentiële Informatie",
      
      // Guest Registration
      "guestRegistration.title": "Gast Registratie",
      "guestRegistration.description": "Voltooi je registratie om toegang te krijgen tot accommodatie informatie",
      "guestRegistration.firstName": "Voornaam",
      "guestRegistration.lastName": "Achternaam",
      "guestRegistration.email": "E-mail",
      "guestRegistration.phoneNumber": "Telefoonnummer",
      "guestRegistration.checkInDate": "Check-In Datum",
      "guestRegistration.checkOutDate": "Check-Out Datum",
      "guestRegistration.numberOfGuests": "Aantal Gasten",
      "guestRegistration.completeRegistration": "Registratie Voltooien",
      "guestRegistration.infoSecure": "Je informatie is veilig en wordt alleen gedeeld met de verhuurder.",
      
      // Language
      "language.select": "Taal",
      "language.english": "Engels",
      "language.spanish": "Spaans",
      "language.french": "Frans",
      "language.dutch": "Nederlands",
      "language.german": "Duits",
      "language.italian": "Italiaans",
      "language.portuguese": "Portugees",
      "language.turkish": "Turks",
      
      // Language Switcher
      "languageSwitcher.more": "Meer",
      
      // Language Modal
      "languageModal.title": "Kies een taal en regio",
      "languageModal.searchPlaceholder": "Zoek talen...",
      "languageModal.noResults": "Geen talen gevonden",
      "languageModal.footer": "De inhoud zal zich aanpassen aan uw geselecteerde taal waar beschikbaar",
      
      // Tagline
      "tagline": "Eén link. Alle gast informatie. Deel eenmaal en ontspan.",

      // Landing Page - Navigation
      "landing.nav.features": "Features",
      "landing.nav.pricing": "Prijzen",
      "landing.nav.demo": "Demo/Consult",
      "landing.nav.faq": "FAQ",
      "landing.nav.login": "Inloggen",
      "landing.nav.register": "Registreer",

      // Landing Page - Hero
      "landing.hero.badge": "Digitale guest experience tool voor vakantieverhuur",
      "landing.hero.title": "CheckinLynk:",
      "landing.hero.subtitle": "één link voor alle",
      "landing.hero.checkIn": "check-in",
      "landing.hero.and": "en huisregels",
      "landing.hero.description": "Bespaar uren per week aan repetitieve vragen. Deel één link met al je gasteninformatie. Professioneler, sneller inchecken, betere reviews.",
      "landing.hero.cta": "Start gratis",
      "landing.hero.consultation": "Plan een online consult",
      "landing.hero.stat1": "Minder herhaalde vragen",
      "landing.hero.stat2": "Sneller inchecken",
      "landing.hero.stat3": "Hogere reviews"
    }
  },
  de: {
    translation: {
      // Common
      "common.loading": "Laden...",
      "common.save": "Speichern",
      "common.cancel": "Abbrechen",
      "common.delete": "Löschen",
      "common.edit": "Bearbeiten",
      "common.create": "Erstellen",
      "common.back": "Zurück",
      "common.next": "Weiter",
      "common.submit": "Senden",
      "common.search": "Suchen",
      
      // Auth
      "auth.welcomeBack": "Willkommen zurück",
      "auth.signIn": "Anmelden",
      "auth.signInToManage": "Melden Sie sich an, um Ihre Unterkünfte zu verwalten",
      "auth.email": "E-Mail",
      "auth.password": "Passwort",
      "auth.continueWith": "Oder weiter mit",
      "auth.orContinueWith": "Oder weiter mit",
      "auth.noAccount": "Noch kein Konto?",
      "auth.dontHaveAccount": "Noch kein Konto?",
      "auth.signUp": "Registrieren",
      "auth.signOut": "Abmelden",
      "auth.loading": "Laden...",
      
      // Dashboard
      "dashboard.title": "Meine Unterkünfte",
      "dashboard.addProperty": "Unterkunft Hinzufügen",
      "dashboard.emptyState": "Noch keine Unterkünfte",
      "dashboard.emptyStateDesc": "Beginnen Sie mit Ihrer ersten Ferienunterkunft",
      "dashboard.activeGuests": "Aktive Gäste",
      "dashboard.totalViews": "Gesamtansichten",
      "dashboard.avgRating": "Durchschn. Bewertung",
      
      // Property Form
      "property.createNew": "Neue Unterkunft Erstellen",
      "property.propertyName": "Name der Unterkunft",
      "property.namePlaceholder": "Strandhaus Paradies",
      "property.address": "Adresse",
      "property.addressPlaceholder": "Strandweg 123, Hamburg",
      "property.description": "Beschreibung",
      "property.descriptionPlaceholder": "Beschreiben Sie Ihre Unterkunft...",
      "property.guestCapacity": "Gästekapazität",
      "property.bedrooms": "Schlafzimmer",
      "property.bathrooms": "Badezimmer",
      "property.propertyImage": "Unterkunftsbild",
      "property.uploadImage": "Bild Hochladen",
      "property.createProperty": "Unterkunft Erstellen",
      
      // Property Detail
      "property.guestLink": "Gast Link",
      "property.copyLink": "Link Kopieren",
      "property.linkCopied": "Link kopiert!",
      "property.manageContent": "Inhalt Verwalten",
      "property.addNewBlock": "Neuen Block Hinzufügen",
      
      // Content Blocks
      "blocks.checkIn": "Check-In Anweisungen",
      "blocks.wifi": "WiFi Informationen",
      "blocks.parking": "Parkanweisungen",
      "blocks.houseRules": "Hausregeln",
      "blocks.emergency": "Notfallkontakte",
      "blocks.localTips": "Lokale Tipps",
      
      // Guest Portal
      "guest.registration": "Gast Registrierung",
      "guest.welcome": "Willkommen bei",
      "guest.pleaseRegister": "Bitte vervollständigen Sie Ihre Registrierung, um auf alle Unterkunftsinformationen zuzugreifen",
      "guest.firstName": "Vorname",
      "guest.lastName": "Nachname",
      "guest.phoneNumber": "Telefonnummer",
      "guest.checkInDate": "Check-In Datum",
      "guest.checkOutDate": "Check-Out Datum",
      "guest.numberOfGuests": "Anzahl der Gäste",
      "guest.continueToProperty": "Weiter zu Unterkunftsinfo",
      "guest.propertyInfo": "Unterkunftsinformationen",
      "guest.essentialInfo": "Wichtige Informationen",
      
      // Guest Registration
      "guestRegistration.title": "Gast Registrierung",
      "guestRegistration.description": "Bitte vervollständigen Sie Ihre Registrierung, um auf Unterkunftsinformationen zuzugreifen",
      "guestRegistration.firstName": "Vorname",
      "guestRegistration.lastName": "Nachname",
      "guestRegistration.email": "E-Mail",
      "guestRegistration.phoneNumber": "Telefonnummer",
      "guestRegistration.checkInDate": "Check-In Datum",
      "guestRegistration.checkOutDate": "Check-Out Datum",
      "guestRegistration.numberOfGuests": "Anzahl der Gäste",
      "guestRegistration.completeRegistration": "Registrierung Abschließen",
      "guestRegistration.infoSecure": "Ihre Informationen sind sicher und werden nur mit dem Gastgeber geteilt.",
      
      // Language
      "language.select": "Sprache",
      "language.english": "Englisch",
      "language.spanish": "Spanisch",
      "language.french": "Französisch",
      "language.dutch": "Niederländisch",
      "language.german": "Deutsch",
      "language.italian": "Italienisch",
      "language.portuguese": "Portugiesisch",
      "language.turkish": "Türkisch",
      
      // Language Switcher
      "languageSwitcher.more": "Mehr",
      
      // Language Modal
      "languageModal.title": "Wählen Sie eine Sprache und Region",
      "languageModal.searchPlaceholder": "Sprachen suchen...",
      "languageModal.noResults": "Keine Sprachen gefunden",
      "languageModal.footer": "Der Inhalt wird sich an Ihre ausgewählte Sprache anpassen, wo verfügbar",
      
      // Tagline
      "tagline": "Ein Link. Alle Gästeinformationen. Einmal teilen und entspannen."
    }
  },
  it: {
    translation: {
      // Common
      "common.loading": "Caricamento...",
      "common.save": "Salva",
      "common.cancel": "Annulla",
      "common.delete": "Elimina",
      "common.edit": "Modifica",
      "common.create": "Crea",
      "common.back": "Indietro",
      "common.next": "Avanti",
      "common.submit": "Invia",
      "common.search": "Cerca",
      
      // Auth
      "auth.welcomeBack": "Bentornato",
      "auth.signIn": "Accedi",
      "auth.signInToManage": "Accedi per gestire le tue proprietà",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.continueWith": "Oppure continua con",
      "auth.orContinueWith": "Oppure continua con",
      "auth.noAccount": "Non hai un account?",
      "auth.dontHaveAccount": "Non hai un account?",
      "auth.signUp": "Registrati",
      "auth.signOut": "Esci",
      "auth.loading": "Caricamento...",
      
      // Dashboard
      "dashboard.title": "Le Mie Proprietà",
      "dashboard.addProperty": "Aggiungi Proprietà",
      "dashboard.emptyState": "Nessuna proprietà ancora",
      "dashboard.emptyStateDesc": "Inizia creando la tua prima proprietà in affitto per vacanze",
      "dashboard.activeGuests": "Ospiti Attivi",
      "dashboard.totalViews": "Visualizzazioni Totali",
      "dashboard.avgRating": "Valutazione Media",
      
      // Property Form
      "property.createNew": "Crea Nuova Proprietà",
      "property.propertyName": "Nome Proprietà",
      "property.namePlaceholder": "Casa al Mare Paradiso",
      "property.address": "Indirizzo",
      "property.addressPlaceholder": "Via del Mare 123, Roma",
      "property.description": "Descrizione",
      "property.descriptionPlaceholder": "Descrivi la tua proprietà...",
      "property.guestCapacity": "Capacità Ospiti",
      "property.bedrooms": "Camere da Letto",
      "property.bathrooms": "Bagni",
      "property.propertyImage": "Immagine Proprietà",
      "property.uploadImage": "Carica Immagine",
      "property.createProperty": "Crea Proprietà",
      
      // Property Detail
      "property.guestLink": "Link Ospite",
      "property.copyLink": "Copia Link",
      "property.linkCopied": "Link copiato!",
      "property.manageContent": "Gestisci Contenuto",
      "property.addNewBlock": "Aggiungi Nuovo Blocco",
      
      // Content Blocks
      "blocks.checkIn": "Istruzioni Check-In",
      "blocks.wifi": "Informazioni WiFi",
      "blocks.parking": "Istruzioni Parcheggio",
      "blocks.houseRules": "Regole della Casa",
      "blocks.emergency": "Contatti di Emergenza",
      "blocks.localTips": "Consigli Locali",
      
      // Guest Portal
      "guest.registration": "Registrazione Ospite",
      "guest.welcome": "Benvenuto a",
      "guest.pleaseRegister": "Completa la registrazione per accedere a tutte le informazioni della proprietà",
      "guest.firstName": "Nome",
      "guest.lastName": "Cognome",
      "guest.phoneNumber": "Numero di Telefono",
      "guest.checkInDate": "Data Check-In",
      "guest.checkOutDate": "Data Check-Out",
      "guest.numberOfGuests": "Numero di Ospiti",
      "guest.continueToProperty": "Continua alle Info Proprietà",
      "guest.propertyInfo": "Informazioni Proprietà",
      "guest.essentialInfo": "Informazioni Essenziali",
      
      // Guest Registration
      "guestRegistration.title": "Registrazione Ospite",
      "guestRegistration.description": "Completa la registrazione per accedere alle informazioni della proprietà",
      "guestRegistration.firstName": "Nome",
      "guestRegistration.lastName": "Cognome",
      "guestRegistration.email": "Email",
      "guestRegistration.phoneNumber": "Numero di Telefono",
      "guestRegistration.checkInDate": "Data Check-In",
      "guestRegistration.checkOutDate": "Data Check-Out",
      "guestRegistration.numberOfGuests": "Numero di Ospiti",
      "guestRegistration.completeRegistration": "Completa Registrazione",
      "guestRegistration.infoSecure": "Le tue informazioni sono sicure e saranno condivise solo con il proprietario.",
      
      // Language
      "language.select": "Lingua",
      "language.english": "Inglese",
      "language.spanish": "Spagnolo",
      "language.french": "Francese",
      "language.dutch": "Olandese",
      "language.german": "Tedesco",
      "language.italian": "Italiano",
      "language.portuguese": "Portoghese",
      "language.turkish": "Turco",
      
      // Language Switcher
      "languageSwitcher.more": "Più",
      
      // Language Modal
      "languageModal.title": "Scegli una lingua e regione",
      "languageModal.searchPlaceholder": "Cerca lingue...",
      "languageModal.noResults": "Nessuna lingua trovata",
      "languageModal.footer": "Il contenuto si adatterà alla tua lingua selezionata dove disponibile",
      
      // Tagline
      "tagline": "Un link. Tutte le informazioni. Condividi una volta e rilassati."
    }
  },
  pt: {
    translation: {
      // Common
      "common.loading": "Carregando...",
      "common.save": "Salvar",
      "common.cancel": "Cancelar",
      "common.delete": "Excluir",
      "common.edit": "Editar",
      "common.create": "Criar",
      "common.back": "Voltar",
      "common.next": "Próximo",
      "common.submit": "Enviar",
      "common.search": "Pesquisar",
      
      // Auth
      "auth.welcomeBack": "Bem-vindo de volta",
      "auth.signIn": "Entrar",
      "auth.signInToManage": "Entre para gerenciar suas propriedades",
      "auth.email": "E-mail",
      "auth.password": "Senha",
      "auth.continueWith": "Ou continue com",
      "auth.orContinueWith": "Ou continue com",
      "auth.noAccount": "Não tem conta?",
      "auth.dontHaveAccount": "Não tem conta?",
      "auth.signUp": "Registrar",
      "auth.signOut": "Sair",
      "auth.loading": "Carregando...",
      
      // Dashboard
      "dashboard.title": "Minhas Propriedades",
      "dashboard.addProperty": "Adicionar Propriedade",
      "dashboard.emptyState": "Nenhuma propriedade ainda",
      "dashboard.emptyStateDesc": "Comece criando sua primeira propriedade de aluguel de temporada",
      "dashboard.activeGuests": "Hóspedes Ativos",
      "dashboard.totalViews": "Visualizações Totais",
      "dashboard.avgRating": "Avaliação Média",
      
      // Property Form
      "property.createNew": "Criar Nova Propriedade",
      "property.propertyName": "Nome da Propriedade",
      "property.namePlaceholder": "Casa de Praia Paraíso",
      "property.address": "Endereço",
      "property.addressPlaceholder": "Rua da Praia 123, Rio de Janeiro",
      "property.description": "Descrição",
      "property.descriptionPlaceholder": "Descreva sua propriedade...",
      "property.guestCapacity": "Capacidade de Hóspedes",
      "property.bedrooms": "Quartos",
      "property.bathrooms": "Banheiros",
      "property.propertyImage": "Imagem da Propriedade",
      "property.uploadImage": "Carregar Imagem",
      "property.createProperty": "Criar Propriedade",
      
      // Property Detail
      "property.guestLink": "Link do Hóspede",
      "property.copyLink": "Copiar Link",
      "property.linkCopied": "Link copiado!",
      "property.manageContent": "Gerenciar Conteúdo",
      "property.addNewBlock": "Adicionar Novo Bloco",
      
      // Content Blocks
      "blocks.checkIn": "Instruções de Check-In",
      "blocks.wifi": "Informações WiFi",
      "blocks.parking": "Instruções de Estacionamento",
      "blocks.houseRules": "Regras da Casa",
      "blocks.emergency": "Contatos de Emergência",
      "blocks.localTips": "Dicas Locais",
      
      // Guest Portal
      "guest.registration": "Registro de Hóspede",
      "guest.welcome": "Bem-vindo ao",
      "guest.pleaseRegister": "Por favor, complete seu registro para acessar todas as informações da propriedade",
      "guest.firstName": "Nome",
      "guest.lastName": "Sobrenome",
      "guest.phoneNumber": "Número de Telefone",
      "guest.checkInDate": "Data de Check-In",
      "guest.checkOutDate": "Data de Check-Out",
      "guest.numberOfGuests": "Número de Hóspedes",
      "guest.continueToProperty": "Continuar para Info da Propriedade",
      "guest.propertyInfo": "Informações da Propriedade",
      "guest.essentialInfo": "Informações Essenciais",
      
      // Guest Registration
      "guestRegistration.title": "Registro de Hóspede",
      "guestRegistration.description": "Por favor, complete seu registro para acessar informações da propriedade",
      "guestRegistration.firstName": "Nome",
      "guestRegistration.lastName": "Sobrenome",
      "guestRegistration.email": "E-mail",
      "guestRegistration.phoneNumber": "Número de Telefone",
      "guestRegistration.checkInDate": "Data de Check-In",
      "guestRegistration.checkOutDate": "Data de Check-Out",
      "guestRegistration.numberOfGuests": "Número de Hóspedes",
      "guestRegistration.completeRegistration": "Completar Registro",
      "guestRegistration.infoSecure": "Suas informações são seguras e serão compartilhadas apenas com o anfitrião.",
      
      // Language
      "language.select": "Idioma",
      "language.english": "Inglês",
      "language.spanish": "Espanhol",
      "language.french": "Francês",
      "language.dutch": "Holandês",
      "language.german": "Alemão",
      "language.italian": "Italiano",
      "language.portuguese": "Português",
      "language.turkish": "Turco",
      
      // Language Switcher
      "languageSwitcher.more": "Mais",
      
      // Language Modal
      "languageModal.title": "Escolha um idioma e região",
      "languageModal.searchPlaceholder": "Pesquisar idiomas...",
      "languageModal.noResults": "Nenhum idioma encontrado",
      "languageModal.footer": "O conteúdo se adaptará ao seu idioma selecionado onde disponível",
      
      // Tagline
      "tagline": "Um link. Todas as informações. Compartilhe uma vez e relaxe."
    }
  },
  tr: {
    translation: {
      // Common
      "common.loading": "Yükleniyor...",
      "common.save": "Kaydet",
      "common.cancel": "İptal",
      "common.delete": "Sil",
      "common.edit": "Düzenle",
      "common.create": "Oluştur",
      "common.back": "Geri",
      "common.next": "İleri",
      "common.submit": "Gönder",
      "common.search": "Ara",
      
      // Auth
      "auth.welcomeBack": "Tekrar hoş geldiniz",
      "auth.signIn": "Giriş Yap",
      "auth.signInToManage": "Mülklerinizi yönetmek için giriş yapın",
      "auth.email": "E-posta",
      "auth.password": "Şifre",
      "auth.continueWith": "Veya şununla devam et",
      "auth.orContinueWith": "Veya şununla devam et",
      "auth.noAccount": "Hesabınız yok mu?",
      "auth.dontHaveAccount": "Hesabınız yok mu?",
      "auth.signUp": "Kaydol",
      "auth.signOut": "Çıkış Yap",
      "auth.loading": "Yükleniyor...",
      
      // Dashboard
      "dashboard.title": "Mülklerim",
      "dashboard.addProperty": "Mülk Ekle",
      "dashboard.emptyState": "Henüz mülk yok",
      "dashboard.emptyStateDesc": "İlk tatil kiralama mülkünüzü oluşturarak başlayın",
      "dashboard.activeGuests": "Aktif Misafirler",
      "dashboard.totalViews": "Toplam Görüntüleme",
      "dashboard.avgRating": "Ort. Değerlendirme",
      
      // Property Form
      "property.createNew": "Yeni Mülk Oluştur",
      "property.propertyName": "Mülk Adı",
      "property.namePlaceholder": "Sahil Evi Cennet",
      "property.address": "Adres",
      "property.addressPlaceholder": "Sahil Caddesi 123, İstanbul",
      "property.description": "Açıklama",
      "property.descriptionPlaceholder": "Mülkünüzü tanımlayın...",
      "property.guestCapacity": "Misafir Kapasitesi",
      "property.bedrooms": "Yatak Odaları",
      "property.bathrooms": "Banyolar",
      "property.propertyImage": "Mülk Görseli",
      "property.uploadImage": "Görsel Yükle",
      "property.createProperty": "Mülk Oluştur",
      
      // Property Detail
      "property.guestLink": "Misafir Linki",
      "property.copyLink": "Linki Kopyala",
      "property.linkCopied": "Link kopyalandı!",
      "property.manageContent": "İçeriği Yönet",
      "property.addNewBlock": "Yeni Blok Ekle",
      
      // Content Blocks
      "blocks.checkIn": "Giriş Talimatları",
      "blocks.wifi": "WiFi Bilgileri",
      "blocks.parking": "Park Talimatları",
      "blocks.houseRules": "Ev Kuralları",
      "blocks.emergency": "Acil Durum Kişileri",
      "blocks.localTips": "Yerel İpuçları",
      
      // Guest Portal
      "guest.registration": "Misafir Kaydı",
      "guest.welcome": "Hoş geldiniz",
      "guest.pleaseRegister": "Tüm mülk bilgilerine erişmek için lütfen kaydınızı tamamlayın",
      "guest.firstName": "Ad",
      "guest.lastName": "Soyad",
      "guest.phoneNumber": "Telefon Numarası",
      "guest.checkInDate": "Giriş Tarihi",
      "guest.checkOutDate": "Çıkış Tarihi",
      "guest.numberOfGuests": "Misafir Sayısı",
      "guest.continueToProperty": "Mülk Bilgilerine Devam Et",
      "guest.propertyInfo": "Mülk Bilgileri",
      "guest.essentialInfo": "Temel Bilgiler",
      
      // Guest Registration
      "guestRegistration.title": "Misafir Kaydı",
      "guestRegistration.description": "Mülk bilgilerine erişmek için lütfen kaydınızı tamamlayın",
      "guestRegistration.firstName": "Ad",
      "guestRegistration.lastName": "Soyad",
      "guestRegistration.email": "E-posta",
      "guestRegistration.phoneNumber": "Telefon Numarası",
      "guestRegistration.checkInDate": "Giriş Tarihi",
      "guestRegistration.checkOutDate": "Çıkış Tarihi",
      "guestRegistration.numberOfGuests": "Misafir Sayısı",
      "guestRegistration.completeRegistration": "Kaydı Tamamla",
      "guestRegistration.infoSecure": "Bilgileriniz güvenlidir ve yalnızca mülk sahibiyle paylaşılacaktır.",
      
      // Language
      "language.select": "Dil",
      "language.english": "İngilizce",
      "language.spanish": "İspanyolca",
      "language.french": "Fransızca",
      "language.dutch": "Flemenkçe",
      "language.german": "Almanca",
      "language.italian": "İtalyanca",
      "language.portuguese": "Portekizce",
      "language.turkish": "Türkçe",
      
      // Language Switcher
      "languageSwitcher.more": "Daha Fazla",
      
      // Language Modal
      "languageModal.title": "Bir dil ve bölge seçin",
      "languageModal.searchPlaceholder": "Dil ara...",
      "languageModal.noResults": "Dil bulunamadı",
      "languageModal.footer": "İçerik, mevcut olduğunda seçtiğiniz dile uyarlanacaktır",
      
      // Tagline
      "tagline": "Bir bağlantı. Tüm misafir bilgileri. Bir kez paylaşın ve rahat edin."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n;
export { useTranslation };

// Helper function to safely use translation
export function useTranslationSafe() {
  try {
    return useTranslation();
  } catch (error) {
    console.error('Translation error:', error);
    return { t: (key: string) => key, i18n };
  }
}