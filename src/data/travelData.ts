import { Destination, ContinentSector, BudgetArchetype, EditorialArticle, MapPoi, ItineraryItem } from '../types/travel';

export const CONTINENTS: ContinentSector[] = [
  {
    id: 'europe',
    name: 'Europe',
    countriesCount: 44,
    subtitle: 'OLD WORLD HERITAGE & RAIL ROUTES',
    statLabel: '240+ curated expeditions',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    featuredDestinations: ['Amalfi Coast', 'Swiss Alps', 'Cyclades'],
    description: 'High-speed rail corridors, Roman antiquity, Mediterranean coastlines, and alpine passes.'
  },
  {
    id: 'asia',
    name: 'Asia',
    countriesCount: 48,
    subtitle: 'TEMPLES, MEGACITIES & ARCHIPELAGOS',
    statLabel: '390+ curated expeditions',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    featuredDestinations: ['Kyoto', 'Hanoi', 'Raja Ampat'],
    description: 'Ancient Shinto shrines, culinary night markets, limestone karsts, and tranquil tea terraces.'
  },
  {
    id: 'americas',
    name: 'Americas',
    countriesCount: 35,
    subtitle: 'WILDERNESS & ANCIENT RUINS',
    statLabel: '410+ destinations',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    featuredDestinations: ['Banff', 'Oaxaca', 'Patagonia'],
    description: 'Glacial Rocky Mountain lakes, Mayan ruins, Andean trails, and dense Amazonian rainforests.'
  },
  {
    id: 'africa',
    name: 'Africa',
    countriesCount: 54,
    subtitle: 'SAVANNAHS, DUNES & CRADLES',
    statLabel: '310+ destinations',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    featuredDestinations: ['Serengeti', 'Namib Desert', 'Zanzibar'],
    description: 'The Great Migration, Sahara dunes, vibrant souks, and volcanic wildlife sanctuaries.'
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countriesCount: 14,
    subtitle: 'ATOLLS, CORAL REEFS & OUTBACK',
    statLabel: '135+ destinations',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    featuredDestinations: ['Great Barrier Reef', 'Milford Sound', 'Fiji Atolls'],
    description: 'Polynesian waters, sacred red desert gorges, barrier reefs, and subantarctic sounds.'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    country: 'Japan',
    region: 'Asia',
    badge: 'BEST SPRING SEASON',
    badgeType: 'season',
    categoryLabel: 'Historic • Cultural',
    category: 'Historic Landmarks',
    rating: 4.90,
    reviewsCount: '1.8k',
    description: 'Ancient temples, moss rock gardens, preserved tea houses, and tranquil bamboo pathways.',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 95,
    duration: '4-6 Days',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    locationTag: 'JAPAN • KANSAI',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    elevation: '55m',
    bestMonths: 'March - May (Sakura) & October - November (Autumn foliage)',
    highlights: ['Fushimi Inari Taisha 10,000 Torii', 'Arashiyama Sagano Bamboo Grove', 'Kinkaku-ji Golden Pavilion', 'Gion Geisha District'],
    dayByDaySample: [
      { day: 1, title: 'Eastern Foothills & Torii Corridors', items: ['Dawn hike up Mt. Inari before crowds', 'Green matcha ceremony in Higashiyama', 'Sunset panorama from Kiyomizu-dera wooden terrace'] },
      { day: 2, title: 'Bamboo Groves & Zen Hermitages', items: ['Arashiyama early bamboo walk', 'Tenryu-ji landscape pond garden', 'Okochi Sanso teahouse viewpoint'] },
      { day: 3, title: 'Historic Markets & Twilight Gion', items: ['Nishiki Market street sampling (tsukemono, yuba)', 'Philosopher’s Path canal stroll', 'Evening walk along Shirakawa canal in Gion'] }
    ]
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    country: 'Italy',
    region: 'Europe',
    badge: 'COASTAL GEM',
    badgeType: 'gem',
    categoryLabel: 'Scenic • Luxury',
    category: 'Coastal & Beaches',
    rating: 4.85,
    reviewsCount: '2.4k',
    description: 'Cliffside pastel villages, serpentine panoramic coastal routes, and fragrant hillside lemon groves.',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 230,
    duration: '3-5 Days',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    locationTag: 'ITALY • CAMPANIA',
    coordinates: { lat: 40.6340, lng: 14.6027 },
    elevation: '20m',
    bestMonths: 'May - June & September - October',
    highlights: ['Positano vertical cliffside alleys', 'Path of the Gods clifftop trek', 'Ravello cliff gardens of Villa Cimbrone', 'Capri grottos private boat trip'],
    dayByDaySample: [
      { day: 1, title: 'Arrival & Positano Cascade', items: ['Check into boutique clifftop retreat', 'Ferry arrival past pastel facades', 'Dinner at Da Vincenzo with local Falanghina'] },
      { day: 2, title: 'Sentiero degli Dei (Path of the Gods)', items: ['Bomerano to Nocelle high ridge hike', 'Limoncello granita in Montepertuso', 'Sunset swim at Fornillo beach'] },
      { day: 3, title: 'Ravello Heights & Amalfi Duomo', items: ['Villa Rufolo medieval panoramic gardens', 'Amalfi Arab-Norman cathedral facade', 'Pasticceria Pansa lemon pastries'] }
    ]
  },
  {
    id: 'banff',
    name: 'Banff National Park, Canada',
    country: 'Canada',
    region: 'Americas',
    badge: 'NATURAL WONDER',
    badgeType: 'wonder',
    categoryLabel: 'Wilderness • Hiking',
    category: 'Natural Wonders',
    rating: 4.88,
    reviewsCount: '3.1k',
    description: 'Electrifying turquoise glacial waters, rugged Rocky Mountain spires, and subalpine wildlife corridors.',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 110,
    duration: '5-7 Days',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80',
    locationTag: 'CANADA • ALBERTA',
    coordinates: { lat: 51.1784, lng: -115.5708 },
    elevation: '1,383m',
    bestMonths: 'July - August (hiking & turquoise lakes) or Dec - March (powder ski)',
    highlights: ['Lake Louise glacial shoreline', 'Moraine Lake Valley of the Ten Peaks', 'Icefields Parkway road expedition', 'Johnston Canyon catwalks'],
    dayByDaySample: [
      { day: 1, title: 'Lake Louise & Plain of Six Glaciers', items: ['Sunrise at Lake Louise shoreline', 'Hike up to Swiss-style Lake Agnes Tea House', 'Canoe rental on turquoise glacial melt'] },
      { day: 2, title: 'Moraine Lake & Larch Valley', items: ['Valley of the Ten Peaks photo vantage', 'Sentinel Pass elevation scramble', 'Evening soak in Banff Upper Hot Springs'] },
      { day: 3, title: 'Icefields Parkway Expedition', items: ['Bow Lake & Peyto Lake lookout', 'Athabasca Glacier ice-walk excursion', 'Columbia Icefield discovery center'] }
    ]
  },
  {
    id: 'serengeti',
    name: 'Serengeti, Tanzania',
    country: 'Tanzania',
    region: 'Africa',
    badge: 'TOP ADVENTURE',
    badgeType: 'adventure',
    categoryLabel: 'Safari • Wildlife',
    category: 'Adventure & Hiking',
    rating: 4.97,
    reviewsCount: '1.2k',
    description: 'The world-famous Great Migration across boundless savannah plains, predator habitats, and starry skies.',
    budgetTier: '$$$ Safari',
    dailyCostUSD: 310,
    duration: '6-8 Days',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    locationTag: 'TANZANIA • MARA REGION',
    coordinates: { lat: -2.3333, lng: 34.8333 },
    elevation: '1,600m',
    bestMonths: 'July - October (Mara River crossing) & Jan - Feb (calving season)',
    highlights: ['Seronera Valley big cat safaris', 'Grumeti and Mara river crossings', 'Dawn hot air balloon over acacia plains', 'Maasai wilderness tracker guides'],
    dayByDaySample: [
      { day: 1, title: 'Fly-In to Seronera Valley', items: ['Bush plane landing on gravel airstrip', 'Afternoon game drive tracking lion prides', 'Bush camp campfire storytelling under Orion'] },
      { day: 2, title: 'Mara River Migration Vigil', items: ['Sunrise drive tracking 100,000+ wildebeest herds', 'Crocodile and zebra crossing watchpoints', 'Picnic lunch under whistling acacia trees'] },
      { day: 3, title: 'Dawn Balloon Flight & Kopjes', items: ['Silent hot air balloon ascent over waking herds', 'Champagne breakfast in open savannah', 'Moru Kopjes black rhino reserve search'] }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini & Cyclades',
    country: 'Greece',
    region: 'Europe',
    badge: 'ROMANTIC ESCAPE',
    badgeType: 'romance',
    categoryLabel: 'Islands • Romance',
    category: 'Coastal & Beaches',
    rating: 4.80,
    reviewsCount: '4.2k',
    description: 'Caldera rim lookouts, volcanic black beaches, subterranean wine cellars, and Aegean sailing.',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 245,
    duration: '3-4 Days',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    locationTag: 'GREECE • CYCLADES',
    coordinates: { lat: 36.3932, lng: 25.4615 },
    elevation: '300m',
    bestMonths: 'Late April - June & September - October',
    highlights: ['Oia caldera sunset cliff trail', 'Assyrtiko volcanic wine tasting', 'Akrotiri Bronze Age Minoan ruins', 'Red Beach and White Beach catamaran'],
    dayByDaySample: [
      { day: 1, title: 'Fira to Oia Caldera Rim Hike', items: ['10km cliff path between Fira, Imerovigli, and Oia', 'Skoutari cliff cave photo points', 'Sunset over Ammoudi Bay'] },
      { day: 2, title: 'Volcano & Catamaran Cruise', items: ['Nea Kameni active volcanic crater walk', 'Palea Kameni sulfur hot springs swim', 'Barbecue seafood lunch on deck'] },
      { day: 3, title: 'Minoan History & Wine Caves', items: ['Akrotiri excavated prehistoric city', 'Santo Wines terrace overlooking the crater', 'Dinner in Megalochori quiet village square'] }
    ]
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca, Mexico',
    country: 'Mexico',
    region: 'Americas',
    badge: 'FOOD CAPITAL',
    badgeType: 'food',
    categoryLabel: 'Gastronomy • Artisanal',
    category: 'Historic Landmarks',
    rating: 4.92,
    reviewsCount: '1.9k',
    description: 'Centuries-old mole recipes, smoky mezcal distilleries, Zapotec ruins, and vibrant textile markets.',
    budgetTier: '$ Budget-Friendly',
    dailyCostUSD: 42,
    duration: '4-5 Days',
    imageUrl: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1000&q=80',
    locationTag: 'MEXICO • OAXACA STATE',
    coordinates: { lat: 17.0732, lng: -96.7266 },
    elevation: '1,555m',
    bestMonths: 'October - March (Día de los Muertos in late Oct)',
    highlights: ['Mercado 20 de Noviembre smoke alley', 'Monte Albán ancient Zapotec acropolis', 'Hierve el Agua petrified waterfalls', 'Traditional wild agave mezcal palenques'],
    dayByDaySample: [
      { day: 1, title: 'Colonial Heart & Smoke Hall', items: ['Santo Domingo golden baroque monastery', 'Pasillo de Humo grilled tasajo and chorizo', 'Zócalo evening marimba performances'] },
      { day: 2, title: 'Monte Albán & Artisan Pueblos', items: ['Pre-Columbian hilltop pyramids of Monte Albán', 'San Antonio Arrazola alebrije woodcarvers', 'Mole negro degustation at Casa Oaxaca'] },
      { day: 3, title: 'Hierve el Agua & Mezcal Trail', items: ['Mineral spring infinity pools at cliff edge', 'Matatlán traditional artisanal copper pot distilleries', 'Teotitlán del Valle natural cochineal rug weaving'] }
    ]
  },
  {
    id: 'patagonia',
    name: 'Torres del Paine, Chile',
    country: 'Chile',
    region: 'Americas',
    badge: 'EXPEDITION CIRCUIT',
    badgeType: 'adventure',
    categoryLabel: 'Wilderness • Glaciers',
    category: 'Adventure & Hiking',
    rating: 4.94,
    reviewsCount: '1.4k',
    description: 'Towering granite horn peaks, roaring glacial icefalls, cobalt lakes, and wind-sculpted steppe.',
    budgetTier: '$$ Mid-Range',
    dailyCostUSD: 98,
    duration: '5-9 Days',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: -51.2532, lng: -72.8814 },
    elevation: '2,884m',
    bestMonths: 'November - March',
    highlights: ['Base de las Torres granite towers', 'French Valley hanging glacier amphitheater', 'Grey Glacier iceberg navigation', 'Guanaco herds and Andean condor spotting'],
    dayByDaySample: [
      { day: 1, title: 'Las Torres Ascent', items: ['Early morning climb to Mirador Las Torres', 'Glacial tarn reflection under dawn light', 'Refugio Central dinner and route review'] },
      { day: 2, title: 'Valle del Francés', items: ['Catamaran across Lake Pehoé', 'Listening to thunderous avalanches from Paine Grande', 'Plateau view of the granite Los Cuernos'] }
    ]
  },
  {
    id: 'raja-ampat',
    name: 'Raja Ampat, Indonesia',
    country: 'Indonesia',
    region: 'Asia',
    badge: 'MARINE SANCTUARY',
    badgeType: 'gem',
    categoryLabel: 'Atolls • Diving',
    category: 'Coastal & Beaches',
    rating: 4.96,
    reviewsCount: '980',
    description: 'The global epicenter of marine biodiversity with emerald mushroom karst islets and pristine reef gardens.',
    budgetTier: '$$$ Luxury',
    dailyCostUSD: 210,
    duration: '7-10 Days',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: -0.2333, lng: 130.5167 },
    elevation: '10m',
    bestMonths: 'October - April',
    highlights: ['Pianemo karst archipelago overlook', 'Manta Sandy cleaning station dive', 'Red bird-of-paradise dawn lek', 'Yenbuba jetty coral gardens'],
    dayByDaySample: [
      { day: 1, title: 'Waisai to Homestay Haven', items: ['Wooden boat transit through crystalline channels', 'Check in to overwater bamboo stilt bungalow', 'House reef twilight snorkel with blacktip reef sharks'] }
    ]
  }
];

