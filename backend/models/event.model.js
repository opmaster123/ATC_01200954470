import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    date: {
      type: Date,
      required: true,
    },
    venue: String,
    price: {
      type: Number,
      required: true,
    },
    imageUrl: String,
  },
  { timestamps: true }
);

export const Event = mongoose.model("events", eventSchema);
