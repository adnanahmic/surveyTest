const joi = require("joi");

const surveyValidator = {
  surveyDetail: {
    body: joi.object({
      title: joi.string().required(),
      questions: joi.array().items(
        joi.object({
          question: joi.object({
            title: joi.string().required(),
            isRequired: joi.boolean().required(),
          }),
          options: joi.array().items(joi.string().min(1).required()),
        })
      ),
    }),
  },
  questionDetail: {
    body: joi.object({
      question: joi.string().required(),
      isRequired: joi.boolean().required(),
    }),
  },
  optionDetail: {
    body: joi.object({
      name: joi.string().required(),
    }),
  },
  updateSurveyTitle: {
    body: joi.object({
      title: joi.string().required(),
    }),
  },
};

module.exports = surveyValidator;
