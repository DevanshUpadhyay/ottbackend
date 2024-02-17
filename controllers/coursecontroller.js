import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

// get all courses
export const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find();
  res.status(200).json({
    success: true,
    courses,
  });
});
// get all title courses
export const getUrlTitleCourses = catchAsyncErrors(async (req, res, next) => {
  const urlTitle = req.params.id;
  const course = await Course.findOne({
    urlTitle: {
      $regex: urlTitle,
      $options: "i",
    },
  });

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    success: true,
    course,
  });
});
// get all genre courses
export const getGenreCourses = catchAsyncErrors(async (req, res, next) => {
  const genre = req.params.id;
  const courses = await Course.find({
    genre: {
      $regex: genre,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    courses,
  });
});
// get all language courses
export const getLanguageCourses = catchAsyncErrors(async (req, res, next) => {
  const language = req.params.id;
  const courses = await Course.find({
    language: {
      $regex: language,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    courses,
  });
});
// get all platform courses
export const getPlatformCourses = catchAsyncErrors(async (req, res, next) => {
  const platform = req.params.id;
  const courses = await Course.find({
    "season.platform": {
      $regex: platform,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    courses,
  });
});
// get all cast courses
export const getCastCourses = catchAsyncErrors(async (req, res, next) => {
  const cast = req.params.id;
  const courses = await Course.find({
    cast: {
      $regex: cast,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    courses,
  });
});
// get all director courses
export const getDirectorCourses = catchAsyncErrors(async (req, res, next) => {
  const director = req.params.id;
  const courses = await Course.find({
    director: {
      $regex: director,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    courses,
  });
});
// get all latest courses
export const getLatestCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find();
  function checkLatest(show) {
    return show.latest >= 1;
  }
  const latestCourses = courses.filter(checkLatest);
  res.status(200).json({
    success: true,
    latestCourses,
  });
});
// get all latest courses
export const getTopCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find();
  function checkTop(show) {
    return show.top >= 1;
  }
  const topCourses = courses.filter(checkTop);
  res.status(200).json({
    success: true,
    topCourses,
  });
});
// get all creator courses
export const getCreatorCourses = catchAsyncErrors(async (req, res, next) => {
  const creator = req.params.id;
  const courses = await Course.find({
    creator: {
      $regex: creator,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    courses,
  });
});
// get all subscription courses
export const getSubscriptionCourses = catchAsyncErrors(
  async (req, res, next) => {
    const subscription = req.params.id;
    const courses = await Course.find({
      subscription: {
        $regex: subscription,
        $options: "i",
      },
    });
    res.status(200).json({
      success: true,
      courses,
    });
  }
);
// get all Current Season courses
export const getCurrentSeasonCourses = catchAsyncErrors(
  async (req, res, next) => {
    const courses = await Course.find();
    const currentSeason = req.params.id;
    function checkCurrentSeason(show) {
      return String(show.season.length) == String(currentSeason);
    }
    const currentSeasonCourses = courses.filter(checkCurrentSeason);
    res.status(200).json({
      success: true,
      currentSeasonCourses,
    });
  }
);

// craete new courses
export const createCourse = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    urlTitle,
    about,
    genre,
    cast,
    director,
    language,
    creator,
    trailer,
    rating,
    top,
    latest,
    list,
    listNumber,
    season,
    faqs,
    subscription,
  } = req.body;

  if (
    !title ||
    !urlTitle ||
    !about ||
    !genre ||
    !cast ||
    !director ||
    !language ||
    !creator ||
    !trailer ||
    !season ||
    !subscription ||
    !rating
  ) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  const file = req.file;

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    urlTitle,
    about,
    genre,
    cast,
    director,
    language,
    creator,
    trailer,
    rating,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    top,
    latest,
    list,
    listNumber,
    subscription,
    season: JSON.parse(season),
    faqs: JSON.parse(faqs),
  });

  res.status(201).json({
    success: true,
    message: "Series Created Successfully.",
  });
});
// get lecture of the course
export const getSingleCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  course.views += 1;
  await course.save();
  res.status(200).json({
    success: true,
    course: course,
  });
});

// delete course
export const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully.",
  });
});
export const updateCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Series not found", 404));
  }
  const {
    title,
    urlTitle,
    about,
    genre,
    cast,
    director,
    language,
    creator,
    trailer,
    rating,
    top,
    latest,
    list,
    listNumber,
    season,
    faqs,
    subscription,
  } = req.body;

  if (
    !title ||
    !urlTitle ||
    !about ||
    !genre ||
    !cast ||
    !director ||
    !language ||
    !creator ||
    !trailer ||
    !season ||
    !subscription ||
    !rating
  ) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  course.title = title;
  course.urlTitle = urlTitle;

  course.about = about;
  course.genre = genre;
  course.cast = cast;

  course.director = director;
  course.language = language;
  course.creator = creator;

  course.trailer = trailer;

  course.season = JSON.parse(season);
  course.faqs = JSON.parse(faqs);
  course.rating = rating;
  course.subscription = subscription;
  course.top = top;
  course.latest = latest;
  course.list = list;
  course.listNumber = listNumber;

  const file = req.file;
  if (file) {
    await cloudinary.v2.uploader.destroy(course.poster.public_id);
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    course.poster.public_id = myCloud.public_id;
    course.poster.url = myCloud.secure_url;
  }

  await course.save();
  res.status(201).json({
    success: true,
    message: "Series Updated Successfully.",
  });
});
// watcher
// Course.watch().on("change", async () => {
//   const courses = await Course.find({});
//   let totalViews = 0;
//   for (let i = 0; i < courses.length; i++) {
//     totalViews += courses[i].views;
//   }
//   await stats[0].save();
// });