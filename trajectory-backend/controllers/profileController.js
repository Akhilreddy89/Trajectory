import Profile from "../models/Profile.js";

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

export { getProfile };