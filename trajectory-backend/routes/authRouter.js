import { Router } from "express";
import { loginUser,registerUser} from "../controllers/authController.js";
const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
export default authRouter;
