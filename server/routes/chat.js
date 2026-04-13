const express = require("express");
const router = express.Router();

// ─── Keyword-based response engine ────────────────────────────────────────
// To plug in real AI, replace getResponse() with an OpenAI API call:
//   const { OpenAI } = require("openai");
//   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rules = [
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
    responses: [
      "Hey there! 👋 I'm your AI Travel Assistant. Where are you planning to go?",
      "Hello! Ready to plan your next adventure? Tell me your dream destination!",
      "Hi! I'm here to help you travel smarter. What destination is on your list?"
    ]
  },
  {
    keywords: ["goa"],
    responses: [
      "🌊 Goa is perfect! Best time to visit is November – February. Must-tries: Baga Beach, water sports, seafood curry, and the vibrant night markets!",
      "Goa vibes! 🏖 Don't miss Anjuna Flea Market, the old Portuguese churches, and a boat ride to Dolphin Island. Rent a scooter to explore freely!"
    ]
  },
  {
    keywords: ["manali"],
    responses: [
      "🏔 Manali is breathtaking! Visit June – September for trekking, or December – January for snow. Solang Valley and Rohtang Pass are must-visits!",
      "Manali adventure awaits! ❄️ Try paragliding in Solang Valley, trek to Beas Kund, and taste authentic Himachali food. Carry warm layers!"
    ]
  },
  {
    keywords: ["paris"],
    responses: [
      "🗼 Paris – the City of Light! Best in April–June. Eiffel Tower, Louvre, Montmartre, and Seine cruises are unmissable. Book Eiffel tickets in advance!",
      "Ooh la la! 🥐 Paris is magical. Try croissants at a local boulangerie, stroll through Le Marais, and don't miss a sunset from Sacré-Cœur."
    ]
  },
  {
    keywords: ["tokyo"],
    responses: [
      "🗼 Tokyo is incredible! Cherry blossoms in March are magical. Must-see: Shibuya Crossing, Shinjuku Gyoen, and Akihabara. Get a Suica card for easy travel!",
      "Tokyo awaits! 🍣 Try authentic ramen, visit teamLab Borderless, and explore the temples of Asakusa. It's a perfect blend of old and new!"
    ]
  },
  {
    keywords: ["bali"],
    responses: [
      "🌴 Bali is a dream destination! Visit April–October for the best weather. Ubud's rice terraces, Tanah Lot temple, and Mount Batur sunrise hike are unforgettable!",
      "Bali magic! 🙏 Don't miss the Sacred Monkey Forest, a sunrise trek up Mount Batur, and Seminyak Beach. Always carry a sarong for temple visits!"
    ]
  },
  {
    keywords: ["ladakh"],
    responses: [
      "🏔 Ladakh is otherworldly! Visit June–September when roads are open. Pangong Lake, Nubra Valley, and Khardung La Pass are must-sees. Acclimatise for 1-2 days in Leh first!",
      "Epic Ladakh! 🚐 The Royal Enfield road trip from Manali to Leh is legendary. Visit Hemis Monastery, stargazing at Pangong is unreal. Inner Line Permit required for border areas."
    ]
  },
  {
    keywords: ["kerala"],
    responses: [
      "🌿 Kerala – God's Own Country! Book an Alleppey houseboat for an unforgettable backwater experience. Munnar's tea gardens and Periyar Wildlife Sanctuary are stunning!",
      "Kerala is magical! 🥥 Try the traditional Onam Sadhya meal, explore the Wayanad forests, and get an authentic Ayurvedic massage. Best time: September–March."
    ]
  },
  {
    keywords: ["budget", "cheap", "affordable", "low cost", "backpacker"],
    responses: [
      "💰 For budget travel in India, try Goa (Nov–Feb), Rishikesh, McLeod Ganj, or Hampi. Hostels, overnight trains, and local dhabas keep costs very low!",
      "Budget travel tips: 🎒 Use IRCTC trains, stay in hostels, eat at local dhabas, and travel in the shoulder season. Goa, Spiti Valley, and Kodaikanal are great budget picks!"
    ]
  },
  {
    keywords: ["visa", "passport", "documents", "permit"],
    responses: [
      "📋 For international travel, check visa requirements at the official embassy website. India offers e-Visa for 160+ countries at indianvisaonline.gov.in. Keep a photocopy of all documents!",
      "Visa tips: Apply at least 3–4 weeks before your trip. Some countries offer visa on arrival. Always check the latest requirements as rules change frequently."
    ]
  },
  {
    keywords: ["packing", "what to carry", "luggage", "bag"],
    responses: [
      "🧳 Packing essentials: lightweight clothes for the climate, a universal adapter, portable charger, medicines, photocopies of documents, and snacks for travel days!",
      "Smart packing tip: Roll your clothes to save space, carry a reusable water bottle, and always pack a light rain jacket. Less is more for backpacking trips!"
    ]
  },
  {
    keywords: ["hotel", "stay", "accommodation", "hostel", "airbnb"],
    responses: [
      "🏨 Check our Accommodations page for curated stays! For budget options: hostels and guesthouses. For comfort: boutique hotels. Always read reviews before booking!",
      "Accommodation tip: Book at least 2 weeks ahead for peak season (Dec–Jan in India). Our Accommodations section has verified listings with real prices!"
    ]
  },
  {
    keywords: ["food", "eat", "restaurant", "cuisine", "dish"],
    responses: [
      "🍽 Check our Restaurants section to find great dining spots by city! Each destination has unique flavours worth exploring — street food is often the best experience.",
      "Foodie travel tip: Try local markets and street stalls — they give the most authentic taste. Our Restaurants page uses live data to show places near any city you search!"
    ]
  },
  {
    keywords: ["buddy", "travel companion", "solo", "friends", "partner"],
    responses: [
      "👫 Solo travel can feel lonely! Check our Travel Buddies section to find people heading to the same destination. Connect and plan together — safety in numbers!",
      "Travel buddies make every trip better! 🌍 Visit our Buddies page to browse travelers heading to your destination and send them a connect request."
    ]
  },
  {
    keywords: ["weather", "climate", "temperature", "monsoon", "rain", "season"],
    responses: [
      "🌤 Weather planning is key! India: Oct–March is best for most destinations. Avoid Goa and coastal areas during June–Sept monsoon. Mountains are best in May–Sept.",
      "Climate tip: Always check a 10-day forecast before you travel. Apps like Weather.com or Windy are great for mountain destinations. Ladakh can be extreme — be prepared!"
    ]
  },
  {
    keywords: ["safety", "safe", "crime", "secure"],
    responses: [
      "🔒 Safety tips: Keep digital copies of all documents, share your itinerary with family, use reputed transport providers, and trust your instincts in unfamiliar places.",
      "Travel safe! 🛡 Avoid displaying expensive gadgets, use hotel safes for valuables, and always have local emergency numbers saved. India's tourist destinations are generally very safe."
    ]
  },
  {
    keywords: ["recommend", "suggest", "best", "top", "where should"],
    responses: [
      "✨ My top picks: For beaches – Goa, Maldives, Bali. For mountains – Manali, Ladakh, Shimla. For culture – Rajasthan, Varanasi, Paris. For nature – Kerala, Coorg, Munnar!",
      "🌟 Depends on your style! Beach lover? Go to Goa or Bali. Mountain seeker? Manali or Ladakh. Culture enthusiast? Rajasthan or Tokyo. Foodie? Kerala or Japan!"
    ]
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see you"],
    responses: [
      "Happy travels! ✈️ Come back anytime you need travel advice. Safe journeys and amazing adventures ahead!",
      "Bon voyage! 🌍 Hope you have an unforgettable trip. Feel free to chat anytime for more travel tips!"
    ]
  }
];

const defaultResponses = [
  "That's an interesting question! 🤔 For detailed destination info, use our AI Recommendations section on the home page. What destination are you curious about?",
  "I'm still learning about that! 🌐 Try asking me about specific destinations like Goa, Manali, Paris, Tokyo, Bali, or Ladakh. Or check our Accommodations and Restaurants sections!",
  "Great question! ✈️ I'd suggest exploring our curated pages — Accommodations for stays, Restaurants for dining, and Travel Buddies to find companions for your trip!"
];

function getResponse(message) {
  const lower = message.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      // Return a random matching response for variety
      return rule.responses[Math.floor(Math.random() * rule.responses.length)];
    }
  }

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ─── POST /api/chat ────────────────────────────────────────────────────────
// Body: { message: "What should I do in Goa?" }
router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ message: "Please provide a message" });
  }

  if (message.length > 500) {
    return res.status(400).json({ message: "Message too long (max 500 characters)" });
  }

  const reply = getResponse(message.trim());

  res.json({
    userMessage: message.trim(),
    botReply: reply,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
