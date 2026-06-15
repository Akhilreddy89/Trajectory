import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }  
};           
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    console.log("Current user:", user);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export  { loginUser, registerUser,getCurrentUser };
