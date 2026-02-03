export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  guestLink: string;
  createdAt: Date;
  blocks: ContentBlock[];
}

export interface ContentBlock {
  id: string;
  type: 'checkin' | 'wifi' | 'parking' | 'rules' | 'emergency' | 'tips';
  title: string;
  content: string;
  icon: string;
  isEnabled: boolean;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: string;
  documentNumber: string;
  address: string;
  city: string;
  country: string;
  additionalGuests: AdditionalGuest[];
}

export interface AdditionalGuest {
  id: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
}

// Check-in/Check-out Types
export interface CheckinData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  numberOfGuests: number;
  arrivalDate: string;
  departureDate: string;
  comments?: string;
  acceptedHouseRules: boolean;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  numberOfGuests: number;
  arrivalDate: string;
  departureDate: string;
  comments?: string;
  checkinTime: string;
  checkoutTime?: string;
  status: BookingStatus;
  createdAt: string;
}

export type BookingStatus = 'checked_in' | 'checked_out';

export type PropertyStatus = 'vacant' | 'occupied' | 'needs_cleaning';

export interface PropertyWithStatus {
  property: any; // Property from firestore
  status: PropertyStatus;
  currentBooking?: Booking;
  lastCheckout?: string;
}