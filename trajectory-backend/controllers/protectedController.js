import User from "../models/User.js";

const dashboardController = async (req, res) => {
  try {
    const userId = req.user.userid;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "Dashboard data",
      user,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { dashboardController };