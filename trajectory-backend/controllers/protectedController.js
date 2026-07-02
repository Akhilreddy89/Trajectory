import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Course from "../models/Course.js";

const dashboardController = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false ,message:"Internal Server Crash"});
  }
};


const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const saveProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user },
      {
        ...req.body,
        userId: req.user
      },
      {
        new: true,      
        upsert: true,   
        runValidators: true  
      }
    );

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to save profile" }); 
  }
};

export { dashboardController, getProfile, saveProfile};