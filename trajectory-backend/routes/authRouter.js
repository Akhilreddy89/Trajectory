import { Router } from "express";
import { loginUser,registerUser,getCurrentUser} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get('/me', authMiddleware, getCurrentUser);
export default authRouter;
