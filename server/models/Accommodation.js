const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,   // stored as number (INR per night)
      required: true
    },
    priceLabel: {
      type: String    // e.g. "₹3000/night"
    },
    type: {
      type: String,
      enum: ["budget", "mid-range", "premium", "luxury"],
      default: "mid-range"
    },
    description: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    amenities: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.0
    },
    reviews: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accommodation", accommodationSchema);
