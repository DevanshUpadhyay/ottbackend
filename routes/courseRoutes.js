import express from "express";
import {
  // get all courses
  getAllCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  getSingleCourse,
  getGenreCourses,
  getLanguageCourses,
  getPlatformCourses,
  getCastCourses,
  getDirectorCourses,
  getCreatorCourses,
  getLatestCourses,
  getSubscriptionCourses,
  getCurrentSeasonCourses,
  getUrlTitleCourses,
  getTopCourses,
  getSearchCourses,
} from "../controllers/coursecontroller.js";

import singleUpload from "../middlewares/multer.js";
const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/search/:id").get(getSearchCourses);
router.route("/webseries/:id").get(getUrlTitleCourses);
router.route("/genre/:id").get(getGenreCourses);
router.route("/language/:id").get(getLanguageCourses);
router.route("/platform/:id").get(getPlatformCourses);
router.route("/subscription/:id").get(getSubscriptionCourses);
router.route("/cast/:id").get(getCastCourses);
router.route("/director/:id").get(getDirectorCourses);
router.route("/creator/:id").get(getCreatorCourses);
router.route("/latest").get(getLatestCourses);
router.route("/top").get(getTopCourses);
router.route("/season/:id").get(getCurrentSeasonCourses);

router.route("/createcourse").post(singleUpload, createCourse);

router
  .route("/course/:id")

  .get(getSingleCourse)
  .post(singleUpload, updateCourse)

  .delete(deleteCourse);

export default router;
