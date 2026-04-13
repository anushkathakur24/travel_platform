const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper: generate signed JWT
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ─── POST /api/auth/signup ─────────────────────────────────────────────────
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with that email already exists" });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("Signup error:", err);

    // MongoDB duplicate key (race condition — email registered between findOne and create)
    if (err.code === 11000) {
      return res.status(409).json({ message: "An account with that email already exists" });
    }

    // Mongoose validation errors (schema constraints)
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(e => e.message).join(". ");
      return res.status(400).json({ message });
    }

    // MongoDB not connected / buffering timeout
    if (err.name === "MongoNetworkError" || err.name === "MongooseServerSelectionError" || err.message?.includes("buffering timed out")) {
      return res.status(503).json({ message: "Database unavailable — please ensure MongoDB is running and try again" });
    }

    res.status(500).json({
      message: process.env.NODE_ENV === "production"
        ? "Server error during signup"
        : `Server error: ${err.message}`
    });
  }
});

// ─── POST /api/auth/login ──────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Explicitly select password (it's excluded by default in the schema)
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user._id);

    res.json({
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("Login error:", err);

    if (err.name === "MongoNetworkError" || err.name === "MongooseServerSelectionError" || err.message?.includes("buffering timed out")) {
      return res.status(503).json({ message: "Database unavailable — please ensure MongoDB is running and try again" });
    }

    res.status(500).json({
      message: process.env.NODE_ENV === "production"
        ? "Server error during login"
        : `Server error: ${err.message}`
    });
  }
});

// ─── GET /api/auth/me  (protected) ────────────────────────────────────────
router.get("/me", protect, async (req, res) => {
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      bio: req.user.bio,
      interests: req.user.interests,
      createdAt: req.user.createdAt
    }
  });
});

// ─── PUT /api/auth/profile  (protected) ────────────────────────────────────
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, bio, interests, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (interests !== undefined) user.interests = interests;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        interests: user.interests
      }
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error updating profile" });
  }
});

module.exports = router;
