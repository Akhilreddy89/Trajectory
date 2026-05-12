import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  dashboardController,
  getProfile,
  saveProfile
} from "../controllers/protectedController.js";
import { recommendedCourses } from "../controllers/courseController.js";

const userRouter = Router();

userRouter.get("/dashboard", authMiddleware, dashboardController);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, saveProfile);
userRouter.get('/recommendations', authMiddleware, recommendedCourses);
export default userRouter;