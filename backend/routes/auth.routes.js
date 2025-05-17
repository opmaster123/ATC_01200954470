import express from "express";
const authRoutes = express.Router();
import { registerUser, loginUser } from "../controllers/auth.controller.js";

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);

export default authRoutes;
