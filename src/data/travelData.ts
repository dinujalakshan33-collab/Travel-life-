import { 
  Destination, 
  HotelStay, 
  PopularCountry, 
  ContinentSector, 
  BudgetArchetype, 
  EditorialArticle, 
  MapPoi, 
  ItineraryItem,
  Currency
} from '../types/travel';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; name: string }> = {
  USD: { rate: 1.0, symbol: '$', name: 'US Dollar' },
  EUR: { rate: 0.92, symbol: '€', name: 'Euro' },
  GBP: { rate: 0.79, symbol: '£', name: 'British Pound' },
  JPY: { rate: 155.0, symbol: '¥', name: 'Japanese Yen' },
  AUD: { rate: 1.52, symbol: 'A$', name: 'Australian Dollar' }
};

export const POPULAR_COUNTRIES: PopularCountry[] = [
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    code: 'LK',
    region: 'Asia',
    tagline: 'Emerald tea hills, ancient rock fortresses & golden whale-watching shores',
    destinationCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'japan',
    name: 'Japan',
    code: 'JP',
    region: 'Asia',
    tagline: 'Zen bamboo groves, alpine onsens & neon gastronomy hubs',
    destinationCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'italy',
    name: 'Italy',
    code: 'IT',
    region: 'Europe',
    tagline: 'Sun-drenched cliffside villages, Renaissance frescoes & culinary heritage',
    destinationCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    code: 'CH',
    region: 'Europe',
    tagline: 'Glacial Matterhorn pinnacles, cogwheel railways & emerald valleys',
    destinationCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    code: 'MV',
    region: 'Asia',
    tagline: 'UNESCO coral atolls, overwater villas & luminescent turquoise lagoons',
    destinationCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    code: 'TH',
    region: 'Asia',
    tagline: 'Karst sea towers, gilded Buddhist wats & vibrant floating markets',
    destinationCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'greece',
    name: 'Greece',
    code: 'GR',
    region: 'Europe',
    tagline: 'White-washed Aegean calderas, ancient temples & sapphire bays',
    destinationCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    region: 'Europe',
    tagline: 'Gothic cathedrals, Côte d’Azur coastal corniche & haute cuisine',
    destinationCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'united-states',
    name: 'United States',
    code: 'US',
    region: 'Americas',
    tagline: 'Canyon abysses, geothermal geysers & Pacific volcanic coastlines',
    destinationCount: 11,
    imageUrl: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    code: 'KE',
    region: 'Africa',
    tagline: 'The Great Migration savannahs, acacia sunrises & Maasai heritage',
    destinationCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    code: 'EG',
    region: 'Middle East',
    tagline: 'Pharaonic monuments, Giza pyramid complexes & timeless Nile feluccas',
    destinationCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    code: 'TR',
    region: 'Middle East',
    tagline: 'Volcanic fairy chimney skies, Bosphorus straits & Byzantine mosaics',
    destinationCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    code: 'ID',
    region: 'Asia',
    tagline: 'Volcanic caldera lakes, Hindu water temples & Komodo dragon isles',
    destinationCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    region: 'Oceania',
    tagline: 'Living coral reefs, iconic Opera sails & red earth gorges',
    destinationCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    code: 'NZ',
    region: 'Oceania',
    tagline: 'Glacial fiords, alpine adventure capitals & pristine subtropical sounds',
    destinationCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  }
];

