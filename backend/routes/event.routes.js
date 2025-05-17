import express from "express";
const eventRoutes = express.Router();
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";

// Public routes
eventRoutes.get("/", getEvents);
eventRoutes.get("/:id", getEventById);

// Protected Admin routes
eventRoutes.post("/", authenticateToken, authorizeRole("Admin"), createEvent);
eventRoutes.put("/:id", authenticateToken, authorizeRole("Admin"), updateEvent);
eventRoutes.delete(
  "/:id",
  authenticateToken,
  authorizeRole("Admin"),
  deleteEvent
);

export default eventRoutes;