export const BUDGET_ARCHETYPES: BudgetArchetype[] = [
  {
    id: 'vietnam',
    tier: 'Backpacker',
    name: 'Vietnam (Hanoi & Da Nang)',
    regionLabel: 'SOUTHEAST ASIA',
    dailySpendUSD: 32,
    tagline: 'Exceptional street gastronomy, high-speed rail access, and scenic limestone coasts.',
    stays: { name: 'Stay (Hostel/Guesthouse)', cost: 12 },
    food: { name: 'Food & Coffee', cost: 11 },
    transit: { name: 'Local Transit & Sim', cost: 9 },
    recommendedDuration: '14-21 Days',
    perks: ['Egg coffee & Bánh mì everywhere', 'Sleeper buses between UNESCO sites', 'Unmatched value per dollar']
  },
  {
    id: 'portugal',
    tier: 'Backpacker',
    name: 'Portugal (Porto & Silver Coast)',
    regionLabel: 'SOUTHERN EUROPE',
    dailySpendUSD: 42,
    tagline: 'Historic tiled quarters, coastal walking paths, metro transit networks, and surf breaks.',
    stays: { name: 'Stay (Co-living/Hostel)', cost: 20 },
    food: { name: 'Food & Bakeries', cost: 14 },
    transit: { name: 'Urban Train & Metro', cost: 8 },
    recommendedDuration: '10-14 Days',
    perks: ['€1.50 Pastéis de Nata & Espresso', 'Urban rail along Atlantic coast', 'Safe walking cities with beach access']
  },
  {
    id: 'guatemala',
    tier: 'Backpacker',
    name: 'Guatemala (Antigua & Lake Atitlán)',
    regionLabel: 'CENTRAL AMERICA',
    dailySpendUSD: 28,
    tagline: 'Volcanic panoramic hikes, artisan weaving villages, and world-class coffee plantations.',
    stays: { name: 'Stay (Eco-Lodge/Shared)', cost: 10 },
    food: { name: 'Comedores & Markets', cost: 11 },
    transit: { name: 'Water Taxis & Buses', cost: 7 },
    recommendedDuration: '12-16 Days',
    perks: ['Lancha boat transport on the lake', 'Acatenango volcanic base camps', 'Rich Mayan textile traditions']
  },
  // Comfort Archetypes
  {
    id: 'taiwan',
    tier: 'Comfort',
    name: 'Taiwan (Taipei & Taroko)',
    regionLabel: 'EAST ASIA',
    dailySpendUSD: 78,
    tagline: 'Night market feasts, bullet train coastlines, mountain hot springs, and lush tea trails.',
    stays: { name: 'Stay (Boutique Hotel/Apt)', cost: 42 },
    food: { name: 'Gourmet Din Tai Fung & Markets', cost: 22 },
    transit: { name: 'High Speed Rail & Metro', cost: 14 },
    recommendedDuration: '10-14 Days',
    perks: ['EasyCard universal transit', '24h convenience store services', 'Sublime marble canyon hiking']
  },
  {
    id: 'greece-mainland',
    tier: 'Comfort',
    name: 'Greece (Meteora & Peloponnese)',
    regionLabel: 'MEDITERRANEAN',
    dailySpendUSD: 85,
    tagline: 'Monasteries atop sandstone pillars, seaside tavernas, olive groves, and historic ruins.',
    stays: { name: 'Stay (Stone Guesthouse)', cost: 48 },
    food: { name: 'Taverna Meze & Fresh Fish', cost: 24 },
    transit: { name: 'Rental Car & Fuel', cost: 13 },
    recommendedDuration: '8-12 Days',
    perks: ['Uncrowded monasteries at dawn', 'Farm-to-table Greek olive oils', 'Ancient Epidaurus & Mycenae']
  },
  {
    id: 'costa-rica',
    tier: 'Comfort',
    name: 'Costa Rica (Monteverde & Manuel Antonio)',
    regionLabel: 'CENTRAL AMERICA',
    dailySpendUSD: 95,
    tagline: 'Cloud forest canopies, sloth sanctuaries, Pacific sunsets, and certified organic coffee.',
    stays: { name: 'Stay (Rainforest Eco-Cabin)', cost: 52 },
    food: { name: 'Sodas & Ocean Seafood', cost: 26 },
    transit: { name: 'Intercity Shuttles', cost: 17 },
    recommendedDuration: '9-14 Days',
    perks: ['Ziplining through mist canopies', 'Trained naturalist wildlife guides', '100% renewable energy focus']
  },
  // Luxury Archetypes
  {
    id: 'switzerland',
    tier: 'Luxury',
    name: 'Switzerland (Zermatt & Lucerne)',
    regionLabel: 'CENTRAL EUROPE',
    dailySpendUSD: 310,
    tagline: 'Matterhorn glacier views, Glacier Express panoramas, private spas, and fondue chalets.',
    stays: { name: 'Stay (Alpine Spa Chalet)', cost: 195 },
    food: { name: 'Michelin Stübli Dining', cost: 75 },
    transit: { name: '1st Class Swiss Travel Pass', cost: 40 },
    recommendedDuration: '7-10 Days',
    perks: ['Unlimited scenic panoramic trains', 'Heated infinity pools facing peaks', 'Private mountain guides']
  },
  {
    id: 'japan-luxury',
    tier: 'Luxury',
    name: 'Japan (Hakone & Kyoto Ryokan)',
    regionLabel: 'EAST ASIA',
    dailySpendUSD: 285,
    tagline: 'Private onsen hot springs, multi-course kaiseki banquets, and tea master ceremonies.',
    stays: { name: 'Stay (Historic Luxury Ryokan)', cost: 180 },
    food: { name: 'Kaiseki & Wagyu Gastronomy', cost: 75 },
    transit: { name: 'Shinkansen Green Car', cost: 30 },
    recommendedDuration: '6-9 Days',
    perks: ['Open-air cedar tubs with Mt Fuji views', 'Yukata robes & seasonal cuisine', 'Luggage forwarding services']
  },
  {
    id: 'norway',
    tier: 'Luxury',
    name: 'Norway (Lofoten & Geirangerfjord)',
    regionLabel: 'SCANDINAVIA',
    dailySpendUSD: 295,
    tagline: 'Architectural rorbu sea cabins, midnight sun sailing, king crab feasts, and fjord safaris.',
    stays: { name: 'Stay (Designer Waterfront Cabin)', cost: 185 },
    food: { name: 'Nordic Foraged Gastronomy', cost: 70 },
    transit: { name: 'Electric Fjord Ferry & EV', cost: 40 },
    recommendedDuration: '8-12 Days',
    perks: ['Private silent electric catamaran', 'Aurora borealis or midnight sun', 'Sauna sessions with arctic plunge']
  }
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'hidden-temples',
    badge: 'CULTURAL ARCHAEOLOGY',
    badgeColor: 'border-amber-700/30 text-amber-800 bg-amber-50',
    author: 'Clara Vance',
    readTime: '7 min read',
    title: 'Hidden Temples of Southeast Asia: Beyond the Crowds',
    summary: 'How to respectfully explore off-grid Khmer sanctuaries, remote Lao stupas, and forgotten river shrines without tour bus congestion.',
    seasonalWindow: 'Seasonal Window: Oct - Feb',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
    fullContent: [
      'While sunrise at Angkor Wat draws thousands of visitors daily, just 45 kilometers deeper into the Siem Reap jungle lies Beng Mealea—a 12th-century temple still swallowed by strangler figs and jungle vines.',
      'By traveling with localized tuk-tuk drivers who speak Khmer and navigating between 6:30 AM and 9:00 AM, independent explorers can experience ancient lintels and carvings in meditative silence.',
      'In Champasak, Southern Laos, the pre-Angkorian Wat Phou rests on the slopes of Mount Phu Kao. Designated as a UNESCO World Heritage site, it rarely sees more than thirty visitors an hour, offering panoramic views across the Mekong river basin.',
      'Cultural etiquette protocol: Ensure shoulders and knees remain covered, hire village guides whose fees directly support local school foundations, and refrain from touching fragile sandstone reliefs.'
    ],
    keyTakeaways: [
      'Visit between dawn and 9:00 AM for soft morning light and zero tour coaches.',
      'Opt for Beng Mealea, Koh Ker, and Banteay Chhmar instead of the inner circuit.',
      'Always dress respectfully and carry crisp small bills for local restoration conservancies.'
    ]
  },
  {
    id: 'patagonia-hiking',
    badge: 'LOW-IMPACT TREKKING',
    badgeColor: 'border-emerald-700/30 text-emerald-800 bg-emerald-50',
    author: 'Mateo Morales',
    readTime: '11 min read',
    title: 'Sustainable Hiking in Patagonia: The High Wind Circuit',
    summary: 'Leave-no-trace protocols, hut reservations, micro-weather navigation, and supporting grassroots conservation in Southern Chile.',
    seasonalWindow: 'Seasonal Window: Nov - Mar',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    fullContent: [
      'Patagonia is one of the most fragile wilderness ecosystems on earth. With the rise of international trekking on the W and O circuits in Torres del Paine, park rangers have enacted strict carrying-capacity regulations.',
      'Every hiker must carry all non-biodegradable waste out of the park. Open campfires are banned under Chilean penal law following historical accidental wildfires caused by tourist stoves.',
      'Wind conditions can shift from 15 knots to 80-knot gusts in under thirty minutes across Paso John Gardner. Waterproof technical shells rated to 28,000mm hydrostatic head are non-negotiable.',
      'Support local estancias and regenerative horse trekking outfits around Puerto Natales. Many former cattle ranches have transitioned into private conservation reserves protecting the endangered huemul deer and Andean condor.'
    ],
    keyTakeaways: [
      'Reserve CONAF camping permits a minimum of 6 months in advance.',
      'Pack four-season gear: sub-zero sleep systems and high-denier windbreak shelters.',
      'Always filter glacial meltwater downstream from wildlife grazing meadows.'
    ]
  },
  {
    id: 'european-rail',
    badge: 'TRANSIT JOURNAL',
    badgeColor: 'border-blue-700/30 text-blue-800 bg-blue-50',
    author: 'Jonas Lindqvist',
    readTime: '9 min read',
    title: 'The Complete European Rail Itinerary: 21 Days, 6 Borders',
    summary: 'Connecting Amsterdam to Vienna, Ljubljana, and the Adriatic coast using Eurail passes, sleeper carriages, and city bike rentals.',
    seasonalWindow: 'Seasonal Window: Apr - Oct',
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
    fullContent: [
      'Air travel across Europe accounts for significant carbon emissions, yet modern high-speed lines and night trains offer a far more romantic, civilized rhythm of travel.',
      'The journey starts at Amsterdam Centraal on the ÖBB Nightjet, waking up over fresh rolls and espresso as the train glides along the Bavarian Alps into Vienna.',
      'From Vienna, take the historic Semmering railway—a 19th-century engineering marvel of stone viaducts and curved tunnels—down into the emerald waters of Slovenia’s Lake Bled and Ljubljana.',
      'End on the coastal branch toward Trieste and Venice, where historic passenger ferries connect directly to lagoon islands. Total transit cost with an advance 7-day-in-1-month Eurail Global Pass averages under €340.'
    ],
    keyTakeaways: [
      'Book Nightjet couchette or sleeper compartments 90 days out for best privacy.',
      'Download the Rail Planner app for real-time offline timetable sync.',
      'Carry a lightweight bike lock to utilize station bike-share networks at every stop.'
    ]
  }
];

