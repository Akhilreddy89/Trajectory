import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getProfile,
  getCompletedCourses
} from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get('/me', authMiddleware, getProfile);
profileRouter.get('/completed-courses', authMiddleware, getCompletedCourses);

export default profileRouter;