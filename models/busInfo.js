const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    price: { type: Number },
    busNumber: { type: String },
    location: { type: String },
    date: { type: Date },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Businfo", seatSchema);
