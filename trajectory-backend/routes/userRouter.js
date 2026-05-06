import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  dashboardController,
  getProfile,
  saveProfile,getCourses
} from "../controllers/protectedController.js";

const userRouter = Router();

userRouter.get("/dashboard", authMiddleware, dashboardController);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, saveProfile);
userRouter.get('/recommendations', authMiddleware, getCourses);

export default userRouter;