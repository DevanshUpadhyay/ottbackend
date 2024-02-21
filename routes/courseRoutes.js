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
  getRelatedCourses,
  getSearchCourses,
  getCourses,
} from "../controllers/coursecontroller.js";

import singleUpload from "../middlewares/multer.js";
const router = express.Router();

router.route("/courses").get(getCourses);
router.route("/courses/page/:pid").get(getAllCourses);
router.route("/search/:id/page/:pid").get(getSearchCourses);
router.route("/webseries/:id").get(getUrlTitleCourses);
router.route("/genre/:id/page/:pid").get(getGenreCourses);
router.route("/language/:id/page/:pid").get(getLanguageCourses);
router.route("/platform/:id/page/:pid").get(getPlatformCourses);
router.route("/subscription/:id/page/:pid").get(getSubscriptionCourses);
router.route("/cast/:id/page/:pid").get(getCastCourses);
router.route("/director/:id/page/:pid").get(getDirectorCourses);
router.route("/creator/:id/page/:pid").get(getCreatorCourses);
router.route("/season/:id/page/:pid").get(getCurrentSeasonCourses);
router.route("/latest").get(getLatestCourses);
router.route("/top").get(getTopCourses);
router.route("/related/:id").get(getRelatedCourses);
router.route("/createcourse").post(singleUpload, createCourse);

// router.route("/language/:id/page/:pid").get(getLanguageCourses);

router
  .route("/course/:id")

  .get(getSingleCourse)
  .post(singleUpload, updateCourse)

  .delete(deleteCourse);

export default router;
