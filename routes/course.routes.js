const express = require("express");
const {
  getCourse,
  addCourse,
  editCourse,
  deleteCourse,
} = require("../controllers/courses.controller");

const validationExecution = require("../middlewares/validationExecution");
const { courseValidator } = require("../validator/courseValidator");
const { courseValidatorUpdate } = require("../validator/courseValidatorUpdate");
const router = express.Router();
router
  .route("/:courseId?")
  .post(courseValidator(), validationExecution, addCourse)
  .get(getCourse)
  .put(courseValidatorUpdate(), validationExecution, editCourse)
  .delete(deleteCourse);

module.exports = router;
