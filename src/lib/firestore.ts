import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Booking, PropertyStatus, CheckinData } from '@/types';

// Address structure
export interface PropertyAddress {
  streetName: string;
  houseNumber: string;
  postalCode: string;
  city?: string;
  country: string;
}

// WiFi structure
export interface WiFiInfo {
  ssid: string;
  password: string;
}

// Parking structure
export interface ParkingInfo {
  address: string;
  type: 'free' | 'paid';
  instructions?: string;
}

// Check-in structure
export interface CheckInInfo {
  checkInTime: string;
  checkOutTime: string;
  instructions?: string;
  keyCode?: string;
  alarmCode?: string;
}

// Emergency contact
export interface EmergencyContact {
  name: string;
  phone: string;
  role?: string;
  visibleToGuest: boolean;
}

// Restaurant
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  description: string;
}

// Supermarket
export interface Supermarket {
  id: string;
  name: string;
  address: string;
}

// Bar
export interface Bar {
  id: string;
  name: string;
  address: string;
}

// Point of Interest
export interface PointOfInterest {
  id: string;
  name: string;
  address: string;
  recommendation: string;
}

// Medical Contact
export interface MedicalContact {
  id: string;
  name: string;
  address: string;
  phone: string;
}

// House rule category
export interface HouseRuleCategory {
  id: string;
  name: string;
  rules: HouseRule[];
}

export interface HouseRule {
  id: string;
  text: string;
  enabled: boolean;
  visibleToGuest: boolean;
}

