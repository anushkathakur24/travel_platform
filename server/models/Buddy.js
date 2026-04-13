const mongoose = require("mongoose");

const buddySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    dates: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    bio: {
      type: String,
      default: ""
    },
    interests: {
      type: [String],
      default: []
    },
    // Optional link to a registered user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    // IDs of users who sent a connect request
    connectionRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buddy", buddySchema);
