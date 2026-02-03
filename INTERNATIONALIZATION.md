# CheckinLynk - Vertaalbaarheid & Internationalisering Richtlijnen

## 📋 Overzicht

CheckinLynk is een volledig meertalige SaaS-applicatie met ondersteuning voor alle Europese talen + Turks. Dit document bevat verplichte richtlijnen voor het bouwen van schaalbare, vertaalbare UI-componenten.

---

## 🌍 Ondersteunde Talen

### Quick Select (Top 3)
- **Nederlands (NL)** 🇳🇱 - Nederland
- **English (EN)** 🇬🇧 - United Kingdom
- **Français (FR)** 🇫🇷 - France

### Alle Europese Talen
- Deutsch (DE) 🇩🇪
- Español (ES) 🇪🇸
- Italiano (IT) 🇮🇹
- Português (PT) 🇵🇹
- Polski (PL) 🇵🇱
- Română (RO) 🇷🇴
- Čeština (CS) 🇨🇿
- Magyar (HU) 🇭🇺
- Svenska (SV) 🇸🇪
- Ελληνικά (EL) 🇬🇷
- Български (BG) 🇧🇬
- Dansk (DA) 🇩🇰
- Suomi (FI) 🇫🇮
- Slovenčina (SK) 🇸🇰
- Hrvatski (HR) 🇭🇷
- Norsk (NO) 🇳🇴
- Lietuvių (LT) 🇱🇹
- Slovenščina (SL) 🇸🇮
- Latviešu (LV) 🇱🇻
- Eesti (ET) 🇪🇪
- Türkçe (TR) 🇹🇷

### Regionale Varianten
- English (US, IE)
- Deutsch (AT, CH)
- Français (BE, CH)
- Nederlands (BE)
- Português (BR)
- Español (MX)

---

## ✅ VERPLICHTE REGELS voor alle Ontwikkelaars

### 1. **NOOIT** Hard-Coded Tekst in Componenten

❌ **VERKEERD:**
```tsx
<Button>Save Changes</Button>
<h1>Welcome to CheckinLynk</h1>
<p className="error">This field is required</p>
```

✅ **GOED:**
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <>
      <Button>{t('common.saveChanges')}</Button>
      <h1>{t('app.welcome')}</h1>
      <p className="error">{t('validation.fieldRequired')}</p>
    </>
  );
}
```

---

### 2. Gebruik Altijd `t()` voor Alle Teksten

**Dit geldt voor:**
- Labels, titels, en headings
- Knoppen en links
- Placeholder tekst
- Foutmeldingen en validatie
- Tooltips en hints
- Success/error toasts
- Dialog en modal teksten
- Breadcrumb en navigation labels
- Tabellen headers
- Empty states
- Loading teksten
- Alt-tekst voor toegankelijkheid (waar relevant)

✅ **Voorbeeld:**
```tsx
<Input 
  label={t('form.email')}
  placeholder={t('form.emailPlaceholder')}
  error={errors.email && t('validation.emailInvalid')}
/>
```

---

### 3. Layout MOET Flexibel Zijn voor Lange Vertalingen

Sommige talen gebruiken 30-50% **meer ruimte** dan Engels.

#### Voorbeelden van Tekstlengtes:
- "Save" (Engels) = 4 letters
- "Speichern" (Duits) = 9 letters
- "Enregistrer" (Frans) = 11 letters

❌ **VERKEERD:**
```tsx
<Button className="w-24">Save</Button>  {/* Fixed width breekt in andere talen */}
<div className="truncate">{t('longText')}</div>  {/* Tekst wordt onleesbaar */}
```

✅ **GOED:**
```tsx
<Button className="min-w-24 px-4">{t('common.save')}</Button>
<div className="line-clamp-2 md:line-clamp-none">{t('longText')}</div>
```

---

### 4. Gebruik Semantische Translation Keys

❌ **VERKEERD:**
```tsx
t('button1')  // Geen context
t('text')     // Te generiek
t('home.a')   // Onduidelijk
```

✅ **GOED:**
```tsx
t('dashboard.addProperty')
t('auth.signIn')
t('property.uploadImage')
t('validation.emailRequired')
```

**Naming Convention:**
```
[scope].[element].[variant?]

