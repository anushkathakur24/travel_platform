const express = require("express");
const router = express.Router();

// ─── Rich destination dataset ──────────────────────────────────────────────
const destinations = {
  Paris: {
    food: "Croissants, Macarons, Crème brûlée, Escargots, French wine & cheese",
    activities: "Eiffel Tower, Louvre Museum, Seine River Cruise, Montmartre, Palace of Versailles",
    bestTime: "April – June and September – October",
    weather: "Mild and pleasant. Summers can be warm (25°C+), winters chilly (3–8°C).",
    budget: "High – expect ₹8,000–₹15,000/day including accommodation",
    tips: "Book Eiffel Tower tickets in advance. Metro is the best way to get around.",
    language: "French (English widely spoken in tourist areas)"
  },
  Tokyo: {
    food: "Sushi, Ramen, Tempura, Yakitori, Takoyaki, Matcha desserts",
    activities: "Shibuya Crossing, Tokyo Skytree, Shinjuku Gyoen, Akihabara, teamLab Borderless",
    bestTime: "March – May (cherry blossoms) and October – November",
    weather: "Four distinct seasons. Spring and autumn are ideal with mild temperatures.",
    budget: "Moderate – ₹5,000–₹10,000/day. Affordable food options widely available.",
    tips: "Get a Suica card for seamless travel on trains. Try a local conveyor belt sushi (kaiten-zushi).",
    language: "Japanese (English signage on all major transport)"
  },
  Goa: {
    food: "Prawn Curry, Goan Fish Curry, Bebinca, Feni, Sorpotel, Seafood thali",
    activities: "Beach hopping (Baga, Anjuna, Palolem), Water sports, Night markets, Old Goa churches",
    bestTime: "November – February (dry season)",
    weather: "Tropical – hot and humid in summer. December–January is ideal at 25–30°C.",
    budget: "Budget-friendly – ₹1,500–₹4,000/day including stay and food",
    tips: "Rent a scooter to explore beaches freely. Book stays well in advance for December.",
    language: "Konkani, Hindi, and English widely understood"
  },
  Manali: {
    food: "Himachali Dham, Trout fish, Sidu (local bread), Chha Gosht, Tibetan noodles",
    activities: "Solang Valley, Rohtang Pass, Hadimba Temple, Paragliding, Trekking, River rafting",
    bestTime: "March – June for sightseeing; December – February for snow",
    weather: "Cool summers (10–25°C), heavy snowfall in winter. Rohtang Pass may be closed by November.",
    budget: "Budget – ₹2,000–₹5,000/day including accommodation and activities",
    tips: "Carry warm layers even in summer. Rohtang Pass requires a permit — book online.",
    language: "Hindi and Pahari (English spoken at most tourist spots)"
  },
  Bali: {
    food: "Nasi Goreng, Babi Guling, Mie Goreng, Satay, Lawar, Fresh tropical fruits",
    activities: "Tanah Lot Temple, Ubud Rice Terraces, Mount Batur Sunrise Trek, Kuta Beach, Monkey Forest",
    bestTime: "April – October (dry season)",
    weather: "Tropical – warm year-round at 28–33°C. Dry season is best for beach activities.",
    budget: "Moderate – ₹3,000–₹7,000/day. Very affordable food and accommodation.",
    tips: "Hire a driver for a day for temple hopping. Always carry a sarong for temple visits.",
    language: "Balinese and Indonesian (English widely spoken in tourist areas)"
  },
  Maldives: {
    food: "Mas Huni (tuna & coconut), Garudhiya (fish soup), Bis Keemiya, Fresh lobster & seafood",
    activities: "Snorkelling, Scuba diving, Underwater restaurants, Dolphin watching, Island hopping",
    bestTime: "November – April (dry season)",
    weather: "Tropical – consistently warm at 28–32°C all year. Avoid monsoon season (May–October).",
    budget: "Luxury destination – ₹20,000–₹50,000/day depending on resort type",
    tips: "Look for local island stays (guesthouses) for a budget-friendly option instead of overwater bungalows.",
    language: "Dhivehi (English widely understood in resorts)"
  },
  Dubai: {
    food: "Shawarma, Al Harees, Luqaimat, Camel milk chocolate, International cuisine",
    activities: "Burj Khalifa, Dubai Mall, Desert Safari, Palm Jumeirah, Dubai Frame, Gold Souk",
    bestTime: "November – March (cooler weather)",
    weather: "Hot desert climate. Summers exceed 40°C. Winter is pleasant at 15–25°C.",
    budget: "High – ₹10,000–₹25,000/day for comfortable travel",
    tips: "Dress modestly in public places. Dubai Metro is excellent for getting around.",
    language: "Arabic (English is the de facto business and tourism language)"
  },
  Rajasthan: {
    food: "Dal Baati Churma, Laal Maas, Ghevar, Ker Sangri, Bajra Roti, Lassi",
    activities: "Amber Fort, Hawa Mahal, Mehrangarh Fort, Thar Desert safari, Pushkar camel fair",
    bestTime: "October – March",
    weather: "Extreme – very hot summers (up to 45°C), cool pleasant winters. Best in winter months.",
    budget: "Budget to mid-range – ₹2,500–₹7,000/day. Heritage hotels can be pricier.",
    tips: "Take an overnight train between cities for an authentic experience. Book heritage hotels for unique stays.",
    language: "Rajasthani dialects and Hindi (English at tourist spots)"
  },
  Kerala: {
    food: "Appam with Stew, Kerala Fish Curry, Puttu & Kadala Curry, Beef Fry, Coconut-based dishes",
    activities: "Alleppey Houseboat, Munnar tea gardens, Periyar Tiger Reserve, Kovalam Beach, Theyyam rituals",
    bestTime: "September – March",
    weather: "Tropical – two monsoon seasons. Backwaters are beautiful post-monsoon (Sept–Oct).",
    budget: "Mid-range – ₹3,000–₹8,000/day. Houseboats add a special experience.",
    tips: "Book a houseboat on Vembanad Lake for an unforgettable night. Ayurvedic treatments are world-class here.",
    language: "Malayalam (English understood in cities and tourist areas)"
  },
  Ladakh: {
    food: "Thukpa, Momos, Skyu, Butter Tea, Tsampa, Chhang (barley beer)",
    activities: "Pangong Lake, Nubra Valley, Magnetic Hill, Leh Palace, Khardung La Pass, Hemis Monastery",
    bestTime: "June – September (roads accessible)",
    weather: "Cold desert – icy winters (down to -30°C), cool summers (10–25°C). Roads closed in winter.",
    budget: "Moderate – ₹3,500–₹8,000/day. Permits needed for certain areas.",
    tips: "Acclimatise for 1–2 days in Leh before going to higher altitudes. Inner Line Permit required for border areas.",
    language: "Ladakhi, Hindi (English at tourist spots)"
  }
};

