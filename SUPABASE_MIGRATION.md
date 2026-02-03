# 🔄 Firebase → Supabase Authentication Migration

## ✅ Migratie Voltooid!

De CheckinLynk applicatie gebruikt nu **Supabase** voor authentication in plaats van Firebase Auth.

---

## 🚀 Setup Instructies

### ✨ Goed Nieuws: Automatische Configuratie!

De Supabase credentials zijn **al geconfigureerd** en worden automatisch geladen vanuit `/utils/supabase/info.tsx`.

**Je hoeft geen environment variables handmatig in te stellen!** 🎉

De applicatie gebruikt:
- **Supabase URL**: `https://vrccuaqmntdgskdwrmdm.supabase.co`
- **Anon Key**: Automatisch geladen vanuit info bestand

### 📋 Wat Moet Je Wel Doen?

#### 1. Enable Email Authentication in Supabase

1. Ga naar je Supabase Dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecteer project: **vrccuaqmntdgskdwrmdm**
3. Ga naar **Authentication** → **Providers**
4. Zorg dat **Email** provider is ingeschakeld
5. *(Optioneel)* Configureer email templates

#### 2. (Optioneel) Enable OAuth Providers

Voor Google/Microsoft login:

#### Google OAuth:
1. Ga naar **Authentication** → **Providers** → **Google**
2. Enable de provider
3. Voeg je Google OAuth Client ID en Secret toe
4. Voeg authorized redirect URL toe: `https://jouw-project.supabase.co/auth/v1/callback`

#### Microsoft/Azure OAuth:
1. Ga naar **Authentication** → **Providers** → **Azure**
2. Enable de provider
3. Voeg je Azure OAuth Client ID en Secret toe
4. Voeg authorized redirect URL toe

---

## 📝 Wat is veranderd?

### Bestanden die zijn aangepast:

✅ `/src/lib/supabase.ts` - Nieuwe Supabase client configuratie  
✅ `/src/hooks/useAuth.ts` - React hook voor auth state  
✅ `/src/app/pages/ComingSoon.tsx` - Login flow met Supabase  
✅ `/src/app/pages/Login.tsx` - Login pagina met Supabase  
✅ `/src/app/pages/HostDashboard.tsx` - Auth checks met Supabase  

### Firebase Auth is verwijderd uit:
- ComingSoon.tsx
- Login.tsx
- HostDashboard.tsx

### Firebase blijft gebruikt voor:
- Firestore (database) - `/src/lib/firestore.ts`
- Storage (indien van toepassing)

---

## 🔐 Gebruikers Migreren (Optioneel)

Als je bestaande Firebase Auth gebruikers hebt:

1. **Exporteer gebruikers uit Firebase**:
   ```bash
   firebase auth:export users.json --project jouw-project-id
   ```

2. **Importeer gebruikers naar Supabase**:
   - Gebruik de Supabase Admin API
   - Of gebruik een migratie script
   - Docs: https://supabase.com/docs/guides/auth/auth-helpers/migrate-from-firebase

---

## 🧪 Test de Authentication

### Test Email/Password Login:
1. Start de app: `npm run dev`
2. Ga naar de Coming Soon pagina
3. Klik op "Admin Login"
4. Voer credentials in: `Admin@test.com` / `123456`
5. De gebruiker wordt automatisch aangemaakt als deze niet bestaat

### Test OAuth Login:
1. Ga naar de Login pagina
2. Klik op "Google" of "Microsoft"
3. Voltooi de OAuth flow
4. Je wordt terug gestuurd naar de app

---

## 📚 Supabase Auth API

Beschikbare methods in `/src/lib/supabase.ts`:

```typescript
// Sign in
await auth.signInWithPassword(email, password);

// Sign up
await auth.signUp(email, password);

// Sign out
await auth.signOut();

// Get current user
const user = await auth.getCurrentUser();

// Get current session
const session = await auth.getSession();

// OAuth
await auth.signInWithGoogle();
await auth.signInWithMicrosoft();

// Password reset
await auth.resetPassword(email);
await auth.updatePassword(newPassword);

// Listen to auth changes
auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});
```

---

## 🎯 React Hook Gebruik

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, session, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div>
      <p>Welcome {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

---

## ⚠️ Belangrijk

1. **Never commit `.env` files** met echte credentials!
2. **Update je Supabase Row Level Security (RLS)** policies
3. **Test alle auth flows grondig** voordat je naar productie gaat
4. **Gebruik HTTPS** in productie voor OAuth redirects

---

## 🐛 Troubleshooting

### "Invalid API key"
→ Check of je `.env` file de correcte waarden bevat  
→ Herstart de dev server na het aanpassen van `.env`

### "User not found" bij login
→ De gebruiker moet eerst aangemaakt worden via sign up  
→ Of handmatig in Supabase Dashboard → Authentication → Users

### OAuth redirect werkt niet
→ Check of redirect URLs correct zijn geconfigureerd in OAuth provider  
→ Zorg dat redirect URL in Supabase overeenkomt met OAuth provider

---

## 📞 Support

Voor Supabase specifieke vragen:
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com

Voor CheckinLynk vragen:
- Contact: support@checkinlynk.com

---

**Succesvol gemigreerd! 🎉**