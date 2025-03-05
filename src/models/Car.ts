import { Schema, model } from "mongoose";

const CarSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  year: { type: Number, required: true },
  engine: { type: String, required: true },
  status: { type: String, default: "Disponível" },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  bids: [
    {
      user: { type: String },
      bidAmount: { type: Number },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  comments: [
    {
      user: { type: String },
      text: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  parts: [
    {
      name: { type: String, required: true },
      rating: { type: Number, min: 0, max: 10, required: true }
    }
  ]
});

export default model("Car", CarSchema);
