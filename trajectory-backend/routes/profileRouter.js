import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getProfile
} from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get('/me', authMiddleware, getProfile);

export default profileRouter;