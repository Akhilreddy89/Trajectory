import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (email) => email?.toString().trim().toLowerCase();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // requires HTTPS in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" needed for cross-site (Vercel <-> Render)
  maxAge: 24 * 60 * 60 * 1000,
};

const issueTokenCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, COOKIE_OPTIONS);
};

const loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const email = normalizeEmail(req.body.email);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    issueTokenCookie(res, user._id);

    const { password: _, ...safeUser } = user.toObject();
    res.json({ success: true, message: "Login successful", user: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { fullname, password } = req.body;
    const email = normalizeEmail(req.body.email);

    if (!fullname || !email || !password) {
      return res.status(400).json({ success: false, message: "Full name, email, and password are required" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname: fullname.trim(), email, password: hashedPassword });
    await newUser.save();

    issueTokenCookie(res, newUser._id);

    const { password: _, ...safeUser } = newUser.toObject();
    res.status(201).json({ success: true, message: "User registered successfully", user: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.json({ success: true, message: "Logged out successfully" });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { loginUser, registerUser, logoutUser, getCurrentUser };