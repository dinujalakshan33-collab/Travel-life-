export interface SriLankaDestination {
  id: string;
  name: string;
  nativeName?: string;
  region: 'Cultural Triangle' | 'Central Hill Country' | 'Southern Coast' | 'Eastern Province' | 'Northern Peninsula';
  category: 'Culture & Heritage' | 'Hill Country & Hiking' | 'Wildlife & Safari' | 'Coastal & Beaches';
  coordinates: { lat: number; lng: number };
  elevation?: string;
  description: string;
  highlights: string[];
  bestSeason: string;
  recommendedDuration: string;
  historicalSignificance: string;
  travelTips: string;
  imageUrl: string;
  rating: number;
  reviewCount: string;
}

export interface SriLankaItinerary {
  id: string;
  days: number;
  title: string;
  subtitle: string;
  summary: string;
  idealFor: string;
  routeStops: string[];
  transportMode: string;
  budgetBreakdown: {
    backpackerUSD: number;
    midRangeUSD: number;
    luxuryUSD: number;
  };
  schedule: {
    day: number;
    title: string;
    route: string;
    morning: string;
    afternoon: string;
    evening: string;
    transitNote?: string;
  }[];
}

export const SRI_LANKA_KEY_FACTS = {
  officialName: 'Democratic Socialist Republic of Sri Lanka',
  nativeNames: 'ශ්‍රී ලංකා • இலங்கை',
  capital: 'Sri Jayawardenepura Kotte (Administrative) / Colombo (Commercial)',
  largestCity: 'Colombo',
  population: '22.2 Million',
  currency: 'Sri Lankan Rupee (LKR) — ~305 LKR / 1 USD',
  languages: 'Sinhala & Tamil (Official), English widely spoken in hospitality and commerce',
  timeZone: 'Sri Lanka Standard Time (UTC+05:30, No DST)',
  callingCode: '+94',
  drivingSide: 'Left',
  plugTypes: 'Type D, G, M (230V, 50Hz)',
  emergencyNumbers: 'Police: 119 • Tourist Police: 1912 • Ambulance: 1990',
  visaRequirement: 'Electronic Travel Authorization (ETA) required before arrival via official government portal (eta.gov.lk).'
};

export const SRI_LANKA_REGIONAL_CLIMATE = [
  {
    region: 'South & West Coasts',
    locations: 'Galle, Mirissa, Colombo, Bentota',
    peakSeason: 'December to April',
    monsoonSeason: 'May to September (Yala Monsoon)',
    description: 'Golden sunshine, tranquil seas, and prime whale watching conditions during the northern hemisphere winter.'
  },
  {
    region: 'East Coast',
    locations: 'Trincomalee, Arugam Bay, Pasikudah',
    peakSeason: 'May to September',
    monsoonSeason: 'October to January (Maha Monsoon)',
    description: 'When the south is raining, the east coast enjoys crystal waters, world-renowned surf breaks, and coral reef diving.'
  },
  {
    region: 'Cultural Triangle & North Central',
    locations: 'Sigiriya, Dambulla, Anuradhapura, Polonnaruwa',
    peakSeason: 'January to September',
    monsoonSeason: 'October to December',
    description: 'Dry and hot plains with pleasant early mornings and late afternoons ideal for ancient monument exploration.'
  },
  {
    region: 'Central Highlands',
    locations: 'Kandy, Nuwara Eliya, Ella, Adam\'s Peak',
    peakSeason: 'January to April',
    monsoonSeason: 'May to July & October to November',
    description: 'Misty green valleys and tea estates with cool alpine temperatures (14°C to 20°C). Bring warm layers for evenings.'
  }
];

