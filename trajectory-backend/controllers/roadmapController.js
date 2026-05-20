import Roadmap from "../models/Roadmap.js";
import Profile from "../models/Profile.js";
const getRoadmap = async (req, res) => {
  try {

    // Get logged in user profile
    const profile = await Profile.findOne({
      userId: req.user,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    // Get career goal from profile
    const careerGoal = profile.careerGoal;

    // Find roadmap based on career goal
    const roadmap = await Roadmap.findOne({
      role: careerGoal,
    });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found",
      });
    }

    res.json(roadmap);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
export { getRoadmap };