import { Router } from "express";
import isauthenticated from "../middlewares/authMiddleware.js";
import { dashboardController } from "../controllers/protectedController.js";

const protectedRouter = Router();

protectedRouter.get(
  "/dashboard",
  isauthenticated,
  dashboardController
);

export default protectedRouter;