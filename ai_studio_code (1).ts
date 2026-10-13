// Add to src/data/travelData.ts

export const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  LKR: 305.5,
  INR: 83.2,
  JPY: 155.0,
  AUD: 1.52,
  CAD: 1.37,
};

export interface BudgetArchetype {
  id: string;
  name: string;
  label?: string;
  description: string;
  dailyBudgetUSD: number;
  icon?: string;
  perks?: string[];
  recommendedStays?: string;
  diningStyle?: string;
}

export const BUDGET_ARCHETYPES: BudgetArchetype[] = [
  {
    id: "backpacker",
    name: "Backpacker / Shoestring",
    description: "Hostels, street food, public transport, and free walking tours.",
    dailyBudgetUSD: 30,
    perks: ["Hostel dorms", "Public transit", "Local street eats"],
    recommendedStays: "Hostels & Guesthouses",
    diningStyle: "Local markets & street stalls",
  },
  {
    id: "midrange",
    name: "Smart Explorer / Mid-Range",
    description: "Boutique hotels or private Airbnb rooms, casual dining, and guided activities.",
    dailyBudgetUSD: 90,
    perks: ["3-star hotels / Private rooms", "Occasional rideshares", "Casual sit-down restaurants"],
    recommendedStays: "Boutique hotels & B&Bs",
    diningStyle: "Local cafes & casual eateries",
  },
  {
    id: "luxury",
    name: "Luxury / High-End",
    description: "4-5 star resorts, fine dining, private transfers, and bespoke VIP tours.",
    dailyBudgetUSD: 250,
    perks: ["5-star resorts", "Private drivers", "Fine dining & tasting menus"],
    recommendedStays: "Luxury resorts & 5-star hotels",
    diningStyle: "Fine dining & curated experiences",
  },
];