export const SRI_LANKA_DESTINATIONS: SriLankaDestination[] = [
  {
    id: 'sigiriya',
    name: 'Sigiriya Rock Fortress',
    nativeName: 'සීගිරිය • சிகிரியா',
    region: 'Cultural Triangle',
    category: 'Culture & Heritage',
    coordinates: { lat: 7.9570, lng: 80.7603 },
    elevation: '349m (200m monolithic rock plateau)',
    description: 'Rising dramatically 200 meters above the central jungle plains, Sigiriya is an ancient citadel constructed by King Kashyapa in the 5th century. Crowned by a ruined palace, it features symmetrical water gardens, the famed 1,500-year-old female frescoes, and gigantic sculpted lion paws guarding the summit stairway.',
    highlights: [
      'Summit Sky Palace ruins with 360° jungle views',
      'The Mirror Wall with ancient Sinhalese poetic graffiti',
      'Preserved 5th-century fresco gallery',
      'Terraced royal water gardens & hydraulic fountains'
    ],
    bestSeason: 'Year-round, best in Jan - Sep. Climb at 06:30 AM to beat heat and crowds.',
    recommendedDuration: '3 - 4 Hours (1,200 stair steps to the summit)',
    historicalSignificance: 'Declared a UNESCO World Heritage Site in 1982; regarded by many historians as an ancient wonder of urban planning and hydraulic engineering.',
    travelTips: 'Combine with sunset atop adjacent Pidurangala Rock for an iconic direct vantage point of Sigiriya.',
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    rating: 4.95,
    reviewCount: '38.4k'
  },
  {
    id: 'kandy',
    name: 'Kandy & Temple of the Tooth',
    nativeName: 'මහනුවර ශ්‍රී දළදා මාළිගාව',
    region: 'Cultural Triangle',
    category: 'Culture & Heritage',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    elevation: '500m above sea level',
    description: 'Nestled amidst lush hills and anchored by an artificial lake, Kandy was the final royal capital of the Sinhalese kings. The golden-roofed Temple of the Sacred Tooth Relic (Sri Dalada Maligawa) houses Buddhism\'s most venerated relic in Sri Lanka and is the epicenter of daily puja rituals and the annual Esala Perahera festival.',
    highlights: [
      'Sri Dalada Maligawa daily puja drumming ceremonies',
      'Scenic stroll around Kandy Lake (Kiri Muhuda)',
      'Peradeniya Royal Botanical Gardens (4,000+ plant species)',
      'Bahirawakanda giant white Buddha hill viewpoint'
    ],
    bestSeason: 'December to April, or August for the grand Esala Perahera festival.',
    recommendedDuration: '1 - 2 Days',
    historicalSignificance: 'The bastion of independent Sinhalese sovereignty until 1815; designated a UNESCO World Heritage Site.',
    travelTips: 'Strict temple dress code: shoulders and knees must be fully covered in white or light clothing. Shoes must be deposited at the outer entrance.',
    imageUrl: 'https://images.unsplash.com/photo-1588258524675-c61919864222?auto=format&fit=crop&w=1200&q=80',
    rating: 4.88,
    reviewCount: '29.1k'
  },
  {
    id: 'ella',
    name: 'Ella & Nine Arches Bridge',
    nativeName: 'ඇල්ල ආරුක්කු නමයේ පාලම',
    region: 'Central Hill Country',
    category: 'Hill Country & Hiking',
    coordinates: { lat: 6.8667, lng: 81.0466 },
    elevation: '1,041m above sea level',
    description: 'Ella is a laid-back highland hamlet celebrated for misty gaps, terraced tea ridges, and cool mountain breezes. Just outside town sits the Demodara Nine Arches Bridge, a monumental stone viaduct built during the British colonial era without a single piece of steel, framed by emerald jungle and roaring blue trains.',
    highlights: [
      'Nine Arches Bridge blue train crossings (watch from hillside cafes)',
      'Little Adam\'s Peak sunrise trek (easy 45-minute trail)',
      'Ella Rock panoramic cliff summit (challenging 4-hour hike)',
      'Ravana Falls multi-tiered cascade along the mountain road'
    ],
    bestSeason: 'January to May for clear mountain vistas and crisp hiking weather.',
    recommendedDuration: '2 - 3 Days',
    historicalSignificance: 'Built in 1921 under chief Ceylonese builder P.K. Appuhami when World War I steel shortages forced builders to use only stone blocks, brick, and cement.',
    travelTips: 'Check the Sri Lanka Railways timetable beforehand to catch the iconic blue trains rumbling across the bridge.',
    imageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    rating: 4.93,
    reviewCount: '34.8k'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya & Tea Plantations',
    nativeName: 'නුවරඑළිය • நுவரெலியா',
    region: 'Central Hill Country',
    category: 'Hill Country & Hiking',
    coordinates: { lat: 6.9497, lng: 80.7891 },
    elevation: '1,868m (Sri Lanka\'s highest city)',
    description: 'Often called "Little England" for its cool alpine climate, Tudor-style country houses, manicured golf courses, and crimson post offices. Nuwara Eliya is the beating heart of Ceylon Tea, encircled by rolling mountain slopes clad in manicured emerald camellia sinensis bushes and misty tea processing factories.',
    highlights: [
      'Factory tour & tea cupping at Pedro or Damro Tea Estates',
      'Victoria Park & Gregory Lake boat excursions',
      'Colonial red-brick Nuwara Eliya Post Office (built 1894)',
      'Lover\'s Leap Waterfall trek through tea worker villages'
    ],
    bestSeason: 'February to April (April is the vibrant Sinhala & Tamil New Year season).',
    recommendedDuration: '1 - 2 Days',
    historicalSignificance: 'Founded by British explorer Samuel Baker in 1846 as a high-altitude sanctuary for European colonists escaping the coastal tropical heat.',
    travelTips: 'Temperatures can dip to 10°C at night. Pack a fleece jacket, and try fresh strawberries with cream from local highland farms.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    rating: 4.86,
    reviewCount: '22.5k'
  },
  {
    id: 'galle-fort',
    name: 'Galle Fort',
    nativeName: 'ගාල්ල කොටුව • காலி கோட்டை',
    region: 'Southern Coast',
    category: 'Culture & Heritage',
    coordinates: { lat: 6.0270, lng: 80.2170 },
    elevation: '12m (Coastal sea fortress)',
    description: 'A living 17th-century bastion protruding into the Indian Ocean, Galle Fort seamlessly blends European colonial architecture with South Asian seaside traditions. Enclosed within thick coral-and-granite ramparts, cobblestone alleys are lined with Dutch colonial villas, jewelers, boutique cafes, art galleries, and the whitewashed Galle Lighthouse.',
    highlights: [
      'Sunset promenade along Flag Rock and the fortified seawalls',
      'The iconic 1939 Galle Lighthouse framed by palm trees',
      'Dutch Reformed Church (Groote Kerk) with stone floor tombs',
      'National Maritime Museum inside the Dutch warehouse'
    ],
    bestSeason: 'December to April for calm seas and minimal coastal rain.',
    recommendedDuration: '1 - 2 Days',
    historicalSignificance: 'First fortified by the Portuguese in 1588, extensively expanded by the Dutch East India Company from 1649, and preserved under British rule. A UNESCO World Heritage Site.',
    travelTips: 'Explore early in the morning or late afternoon when the tropical heat softens and the ocean breezes sweep across the bastions.',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    rating: 4.92,
    reviewCount: '31.2k'
  },
  {
    id: 'mirissa',
    name: 'Mirissa & Southern Beaches',
    nativeName: 'මිරිස්ස වෙරළ තීරය',
    region: 'Southern Coast',
    category: 'Coastal & Beaches',
    coordinates: { lat: 5.9482, lng: 80.4578 },
    elevation: '2m (Sea level)',
    description: 'Mirissa is the quintessential tropical cove of southern Sri Lanka, famous for its curved crescent of golden sand, gentle surf breaks, and swaying palms. Just offshore, the continental shelf drops rapidly into deep water trenches, forming one of the world\'s most dependable marine corridors for blue whales, sperm whales, and spinner dolphins.',
    highlights: [
      'Ethical morning blue whale and dolphin watching cruises',
      'Sunset at Coconut Tree Hill (picturesque red-clay headland)',
      'Secret Beach secluded rocky lagoon and snorkeling',
      'Fresh seafood beachfront candlelit dining under lanterns'
    ],
    bestSeason: 'November to April for peak whale migration and placid swimming waters.',
    recommendedDuration: '2 - 3 Days',
    historicalSignificance: 'Historic fishing anchorage turned eco-marine destination; adjacent to Weligama, world-famous for traditional stilt fishermen.',
    travelTips: 'Select whale watching operators certified by the Department of Wildlife Conservation (DWC) that maintain a respectful distance from marine mammals.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.89,
    reviewCount: '27.4k'
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    nativeName: 'යාල ජාතික වනෝද්‍යානය',
    region: 'Southern Coast',
    category: 'Wildlife & Safari',
    coordinates: { lat: 6.3686, lng: 81.5204 },
    elevation: '30m (Coastal dry-zone scrubland)',
    description: 'Spanning 979 square kilometers of semi-arid thorn scrub, monsoon forests, and coastal lagoons fronting the Indian Ocean. Yala\'s Block 1 holds the highest recorded density of wild leopards (Panthera pardus kotiya) on Earth, living alongside massive Asian elephant herds, sloth bears, mugger crocodiles, and 215 bird species.',
    highlights: [
      'Early dawn game drives seeking the elusive Sri Lankan leopard',
      'Elephant herds gathering around seasonal water reservoirs',
      'Sloth bear foraging around palu fruit trees in May - June',
      'Birdwatching at coastal lagoons (flamingos, painted storks)'
    ],
    bestSeason: 'February to July during the dry season when wildlife congregates around dwindling waterholes. (Park typically rests Block 1 in Sept-Oct for regeneration).',
    recommendedDuration: 'Full Day or Two Half-Day Safaris',
    historicalSignificance: 'Designated a wildlife sanctuary in 1900; one of Sri Lanka\'s first two national parks alongside Wilpattu.',
    travelTips: 'Book an experienced local tracker and 4x4 safari jeep with open seating. Enter the gate right at 06:00 AM for peak predatory activity.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    rating: 4.91,
    reviewCount: '25.6k'
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura Sacred City',
    nativeName: 'අනුරාධපුර පූජා නගරය',
    region: 'Cultural Triangle',
    category: 'Culture & Heritage',
    coordinates: { lat: 8.3114, lng: 80.4037 },
    elevation: '81m above sea level',
    description: 'The ancient capital of Sri Lanka from the 4th century BCE to the 11th century CE. Anuradhapura is one of the world\'s oldest continuously inhabited sacred cities, home to gigantic brick stupas rivaling Egyptian pyramids in volume and the sacred Jaya Sri Maha Bodhi tree—the oldest surviving human-planted tree on Earth.',
    highlights: [
      'Jaya Sri Maha Bodhi (sacred sapling planted in 288 BCE)',
      'Ruwanwelisaya majestic white stupa encircled by 344 elephant carvings',
      'Jetavanaramaya (once the third tallest structure in the ancient world)',
      'Twin Ponds (Kuttam Pokuna) ancient hydraulic bathing pools'
    ],
    bestSeason: 'December to April, or June for the sacred Poson Poya festival at nearby Mihintale.',
    recommendedDuration: '1 - 2 Days (bicycles or tuk-tuks are ideal for navigating the vast complex)',
    historicalSignificance: 'Cradle of Theravada Buddhism in Sri Lanka; UNESCO World Heritage Site.',
    travelTips: 'Rent a bicycle to explore the peaceful shaded temple paths. Dress respectfully in white and bring socks as the stone pathways get hot under midday sun.',
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    rating: 4.90,
    reviewCount: '19.8k'
  },
  {
    id: 'polonnaruwa',
    name: 'Polonnaruwa Medieval Capital',
    nativeName: 'පොළොන්නරුව පුරාවිද්‍යා නගරය',
    region: 'Cultural Triangle',
    category: 'Culture & Heritage',
    coordinates: { lat: 7.9403, lng: 81.0188 },
    elevation: '58m above sea level',
    description: 'Following the fall of Anuradhapura, Polonnaruwa flourished as Sri Lanka\'s medieval royal seat from the 11th to 13th centuries. Renowned for its compact archaeological park, it showcases monumental royal palace ruins, the Quadrangle temple terrace, and the breathtaking Gal Vihara rock shrine carved directly into a single granite outcrop.',
    highlights: [
      'Gal Vihara: Four monumental Buddha statues sculpted from single granite face',
      'The Sacred Quadrangle (Dalada Maluwa) stone circular relic house (Vatadage)',
      'Seven-story Royal Palace ruins of King Parakramabahu the Great',
      'Parakrama Samudra: colossal inland man-made sea spanning 2,400 hectares'
    ],
    bestSeason: 'January to September. Mornings are breezy and comfortable.',
    recommendedDuration: '1 Day (approx. 4 - 5 hours of exploration)',
    historicalSignificance: 'UNESCO World Heritage Site embodying the golden age of medieval Sinhala irrigation and stone masonry.',
    travelTips: 'The museum near Parakrama Samudra is an essential first stop to understand the layout before touring the ruins.',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    rating: 4.87,
    reviewCount: '16.4k'
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee & Nilaveli Beach',
    nativeName: 'ත්‍රිකුණාමලය • திருகோணமலை',
    region: 'Eastern Province',
    category: 'Coastal & Beaches',
    coordinates: { lat: 8.5874, lng: 81.2152 },
    elevation: '8m (Natural harbor peninsula)',
    description: 'Home to one of the world\'s finest deep-water natural harbors. Trincomalee boasts historic Fort Frederick, the clifftop Koneswaram Hindu temple overlooking the dramatic drop of Swami Rock (Lover\'s Leap), and powdery white sands at Nilaveli Beach serving as the gateway to Pigeon Island National Park.',
    highlights: [
      'Koneswaram Temple (Thirukonamalai Konesar Kovil) on Swami Rock',
      'Pigeon Island National Park coral reef snorkeling with blacktip reef sharks',
      'Nilaveli Beach pristine turquoise waters and powdery sands',
      'Kanniya Hot Water Springs seven therapeutic thermal wells'
    ],
    bestSeason: 'May to September when the sea is glass-flat and visibility reaches 25+ meters.',
    recommendedDuration: '2 - 3 Days',
    historicalSignificance: 'Prized maritime hub coveted by the Chola Empire, Portuguese, Dutch, French, and British navies; mentioned in the epic Mahabharata.',
    travelTips: 'Take a boat to Pigeon Island early in the morning for calm currents and clear underwater visibility with sea turtles.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    rating: 4.88,
    reviewCount: '14.9k'
  },
  {
    id: 'arugam-bay',
    name: 'Arugam Bay',
    nativeName: 'ආරුගම් බොක්ක • அறுகம் குடா',
    region: 'Eastern Province',
    category: 'Coastal & Beaches',
    coordinates: { lat: 6.8428, lng: 81.8340 },
    elevation: '3m (Indian Ocean surf bay)',
    description: 'Renowned worldwide as Sri Lanka\'s premier surfing mecca. Arugam Bay is a relaxed crescent moon bay with a vibrant coastal community, beachfront cafes, and multiple point breaks peeling over sand-bottomed reefs, surrounded by wild lagoons frequented by roaming elephants and peacocks.',
    highlights: [
      'Main Point right-hand break (world-class 400m rides)',
      'Whiskey Point & Peanut Farm beginner/intermediate waves',
      'Kottukal Lagoon eco-safari spotting wild elephants and birdlife',
      'Kudumbigala Monastery ancient hermitage in the jungle'
    ],
    bestSeason: 'May to September (Offshore trade winds produce consistent 3 to 8ft swell).',
    recommendedDuration: '3 - 5 Days',
    historicalSignificance: 'Consistently ranked in the world\'s top 10 surf destinations; hosted numerous WSL (World Surf League) qualifying events.',
    travelTips: 'Even if you do not surf, the bohemian vibe, sunrise yoga sessions, and wildlife day-trips make it a standout destination.',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.86,
    reviewCount: '18.2k'
  },
  {
    id: 'adams-peak',
    name: 'Adam\'s Peak (Sri Pada)',
    nativeName: 'ශ්‍රී පාදය (සමනල කන්ද)',
    region: 'Central Hill Country',
    category: 'Hill Country & Hiking',
    coordinates: { lat: 6.8096, lng: 80.4994 },
    elevation: '2,243m (Sacred peak summit)',
    description: 'A striking conical mountain soaring over the southern hill country, sacred to four major religions. For over a millennium, pilgrims have mounted its 5,500 illuminated stairs overnight to witness the sacred footprint atop the summit and the mystical triangular shadow cast by the rising sun across the cloud sea below.',
    highlights: [
      'Overnight ascent along the illuminated pilgrim stairway',
      'The sacred footprint shrine (Sri Pada / Sacred Footprint)',
      'Spectacular sunrise casting a perfect pyramid shadow on the western clouds',
      'Ringing the summit temple bronze bell once for every pilgrimage completed'
    ],
    bestSeason: 'Pilgrimage season runs from Unduvap Poya (December) to Vesak Poya (May), with paths illuminated and tea stalls open all night.',
    recommendedDuration: 'Full Night Ascent (5 - 7 hours round-trip climb)',
    historicalSignificance: 'Venerated by Buddhists as the footprint of Buddha, Hindus as Shiva (Shivan Oli Padam), and Muslims/Christians as Adam\'s first footprint on Earth.',
    travelTips: 'Start climbing from Nallathanniya around 02:00 AM to reach the summit for the 06:00 AM sunrise. Bring warm thermal layers as summit winds are cold.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.94,
    reviewCount: '21.3k'
  },
  {
    id: 'horton-plains',
    name: 'Horton Plains & World\'s End',
    nativeName: 'හෝටන් තැන්න ලෝකාන්තය',
    region: 'Central Hill Country',
    category: 'Wildlife & Safari',
    coordinates: { lat: 6.8028, lng: 80.8048 },
    elevation: '2,100m to 2,300m (Highland plateau)',
    description: 'An ethereal windswept plateau of montane evergreen forest, tussock grasslands, and peat bogs nestled under Sri Lanka\'s second and third highest peaks. The key circular trail culminates at World\'s End, a staggering cliff dropping vertically 880 meters straight into the tea estates of the southern lowlands.',
    highlights: [
      'World\'s End 880-meter vertical abyss overlooking tea plains',
      'Mini World\'s End secondary 270-meter viewpoint',
      'Baker\'s Falls roaring highland cascade amidst fern thickets',
      'Sightings of majestic Sri Lankan Sambar deer roaming the plains'
    ],
    bestSeason: 'January to March. Arrive at the gates at 06:00 AM before clouds roll in around 09:30 AM.',
    recommendedDuration: '9.5 km circular trek (3 - 4 Hours)',
    historicalSignificance: 'Declared a UNESCO World Heritage Site under the Central Highlands of Sri Lanka in 2010; source of three major rivers: Mahaweli, Kelani, and Walawe.',
    travelTips: 'Strict plastic-free zone: park rangers inspect bags at the entrance and remove single-use plastics to protect wildlife.',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    rating: 4.85,
    reviewCount: '17.8k'
  },
  {
    id: 'jaffna',
    name: 'Jaffna & Northern Peninsula',
    nativeName: 'යාපනය • யாழ்ப்பாணம்',
    region: 'Northern Peninsula',
    category: 'Culture & Heritage',
    coordinates: { lat: 9.6615, lng: 80.0255 },
    elevation: '5m (Coastal limestone peninsula)',
    description: 'The cultural capital of Sri Lanka\'s Tamil heritage, located at the northernmost tip of the island. Marked by Palmyra palms, vibrant Hindu kovil towers with intricate gopurams, Dutch colonial bastions, and a world-renowned culinary tradition featuring fiery Jaffna crab curry and sweet Rio ice cream.',
    highlights: [
      'Nallur Kandaswamy Kovil majestic gold-sculpted Hindu temple',
      'Jaffna Fort star-shaped coral fortress overlooking the lagoon',
      'Delft Island (Neduntheevu) day trip to see wild feral ponies and baobab trees',
      'Casuarina Beach shallow turquoise waters with soft white sand'
    ],
    bestSeason: 'January to September (warm and dry with cooling sea breezes).',
    recommendedDuration: '2 - 3 Days',
    historicalSignificance: 'Ancient center of the Jaffna Kingdom (1215–1624 CE); home to the historic Jaffna Public Library, rebuilt as an architectural symbol of knowledge.',
    travelTips: 'Arrive via the iconic Yal Devi express train from Colombo over the causeway crossing the Elephant Pass.',
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.87,
    reviewCount: '12.6k'
  }
];

