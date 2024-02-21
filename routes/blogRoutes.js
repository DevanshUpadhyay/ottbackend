import express from "express";

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogs,
  getSingleBlog,
  getUrlTitleBlog,
  updateBlog,
} from "../controllers/blogcontroller.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

router.route("/blogs").get(getAllBlogs);
router.route("/blogs/page/:pid").get(getBlogs);
router.route("/createblog").post(singleUpload, createBlog);
router.route("/blog/:id").get(getUrlTitleBlog);
router.route("/blogs/:id").get(getSingleBlog).delete(deleteBlog);

router.route("/updateblog/:id").post(singleUpload, updateBlog);

export default router;
