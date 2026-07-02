import { Router } from "express";
import requireAuth from "../middlewares/requestAuth.js";
import {
  dashboardController,
  getProfile,
  saveProfile
} from "../controllers/protectedController.js";
import { recommendedCourses } from "../controllers/courseController.js";

const userRouter = Router();

userRouter.get("/dashboard", requireAuth, dashboardController);
userRouter.get("/profile", requireAuth, getProfile);
userRouter.put("/profile", requireAuth, saveProfile);
userRouter.get('/recommendations', requireAuth, recommendedCourses);
export default userRouter;