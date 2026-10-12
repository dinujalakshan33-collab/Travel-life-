export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD';

export type DestinationCategory = 
  | 'Coastal & Beaches' 
  | 'Natural Wonders' 
  | 'Historic Landmarks' 
  | 'Adventure & Hiking' 
  | 'Cities & Culture' 
  | 'Wildlife Sanctuaries';

export type WorldRegion = 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Middle East' | 'Oceania';

export type BudgetTier = '$ Budget-Friendly' | '$$ Mid-Range' | '$$$ Luxury' | '$$$$ Ultra-Luxury';

export type AccommodationType = 
  | 'Luxury Resort' 
  | 'Beach Resort' 
  | 'Boutique Stay' 
  | 'Eco-Lodge' 
  | 'Budget Hotel & Hostel';

export interface Destination {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  region: WorldRegion;
  category: DestinationCategory;
  rating: number;
  reviewsCount: string;
  description: string;
  longDescription?: string;
  bestSeason: string;
  budgetTier: BudgetTier;
  dailyCostUSD: number;
  imageUrl: string;
  gallery: string[];
  activities: string[];
  coordinates: { lat: number; lng: number };
  highlights: string[];
  recommendedStayDays: number;
  featured?: boolean;
  trending?: boolean;
  // Backward compatibility
  badge?: string;
  categoryLabel?: string;
  duration?: string;
  bestMonths?: string;
  dayByDaySample?: {
    day: number;
    title: string;
    items: string[];
  }[];
}

export interface HotelStay {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  city: string;
  country: string;
  type: AccommodationType;
  rating: number;
  reviewsCount: string;
  pricePerNightUSD: number;
  priceRangeLabel: string;
  imageUrl: string;
  gallery: string[];
  facilities: string[];
  description: string;
  bookingUrl: string;
  coordinates: { lat: number; lng: number };
  featured?: boolean;
}

export interface PopularCountry {
  id: string;
  name: string;
  code: string;
  region: WorldRegion;
  tagline: string;
  destinationCount: number;
  imageUrl: string;
}

export interface ContinentSector {
  id: string;
  name: string;
  countriesCount: number;
  subtitle: string;
  statLabel: string;
  imageUrl: string;
  featuredDestinations: string[];
  description: string;
}

export interface BudgetArchetype {
  id: string;
  tier: 'Backpacker' | 'Comfort' | 'Luxury';
  name: string;
  regionLabel: string;
  dailySpendUSD: number;
  tagline: string;
  stays: { name: string; cost: number };
  food: { name: string; cost: number };
  transit: { name: string; cost: number };
  recommendedDuration: string;
  perks: string[];
}

export interface EditorialArticle {
  id: string;
  badge: string;
  badgeColor?: string;
  author: string;
  readTime: string;
  title: string;
  summary: string;
  seasonalWindow: string;
  imageUrl: string;
  destinationRef?: string;
  fullContent?: string[];
  keyTakeaways?: string[];
}

export interface MapPoi {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number; x?: number; y?: number };
  category: 'Historic' | 'Nature' | 'Food' | 'Transit' | 'Viewpoint' | 'Hotel' | 'Beach';
  duration: string;
  costUSD: number;
  description: string;
  rating: number;
  imageUrl?: string;
  destinationId?: string;
  hotelId?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  duration: string;
  costUSD: number;
  day: number;
  note?: string;
  category: 'sightseeing' | 'food' | 'activity' | 'transit';
}