export const SRI_LANKA_ITINERARIES: SriLankaItinerary[] = [
  {
    id: '1-day',
    days: 1,
    title: 'Galle & Southern Coastline Express',
    subtitle: 'Colonial Ramparts, Coastal Express & Ocean Sunsets',
    summary: 'A high-impact single-day expedition connecting Colombo to the historic UNESCO maritime fortress of Galle, exploring Dutch cobblestone quarters and returning along the scenic coastal route.',
    idealFor: 'Short stopovers, cruise visitors, and business travelers with one free day.',
    routeStops: ['Colombo', 'Galle Fort', 'Mirissa Coast', 'Colombo'],
    transportMode: 'Southern Expressway AC Car or Coastal Scenic Train',
    budgetBreakdown: {
      backpackerUSD: 35,
      midRangeUSD: 85,
      luxuryUSD: 240
    },
    schedule: [
      {
        day: 1,
        title: 'Southern Colonial Splendor & Marine Breezes',
        route: 'Colombo -> Galle Fort -> Coconut Tree Hill -> Colombo',
        morning: '07:00 AM departure via Southern Expressway (E01, ~1.5h). Arrive at Galle Fort before midday heat. Walk along Old Gate, Dutch Reformed Church, and browse artisan boutiques on Leyn Baan Street.',
        afternoon: 'Fresh seafood lunch at an open-air veranda on Pedlar Street. Continue 40 minutes along the coast to Mirissa\'s Coconut Tree Hill for photography and panoramic ocean views.',
        evening: 'Return to Galle Fort ramparts at Flag Rock for the sunset over the Indian Ocean. Enjoy Ceylon spiced tea before the smooth 1.5-hour expressway drive back to Colombo.',
        transitNote: 'Expressway toll is ~800 LKR; travel time is only 90 minutes each way.'
      }
    ]
  },
  {
    id: '3-days',
    days: 3,
    title: 'Golden Cultural Triangle',
    subtitle: 'Sigiriya Rock Citadel, Dambulla Cave Temples & Royal Kandy',
    summary: 'Immerse yourself in three millennia of ancient kingdoms, ascending the 5th-century sky fortress of Sigiriya, exploring sacred gold-painted cave monasteries in Dambulla, and experiencing Buddhist ceremonies in Kandy.',
    idealFor: 'History and archaeology enthusiasts seeking the essential cultural highlights.',
    routeStops: ['Colombo/Airport', 'Dambulla', 'Sigiriya', 'Kandy'],
    transportMode: 'Private AC Driver or Express Intercity Train to Kandy + Local Taxi',
    budgetBreakdown: {
      backpackerUSD: 95,
      midRangeUSD: 230,
      luxuryUSD: 650
    },
    schedule: [
      {
        day: 1,
        title: 'Cave Temples of Dambulla & Forest Haven',
        route: 'Colombo -> Dambulla -> Sigiriya',
        morning: 'Morning pickup from Colombo or Bandaranaike International Airport. Drive 3.5 hours north into the dry zone.',
        afternoon: 'Ascend the stone staircase to Dambulla Royal Cave Temple (five caves carved into a 160m granite ridge containing 153 Buddha statues and centuries of ceiling frescoes).',
        evening: 'Check into your eco-lodge near Sigiriya. Sunset walk along the tranquil village lake with Sigiriya rock in the background.',
        transitNote: 'Scenic road passing coconut estates and roadside king coconut stalls.'
      },
      {
        day: 2,
        title: 'The Sky Citadel of King Kashyapa & Spice Corridors',
        route: 'Sigiriya -> Matale -> Kandy',
        morning: '06:30 AM early ascent of Sigiriya Rock Fortress (1,200 steps). Marvel at the ancient water gardens, frescoes, Mirror Wall, and summit ruins before the tropical sun climbs.',
        afternoon: 'Scenic drive south through the Knuckles foothills and Matale spice gardens. Sample fresh Ceylon cinnamon and cardamom.',
        evening: 'Arrive in the royal hill capital of Kandy. Stroll around Kandy Lake and witness the 18:30 evening puja drumming ceremony at the Temple of the Tooth.',
        transitNote: 'Drive from Sigiriya to Kandy takes approximately 2.5 hours.'
      },
      {
        day: 3,
        title: 'Royal Botanical Splendor & Valley Descent',
        route: 'Kandy -> Peradeniya -> Colombo',
        morning: 'Morning exploration of the Royal Botanical Gardens at Peradeniya, home to colossal fig trees, orchid pavilions, and flying fox colonies.',
        afternoon: 'Visit the giant white Bahirawakanda Buddha perched above Kandy for panoramic city photos. Sample traditional lunch at a local curry house.',
        evening: 'Board the scenic intercity express train or take a private transfer down the Kadugannawa mountain pass back to Colombo.',
        transitNote: 'Observation car on the Kandy-Colombo train offers sweeping valley vistas.'
      }
    ]
  },
  {
    id: '5-days',
    days: 5,
    title: 'Heritage, Highlands & The Iconic Blue Train',
    subtitle: 'Sigiriya, Kandy, Nuwara Eliya & Ella Mountain Pass',
    summary: 'The ultimate blend of ancient wonders and highland serenity. Highlights include climbing Sigiriya, experiencing royal rituals in Kandy, and riding the world-famous blue train through tea plantations to Ella.',
    idealFor: 'First-time travelers seeking the definitive balance of heritage, nature, and scenic rail.',
    routeStops: ['Sigiriya', 'Kandy', 'Nuwara Eliya', 'Ella'],
    transportMode: 'Private vehicle + Iconic Sri Lanka Railways Highland Train (Kandy to Ella)',
    budgetBreakdown: {
      backpackerUSD: 165,
      midRangeUSD: 395,
      luxuryUSD: 1120
    },
    schedule: [
      {
        day: 1,
        title: 'Arrival & The Ancient Rock Citadel',
        route: 'Airport/Colombo -> Dambulla -> Sigiriya',
        morning: 'Early morning transfer to the Cultural Triangle. Visit Dambulla\'s UNESCO golden cave temples.',
        afternoon: 'Afternoon climb of Pidurangala Rock for sunset, witnessing golden light hitting the face of Sigiriya.',
        evening: 'Authentic Sri Lankan dinner (Hoppers, Pol Sambol, Kothu Roti) at a village lodge.'
      },
      {
        day: 2,
        title: 'Sigiriya Summit & The Royal City of Kandy',
        route: 'Sigiriya -> Matale -> Kandy',
        morning: '06:30 AM summit climb of Sigiriya Rock Fortress. Explore the summit royal pools and frescoes.',
        afternoon: 'Drive to Kandy. Visit Peradeniya Royal Botanical Gardens.',
        evening: 'Evening puja ritual at Sri Dalada Maligawa (Temple of the Tooth). Traditional Kandyan cultural dance performance.'
      },
      {
        day: 3,
        title: 'Tea Estates of "Little England"',
        route: 'Kandy -> Ramboda Falls -> Nuwara Eliya',
        morning: 'Ascend through the central hills past Ramboda Falls into Nuwara Eliya (1,868m elevation).',
        afternoon: 'Tour a working colonial tea factory (Damro or Pedro); learn how fresh leaves become premium Ceylon Pekoe and Orange Pekoe.',
        evening: 'Afternoon tea at the historic Grand Hotel or a leisurely walk around misty Lake Gregory.'
      },
      {
        day: 4,
        title: 'The World\'s Most Scenic Train Journey & Ella',
        route: 'Nuwara Eliya (Nanu Oya) -> Ella by Train',
        morning: 'Board the iconic blue train at Nanu Oya Station for the 3.5-hour journey to Ella, clattering through emerald tea terraces, waterfalls, and mountain tunnels.',
        afternoon: 'Arrive in Ella. Hike the gentle trail to Little Adam\'s Peak for sweeping valley views.',
        evening: 'Relax at a hillside cafe in Ella town with fresh tropical juices and mountain breezes.'
      },
      {
        day: 5,
        title: 'Nine Arches Bridge & Southern Descent',
        route: 'Ella -> Nine Arches Bridge -> Colombo/Airport',
        morning: 'Dawn hike down to Demodara Nine Arches Bridge to photograph the morning train crossing.',
        afternoon: 'Stop by roaring Ravana Falls before departing toward the southern coast or Colombo.',
        evening: 'Expressway return to Colombo or direct transfer to Bandaranaike International Airport.'
      }
    ]
  },
  {
    id: '7-days',
    days: 7,
    title: 'The Grand Ceylon Circuit',
    subtitle: 'Ancient Cities, Cloud Forests, Safari Wildlife & Southern Sands',
    summary: 'The comprehensive week-long Sri Lankan adventure. Spans the Cultural Triangle, Kandy, the misty tea country of Ella, an exhilarating leopard safari in Yala, and the colonial seawalls of Galle Fort.',
    idealFor: 'Travelers who want it all: UNESCO heritage, mountain rail, big-game wildlife, and coastal relaxation.',
    routeStops: ['Sigiriya', 'Kandy', 'Ella', 'Yala National Park', 'Mirissa', 'Galle Fort'],
    transportMode: 'Dedicated Private AC Chauffeur-Guide + Highland Train Segment',
    budgetBreakdown: {
      backpackerUSD: 245,
      midRangeUSD: 590,
      luxuryUSD: 1680
    },
    schedule: [
      {
        day: 1,
        title: 'Ancient Wonders: Sigiriya Rock Fortress',
        route: 'Colombo -> Sigiriya',
        morning: 'Morning departure to the Cultural Triangle. Stop at Dambulla Cave Temples.',
        afternoon: 'Check-in to Sigiriya forest eco-resort; relax by the pool or village cycle tour.',
        evening: 'Sunset climb of Pidurangala Rock overlooking Sigiriya.'
      },
      {
        day: 2,
        title: 'Sigiriya Palace & Journey to Royal Kandy',
        route: 'Sigiriya -> Kandy',
        morning: 'Dawn climb of Sigiriya Rock Fortress (1,200 steps).',
        afternoon: 'Transfer to Kandy through the Matale spice corridor.',
        evening: 'Witness the evening drum ceremony at Temple of the Sacred Tooth Relic.'
      },
      {
        day: 3,
        title: 'Highland Rail: Kandy to Ella',
        route: 'Kandy -> Nanu Oya -> Ella',
        morning: 'Morning departure aboard the scenic highland train winding through misty mountain passes.',
        afternoon: 'Arrive in Ella; explore Nine Arches Bridge from the tea trail viewpoint.',
        evening: 'Dinner at an open-air cafe in Ella village.'
      },
      {
        day: 4,
        title: 'Highland Peaks to Yala Wild Plains',
        route: 'Ella -> Ravana Falls -> Yala National Park',
        morning: 'Sunrise hike up Little Adam\'s Peak; visit Ravana Falls.',
        afternoon: 'Descend from the mountains into the southern dry zone bordering Yala National Park.',
        evening: 'Check-in to a safari tented camp; enjoy a starlit barbecue dinner.'
      },
      {
        day: 5,
        title: 'Dawn Leopard Safari in Yala & Ocean Migration',
        route: 'Yala Safari -> Mirissa',
        morning: '05:30 AM 4x4 open-top safari into Yala Block 1. Track leopards, elephants, sloth bears, and crocodiles.',
        afternoon: 'Drive 2.5 hours along the scenic south coast to the golden beaches of Mirissa.',
        evening: 'Sunset drinks at Coconut Tree Hill headland.'
      },
      {
        day: 6,
        title: 'Whale Watching & Galle Dutch Fort',
        route: 'Mirissa -> Galle Fort',
        morning: 'Optional early ethical blue whale cruise, or relaxing morning swim at Mirissa Secret Beach.',
        afternoon: 'Short coastal drive to Galle Fort. Walk the cobblestone ramparts, lighthouse, and colonial streets.',
        evening: 'Dine on fresh grilled jumbo prawns on the ramparts overlooking the sunset sea.'
      },
      {
        day: 7,
        title: 'Coastal Highway Return & Departure',
        route: 'Galle Fort -> Colombo / Airport',
        morning: 'Final morning swim or artisan shopping in Galle Fort (Ceylon sapphires, spices, batiks).',
        afternoon: 'Take the fast Southern Expressway back to Colombo for city sightseeing or Bandaranaike Airport for departure.',
        evening: 'Depart with unforgettable memories of the pearl of the Indian Ocean.'
      }
    ]
  }
];