// Host profile
export interface HostProfile {
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  email?: string;
  phone?: string;
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  address: PropertyAddress;
  description: string;
  imageUrl?: string;
  guestToken: string; // Secure token for guest access
  guestCapacity?: number;
  bedrooms?: number;
  bathrooms?: number;
  checkInInfo?: CheckInInfo;
  checkInInstructions?: string; // Convenience field (denormalized from checkInInfo.instructions)
  checkInTime?: string; // Convenience field (denormalized from checkInInfo.checkInTime)
  wifiInfo?: WiFiInfo;
  wifiNetwork?: string; // Convenience field (denormalized from wifiInfo.ssid)
  wifiPassword?: string; // Convenience field (denormalized from wifiInfo.password)
  parkingInfo?: ParkingInfo;
  parkingInstructions?: string; // Convenience field (denormalized from parkingInfo.instructions)
  emergencyContacts: EmergencyContact[];
  houseRules: HouseRuleCategory[];
  restaurants?: Restaurant[];
  supermarkets?: Supermarket[];
  bars?: Bar[];
  pointsOfInterest?: PointOfInterest[];
  medicalContacts?: MedicalContact[];
  localTips?: string;
  hostProfile?: HostProfile;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContentBlock {
  id: string;
  propertyId: string;
  type: 'checkIn' | 'wifi' | 'parking' | 'houseRules' | 'emergency' | 'localTips' | 'restaurants' | 'bars';
  title: string;
  content: string;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GuestAccessToken {
  id: string;
  token: string;
  propertyId: string;
  createdAt: Timestamp;
  expiresAt?: Timestamp;
}

export interface GuestRegistration {
  id: string;
  propertyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  isCheckedOut: boolean;
  createdAt: Timestamp;
}

export interface UserProfile {
  id: string;
  email: string;
  role?: 'admin' | 'starter' | 'pro';
  hostProfile?: HostProfile;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Generate secure token for guest access
export function generateGuestToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 24; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Properties
export async function getPropertiesByOwner(ownerId: string): Promise<Property[]> {
  const q = query(collection(db, 'properties'), where('ownerId', '==', ownerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
}

// Alias for backwards compatibility
export const getPropertiesByHost = getPropertiesByOwner;

export async function getProperty(id: string): Promise<Property | null> {
  const docRef = doc(db, 'properties', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Property;
  }
  return null;
}

export async function getPropertyByToken(token: string): Promise<Property | null> {
  const q = query(collection(db, 'properties'), where('guestToken', '==', token));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Property;
  }
  return null;
}

export async function createProperty(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'guestToken'>): Promise<string> {
  const guestToken = generateGuestToken();
  const docRef = await addDoc(collection(db, 'properties'), {
    ...data,
    guestToken,
    emergencyContacts: data.emergencyContacts || [],
    houseRules: data.houseRules || [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProperty(id: string, data: Partial<Property>): Promise<void> {
  const docRef = doc(db, 'properties', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProperty(id: string): Promise<void> {
  await deleteDoc(doc(db, 'properties', id));
}

export async function regenerateGuestToken(propertyId: string): Promise<string> {
  const newToken = generateGuestToken();
  await updateProperty(propertyId, { guestToken: newToken });
  return newToken;
}

// Content Blocks
export async function getContentBlocks(propertyId: string): Promise<ContentBlock[]> {
  const q = query(collection(db, 'contentBlocks'), where('propertyId', '==', propertyId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContentBlock))
    .sort((a, b) => a.order - b.order);
}

export async function createContentBlock(data: Omit<ContentBlock, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'contentBlocks'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateContentBlock(id: string, data: Partial<ContentBlock>): Promise<void> {
  const docRef = doc(db, 'contentBlocks', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteContentBlock(id: string): Promise<void> {
  await deleteDoc(doc(db, 'contentBlocks', id));
}

// Guest Registrations
export async function getGuestRegistration(propertyId: string, email: string): Promise<GuestRegistration | null> {
  const q = query(
    collection(db, 'guestRegistrations'),
    where('propertyId', '==', propertyId),
    where('email', '==', email)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as GuestRegistration;
  }
  return null;
}

export async function createGuestRegistration(data: Omit<GuestRegistration, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'guestRegistrations'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// User Profiles
export async function createUserProfile(userId: string, data: Omit<UserProfile, 'id' | 'updatedAt'>): Promise<void> {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    ...data,
    createdAt: data.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).catch(async () => {
    // If document doesn't exist, create it with addDoc
    await addDoc(collection(db, 'users'), {
      id: userId,
      ...data,
      createdAt: data.createdAt || serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as UserProfile;
  }
  return null;
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    // Create profile if it doesn't exist
    await addDoc(collection(db, 'users'), {
      id: userId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }
}

// === API Re-implementation (Client-side logic) ===

export async function checkin(propertyId: string, propertyName: string, checkinData: CheckinData): Promise<Booking> {
  // Save guest registration
  const docRef = await addDoc(collection(db, 'guestRegistrations'), {
    propertyId,
    propertyName,
    firstName: checkinData.firstName,
    lastName: checkinData.lastName,
    email: checkinData.email,
    phoneNumber: checkinData.phoneNumber, // Note: Privacy consideration
    checkInDate: checkinData.checkInDate,
    checkOutDate: checkinData.checkOutDate,
    numberOfGuests: checkinData.numberOfGuests,
    isCheckedOut: false,
    createdAt: serverTimestamp(),
    checkinTime: new Date().toISOString(),
  });

  return {
    id: docRef.id,
    guestFirstName: checkinData.firstName,
    guestLastName: checkinData.lastName,
    guestEmail: checkinData.email,
    guestPhone: checkinData.phoneNumber,
    arrivalDate: checkinData.checkInDate,
    departureDate: checkinData.checkOutDate,
    numberOfGuests: checkinData.numberOfGuests,
    checkinTime: new Date().toISOString(),
    status: 'occupied'
  };
}

export async function checkout(propertyId: string): Promise<void> {
  // Find active registration for this property
  const q = query(
    collection(db, 'guestRegistrations'),
    where('propertyId', '==', propertyId),
    where('isCheckedOut', '==', false),
    orderBy('createdAt', 'desc'),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, {
      isCheckedOut: true,
      checkoutTime: new Date().toISOString(),
      updatedAt: serverTimestamp()
    });
  }
}

export async function getCurrentBooking(propertyId: string): Promise<Booking | null> {
  const q = query(
    collection(db, 'guestRegistrations'),
    where('propertyId', '==', propertyId),
    where('isCheckedOut', '==', false),
    orderBy('createdAt', 'desc'),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const data = snapshot.docs[0].data();
    return {
      id: snapshot.docs[0].id,
      guestFirstName: data.firstName,
      guestLastName: data.lastName,
      guestEmail: data.email,
      guestPhone: data.phoneNumber,
      arrivalDate: data.checkInDate,
      departureDate: data.checkOutDate,
      numberOfGuests: data.numberOfGuests,
      checkinTime: data.checkinTime,
      status: 'occupied'
    };
  }
  return null;
}

export async function getPropertyStatus(propertyId: string): Promise<{
  status: PropertyStatus;
  currentBooking: Booking | null;
  lastCheckout: string | null;
}> {
  // 1. Check for active booking
  const currentBooking = await getCurrentBooking(propertyId);
  if (currentBooking) {
    return {
      status: 'occupied',
      currentBooking,
      lastCheckout: null
    };
  }

  // 2. Check for last checkout (to determine needs_cleaning)
  // Note: Assuming 'needs_cleaning' logic is based on having a recent checkout 
  // without a subsequent 'cleaned' event. For now, simplifying to just return vacant.
  // In a real app, you'd query a 'cleaningEvents' collection or similar.

  // Simplification: Return vacant for now as we removed the API logic that might have handled this logic statefully
  return {
    status: 'vacant',
    currentBooking: null,
    lastCheckout: null
  };
}

export async function markPropertyCleaned(propertyId: string): Promise<void> {
  // Determine where to store this state. 
  // Option: Add a 'lastCleanedAt' timestamp to the Property document.
  await updateProperty(propertyId, {
    // @ts-ignore - extending the type on the fly or need to add it to Property interface
    lastCleanedAt: serverTimestamp()
  });
}

// Default house rules categories
export const DEFAULT_HOUSE_RULES: HouseRuleCategory[] = [
  {
    id: 'checkin-checkout',
    name: 'Check-in / Check-out',
    rules: [
      { id: '1', text: 'Strictly follow check-in and check-out times', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Self check-in available', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Early check-in upon request', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'guests',
    name: 'Guests',
    rules: [
      { id: '1', text: 'Max guest limit enforced', enabled: false, visibleToGuest: true },
      { id: '2', text: 'No extra guests allowed', enabled: false, visibleToGuest: true },
      { id: '3', text: 'No visitors / events', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'smoking',
    name: 'Smoking',
    rules: [
      { id: '1', text: 'No smoking inside', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Smoking allowed on balcony/terrace only', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Completely smoke-free property', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'noise-parties',
    name: 'Noise / Parties',
    rules: [
      { id: '1', text: 'Quiet hours: 10 PM - 8 AM', enabled: false, visibleToGuest: true },
      { id: '2', text: 'No parties or events', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Respect neighbors', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'pets',
    name: 'Pets',
    rules: [
      { id: '1', text: 'No pets allowed', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Small pets allowed (under 10kg)', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Extra cleaning fee applies for pets', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    rules: [
      { id: '1', text: 'Leave property as you found it', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Wash dishes before checkout', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Take out trash before leaving', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'damage',
    name: 'Damage',
    rules: [
      { id: '1', text: 'Report any damage immediately', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Security deposit may be withheld for damages', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Be careful with furniture and appliances', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    rules: [
      { id: '1', text: 'Clean kitchen after use', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Do not leave food out', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Kitchen available 24/7', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'safety',
    name: 'Safety',
    rules: [
      { id: '1', text: 'Lock doors and windows when leaving', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Know emergency exit locations', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Do not tamper with smoke detectors', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    rules: [
      { id: '1', text: 'Separate waste (recycling available)', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Conserve water and electricity', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Use eco-friendly products provided', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'legal-local',
    name: 'Legal / Local',
    rules: [
      { id: '1', text: 'Respect local laws and regulations', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Register with local authorities if required', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Quiet residential area - be considerate', enabled: false, visibleToGuest: true },
    ]
  },
  {
    id: 'technical',
    name: 'Technical',
    rules: [
      { id: '1', text: 'WiFi password provided in welcome guide', enabled: false, visibleToGuest: true },
      { id: '2', text: 'Contact host for technical issues', enabled: false, visibleToGuest: true },
      { id: '3', text: 'Reset thermostats to 20°C before checkout', enabled: false, visibleToGuest: true },
    ]
  },
];