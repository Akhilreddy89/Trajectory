import jwt from "jsonwebtoken";

// Reads the JWT from the httpOnly "token" cookie (set by authController) and
// attaches the decoded userId to req.user, matching the existing req.user usage
// across roadmapController / authController.
const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired session" });
  }
};

export default requireAuth;