export const INITIAL_ITINERARY_ITEMS: ItineraryItem[] = [
  {
    id: 'item-1',
    day: 1,
    time: '09:00 AM',
    title: 'Fushimi Inari Early Ascent',
    duration: '2.5 hrs',
    costUSD: 0,
    note: 'Estimated $0 Entrance Fee • Beat morning tour buses',
    category: 'sightseeing'
  },
  {
    id: 'item-2',
    day: 1,
    time: '11:30 AM',
    title: 'Nishiki Market Tasting Tour',
    duration: '1.5 hrs',
    costUSD: 25,
    note: '$25 Food Budget • Grilled seafood, sesame dango',
    category: 'food'
  },
  {
    id: 'item-3',
    day: 1,
    time: '05:00 PM',
    title: 'Kiyomizu-dera Sunset Overlook',
    duration: '2.0 hrs',
    costUSD: 4,
    note: '$4 Ticket • Golden Hour panoramic timber terrace',
    category: 'sightseeing'
  },
  {
    id: 'item-4',
    day: 2,
    time: '08:30 AM',
    title: 'Arashiyama Sagano Bamboo Path',
    duration: '2.0 hrs',
    costUSD: 0,
    note: 'Free entry • Early morning rustling leaves',
    category: 'sightseeing'
  },
  {
    id: 'item-5',
    day: 2,
    time: '01:00 PM',
    title: 'Traditional Matcha Ceremony',
    duration: '1.5 hrs',
    costUSD: 30,
    note: '$30 fee • Historic Uji green tea master',
    category: 'activity'
  }
];

