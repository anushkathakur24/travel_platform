const express = require("express");
const Accommodation = require("../models/Accommodation");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ─── GET /api/accommodations ───────────────────────────────────────────────
// Query params: ?location=Goa  ?type=budget  ?minPrice=1000  ?maxPrice=5000
router.get("/", async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (type) {
      filter.type = type;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const accommodations = await Accommodation.find(filter).sort({ rating: -1 });

    res.json({
      count: accommodations.length,
      accommodations
    });
  } catch (err) {
    console.error("Fetch accommodations error:", err);
    res.status(500).json({ message: "Server error fetching accommodations" });
  }
});

// ─── GET /api/accommodations/:id ──────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json({ accommodation });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── POST /api/accommodations  (protected) ────────────────────────────────
router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      type,
      description,
      image,
      amenities,
      rating
    } = req.body;

    if (!name || !location || !price) {
      return res.status(400).json({ message: "Name, location and price are required" });
    }

    const accommodation = await Accommodation.create({
      name,
      location,
      price,
      priceLabel: `₹${price}/night`,
      type,
      description,
      image,
      amenities,
      rating
    });

    res.status(201).json({ message: "Accommodation created", accommodation });
  } catch (err) {
    console.error("Create accommodation error:", err);
    res.status(500).json({ message: "Server error creating accommodation" });
  }
});

// ─── PUT /api/accommodations/:id  (protected) ─────────────────────────────
router.put("/:id", protect, async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      { ...req.body, priceLabel: req.body.price ? `₹${req.body.price}/night` : undefined },
      { new: true, runValidators: true }
    );

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json({ message: "Accommodation updated", accommodation });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── DELETE /api/accommodations/:id  (protected) ──────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json({ message: "Accommodation deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
