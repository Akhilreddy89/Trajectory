import { Router } from "express";
import requireAuth from "../middlewares/requestAuth.js";
import {
  getRoadmap,
  completeStage,
  undoStageController
} from "../controllers/roadmapController.js";

const roadmapRouter = Router();

roadmapRouter.get('/me', requireAuth, getRoadmap);
roadmapRouter.post('/complete-stage/:stageOrder', requireAuth, completeStage);
roadmapRouter.patch("/stage/undo",requireAuth, undoStageController);

export default roadmapRouter;