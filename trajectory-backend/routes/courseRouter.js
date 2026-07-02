import { Router } from "express";
import requireAuth from "../middlewares/requestAuth.js";
import {
  saveCourse,
  getSavedCourses,
  homecourses,
  deleteCourse,
  markCompleted,
  getCourseById,
  getCompletedCourses,
  contextSearchCourses
} from "../controllers/courseController.js";

const courseRouter = Router();
courseRouter.get('/course/:courseId',requireAuth, getCourseById);
courseRouter.post('/save-course/:courseId', requireAuth, saveCourse);
courseRouter.get('/saved-courses', requireAuth, getSavedCourses);
courseRouter.delete('/delete-saved-course/:courseId', requireAuth,deleteCourse);
courseRouter.post('/mark-completed/:courseId', requireAuth,markCompleted);
courseRouter.get('/home/courses', requireAuth, homecourses);
courseRouter.get('/completed-courses', requireAuth, getCompletedCourses);
courseRouter.get("/search", requireAuth, contextSearchCourses);

export default courseRouter;