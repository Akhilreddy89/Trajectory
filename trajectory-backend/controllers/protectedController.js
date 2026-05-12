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
    console.error("DASHBOARD ERROR:", error.message);
    res.status(500).json({ success: false });
  }
};


const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });

    res.json({
      success: true,
      profile: profile || null,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error.message);
    res.status(500).json({ success: false });
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
        returnDocument: "after", 
        upsert: true
      }
    );

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export { dashboardController, getProfile, saveProfile};