export const DESTINATIONS: Destination[] = [
  // --- SRI LANKA ---
  {
    id: 'sigiriya',
    name: 'Sigiriya Ancient Rock Fortress',
    country: 'Sri Lanka',
    countryCode: 'LK',
    city: 'Central Province',
    region: 'Asia',
    category: 'Historic Landmarks',
    rating: 4.95,
    reviewsCount: '2,840 verified reviews',
    description: 'A dramatic 200-meter monolith rising from the tropical forest canopy crowned by King Kashyapa’s 5th-century citadel, world-famous fresco maidens, and mirror wall inscriptions.',
    longDescription: 'Sigiriya stands as an engineering miracle of the ancient world. Rising sheer from the dry zone jungle plain, the fortress was designed with intricate water gardens, subterranean hydraulics, wind-draft cooling channels, and massive lion paws framing the staircase to the summit.',
    bestSeason: 'December – April',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 65,
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Sunrise Fortress Ascent', 'Pidurangala Panoramic Hike', 'Water Garden Architecture Walk', 'Minneriya Elephant Safari'],
    coordinates: { lat: 7.9570, lng: 80.7603 },
    highlights: ['5th Century Lion Rock Palace', 'Ancient Frescoes & Mirror Wall', 'Pidurangala Sunset Viewpoint'],
    recommendedStayDays: 2,
    featured: true,
    trending: true
  },
  {
    id: 'ella-rock',
    name: 'Ella & Nine Arch Bridge',
    country: 'Sri Lanka',
    countryCode: 'LK',
    city: 'Badulla District',
    region: 'Asia',
    category: 'Adventure & Hiking',
    rating: 4.92,
    reviewsCount: '1,930 verified reviews',
    description: 'High-altitude Ceylon tea estates, mist-shrouded mountain gaps, cascading Ravana waterfalls, and the iconic colonial viaduct constructed entirely of stone and brick without steel.',
    bestSeason: 'January – May',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 45,
    imageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Scenic Kandy-Ella Blue Train Ride', 'Nine Arch Bridge Train Spotting', 'Little Adam’s Peak Sunrise Trek', 'Ceylon Tea Factory Tasting'],
    coordinates: { lat: 6.8722, lng: 81.0464 },
    highlights: ['Iconic Demodara Viaduct', 'Emerald Tea Terraces', 'Ravana Falls Natural Pools'],
    recommendedStayDays: 3,
    featured: true
  },
  {
    id: 'mirissa-beach',
    name: 'Mirissa Coastal Bay & Secret Beach',
    country: 'Sri Lanka',
    countryCode: 'LK',
    city: 'Southern Province',
    region: 'Asia',
    category: 'Coastal & Beaches',
    rating: 4.88,
    reviewsCount: '1,420 verified reviews',
    description: 'Crescent-shaped golden sand beaches fringed with coconut palms, vibrant surf breaks, calm snorkeling coves with sea turtles, and prime access to Indian Ocean blue whale migration channels.',
    bestSeason: 'November – April',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 50,
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Blue Whale & Dolphin Watching', 'Coconut Tree Hill Sunset Photography', 'Secret Beach Snorkeling', 'Surf Lessons at Weligama Bay'],
    coordinates: { lat: 5.9483, lng: 80.4716 },
    highlights: ['Coconut Tree Hill', 'Indian Ocean Whale Migration', 'Protected Turtle Reef Coves'],
    recommendedStayDays: 3,
    trending: true
  },

  // --- JAPAN ---
  {
    id: 'kyoto',
    name: 'Kyoto Imperial Shrines & Bamboo Groves',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Kansai Region',
    region: 'Asia',
    category: 'Historic Landmarks',
    rating: 4.96,
    reviewsCount: '4,120 verified reviews',
    description: 'The ancient cultural capital of Japan with over 1,600 Buddhist temples, 400 Shinto shrines, meditative stone gardens, tea ceremony pavilions, and traditional preserved machiya townhouses.',
    bestSeason: 'March – May & October – November',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 130,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Fushimi Inari 10,000 Torii Hike', 'Arashiyama Bamboo Grove Walk', 'Uji Ceremonial Matcha Whisking', 'Gion Evening Geisha Walking Tour'],
    coordinates: { lat: 34.9858, lng: 135.7588 },
    highlights: ['Kinkaku-ji Golden Pavilion', 'Fushimi Inari Senbon Torii', 'Gion Historic District'],
    recommendedStayDays: 4,
    featured: true,
    trending: true
  },
  {
    id: 'mount-fuji',
    name: 'Mount Fuji & Lake Kawaguchiko',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Yamanashi Prefecture',
    region: 'Asia',
    category: 'Natural Wonders',
    rating: 4.94,
    reviewsCount: '3,100 verified reviews',
    description: 'The iconic 3,776-meter volcanic cone reflecting across the pristine Fuji Five Lakes, framed by traditional red pagodas, weeping cherry blossoms, and natural mineral onsens.',
    bestSeason: 'July – September (Climbing) / Nov – Feb (Clear Views)',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 140,
    imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Chureito Pagoda Sunrise', 'Fuji Five Lakes Cycling', 'Traditional Ryokan Onsen Soak', 'Mount Fuji Yoshida Trail Climb'],
    coordinates: { lat: 35.3606, lng: 138.7274 },
    highlights: ['UNESCO Sacred Mountain', 'Chureito Pagoda Vista', 'Lake Kawaguchiko Reflection'],
    recommendedStayDays: 2
  },

  // --- ITALY ---
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast & Positano',
    country: 'Italy',
    countryCode: 'IT',
    city: 'Campania Region',
    region: 'Europe',
    category: 'Coastal & Beaches',
    rating: 4.93,
    reviewsCount: '3,850 verified reviews',
    description: 'Pastel-hued cliffside villages cascading into the Tyrrhenian Sea, fragrant lemon groves, the historic Path of the Gods hiking trail, and legendary coastal Italian hospitality.',
    bestSeason: 'May – June & September – October',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 240,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Path of the Gods Clifftop Trek', 'Capri Private Wooden Gozzo Cruise', 'Limoncello Tasting in Ravello', 'Amalfi Cathedral Byzantine Walk'],
    coordinates: { lat: 40.6340, lng: 14.6027 },
    highlights: ['Positano Cliffside Houses', 'Path of the Gods Ridge', 'Ravana Villa Rufolo Gardens'],
    recommendedStayDays: 4,
    featured: true,
    trending: true
  },
  {
    id: 'dolomites',
    name: 'Dolomites Alpine Val Gardena',
    country: 'Italy',
    countryCode: 'IT',
    city: 'South Tyrol',
    region: 'Europe',
    category: 'Natural Wonders',
    rating: 4.97,
    reviewsCount: '2,920 verified reviews',
    description: 'Dramatic limestone needles, high alpine meadows of Alpe di Siusi, turquoise glacial lakes of Lago di Braies, and authentic Ladin mountain rifugios.',
    bestSeason: 'June – September (Hiking) / Dec – March (Skiing)',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 160,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Tre Cime di Lavaredo Loop', 'Seceda Ridgeline Photography', 'Lago di Braies Wooden Rowboating', 'High Alpine Hut-to-Hut Dining'],
    coordinates: { lat: 46.5734, lng: 11.6742 },
    highlights: ['Seceda Pinnacle Ridge', 'Tre Cime di Lavaredo', 'Alpe di Siusi Meadow'],
    recommendedStayDays: 4,
    featured: true
  },

  // --- SWITZERLAND ---
  {
    id: 'zermatt-matterhorn',
    name: 'Zermatt & The Matterhorn',
    country: 'Switzerland',
    countryCode: 'CH',
    city: 'Valais Canton',
    region: 'Europe',
    category: 'Adventure & Hiking',
    rating: 4.98,
    reviewsCount: '3,410 verified reviews',
    description: 'The car-free alpine sanctuary crowned by the legendary 4,478-meter Matterhorn pyramid, serviced by the world’s highest 3S cableway and the Gornergrat cogwheel railway.',
    bestSeason: 'June – September & December – April',
    budgetTier: '$$$$ Ultra-Luxury',
    dailyCostUSD: 310,
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Gornergrat Panoramic Cogwheel Ride', 'Matterhorn Glacier Paradise 3,883m', '5-Lakes Alpine Walk (Riffelsee Reflection)', 'Traditional Swiss Cheese Fondue Dinner'],
    coordinates: { lat: 45.9765, lng: 7.7491 },
    highlights: ['4,478m Matterhorn Peak', 'Car-Free Alpine Village', 'Gornergrat Glacier Vista'],
    recommendedStayDays: 3,
    featured: true
  },
  {
    id: 'lauterbrunnen',
    name: 'Lauterbrunnen Valley of 72 Waterfalls',
    country: 'Switzerland',
    countryCode: 'CH',
    city: 'Bernese Oberland',
    region: 'Europe',
    category: 'Natural Wonders',
    rating: 4.96,
    reviewsCount: '2,640 verified reviews',
    description: 'A deep glacial U-shaped valley bordered by vertical 300-meter cliffs where 72 waterfalls plunge into alpine pastures, the direct real-world inspiration for Tolkien’s Rivendell.',
    bestSeason: 'May – October',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 230,
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Staubbach Falls Cliff Base Walk', 'Trümmelbach Underground Glacial Chutes', 'Wengen Mountain Railway to Männlichen', 'Jungfraujoch Top of Europe Day Trip'],
    coordinates: { lat: 46.5935, lng: 7.9090 },
    highlights: ['Staubbach 300m Freefall Waterfall', 'Rivendell Inspiration Valley', 'Eiger & Jungfrau Panoramic Wall'],
    recommendedStayDays: 3
  },

  // --- MALDIVES ---
  {
    id: 'baa-atoll',
    name: 'Baa Atoll UNESCO Biosphere',
    country: 'Maldives',
    countryCode: 'MV',
    city: 'Baa Atoll',
    region: 'Asia',
    category: 'Coastal & Beaches',
    rating: 4.99,
    reviewsCount: '1,890 verified reviews',
    description: 'An immaculate marine protected area home to Hanifaru Bay, where dozens of giant manta rays and whale sharks gather in nutrient-rich plankton blooms over crystalline coral reefs.',
    bestSeason: 'November – April (Dry) / June – Nov (Manta Aggregations)',
    budgetTier: '$$$$ Ultra-Luxury',
    dailyCostUSD: 420,
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Hanifaru Bay Manta Snorkeling', 'Overwater Bungalow Sunrise Yoga', 'House Reef Bioluminescent Night Dive', 'Castaway Sandbank Private Picnic'],
    coordinates: { lat: 5.1437, lng: 73.0784 },
    highlights: ['UNESCO Hanifaru Bay Manta Aggregations', 'Pristine Live Coral Formations', 'Luminescent Plankton Beaches'],
    recommendedStayDays: 5,
    featured: true,
    trending: true
  },

  // --- THAILAND ---
  {
    id: 'krabi-railay',
    name: 'Krabi Railay Peninsula & Phi Phi Islands',
    country: 'Thailand',
    countryCode: 'TH',
    city: 'Andaman Coast',
    region: 'Asia',
    category: 'Coastal & Beaches',
    rating: 4.89,
    reviewsCount: '3,210 verified reviews',
    description: 'A secluded tropical peninsula accessible only by longtail boat, framed by towering karst limestone walls, hidden turquoise lagoons, and the crystal waters of the Andaman Sea.',
    bestSeason: 'November – April',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 55,
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Deep Water Soloing & Rock Climbing', 'Hong Island Longtail Boat Excursion', 'Phra Nang Cave Beach Sunset', 'Bioluminescent Plankton Night Swim'],
    coordinates: { lat: 8.0119, lng: 98.8398 },
    highlights: ['Phra Nang Princess Cave Beach', 'Sheer 200m Limestone Cliffs', 'Longtail Island Hopping'],
    recommendedStayDays: 4
  },
  {
    id: 'chiang-mai',
    name: 'Chiang Mai Old City & Ethical Sanctuaries',
    country: 'Thailand',
    countryCode: 'TH',
    city: 'Northern Thailand',
    region: 'Asia',
    category: 'Cities & Culture',
    rating: 4.91,
    reviewsCount: '2,980 verified reviews',
    description: 'The historic capital of the ancient Lanna Kingdom enclosed by brick moats, featuring gilded mountain wats at Doi Suthep, artisanal night markets, and ethical elephant rescue sanctuaries.',
    bestSeason: 'November – February',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 40,
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Wat Phra That Doi Suthep Sunrise', 'Ethical Elephant Nature Park Visit', 'Authentic Khao Soi Noodle Tasting', 'Saturday Night Walking Street Market'],
    coordinates: { lat: 18.7883, lng: 98.9853 },
    highlights: ['Wat Phra That Doi Suthep', 'Lanna Heritage Moated City', 'Elephant Rescue Sanctuaries'],
    recommendedStayDays: 3
  },

  // --- GREECE ---
  {
    id: 'santorini-caldera',
    name: 'Santorini Oia & Volcanic Caldera',
    country: 'Greece',
    countryCode: 'GR',
    city: 'Cyclades Islands',
    region: 'Europe',
    category: 'Coastal & Beaches',
    rating: 4.94,
    reviewsCount: '4,450 verified reviews',
    description: 'Iconic white-washed cave dwellings with cobalt blue domes carved directly into sheer volcanic caldera cliffs, overlooking the Aegean Sea and world-famous golden sunsets.',
    bestSeason: 'April – June & September – October',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 220,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Fira to Oia 10km Caldera Rim Trek', 'Volcano & Hot Springs Catamaran Cruise', 'Akrotiri Bronze Age Ruins Tour', 'Assyrtiko Wine Tasting on Cliff Terraces'],
    coordinates: { lat: 36.4618, lng: 25.3753 },
    highlights: ['Oia Windmill Sunset Vista', 'Ancient Thera & Akrotiri Excavation', 'Volcanic Red & Black Sand Beaches'],
    recommendedStayDays: 3,
    featured: true,
    trending: true
  },

  // --- FRANCE ---
  {
    id: 'paris-historic',
    name: 'Paris Heritage & The Seine Corniche',
    country: 'France',
    countryCode: 'FR',
    city: 'Île-de-France',
    region: 'Europe',
    category: 'Cities & Culture',
    rating: 4.92,
    reviewsCount: '5,100 verified reviews',
    description: 'The City of Light along the River Seine, featuring the restored Notre-Dame spire, Montmartre artists’ village, world-class Louvre galleries, and Haussmannian boulevard cafés.',
    bestSeason: 'April – June & September – November',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 195,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Musée d’Orsay Impressionist Wing', 'Montmartre Sacré-Cœur Dawn Walk', 'Sunset Seine Wooden Boat Cruise', 'Artisanal Croissant Tasting in Le Marais'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    highlights: ['Louvre & Musée d’Orsay Masterpieces', 'Restored Notre-Dame Cathedral', 'Montmartre Artists’ Quarter'],
    recommendedStayDays: 4
  },

  // --- KENYA ---
  {
    id: 'maasai-mara',
    name: 'Maasai Mara National Reserve',
    country: 'Kenya',
    countryCode: 'KE',
    city: 'Narok County',
    region: 'Africa',
    category: 'Wildlife Sanctuaries',
    rating: 4.98,
    reviewsCount: '2,150 verified reviews',
    description: 'The premier wildlife sanctuary of East Africa where over 1.5 million wildebeest and zebras brave crocodile-infested Mara River crossings during the annual Great Migration.',
    bestSeason: 'July – October (Migration) / Year-Round (Big Five)',
    budgetTier: '$$$$ Ultra-Luxury',
    dailyCostUSD: 380,
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Sunrise Hot Air Balloon Over Savannah', 'Mara River Crossing Game Drives', 'Maasai Cultural Village Immersion', 'Big Five Safari with Expert Rangers'],
    coordinates: { lat: -1.5020, lng: 35.1444 },
    highlights: ['The Great Migration Mara Crossing', 'Big Five Predator Density', 'Sunrise Savannah Balloon Flights'],
    recommendedStayDays: 4,
    featured: true
  },

  // --- EGYPT ---
  {
    id: 'giza-pyramids',
    name: 'Giza Pyramids & The Nile Valley',
    country: 'Egypt',
    countryCode: 'EG',
    city: 'Greater Cairo',
    region: 'Middle East',
    category: 'Historic Landmarks',
    rating: 4.93,
    reviewsCount: '3,800 verified reviews',
    description: 'The sole surviving wonder of the ancient world: the Great Pyramid of Khufu, the enigmatic Great Sphinx, and millennia of pharaonic civilization along the fertile banks of the Nile.',
    bestSeason: 'October – April',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 60,
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Grand Egyptian Museum (GEM) Visit', 'Private Camel Trek around Pyramids', 'Traditional Nile Felucca Sail at Sunset', 'Khan el-Khalili Historic Spice Souk'],
    coordinates: { lat: 29.9792, lng: 31.1342 },
    highlights: ['Khufu, Khafre & Menkaure Pyramids', 'The Colossal Sphinx of Giza', 'New Grand Egyptian Museum (GEM)'],
    recommendedStayDays: 3,
    featured: true
  },

  // --- TURKEY ---
  {
    id: 'cappadocia',
    name: 'Cappadocia Fairy Chimneys & Goreme',
    country: 'Turkey',
    countryCode: 'TR',
    city: 'Central Anatolia',
    region: 'Middle East',
    category: 'Natural Wonders',
    rating: 4.97,
    reviewsCount: '3,650 verified reviews',
    description: 'A lunar landscape sculpted from volcanic tuff stone, honeycombed with Byzantine underground cities, cave chapels with fresco art, and dawn skies filled with 150 hot air balloons.',
    bestSeason: 'April – June & September – November',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 110,
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Sunrise Hot Air Balloon Flight', 'Derinkuyu Multi-Level Underground City', 'Love Valley & Rose Valley Sunset Horseback', 'Traditional Pottery Workshop in Avanos'],
    coordinates: { lat: 38.6431, lng: 34.8289 },
    highlights: ['Sunrise Hot Air Balloon Fleet', 'Goreme Open Air Museum Frescoes', 'Derinkuyu 8-Level Underground Fortress'],
    recommendedStayDays: 3,
    featured: true,
    trending: true
  },

  // --- UNITED STATES ---
  {
    id: 'grand-canyon',
    name: 'Grand Canyon National Park',
    country: 'United States',
    countryCode: 'US',
    city: 'Arizona',
    region: 'Americas',
    category: 'Natural Wonders',
    rating: 4.97,
    reviewsCount: '4,600 verified reviews',
    description: 'A colossal 1.6-kilometer-deep gorge carved by the Colorado River across two billion years of Earth’s geological strata, with expansive multi-hued vistas stretching across 446 kilometers.',
    bestSeason: 'March – May & September – November',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 145,
    imageUrl: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['South Kaibab Trail to Ooh Aah Point', 'Mather Point Golden Hour Sunrise', 'Hermit Road Scenic Shuttles', 'Colorado River Whitewater Rafting'],
    coordinates: { lat: 36.0544, lng: -112.1401 },
    highlights: ['2-Billion-Year Geological Strata', 'South Kaibab Ridgeline Trek', 'Desert View Watchtower Vista'],
    recommendedStayDays: 3
  },

  // --- CANADA ---
  {
    id: 'banff-lake-louise',
    name: 'Banff National Park & Lake Louise',
    country: 'Canada',
    countryCode: 'CA',
    city: 'Alberta',
    region: 'Americas',
    category: 'Natural Wonders',
    rating: 4.96,
    reviewsCount: '3,890 verified reviews',
    description: 'Luminous turquoise glacial waters fed by the Victoria Glacier, surrounded by dramatic Canadian Rocky Mountain peaks, historic mountain lodges, and dense evergreen pine forests.',
    bestSeason: 'June – September (Canoeing) / Dec – April (Skiing)',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 210,
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Red Canoe Paddling on Lake Louise', 'Plain of Six Glaciers Teahouse Hike', 'Icefields Parkway Scenic Drive to Jasper', 'Banff Upper Hot Springs Soak'],
    coordinates: { lat: 51.4254, lng: -116.1773 },
    highlights: ['Turquoise Glacial Waters', 'Plain of Six Glaciers Teahouse', 'Moraine Lake Valley of the Ten Peaks'],
    recommendedStayDays: 4,
    featured: true
  },

  // --- AUSTRALIA ---
  {
    id: 'great-barrier-reef',
    name: 'Great Barrier Reef & Whitsundays',
    country: 'Australia',
    countryCode: 'AU',
    city: 'Queensland',
    region: 'Oceania',
    category: 'Coastal & Beaches',
    rating: 4.95,
    reviewsCount: '3,450 verified reviews',
    description: 'The world’s largest living organism and coral reef system spanning 2,300 kilometers along the Australian Coral Sea, home to sea turtles, manta rays, and Whitehaven pure silica sands.',
    bestSeason: 'May – November',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 235,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Outer Reef Scuba & Snorkeling', 'Heart Reef Scenic Helicopter Flight', 'Whitehaven Beach Catamaran Cruise', 'Daintree Rainforest Indigenous Eco-Walk'],
    coordinates: { lat: -16.9203, lng: 145.7710 },
    highlights: ['2,300km Living Coral System', 'Whitehaven 98% Silica Sand', 'Heart Reef Coral Formation'],
    recommendedStayDays: 4,
    featured: true
  },

  // --- NEW ZEALAND ---
  {
    id: 'queenstown-milford',
    name: 'Queenstown & Milford Sound Fiordland',
    country: 'New Zealand',
    countryCode: 'NZ',
    city: 'South Island',
    region: 'Oceania',
    category: 'Adventure & Hiking',
    rating: 4.97,
    reviewsCount: '2,900 verified reviews',
    description: 'Towering dark rock monoliths rising vertically from mirror-smooth fiord waters, cascading glacier waterfalls, and the world capital of alpine adventure on the shores of Lake Wakatipu.',
    bestSeason: 'November – April',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 200,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Milford Sound Nature Cruise under Stirling Falls', 'Routeburn Track Alpine Day Hike', 'Queenstown Skyline Gondola & Luge', 'Kawarau Gorge Historic Bungy'],
    coordinates: { lat: -44.6715, lng: 167.9256 },
    highlights: ['Mitre Peak 1,692m Fiord Monolith', 'Stirling Falls Glacial Plunge', 'Scenic Fiordland Highway & Homer Tunnel'],
    recommendedStayDays: 4
  },

  // --- INDIA ---
  {
    id: 'jaipur-amber',
    name: 'Jaipur Pink City & Amber Fort',
    country: 'India',
    countryCode: 'IN',
    city: 'Rajasthan',
    region: 'Asia',
    category: 'Historic Landmarks',
    rating: 4.91,
    reviewsCount: '2,750 verified reviews',
    description: 'The terracotta-pink capital of Rajasthan featuring the honeycomb facade of Hawa Mahal, the mirror-palace halls of Amber Fort, and vibrant bazaars brimming with textiles and jewelry.',
    bestSeason: 'October – March',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 48,
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Amber Fort Royal Hall of Mirrors', 'Hawa Mahal Palace of Winds Early Light', 'City Palace Royal Enclosure Tour', 'Rajasthani Thali Dining in the Old City'],
    coordinates: { lat: 26.9855, lng: 75.8513 },
    highlights: ['Sheesh Mahal Mirror Mosaic', 'Hawa Mahal Honeycomb Windows', 'Panna Meena Ka Kund Stepwell'],
    recommendedStayDays: 3
  },

  // --- INDONESIA ---
  {
    id: 'bali-ubud',
    name: 'Ubud Rice Terraces & Sacred Water Temples',
    country: 'Indonesia',
    countryCode: 'ID',
    city: 'Bali',
    region: 'Asia',
    category: 'Cities & Culture',
    rating: 4.90,
    reviewsCount: '3,800 verified reviews',
    description: 'Verdant stepped Tegallalang rice paddies, spiritual purification springs at Tirta Empul, sacred monkey forests, and Balinese holistic wellness sanctuaries.',
    bestSeason: 'April – October',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 52,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80'
    ],
    activities: ['Tegallalang Sunrise Valley Walk', 'Tirta Empul Water Cleansing Ritual', 'Mount Batur Dawn Volcano Trek', 'Campuhan Ridge Scenic Walkway'],
    coordinates: { lat: -8.5069, lng: 115.2625 },
    highlights: ['Subak Ancient Irrigation Terraces', 'Tirta Empul Holy Springs', 'Artisanal Woodcarving Villages'],
    recommendedStayDays: 4,
    trending: true
  }
];

