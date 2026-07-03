import rateLimit from "express-rate-limit";

// Limits login/register attempts per IP to slow down brute-force and credential-stuffing attacks.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: "Too many attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});