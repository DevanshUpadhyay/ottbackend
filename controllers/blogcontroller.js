import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Blog } from "../models/Blog.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

// create new blog
export const createBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, description, content } = req.body;

  if (!title || !description || !content) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  const file = req.file;

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  await Blog.create({
    title,
    description,
    postedAt: `${date} ${month} ${year}`,
    content,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Blog Created Successfully.",
  });
});
// get all blogs
export const getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  // const keyword = req.query.keyword || "";
  // const category = req.query.category || "";
  // const page = Number(req.query.page) || 1;
  // let limit = 5;
  // let skip = (page - 1) * limit;

  const blogs = await Blog.find().sort({ createdAt: "desc" });
  // .skip(skip)
  // .limit(limit);
  // const popularBlogs = await Blog.find().sort({ views: "desc" }).limit(6);
  // const recentBlogs = await Blog.find().sort({ createdAt: "desc" }).limit(6);
  res.status(200).json({
    success: true,
    // blogs: {
    //   allblogs,
    //   popularBlogs,
    //   recentBlogs,
    // },
    blogs,
  });
});

// get single blog.
export const getSingleBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }
  blog.views += 1;
  await blog.save();
  res.status(200).json({
    success: true,
    blog,
  });
});
// delete blog
export const deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  await cloudinary.v2.uploader.destroy(blog.poster.public_id);

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog Deleted Successfully.",
  });
});
// update blog
export const updateBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }
  const { title, description, content } = req.body;

  if (!title || !description || !content) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  const file = req.file;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  blog.title = title;
  blog.description = description;
  // blog.category = category;
  blog.content = content;
  // blog.createdBy = createdBy;
  blog.postedAt = `${date} ${month} ${year}`;

  if (file) {
    await cloudinary.v2.uploader.destroy(blog.poster.public_id);
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    blog.poster.public_id = myCloud.public_id;
    blog.poster.url = myCloud.secure_url;
  }
  await blog.save();
  res.status(201).json({
    success: true,
    message: "Blog Updated Successfully.",
  });
});
