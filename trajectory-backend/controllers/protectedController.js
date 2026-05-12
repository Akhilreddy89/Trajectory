import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Course from "../models/Course.js";

// 🔹 Dashboard
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


// 🔹 Get Profile
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
const getCourses = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });

    if (!profile) {
      return res.json({
        success: true,
        courses: [],
        message: "Profile not found"
      });
    }

    let courses = [];

    if (profile.skills.length > 0) {
      console.log("Finding courses for skills:", profile.skills.map(s => s.name));
      courses = await Course.find({
        skills: { $in: profile.skills.map(s => s.name) },
        // type: profile.preferredLearningStyle
      }).limit(10);
    }

    // if (!courses.length) {
    //   courses = await Course.find().limit(10);
    // }

    res.json({
      success: true,
      courses
    });

  } catch (error) {
    console.error("COURSES ERROR:", error.message);
    res.status(500).json({ success: false });
  }
};
export { dashboardController, getProfile, saveProfile, getCourses };