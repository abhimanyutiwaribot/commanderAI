const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  command: { type: String, required: true },
  status: {
    type: String,
    enum: ["thinking","planning", "ready", "executing", "completed", "failed"],
    default: "planning"
  },
  logs: [
    {
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  plan: [
    {
      step: String,
      status: { type: String, default: "pending" },
      query: String,
      intent: String,
      topic: String,
      location: String,
      brand: String,
      category: String,
      minPrice: Number,
      maxPrice: Number,
    }
  ],
  result: {
    type: mongoose.Schema.Types.Mixed, // Flexible for weather/news/product
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
