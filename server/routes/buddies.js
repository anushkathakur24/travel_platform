const express = require("express");
const Buddy = require("../models/Buddy");
const { protect, optionalAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// ─── GET /api/buddies ─────────────────────────────────────────────────────
// Query params: ?destination=Goa
router.get("/", async (req, res) => {
  try {
    const { destination } = req.query;
    const filter = {};

    if (destination) {
      filter.destination = { $regex: destination, $options: "i" };
    }

    const buddies = await Buddy.find(filter)
      .populate("user", "name email avatar")
      .sort({ createdAt: -1 });

    res.json({
      count: buddies.length,
      buddies
    });
  } catch (err) {
    console.error("Fetch buddies error:", err);
    res.status(500).json({ message: "Server error fetching travel buddies" });
  }
});

// ─── GET /api/buddies/:id ─────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const buddy = await Buddy.findById(req.params.id).populate("user", "name email avatar bio");

    if (!buddy) {
      return res.status(404).json({ message: "Travel buddy not found" });
    }

    res.json({ buddy });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── POST /api/buddies  (protected) ──────────────────────────────────────
// Create a travel buddy listing for the logged-in user
router.post("/", protect, async (req, res) => {
  try {
    const { destination, dates, bio, interests, image } = req.body;

    if (!destination || !dates) {
      return res.status(400).json({ message: "Destination and dates are required" });
    }

    const buddy = await Buddy.create({
      name: req.user.name,
      destination,
      dates,
      bio: bio || "",
      interests: interests || [],
      image: image || req.user.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
      user: req.user._id
    });

    res.status(201).json({ message: "Buddy listing created", buddy });
  } catch (err) {
    console.error("Create buddy error:", err);
    res.status(500).json({ message: "Server error creating buddy listing" });
  }
});

// ─── PUT /api/buddies/:id  (protected) ────────────────────────────────────
router.put("/:id", protect, async (req, res) => {
  try {
    const buddy = await Buddy.findById(req.params.id);

    if (!buddy) return res.status(404).json({ message: "Buddy not found" });

    if (buddy.user?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorised to edit this listing" });
    }

    const updated = await Buddy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ message: "Buddy listing updated", buddy: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── DELETE /api/buddies/:id  (protected) ─────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const buddy = await Buddy.findById(req.params.id);

    if (!buddy) return res.status(404).json({ message: "Buddy not found" });

    if (buddy.user?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorised to delete this listing" });
    }

    await Buddy.findByIdAndDelete(req.params.id);
    res.json({ message: "Buddy listing deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── POST /api/buddies/:id/connect  (protected) ───────────────────────────
// Send a connect request to a travel buddy
router.post("/:id/connect", protect, async (req, res) => {
  try {
    const buddy = await Buddy.findById(req.params.id);

    if (!buddy) return res.status(404).json({ message: "Buddy not found" });

    // Can't connect to yourself
    if (buddy.user?.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot connect to your own listing" });
    }

    // Check if already sent a request
    const alreadyRequested = buddy.connectionRequests.includes(req.user._id);
    if (alreadyRequested) {
      return res.status(400).json({ message: "You already sent a connect request to this buddy" });
    }

    buddy.connectionRequests.push(req.user._id);
    await buddy.save();

    res.json({
      message: `Connect request sent to ${buddy.name}! They will be notified.`,
      buddy: { _id: buddy._id, name: buddy.name, destination: buddy.destination }
    });
  } catch (err) {
    console.error("Connect error:", err);
    res.status(500).json({ message: "Server error sending connect request" });
  }
});

module.exports = router;
