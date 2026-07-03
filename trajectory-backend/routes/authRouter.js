import { Router } from "express";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../controllers/authController.js";
import { authLimiter } from "../middlewares/authlimiter.js";
import requireAuth from "../middlewares/requestAuth.js";

const authRouter = Router();

authRouter.post("/login", authLimiter, loginUser);
authRouter.post("/register", authLimiter, registerUser);
authRouter.post("/logout", logoutUser);
authRouter.get('/me', requireAuth, getCurrentUser);

export default authRouter;
