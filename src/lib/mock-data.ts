import { Property, ContentBlock } from '@/types';

export const defaultBlocks: ContentBlock[] = [
  {
    id: '1',
    type: 'checkin',
    title: 'Check-in Instructions',
    content: 'Check-in time is 3:00 PM. The key lockbox is located on the front door. Your access code is 1234.',
    icon: 'Key',
    isEnabled: true,
  },
  {
    id: '2',
    type: 'wifi',
    title: 'WiFi Information',
    content: 'Network: MyHome-WiFi\nPassword: welcome2023',
    icon: 'Wifi',
    isEnabled: true,
  },
  {
    id: '3',
    type: 'parking',
    title: 'Parking Instructions',
    content: 'Free parking is available in the driveway. Street parking is also permitted.',
    icon: 'Car',
    isEnabled: true,
  },
  {
    id: '4',
    type: 'rules',
    title: 'House Rules',
    content: '• No smoking inside\n• No parties or events\n• Quiet hours: 10 PM - 8 AM\n• Pets allowed with prior approval',
    icon: 'FileText',
    isEnabled: true,
  },
  {
    id: '5',
    type: 'emergency',
    title: 'Emergency Contacts',
    content: 'Emergency: 911\nHost: +1 (555) 123-4567\nProperty Manager: +1 (555) 987-6543',
    icon: 'Phone',
    isEnabled: true,
  },
  {
    id: '6',
    type: 'tips',
    title: 'Local Tips',
    content: '🍽️ Great restaurants nearby:\n• Riverside Cafe (5 min walk)\n• The Corner Bistro (10 min drive)\n\n🛒 Grocery stores:\n• Whole Foods (2 miles)',
    icon: 'MapPin',
    isEnabled: true,
  },
];

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Oceanview Beach House',
    address: '123 Coastal Drive, Malibu, CA 90265',
    imageUrl: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=800',
    guestLink: 'checkinlynk.app/g/abc123xyz',
    createdAt: new Date('2024-01-15'),
    blocks: [...defaultBlocks],
  },
  {
    id: '2',
    name: 'Downtown Luxury Loft',
    address: '456 Main Street, Unit 8B, New York, NY 10001',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    guestLink: 'checkinlynk.app/g/def456uvw',
    createdAt: new Date('2024-02-01'),
    blocks: [...defaultBlocks],
  },
  {
    id: '3',
    name: 'Mountain Retreat Cabin',
    address: '789 Pine Trail, Aspen, CO 81611',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    guestLink: 'checkinlynk.app/g/ghi789rst',
    createdAt: new Date('2024-01-20'),
    blocks: [...defaultBlocks],
  },
];
