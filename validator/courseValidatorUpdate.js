const { body } = require("express-validator");

const courseValidatorUpdate = () => {
  return [
    body("title").isLength({ max: 80 }).withMessage("title is too long"),
    body("description")
      .isLength({ max: 1000 })
      .withMessage("Description is too long"),
  ];
};
module.exports = {
  courseValidatorUpdate,
};