export const MAP_POIS: MapPoi[] = [
  {
    id: 'poi-tokyo-station',
    name: 'Tokyo Central Station',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 58, y: 48, lat: 35.6812, lng: 139.7671 },
    category: 'Transit',
    duration: '0.5 hrs',
    costUSD: 0,
    description: 'Iconic red-brick 1914 Marunouchi facade & Shinkansen hub.',
    rating: 4.8
  },
  {
    id: 'poi-ueno',
    name: 'Ueno Cultural Park',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 62, y: 35, lat: 35.7140, lng: 139.7741 },
    category: 'Nature',
    duration: '2.0 hrs',
    costUSD: 5,
    description: 'Shinobazu Lotus Pond, Tokyo National Museum & cherry trees.',
    rating: 4.7
  },
  {
    id: 'poi-asakusa',
    name: 'Senso-ji Temple & Kaminarimon',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 68, y: 38, lat: 35.7148, lng: 139.7967 },
    category: 'Historic',
    duration: '2.0 hrs',
    costUSD: 0,
    description: 'Tokyo’s oldest Buddhist sanctuary with giant red paper lantern.',
    rating: 4.9
  },
  {
    id: 'poi-ginza',
    name: 'Ginza Architectural District',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 57, y: 55, lat: 35.6719, lng: 139.7640 },
    category: 'Food',
    duration: '3.0 hrs',
    costUSD: 45,
    description: 'World-renowned patisseries, tea salons, and art galleries.',
    rating: 4.6
  },
  {
    id: 'poi-shibuya',
    name: 'Shibuya Crossing & Sky Lookout',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 42, y: 58, lat: 35.6595, lng: 139.7005 },
    category: 'Viewpoint',
    duration: '1.5 hrs',
    costUSD: 18,
    description: '360° open-air rooftop observation deck overlooking Mt. Fuji.',
    rating: 4.9
  },
  {
    id: 'poi-kyoto-fushimi',
    name: 'Fushimi Inari Taisha',
    city: 'Kyoto',
    country: 'Japan',
    coordinates: { x: 48, y: 72, lat: 34.9671, lng: 135.7727 },
    category: 'Historic',
    duration: '2.5 hrs',
    costUSD: 0,
    description: 'Mountain trail adorned with thousands of vermilion torii gates.',
    rating: 4.95
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 151.5 },
  AUD: { symbol: 'A$', rate: 1.54 }
};
