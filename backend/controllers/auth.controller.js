import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
    SECRET
  );
};

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Username taken.. try to think of another one" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role: "User", // default role is user at register for now
    });
    await user.save();
    console.log("user saved in database");

    const token = generateToken(user);
    console.log("token generated at register");

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
    console.log("respose executed returning token and user object");
    console.log("register success");
    // Frontend stores token and then uses User object in its UI
  } catch (err) {
    res.status(500).json({ error: "Register failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
    console.log("login success");
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
