import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAUdqjK-4ZwtLVJ3eAOphUPmyRD89My89E",
  authDomain: "checkinlynk-40254.firebaseapp.com",
  projectId: "checkinlynk-40254",
  storageBucket: "checkinlynk-40254.firebasestorage.app",
  messagingSenderId: "576615341000",
  appId: "1:576615341000:web:073fe221a35f06461afefd",
  measurementId: "G-DW8WJCW2XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize analytics (only in browser and if supported)
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
