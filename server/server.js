const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ─── Route imports ─────────────────────────────────────────────────────────
const authRoutes            = require("./routes/auth");
const accommodationRoutes   = require("./routes/accommodations");
const buddyRoutes           = require("./routes/buddies");
const recommendationRoutes  = require("./routes/recommendations");
const chatRoutes            = require("./routes/chat");

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Database ──────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅  MongoDB connected"))
  .catch((err) => {
    console.error("❌  MongoDB connection error:", err.message);
    process.exit(1);
  });

// ─── Routes ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "TravelConnect API is running 🚀",
    version: "1.0.0",
    endpoints: {
      auth:            "/api/auth",
      accommodations:  "/api/accommodations",
      buddies:         "/api/buddies",
      recommendations: "/api/recommendations",
      chat:            "/api/chat"
    }
  });
});

app.use("/api/auth",            authRoutes);
app.use("/api/accommodations",  accommodationRoutes);
app.use("/api/buddies",         buddyRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/chat",            chatRoutes);

// ─── 404 handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ─── Global error handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});

// ─── Start server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