Voorbeelden:
- common.save
- common.saveChanges
- auth.signIn
- auth.signInToAccount
- property.createNew
- validation.required
- validation.emailInvalid
```

---

### 5. Multi-Line Ondersteuning in UI-Componenten

Teksten kunnen meerdere regels innemen door langere vertalingen.

✅ **Goed Ontwerp:**
```tsx
<Button className="h-auto py-2 px-4 whitespace-normal">
  {t('property.completeRegistration')}
</Button>

<Card className="min-h-fit">
  <CardTitle className="leading-tight">
    {t('dashboard.propertyTitle')}
  </CardTitle>
</Card>
```

---

### 6. Dynamische Content met Variabelen

Voor dynamische waarden gebruik `t()` met interpolation:

✅ **Goed:**
```tsx
t('property.guestCount', { count: 5 })
// EN: "5 guests"
// NL: "5 gasten"
// FR: "5 invités"

t('booking.dateRange', { start: '10 Jan', end: '17 Jan' })
// EN: "From 10 Jan to 17 Jan"
// NL: "Van 10 Jan tot 17 Jan"
```

**In i18n configuratie:**
```ts
"property.guestCount": "{{count}} guests",
"booking.dateRange": "From {{start}} to {{end}}"
```

---

### 7. Pluralisatie Regels

Gebruik i18n pluralisatie voor getallen:

✅ **Goed:**
```tsx
t('property.bedrooms', { count: 1 })  // "1 bedroom"
t('property.bedrooms', { count: 3 })  // "3 bedrooms"
```

**In i18n configuratie:**
```ts
"property.bedrooms_one": "{{count}} bedroom",
"property.bedrooms_other": "{{count}} bedrooms"
```

---

### 8. Responsive Tekst

Sommige teksten kunnen ingekort worden op mobiel:

✅ **Goed:**
```tsx
<Button>
  <span className="hidden md:inline">{t('property.addNewProperty')}</span>
  <span className="md:hidden">{t('property.add')}</span>
</Button>
```

Zorg dat **beide keys** in i18n staan:
```ts
"property.addNewProperty": "Add New Property",
"property.add": "Add"
```

---

### 9. Toegankelijkheid (A11y) met Vertalingen

Screen readers hebben toegang tot vertaalde content:

✅ **Goed:**
```tsx
<Button aria-label={t('common.close')}>
  <X className="h-4 w-4" />
</Button>

<img 
  src={image} 
  alt={t('property.imageAlt', { name: property.name })} 
/>
```

---

### 10. Testing voor Verschillende Talen

Test altijd met **lange talen** zoals Duits en Frans:

```tsx
// Development mode: Schakel tussen talen
import { useTranslation } from 'react-i18next';

function DevTools() {
  const { i18n } = useTranslation();
  
  return (
    <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
      <option value="de">Deutsch (test for long text)</option>
      <option value="fr">Français (test for long text)</option>
    </select>
  );
}
```

---

## 📦 Standaard UI Pattern Library

### Button Componenten
```tsx
// Primary Action
<Button>{t('common.save')}</Button>

// Secondary Action
<Button variant="outline">{t('common.cancel')}</Button>

// Destructive Action
<Button variant="destructive">{t('common.delete')}</Button>

// With Icon (Icon altijd eerst voor consistentie)
<Button>
  <Plus className="h-4 w-4 mr-2" />
  {t('dashboard.addProperty')}
</Button>
```

### Form Inputs
```tsx
<Input
  label={t('form.email')}
  placeholder={t('form.emailPlaceholder')}
  helperText={t('form.emailHelper')}
  error={errors.email && t('validation.emailInvalid')}
/>
```

### Modal/Dialog
```tsx
<Dialog>
  <DialogHeader>
    <DialogTitle>{t('modal.confirmDelete')}</DialogTitle>
    <DialogDescription>{t('modal.confirmDeleteDescription')}</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline">{t('common.cancel')}</Button>
    <Button variant="destructive">{t('common.delete')}</Button>
  </DialogFooter>
