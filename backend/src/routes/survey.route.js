const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const surveyValidator = require("../validations/survey.validation");
const surveyController = require("../controllers/survey.controller");

router.route("/").get(surveyController.getAllSurvey);
router.route("/:id").get(surveyController.getSurvey);
router
  .route("/:id")
  .put(
    validate(surveyValidator.updateSurveyTitle),
    surveyController.updateSurveyTitle
  );
router
  .route("/add")
  .post(validate(surveyValidator.surveyDetail), surveyController.addSurvey);

router.route("/:id/registor/user").post(surveyController.userRegistor);

router.route("/:surveyId/:userId/submit").post(surveyController.surveySubmit);

router.route("/view/:surveyId").get(surveyController.userSurveyRecord);

router.route("/:id/status").post(surveyController.surveyStatus);

router.route("/:id").delete(surveyController.deleteSurvey);

router.route("/:surveyId/question/:id").get(surveyController.getQuestion);
router
  .route("/:surveyId/question/add")
  .post(validate(surveyValidator.questionDetail), surveyController.addQuestion);
router
  .route("/:surveyId/question/:id")
  .put(
    validate(surveyValidator.questionDetail),
    surveyController.updateQuestion
  );
router.route("/:surveyId/question/:id").delete(surveyController.deleteQuestion);

router
  .route("/:questionId/option/add")
  .post(validate(surveyValidator.optionDetail), surveyController.addOption);

router.route("/:questionId/option/:id").delete(surveyController.deleteOption);

module.exports = router;
