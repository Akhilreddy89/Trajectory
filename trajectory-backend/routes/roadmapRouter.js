import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getRoadmap,
  completeStage,
  undoStageController
} from "../controllers/roadmapController.js";

const roadmapRouter = Router();

roadmapRouter.get('/me', authMiddleware, getRoadmap);
roadmapRouter.post('/complete-stage/:stageOrder', authMiddleware, completeStage);
roadmapRouter.patch("/stage/undo",authMiddleware, undoStageController);

export default roadmapRouter;