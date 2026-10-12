export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania';
  badge: string;
  badgeType?: 'season' | 'gem' | 'wonder' | 'adventure' | 'romance' | 'food';
  categoryLabel: string;
  category: 'Coastal & Beaches' | 'Natural Wonders' | 'Historic Landmarks' | 'Adventure & Hiking' | 'Culinary & Cultural';
  rating: number;
  reviewsCount: string;
  description: string;
  budgetTier: '$ Budget-Friendly' | '$$ Mid-Range' | '$$$ Luxury' | '$$$ Safari';
  dailyCostUSD: number;
  duration: string;
  imageUrl: string;
  locationTag?: string;
  coordinates: { lat: number; lng: number };
  elevation?: string;
  bestMonths: string;
  highlights: string[];
  dayByDaySample: {
    day: number;
    title: string;
    items: string[];
  }[];
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
  badgeColor: string;
  author: string;
  readTime: string;
  title: string;
  summary: string;
  seasonalWindow: string;
  imageUrl: string;
  fullContent?: string[];
  keyTakeaways?: string[];
}

export interface MapPoi {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: { x: number; y: number; lat: number; lng: number }; // x,y are percentages for custom stylized canvas/map
  category: 'Historic' | 'Nature' | 'Food' | 'Transit' | 'Viewpoint';
  duration: string;
  costUSD: number;
  description: string;
  rating: number;
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
