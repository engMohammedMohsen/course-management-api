const { body } = require("express-validator");

const courseValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ max: 80 })
      .withMessage("title is too long"),
    body("description")
      .notEmpty()
      .withMessage("description is required")
      .isLength({ max: 1000 })
      .withMessage("Description is too long"),
  ];
};
module.exports = {
  courseValidator,
};
