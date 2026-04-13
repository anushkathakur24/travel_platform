/**
 * Seed script — populates the database with initial Accommodations and Buddies.
 * Run once with:  node seed.js
 */

const mongoose = require("mongoose");
require("dotenv").config();

const Accommodation = require("./models/Accommodation");
const Buddy         = require("./models/Buddy");

const accommodations = [
  {
    name: "Hotel Sunrise",
    location: "Goa",
    price: 3000,
    priceLabel: "₹3000/night",
    type: "mid-range",
    description: "A beachside hotel with stunning sea views, private beach access, and fresh seafood restaurant on premises.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    amenities: ["Free WiFi", "Swimming Pool", "Beach Access", "Restaurant", "Room Service"],
    rating: 4.3,
    reviews: 218
  },
  {
    name: "Mountain View Inn",
    location: "Manali",
    price: 2500,
    priceLabel: "₹2500/night",
    type: "mid-range",
    description: "A cosy wooden chalet nestled in the Kullu Valley, offering panoramic Himalayan views and warm hospitality.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    amenities: ["Free WiFi", "Bonfire", "Breakfast Included", "Parking", "Trekking Guide"],
    rating: 4.5,
    reviews: 145
  },
  {
    name: "The Budget Pad",
    location: "Goa",
    price: 800,
    priceLabel: "₹800/night",
    type: "budget",
    description: "A lively backpacker hostel just 5 minutes walk from Anjuna Beach. Dorm beds and private rooms available.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
    amenities: ["Free WiFi", "Common Kitchen", "Lockers", "Rooftop Terrace", "Bike Rental"],
    rating: 4.0,
    reviews: 312
  },
  {
    name: "Royal Heritage Haveli",
    location: "Jaipur",
    price: 7500,
    priceLabel: "₹7500/night",
    type: "luxury",
    description: "A beautifully restored 19th-century haveli in the heart of Jaipur's old city, with rooftop dining and Rajasthani cultural shows.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    amenities: ["Free WiFi", "Rooftop Restaurant", "Spa", "Cultural Shows", "Airport Pickup"],
    rating: 4.8,
    reviews: 87
  },
  {
    name: "Tokyo Capsule Stay",
    location: "Tokyo",
    price: 2200,
    priceLabel: "₹2200/night",
    type: "budget",
    description: "An iconic Japanese capsule hotel in Shinjuku, offering compact but smartly designed pods with all modern amenities.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206",
    amenities: ["Free WiFi", "Luggage Storage", "Coin Laundry", "Reading Light", "24/7 Reception"],
    rating: 4.1,
    reviews: 423
  },
  {
    name: "Bali Jungle Retreat",
    location: "Bali",
    price: 4500,
    priceLabel: "₹4500/night",
    type: "premium",
    description: "A private villa surrounded by lush tropical forest in Ubud. Private pool, daily breakfast, and yoga sessions included.",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    amenities: ["Private Pool", "Daily Breakfast", "Yoga Classes", "Spa", "Airport Transfer"],
    rating: 4.9,
    reviews: 64
  },
  {
    name: "Paris Boutique Studio",
    location: "Paris",
    price: 9000,
    priceLabel: "₹9000/night",
    type: "premium",
    description: "A chic Haussmann-era studio apartment in the 7th arrondissement, walking distance to the Eiffel Tower.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    amenities: ["Free WiFi", "Fully Equipped Kitchen", "Metro Nearby", "Eiffel Tower Views", "24/7 Support"],
    rating: 4.6,
    reviews: 191
  },
  {
    name: "Kerala Backwater Houseboat",
    location: "Alleppey",
    price: 12000,
    priceLabel: "₹12000/night",
    type: "luxury",
    description: "A traditional kettuvallam houseboat on the Vembanad Lake backwaters with all meals, a private chef, and sunset cruises.",
    image: "https://images.unsplash.com/photo-1590073844006-33379778ae09",
    amenities: ["All Meals Included", "Private Chef", "AC Bedroom", "Deck with Chairs", "Village Tours"],
    rating: 4.7,
    reviews: 103
  },
  {
    name: "Leh Eco Camp",
    location: "Ladakh",
    price: 3500,
    priceLabel: "₹3500/night",
    type: "mid-range",
    description: "Swiss tents at 3500m elevation with clear skies for incredible stargazing. Near Pangong Lake with all meals included.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
    amenities: ["All Meals Included", "Stargazing Deck", "Hot Water", "Guided Treks", "Mountain Bikes"],
    rating: 4.4,
    reviews: 78
  }
];

const buddies = [
  {
    name: "Aarav",
    destination: "Goa",
    dates: "10–15 March",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Solo traveller looking for beach vibes and water sports partners. Love photography and local food!",
    interests: ["Photography", "Water Sports", "Nightlife", "Local Food"]
  },
  {
    name: "Meera",
    destination: "Manali",
    dates: "20–25 March",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Trekking enthusiast planning Beas Kund trek. Looking for 2–3 people to share costs and good vibes!",
    interests: ["Trekking", "Mountains", "Camping", "Yoga"]
  },
  {
    name: "Kabir",
    destination: "Bali",
    dates: "5–12 April",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "First time in Bali! Keen to explore temples, rice terraces and do the Mount Batur sunrise trek.",
    interests: ["Culture", "Hiking", "Temples", "Surfing"]
  },
  {
    name: "Ananya",
    destination: "Paris",
    dates: "18–25 April",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Art history enthusiast planning to spend serious time at the Louvre. Also love cafés and fashion districts!",
    interests: ["Art", "Museums", "Fashion", "Cafés", "Architecture"]
  },
  {
    name: "Rohan",
    destination: "Ladakh",
    dates: "June 15–25",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Planning the Manali–Leh highway on a Royal Enfield. Looking for riders or those willing to share a cab for scenic stops.",
    interests: ["Motorbiking", "Adventure", "Photography", "Mountains"]
  },
  {
    name: "Priya",
    destination: "Kerala",
    dates: "September 8–14",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    bio: "Looking for travel buddies to split a houseboat on Alleppey backwaters. Budget ₹6000 per person sharing.",
    interests: ["Houseboats", "Backwaters", "Ayurveda", "Nature"]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅  Connected to MongoDB");

    // Clear existing data
    await Accommodation.deleteMany({});
    await Buddy.deleteMany({});
    console.log("🗑   Cleared existing accommodations and buddies");

    // Insert fresh data
    await Accommodation.insertMany(accommodations);
    console.log(`🏨  Seeded ${accommodations.length} accommodations`);

    await Buddy.insertMany(buddies);
    console.log(`👫  Seeded ${buddies.length} travel buddies`);

    console.log("✅  Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌  Seed error:", err);
    process.exit(1);
  }
}

seed();