export const HOTELS: HotelStay[] = [
  // --- SRI LANKA STAYS ---
  {
    id: 'hotel-98-acres',
    name: '98 Acres Resort & Spa',
    destinationId: 'ella-rock',
    destinationName: 'Ella, Sri Lanka',
    city: 'Ella',
    country: 'Sri Lanka',
    type: 'Eco-Lodge',
    rating: 4.94,
    reviewsCount: '1,280 reviews',
    pricePerNightUSD: 180,
    priceRangeLabel: '$160 – $220 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Panoramic Mountain Pool', 'Tea Estate Chalets', 'Organic Restaurant', 'Ayurvedic Spa', 'Free High-Speed WiFi'],
    description: 'An elegant, eco-friendly luxury retreat perched on a 98-acre scenic tea estate facing Ella Gap and Little Adam’s Peak.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 6.8655, lng: 81.0520 },
    featured: true
  },
  {
    id: 'hotel-water-garden-sigiriya',
    name: 'Water Garden Sigiriya',
    destinationId: 'sigiriya',
    destinationName: 'Sigiriya, Sri Lanka',
    city: 'Sigiriya',
    country: 'Sri Lanka',
    type: 'Luxury Resort',
    rating: 4.96,
    reviewsCount: '890 reviews',
    pricePerNightUSD: 240,
    priceRangeLabel: '$220 – $310 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Private Plunge Pool Villas', 'Sigiriya Rock View Terrace', 'Fine Dining Heliconia', 'Luxury Spa', 'Helipad Access'],
    description: 'Surrounded by ancient water canals and tranquil lotus ponds with direct unobstructed views of the UNESCO Sigiriya monolith.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 7.9480, lng: 80.7420 },
    featured: true
  },
  {
    id: 'hotel-mirissa-beach-villas',
    name: 'Sri Sharavi Beachfront Sanctuary',
    destinationId: 'mirissa-beach',
    destinationName: 'Mirissa, Sri Lanka',
    city: 'Mirissa',
    country: 'Sri Lanka',
    type: 'Beach Resort',
    rating: 4.89,
    reviewsCount: '620 reviews',
    pricePerNightUSD: 110,
    priceRangeLabel: '$95 – $140 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Direct Oceanfront Access', 'Infinity Pool', 'Yoga Deck', 'Seafood Grill', 'Surf Board Rentals'],
    description: 'Contemporary boutique oceanfront villas steps away from Mirissa’s golden sands and whale watching marina.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 5.9420, lng: 80.4810 }
  },

  // --- JAPAN STAYS ---
  {
    id: 'hotel-hoshinoya-kyoto',
    name: 'Hoshinoya Kyoto Riverfront Ryokan',
    destinationId: 'kyoto',
    destinationName: 'Kyoto, Japan',
    city: 'Kyoto (Arashiyama)',
    country: 'Japan',
    type: 'Luxury Resort',
    rating: 4.98,
    reviewsCount: '1,120 reviews',
    pricePerNightUSD: 620,
    priceRangeLabel: '$550 – $780 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Private Wooden Boat Transit', 'Michelin-Caliber Kaiseki Dining', 'Historic Machiya Rooms', 'Zen Garden Lounges', 'Tea Ceremony Pavilion'],
    description: 'A restored riverside 17th-century merchant villa accessible only by traditional wooden boat winding up the Oi River gorge.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 35.0116, lng: 135.6778 },
    featured: true
  },
  {
    id: 'hotel-piece-hostel-kyoto',
    name: 'Piece Boutique Hostel Kyoto',
    destinationId: 'kyoto',
    destinationName: 'Kyoto, Japan',
    city: 'Kyoto Central',
    country: 'Japan',
    type: 'Budget Hotel & Hostel',
    rating: 4.88,
    reviewsCount: '3,450 reviews',
    pricePerNightUSD: 42,
    priceRangeLabel: '$35 – $55 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Designer Pod Dorms', 'Private Queen Rooms', 'Communal Chef Kitchen', 'Bar & Craft Beer Lounge', 'Free Japanese Breakfast'],
    description: 'Award-winning Japanese minimalist design hostel steps from Kyoto Shinkansen Station with ultra-clean pods and vibrant community spaces.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 34.9830, lng: 135.7610 }
  },

  // --- ITALY STAYS ---
  {
    id: 'hotel-le-sirenuse',
    name: 'Le Sirenuse Luxury Clifftop Positano',
    destinationId: 'amalfi-coast',
    destinationName: 'Amalfi Coast, Italy',
    city: 'Positano',
    country: 'Italy',
    type: 'Luxury Resort',
    rating: 4.97,
    reviewsCount: '1,540 reviews',
    pricePerNightUSD: 850,
    priceRangeLabel: '$750 – $1,100 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Champagne & Oyster Bar', 'Lemon Tree Pool Terrace', 'Aveda Wellness Spa', 'Private Riva Yacht Excursions', 'Michelin-Rated La Sponda'],
    description: 'An iconic family-run 18th-century palazzo in the heart of Positano overlooking the shimmering pastel houses and Mediterranean bay.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 40.6292, lng: 14.4866 },
    featured: true
  },

  // --- SWITZERLAND STAYS ---
  {
    id: 'hotel-the-omnia',
    name: 'The Omnia Mountain Lodge Zermatt',
    destinationId: 'zermatt-matterhorn',
    destinationName: 'Zermatt, Switzerland',
    city: 'Zermatt',
    country: 'Switzerland',
    type: 'Boutique Stay',
    rating: 4.99,
    reviewsCount: '980 reviews',
    pricePerNightUSD: 490,
    priceRangeLabel: '$420 – $650 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Matterhorn Facing Indoor/Outdoor Pool', 'Cedar Wood Sauna', 'Fireplace Library', 'Ski Room with Boot Warmers', 'Alpine Gourmet Restaurant'],
    description: 'Modern American lodge style perched high on a granite rock 45 meters above the roofs of central Zermatt, accessed via an elevator through the rock.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 45.9780, lng: 7.7460 },
    featured: true
  },

  // --- MALDIVES STAYS ---
  {
    id: 'hotel-soneva-fushi',
    name: 'Soneva Fushi Eco Overwater Reserve',
    destinationId: 'baa-atoll',
    destinationName: 'Baa Atoll, Maldives',
    city: 'Kunfunadhoo Island',
    country: 'Maldives',
    type: 'Luxury Resort',
    rating: 4.99,
    reviewsCount: '840 reviews',
    pricePerNightUSD: 980,
    priceRangeLabel: '$850 – $1,400 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Water Slide into Ocean Lagoon', 'Private Butler Service (Mr./Ms. Friday)', 'Astronomical Observatory', 'Organic Treerop Dining', 'Zero-Waste Marine Center'],
    description: 'The pioneer of barefoot luxury in the Baa Atoll biosphere, with vast sustainable overwater villas featuring direct ocean water slides.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 5.1100, lng: 73.0780 },
    featured: true
  },

  // --- GREECE STAYS ---
  {
    id: 'hotel-canaves-oia',
    name: 'Canaves Oia Suites & Caldera Spa',
    destinationId: 'santorini-caldera',
    destinationName: 'Santorini, Greece',
    city: 'Oia',
    country: 'Greece',
    type: 'Boutique Stay',
    rating: 4.97,
    reviewsCount: '1,420 reviews',
    pricePerNightUSD: 520,
    priceRangeLabel: '$450 – $720 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Cave Pool Suites', 'Cliffside Infinity Pool', 'Caldera Wine Cellar', 'Private Catamaran Charters', 'Sunset Panorama Bar'],
    description: 'Carved into the sheer volcanic cliffs of Oia with whitewashed minimalist architecture and uninterrupted views of the sparkling Aegean caldera.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 36.4630, lng: 25.3780 },
    featured: true
  },

  // --- KENYA STAYS ---
  {
    id: 'hotel-angama-mara',
    name: 'Angama Mara Suspended Safari Lodge',
    destinationId: 'maasai-mara',
    destinationName: 'Maasai Mara, Kenya',
    city: 'Oloololo Escarpment',
    country: 'Kenya',
    type: 'Eco-Lodge',
    rating: 4.99,
    reviewsCount: '760 reviews',
    pricePerNightUSD: 950,
    priceRangeLabel: '$850 – $1,250 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['11-Meter Glass Clifftop Tented Suites', 'Private Safari Vehicles & Trackers', 'Photographic Studio', 'Fitness Center with Mara View', 'Bush Breakfast Setups'],
    description: 'Perched 300 meters above the Maasai Mara floor on the edge of the Great Rift Valley, with legendary 180-degree panoramic views of the migration.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: -1.2580, lng: 35.0310 },
    featured: true
  },

  // --- THAILAND STAYS ---
  {
    id: 'hotel-rayavadee-krabi',
    name: 'Rayavadee Beachfront National Marine Sanctuary',
    destinationId: 'krabi-railay',
    destinationName: 'Krabi, Thailand',
    city: 'Railay',
    country: 'Thailand',
    type: 'Beach Resort',
    rating: 4.95,
    reviewsCount: '1,780 reviews',
    pricePerNightUSD: 360,
    priceRangeLabel: '$310 – $480 / night (est.)',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Two-Story Circular Pavilions', 'The Grotto Cliff Dining', 'Spa with Herbal Steam Room', 'Private Speedboat Transfers', 'Tennis Courts'],
    description: 'Bordering Krabi Marine National Park surrounded by limestone pinnacles and three pristine white sand beaches.',
    bookingUrl: 'https://www.booking.com',
    coordinates: { lat: 8.0080, lng: 98.8410 },
    featured: true
  }
];

