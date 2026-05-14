import Profile from "../models/Profile.js";

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
export { getProfile };