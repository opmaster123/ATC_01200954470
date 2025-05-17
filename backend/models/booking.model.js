import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  bookingDate: { type: Date, default: Date.now },
});

export const Booking = mongoose.model("bookings", bookingSchema);