export const CONTINENTS: ContinentSector[] = [
  {
    id: 'asia',
    name: 'Asia',
    countriesCount: 48,
    subtitle: 'TEMPLES, CORAL ATOLLS & ALPINE TEA ESTATES',
    statLabel: '14 sovereign nations represented',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    featuredDestinations: ['Sigiriya, Sri Lanka', 'Kyoto, Japan', 'Baa Atoll, Maldives', 'Krabi, Thailand'],
    description: 'Ancient Shinto shrines, sacred Buddhist rock citadels, luminescent coral atolls, and verdant highland tea terraces.'
  },
  {
    id: 'europe',
    name: 'Europe',
    countriesCount: 44,
    subtitle: 'ALPINE PEAKS, OLD-WORLD HERITAGE & COASTAL CORNICHES',
    statLabel: '18 sovereign nations represented',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    featuredDestinations: ['Amalfi Coast, Italy', 'Zermatt, Switzerland', 'Santorini, Greece', 'Paris, France'],
    description: 'Pastel cliffside harbors, cogwheel railways to the Matterhorn, Byzantine monasteries, and centuries of preserved culture.'
  },
  {
    id: 'americas',
    name: 'Americas',
    countriesCount: 35,
    subtitle: 'WILDERNESS CANYONS, GLACIAL LAKES & PACIFIC REEFS',
    statLabel: '12 sovereign nations represented',
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    featuredDestinations: ['Banff, Canada', 'Grand Canyon, USA', 'Tulum, Mexico', 'Rio de Janeiro, Brazil'],
    description: 'Two-billion-year-old canyon abysses, turquoise Rocky Mountain glacial waters, and ancient Mayan oceanfront temples.'
  },
  {
    id: 'africa',
    name: 'Africa & Middle East',
    countriesCount: 54,
    subtitle: 'SAVANNAH MIGRATIONS, PYRAMID TOMBS & HOT AIR BALLOONS',
    statLabel: '15 sovereign nations represented',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    featuredDestinations: ['Maasai Mara, Kenya', 'Giza Pyramids, Egypt', 'Cappadocia, Turkey', 'Cape Town, South Africa'],
    description: 'The Great Migration savannahs, the sole surviving ancient world wonder, and dawn balloon flights over Anatolian fairy chimneys.'
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countriesCount: 14,
    subtitle: 'BARRIER REEFS, SUBANTARCTIC FIORDS & RED GORGES',
    statLabel: '8 sovereign nations represented',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    featuredDestinations: ['Great Barrier Reef, Australia', 'Milford Sound, New Zealand', 'Sydney Harbour'],
    description: 'The world’s largest living coral reef ecosystem and sheer vertical fiord monoliths rising from mirror-smooth waters.'
  }
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'sri-lanka-slow-travel',
    badge: 'CURATED FIELD REPORT',
    badgeColor: 'emerald',
    author: 'Elena R. Vance, Cartographic Fellow',
    readTime: '6 min read',
    title: 'Slow Travel in Ceylon: From Sigiriya’s Water Gardens to Ella’s Mist-Shrouded Tea Lines',
    summary: 'A definitive 10-day slow itinerary charting ancient irrigation systems, scenic narrow-gauge mountain railways, and low-impact coastal homestays across Sri Lanka.',
    seasonalWindow: 'Best Window: December – April',
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80',
    destinationRef: 'sigiriya',
    fullContent: [
      'Travel in Sri Lanka is best experienced along the slow rhythm of the historical Ceylon railway network. Boarding the blue locomotive from Kandy into the tea-covered highlands of Nuwara Eliya and Ella reveals engineering feats constructed over a century ago.',
      'At dawn, ascending the fortress of Sigiriya before the mid-day heat reveals an intricate 5th-century urban masterplan: symmetrical boulder gardens, sophisticated subterranean water channels, and ancient fresco galleries that have withstood fifteen centuries of tropical monsoons.'
    ],
    keyTakeaways: [
      'Reserve first-class observation train tickets at least 30 days in advance.',
      'Climb Pidurangala Rock for an unobstructed direct sunrise vista of Sigiriya.',
      'Support locally certified wildlife safari operators in Minneriya and Yala.'
    ]
  },
  {
    id: 'swiss-alps-rail-guide',
    badge: 'FIELD DISPATCH',
    badgeColor: 'amber',
    author: 'Julian Thorne, Alpine Route Architect',
    readTime: '8 min read',
    title: 'The Car-Free Valleys of the Swiss Alps: Crossing Zermatt and Lauterbrunnen by Cogwheel',
    summary: 'Navigating the car-free villages of Valais and the Bernese Oberland using electric cogwheels, cableways, and historic mountain rifugios.',
    seasonalWindow: 'Best Window: June – September',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    destinationRef: 'zermatt-matterhorn',
    fullContent: [
      'Switzerland’s commitment to car-free alpine preservation offers an unmatched sense of stillness. Arriving in Zermatt, where only quiet electric shuttles and horse carriages operate, immediately reorients your sense of pace.',
      'From the Gornergrat cogwheel train at 3,089 meters, the panorama encompasses 29 four-thousand-meter peaks and the Gorner Glacier, demonstrating how high-altitude transit can coexist harmoniously with fragile glacial environments.'
    ],
    keyTakeaways: [
      'The Swiss Travel Pass covers unlimited travel on federal trains, boats, and mountain buses.',
      'Hike the 5-Lakes Walk in early morning for glass-like Matterhorn reflections in Stellisee.',
      'Carry refillable water flasks; Swiss village fountains provide pristine glacier mineral water.'
    ]
  },
  {
    id: 'cyclades-slow-islands',
    badge: 'EXPEDITION ARCHIVE',
    badgeColor: 'sky',
    author: 'Sofia Katsaros, Mediterranean Historian',
    readTime: '5 min read',
    title: 'Beyond the Oia Crowds: The Geological Wonder of the Aegean Caldera',
    summary: 'Understanding the volcanic origins of Santorini, ancient Thera trade routes, and quiet cliffside paths along the caldera rim.',
    seasonalWindow: 'Best Window: May – June & September',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    destinationRef: 'santorini-caldera',
    fullContent: [
      'The crescent shape of Santorini is the physical rim of a colossal collapsed volcano that altered the course of Bronze Age civilization around 1600 BCE.',
      'Walking the unpaved trail from Fira through Imerovigli to Oia provides breathtaking views uninterrupted by tour buses. Along the ridge, traditional cave houses (yposkafa) show ingenious passive cooling techniques honed over centuries.'
    ],
    keyTakeaways: [
      'Walk the 10km caldera rim trail in the early morning to avoid peak heat.',
      'Explore Akrotiri, one of the Aegean’s most significant prehistoric archaeological sites.',
      'Sample volcanic Assyrtiko wines grown in unique basket-woven ground coils.'
    ]
  }
];

