import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  saveCourse,
  getSavedCourses,
  homecourses,
  deleteCourse,
  markCompleted,
  getCourseById,
  getCompletedCourses
} from "../controllers/courseController.js";

const courseRouter = Router();
courseRouter.get('/course/:courseId',authMiddleware, getCourseById);
courseRouter.post('/save-course/:courseId', authMiddleware, saveCourse);
courseRouter.get('/saved-courses', authMiddleware, getSavedCourses);
courseRouter.delete('/delete-saved-course/:courseId', authMiddleware,deleteCourse);
courseRouter.post('/mark-completed/:courseId', authMiddleware,markCompleted);
courseRouter.get('/home/courses', authMiddleware, homecourses);
courseRouter.get('/completed-courses', authMiddleware, getCompletedCourses);
export default courseRouter;