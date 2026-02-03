# 🔥 Firebase Setup - REQUIRED TO FIX PERMISSION ERRORS

## ⚠️ CRITICAL: Deploy Firestore Rules Now

The app won't work until you deploy Firestore security rules. Follow these steps:

---

## 📋 Quick Setup (5 minutes)

### Step 1: Open Firebase Console

1. Go to **https://console.firebase.google.com/**
2. Select your **CheckinLynk** project
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top

### Step 2: Copy & Deploy Rules

**Copy the rules below** and paste them into the Firebase Console:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /contentBlocks/{blockId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /guestRegistrations/{registrationId} {
      allow read, write: if true;
    }
    
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 3: Publish

1. Click the **Publish** button
2. Wait for confirmation (usually instant)
3. Refresh your CheckinLynk app

---

## ✅ Verify It Works

After publishing, test these actions:

1. **Sign in** to your host account
2. **Create a property** 
3. **Add content blocks**
4. **Copy guest link** and open in incognito/private window
5. **Register as guest** (without logging in)

All should work without permission errors! ✅

---

## 🔒 For Production (Later)

When ready to deploy to production, use the stricter rules from `/firestore.rules.production` which:
- Verify property ownership before updates/deletes
- Restrict content block management to property owners
- Maintain public read access for guest links

---

## 🆘 Still Having Issues?

**Common Problems:**

1. **Rules not publishing**: Wait 30 seconds and refresh
2. **Still getting errors**: Clear browser cache and reload
3. **Auth errors**: Make sure Email/Password and Google providers are enabled in Firebase Authentication

**Need help?** The rules in `/firestore.rules` are your development rules (permissive for testing).

---

## 📝 What These Rules Do

- ✅ **properties** collection: Anyone can read, authenticated users can create/update/delete
- ✅ **contentBlocks** collection: Anyone can read, authenticated users can create/update/delete  
- ✅ **guestRegistrations** collection: Public read/write (so guests can register without auth)
- ✅ **users** collection: Authenticated users can read/write their own data

These are **development-friendly rules**. Switch to production rules (see `/firestore.rules.production`) when launching.