</Dialog>
```

### Toast Notifications
```tsx
import { toast } from 'sonner';

// Success
toast.success(t('toast.saveSuccess'));

// Error
toast.error(t('toast.saveFailed'));

// Custom
toast(t('toast.processing'), {
  description: t('toast.processingDescription')
});
```

---

## 🔧 I18n Configuration Pattern

### File Structuur
```
/src/lib/i18n.ts  ← Centrale configuratie
```

### Nieuwe Teksten Toevoegen

1. **Voeg key toe aan ALLE talen:**
```ts
// In i18n.ts, voeg toe aan elk language object
en: {
  translation: {
    "newFeature.title": "New Feature",
    // ... rest
  }
},
nl: {
  translation: {
    "newFeature.title": "Nieuwe Functie",
    // ... rest
  }
},
// ... etc voor alle talen
```

2. **Gebruik in component:**
```tsx
function NewFeature() {
  const { t } = useTranslation();
  return <h1>{t('newFeature.title')}</h1>;
}
```

---

## 🚫 Anti-Patterns (NOOIT DOEN)

### 1. String Concatenatie
❌ **VERKEERD:**
```tsx
{t('welcome') + ' ' + userName + '!'}
```

✅ **GOED:**
```tsx
{t('welcome.message', { name: userName })}
// "welcome.message": "Welcome {{name}}!"
```

### 2. Conditionals met Hard-Coded Tekst
❌ **VERKEERD:**
```tsx
{isActive ? 'Active' : 'Inactive'}
```

✅ **GOED:**
```tsx
{isActive ? t('status.active') : t('status.inactive')}
```

### 3. Fixed Height/Width op Text Containers
❌ **VERKEERD:**
```tsx
<div className="h-12 w-32 truncate">{t('long.text')}</div>
```

✅ **GOED:**
```tsx
<div className="min-h-12 min-w-32 line-clamp-2">{t('long.text')}</div>
```

---

## 📱 Responsiveness & Taal

Sommige elementen kunnen compacter op mobiel:

```tsx
<div className="flex flex-col md:flex-row gap-2">
  <span className="font-semibold">
    {t('property.location')}:
  </span>
  <span className="text-muted-foreground">
    {property.address}
  </span>
</div>
```

---

## 🎨 Design System Integration

Alle componenten in `/src/app/components/ui/` zijn ontworpen voor multi-line content:

- ✅ Button: Ondersteunt `whitespace-normal` voor wrap
- ✅ Card: Flexibele heights
- ✅ Input: Labels kunnen multi-line
- ✅ Dialog: Content scrollt bij lange teksten
- ✅ Badge: Kan meerdere regels bevatten

---

## 🌐 Language Switcher Component

**Standaard UI:**
- Toont top 3 talen (NL, EN, FR)
- "Meer" knop opent modal met ALLE talen
- Zoekfunctie voor snelle selectie
- Grid layout voor overzicht

**Gebruik:**
```tsx
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';

<LanguageSwitcher />
```

---

## 🔍 Checklist voor Code Review

Bij elke Pull Request, check:

- [ ] Geen hard-coded tekst strings
- [ ] Alle teksten gebruiken `t()` functie
- [ ] Translation keys zijn semantisch en duidelijk
- [ ] Keys bestaan in ALLE taal-configuraties
- [ ] Layout breekt niet met lange teksten (test in Duits/Frans)
- [ ] Buttons/Cards hebben flexibele dimensies
- [ ] Error messages zijn vertaalbaar
- [ ] Placeholder teksten zijn vertaalbaar
- [ ] Toast messages gebruiken translation keys
- [ ] Modal/Dialog titels en teksten zijn vertaalbaar

---

## 📞 Support

Voor vragen over internationalisering:
- Check deze documentatie eerst
- Zie voorbeelden in bestaande componenten
- Volg het patroon uit `/src/app/components/`

---

**Laatste Update:** Februari 2026  
**Versie:** 1.0.0  
**Talen:** 26+ (inclusief regionale varianten)
