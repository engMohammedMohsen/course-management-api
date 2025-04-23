const asyncWrapper = require("../middlewares/asyncWrapper");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const getCourse = asyncWrapper(async (req, res, next) => {
  console.log("start get couses");
  const { courseId } = req.params;
  const course = await Course.find(courseId ? { _id: courseId } : {}, {
    __v: false,
  });
  if (course) {
    return res.json({
      status: httpStatusText.SUCCESS,
      data: { courses: course },
    });
  }
  return next(appError.create("Not found course", 404, httpStatusText.ERROR));
});

const addCourse = asyncWrapper(async (req, res, next) => {
  console.log("start add couse");
  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});

const editCourse = asyncWrapper(async (req, res, next) => {
  console.log("start edit couse");
  const { courseId } = req.params;
  const course = await Course.findByIdAndUpdate(
    courseId,
    { $set: { ...req.body } },
    { new: true }
  );
  if (course) {
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { course } });
  } else {
    return next(appError.create("Not Found course", 404, httpStatusText.ERROR));
  }
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  console.log("start delete couse");
  const { courseId } = req.params;
  f = await Course.findOneAndDelete({ _id: courseId });
  if (f) {
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } else {
    return next(
      appError.create("Not Found course to delete", 404, httpStatusText.ERROR)
    );
  }
});

module.exports = {
  getCourse,
  addCourse,
  editCourse,
  deleteCourse,
};