// Normalise key for case-insensitive lookup
const lookup = (dest) => {
  const key = Object.keys(destinations).find(
    (k) => k.toLowerCase() === dest.trim().toLowerCase()
  );
  return key ? destinations[key] : null;
};

// ─── POST /api/recommendations ────────────────────────────────────────────
// Body: { destination: "Goa" }
router.post("/", (req, res) => {
  const { destination } = req.body;

  if (!destination || !destination.trim()) {
    return res.status(400).json({ message: "Please provide a destination" });
  }

  const result = lookup(destination);

  if (result) {
    return res.json({
      destination: destination.trim(),
      found: true,
      recommendations: result
    });
  }

  // Generic fallback for unknown destinations
  return res.json({
    destination: destination.trim(),
    found: false,
    recommendations: {
      food: "Explore local street food, traditional restaurants, and regional specialties",
      activities: "Visit historical sites, local markets, cultural centres, and natural landmarks",
      bestTime: "Check seasonal weather patterns — most destinations are best in spring or autumn",
      weather: "Research the climate of your destination ahead of booking",
      budget: "Budget varies widely — research accommodation and transport costs in advance",
      tips: "Learn a few local phrases, carry local currency, and respect cultural customs",
      language: "Research the local language — a translation app can be very helpful"
    }
  });
});

// ─── GET /api/recommendations/:destination ────────────────────────────────
router.get("/:destination", (req, res) => {
  const { destination } = req.params;
  const result = lookup(destination);

  if (result) {
    return res.json({
      destination,
      found: true,
      recommendations: result
    });
  }

  return res.status(404).json({
    message: `No curated data found for "${destination}". Try Paris, Tokyo, Goa, Manali, Bali, Maldives, Dubai, Rajasthan, Kerala, or Ladakh.`
  });
});

// ─── GET /api/recommendations  (list all destinations) ────────────────────
router.get("/", (req, res) => {
  res.json({
    availableDestinations: Object.keys(destinations),
    tip: "POST to /api/recommendations with { destination } for full recommendations"
  });
});

module.exports = router;
