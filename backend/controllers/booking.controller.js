import { Booking } from "../models/booking.model.js";
import { Event } from "../models/event.model.js";

export const bookEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user._id;

  try {
    const alreadyBooked = await Booking.findOne({
      user: userId,
      event: eventId,
    });
    if (alreadyBooked) {
      return res.status(400).json({ message: "Event already booked by user." });
    }

    const booking = await Booking.create({ user: userId, event: eventId });
    res.status(201).json({ message: "Booking successful!", booking });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error booking event", error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "event"
    );
    res.status(200).json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: err.message });
  }
};