export const SRI_LANKA_TRAVEL_TIPS = [
  {
    category: 'Visas & Entry',
    tip: 'All travelers require an Electronic Travel Authorization (ETA) obtained prior to arrival at eta.gov.lk. Ensure your passport has at least 6 months validity.'
  },
  {
    category: 'Temple Etiquette',
    tip: 'When visiting Buddhist and Hindu temples, remove footwear and hats. Dress modestly with shoulders and knees covered, preferably in white or light-colored attire. Never pose with your back turned to a Buddha statue.'
  },
  {
    category: 'Currency & Payments',
    tip: 'The currency is the Sri Lankan Rupee (LKR). ATMs (Commercial Bank, Sampath, HNB) are widespread. Credit cards are accepted in hotels and major restaurants, but carry cash for tuk-tuks, local fruit stalls, and smaller towns.'
  },
  {
    category: 'Getting Around',
    tip: 'For city transit, use the PickMe app (the local Uber alternative) for metered tuk-tuks and cars. For the hill country, book the scenic train (Kandy to Ella) several weeks in advance as observation and 1st/2nd class seats sell out quickly.'
  },
  {
    category: 'Local Connectivity',
    tip: 'Pick up a tourist SIM card or eSIM upon arrival at Colombo airport from Dialog or Mobitel. Coverage is remarkably good even in highland and national park areas, and packages cost around $8 - $12 for 30GB+ of high-speed data.'
  },
  {
    category: 'Health & Hydration',
    tip: 'Drink filtered or bottled water. Carry sunscreen and insect repellent. Fresh King Coconut (Thambili) is sold roadside across the island and is nature\'s best electrolyte replenishment.'
  }
];
