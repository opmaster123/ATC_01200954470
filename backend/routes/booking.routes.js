import express from "express";
import {
  bookEvent,
  getUserBookings,
} from "../controllers/booking.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/", authenticateToken, bookEvent);
bookingRoutes.get("/", authenticateToken, getUserBookings);

export default bookingRoutes;
