import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  saveCourse,
  getSavedCourses,
  homecourses,
  deleteCourse,
  markCompleted
} from "../controllers/courseController.js";

const courseRouter = Router();
courseRouter.post('/save-course/:courseId', authMiddleware, saveCourse);
courseRouter.get('/saved-courses', authMiddleware, getSavedCourses);
courseRouter.delete('/delete-saved-course/:courseId', authMiddleware,deleteCourse);
courseRouter.post('/mark-completed/:courseId', authMiddleware,markCompleted);
courseRouter.get('/home/courses', authMiddleware, homecourses);
export default courseRouter;