export const INITIAL_ITINERARY_ITEMS: ItineraryItem[] = [
  {
    id: 'it-1',
    day: 1,
    time: '06:30 AM',
    title: 'Pidurangala Rock Sunrise Climb (Sigiriya)',
    duration: '2.5 hrs',
    costUSD: 5,
    note: 'Panoramic view of Sigiriya Rock Fortress in morning golden hour light',
    category: 'activity'
  },
  {
    id: 'it-2',
    day: 1,
    time: '10:00 AM',
    title: 'Ancient Water Gardens & Sigiriya Monolith',
    duration: '3.0 hrs',
    costUSD: 36,
    note: 'UNESCO 5th Century Citadel, Fresco Gallery and Lion Platform',
    category: 'sightseeing'
  },
  {
    id: 'it-3',
    day: 1,
    time: '01:30 PM',
    title: 'Traditional Rice & Curry Lunch in Habarana',
    duration: '1.5 hrs',
    costUSD: 8,
    note: 'Clay pot curries, organic garden vegetables and fresh king coconut',
    category: 'food'
  },
  {
    id: 'it-4',
    day: 2,
    time: '08:30 AM',
    title: 'Scenic Hill Country Train from Kandy to Ella',
    duration: '6.0 hrs',
    costUSD: 12,
    note: 'One of the most scenic railway journeys in the world through tea mountains',
    category: 'transit'
  },
  {
    id: 'it-5',
    day: 2,
    time: '04:30 PM',
    title: 'Demodara Nine Arch Bridge Viaduct Walk',
    duration: '2.0 hrs',
    costUSD: 0,
    note: 'Watch the historic blue locomotive pass across the colonial bridge',
    category: 'sightseeing'
  }
];
export const BUDGET_ARCHETYPES: BudgetArchetype[] = [
  // Backpacker Tier
  {
    id: 'arch-1',
    tier: 'Backpacker',
    name: 'Southeast Asia Backpacker',
    regionLabel: 'ASIA / INDOCHINA',
    dailySpendUSD: 32,
    tagline: 'Street food night markets, shared dorm eco-hostels & local commuter trains.',
    stays: { name: 'Hostel Dorm / Guesthouse', cost: 14 },
    food: { name: 'Street Markets & Local Canteens', cost: 11 },
    transit: { name: 'Local Buses & Scooters', cost: 7 },
    recommendedDuration: '2–4 Weeks',
    perks: ['Authentic street food', 'Social traveler network', 'Maximum geographic freedom']
  },
  {
    id: 'arch-2',
    tier: 'Backpacker',
    name: 'Andean Trail Wanderer',
    regionLabel: 'AMERICAS / ANDES',
    dailySpendUSD: 41,
    tagline: 'Mountain huts, market set menus, and high-altitude public overland routes.',
    stays: { name: 'Refugio & Family Posada', cost: 18 },
    food: { name: 'Comida Corrida & Bakeries', cost: 14 },
    transit: { name: 'Regional Colectivos', cost: 9 },
    recommendedDuration: '10–21 Days',
    perks: ['Direct trailhead access', 'Indigenous market immersion', 'Low equipment cost']
  },
  {
    id: 'arch-3',
    tier: 'Backpacker',
    name: 'Balkan Coast Explorer',
    regionLabel: 'EUROPE / BALKANS',
    dailySpendUSD: 44,
    tagline: 'Adriatic coastal buses, shared apartments, and rustic village tavernas.',
    stays: { name: 'Boutique Hostel Pod', cost: 22 },
    food: { name: 'Pekara Bakeries & Seafood', cost: 15 },
    transit: { name: 'Intercity Coaches', cost: 7 },
    recommendedDuration: '14–30 Days',
    perks: ['Uncrowded pebble coves', 'Affordable Euro travel', 'UNESCO stone old towns']
  },

  // Comfort Tier
  {
    id: 'arch-4',
    tier: 'Comfort',
    name: 'Kyoto & Central Japan Heritage',
    regionLabel: 'ASIA / HONSHU',
    dailySpendUSD: 115,
    tagline: 'Modern business hotels, JR rail passes, and izakaya dining with seasonal sake.',
    stays: { name: 'Midscale Modern Hotel', cost: 65 },
    food: { name: 'Ramen Counters & Izakayas', cost: 34 },
    transit: { name: 'Shinkansen & Subway IC', cost: 16 },
    recommendedDuration: '10–14 Days',
    perks: ['Onsen public baths included', 'Luggage forward service compatible', 'Punctual high-speed transit']
  },
  {
    id: 'arch-5',
    tier: 'Comfort',
    name: 'Mediterranean Coastal Roadtrip',
    regionLabel: 'EUROPE / RIVIERA',
    dailySpendUSD: 135,
    tagline: 'Private boutique B&Bs, compact rental car, cliffside trattorias and espresso bars.',
    stays: { name: 'Charming Seaside Posada', cost: 78 },
    food: { name: 'Osterias & Fresh Pasta', cost: 38 },
    transit: { name: 'Hybrid Compact Rental', cost: 19 },
    recommendedDuration: '7–12 Days',
    perks: ['Hidden cove accessibility', 'Scenic coastal driveways', 'Evening aperitivo culture']
  },
  {
    id: 'arch-6',
    tier: 'Comfort',
    name: 'Costa Rican Eco-Explorer',
    regionLabel: 'AMERICAS / CLOUD FOREST',
    dailySpendUSD: 105,
    tagline: 'Canopy eco-lodges, guided wildlife walks, and farm-to-table volcanic sodas.',
    stays: { name: 'Rainforest Eco-Lodge', cost: 58 },
    food: { name: 'Organic Casados & Fresh Fruit', cost: 28 },
    transit: { name: 'Shared 4x4 Tourist Shuttles', cost: 19 },
    recommendedDuration: '8–14 Days',
    perks: ['Direct biodiversity guides', 'Thermal springs entry', 'Sustainable carbon offset']
  },

  // Luxury Tier
  {
    id: 'arch-7',
    tier: 'Luxury',
    name: 'Swiss Alpine Panorama & Palace',
    regionLabel: 'EUROPE / ALPS',
    dailySpendUSD: 460,
    tagline: '5-star heritage spa grand hotels, 1st class panoramic trains & Michelin alpine dining.',
    stays: { name: 'Grand Spa & Alpine Suite', cost: 280 },
    food: { name: 'Gourmet Degustation & Wine', cost: 125 },
    transit: { name: '1st Class Glacier Express & Heli', cost: 55 },
    recommendedDuration: '5–10 Days',
    perks: ['Thermal mineral springs', 'Matterhorn view balconies', 'Private mountain guides']
  },
  {
    id: 'arch-8',
    tier: 'Luxury',
    name: 'Maldives Overwater Sanctuary',
    regionLabel: 'ASIA / INDIAN OCEAN',
    dailySpendUSD: 590,
    tagline: 'Private lagoon villa with pool, seaplane transfers & private sandbank reef charters.',
    stays: { name: 'Lagoon Overwater Pool Villa', cost: 380 },
    food: { name: 'Underwater Restaurant Dining', cost: 140 },
    transit: { name: 'Twin Otter Seaplane & Yacht', cost: 70 },
    recommendedDuration: '5–8 Days',
    perks: ['Dedicated private Thakuru butler', 'Bioluminescent reef dives', 'Sunset catamaran excursions']
  },
  {
    id: 'arch-9',
    tier: 'Luxury',
    name: 'Serengeti Migration Fly-In Camp',
    regionLabel: 'AFRICA / SAVANNAH',
    dailySpendUSD: 620,
    tagline: 'Luxury canvas tented suites, private Land Cruiser safaris & bush champagne breakfasts.',
    stays: { name: 'Private Luxury Tented Suite', cost: 410 },
    food: { name: 'Sommelier Bush Dinners', cost: 130 },
    transit: { name: 'Bush Plane & Custom Safari 4x4', cost: 80 },
    recommendedDuration: '6–9 Days',
    perks: ['Private wildlife spotter & guide', 'Hot air balloon safari', 'All-inclusive premium cellar']
  }
];
