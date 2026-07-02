import { Router } from "express";
import requireAuth from "../middlewares/requestAuth.js";
import {
  getProfile 
} from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get('/me', requireAuth, getProfile);

export default profileRouter;