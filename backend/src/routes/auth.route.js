const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const validator = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");

router
  .route("/registration")
  .post(validate(validator.authRegistorDetail), authController.registration);

router
  .route("/login")
  .post(validate(validator.authLoginDetail), authController.login);

module.exports = router;
