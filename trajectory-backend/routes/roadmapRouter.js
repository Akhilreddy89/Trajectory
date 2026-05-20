import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getRoadmap
} from "../controllers/roadmapController.js";

const roadmapRouter = Router();

roadmapRouter.get('/me', authMiddleware, getRoadmap);


export default roadmapRouter;