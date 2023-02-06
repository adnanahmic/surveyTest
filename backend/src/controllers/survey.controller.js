const surveyService = require("../service/survey.service");
const questionService = require("../service/question.service");
const optionService = require("../service/option.service");
const userResponse = require("../service/user-response.service");

const getAllSurvey = async (req, res, next) => {
  try {
    const surveys = await surveyService.getAllSurvey();
    return res.send(surveys);
  } catch (error) {
    next(error);
  }
};

const surveyStatus = async (req, res, next) => {
  const surveyId = req.params.id;
  try {
    const surveyStatus = await surveyService.modifyStatus(surveyId);
    return res.send(surveyStatus);
  } catch (error) {
    next(error);
  }
};

const getSurvey = async (req, res, next) => {
  const { id } = req.params;
  try {
    const surveys = await surveyService.getSurvey(id);
    return res.send(surveys);
  } catch (error) {
    next(error);
  }
};

const updateSurveyTitle = async (req, res, next) => {
  const data = {
    surveyId: req.params.id,
    title: req.body.title,
  };
  try {
    const survey = await surveyService.updateSurveyTitle(data);
    return res.send(survey);
  } catch (error) {
    next(error);
  }
};

const addSurvey = async (req, res, next) => {
  const data = {
    title: req.body.title,
    questions: req.body.questions,
  };
  try {
    const surveys = await surveyService.addSurvey(data);
    return res.send(surveys);
  } catch (error) {
    next(error);
  }
};

const deleteSurvey = async (req, res, next) => {
  const { id } = req.params;
  try {
    const surveys = await surveyService.deleteSurvey(id);
    return res.send(surveys);
  } catch (error) {
    next(error);
  }
};

const getQuestion = async (req, res, next) => {
  const data = { surveyId: req.params.surveyId, id: req.params.id };
  try {
    const question = await questionService.getQuestion(data);
    return res.send(question);
  } catch (error) {
    next(error);
  }
};

const addQuestion = async (req, res, next) => {
  const data = {
    surveyId: req.params.surveyId,
    question: req.body.question,
    isRequired: req.body.isRequired,
  };
  try {
    const question = await questionService.addQuestion(data);
    return res.send(question);
  } catch (error) {
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  const data = {
    surveyId: req.params.surveyId,
    id: req.params.id,
    question: req.body.question,
    isRequired: req.body.isRequired,
  };
  try {
    const question = await questionService.updateQuestion(data);
    return res.send(question);
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  const data = {
    surveyId: req.params.surveyId,
    questionId: req.params.id,
  };
  try {
    const question = await questionService.deleteQuestion(data);
    return res.send(question);
  } catch (error) {
    return next(error);
  }
};

const addOption = async (req, res, next) => {
  const data = { questionId: req.params.questionId, name: req.body.name };
  try {
    const option = await optionService.addOption(data);
    return res.send(option);
  } catch (error) {
    next(error);
  }
};

const deleteOption = async (req, res, next) => {
  const data = {
    questionId: req.params.questionId,
    id: req.params.id,
  };
  try {
    const option = await optionService.deleteOption(data);
    return res.send(option);
  } catch (error) {
    return next(error);
  }
};

const userRegistor = async (req, res, next) => {
  const data = {
    surveyId: req.params.id,
    userDetail: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    },
  };
  try {
    const user = await userResponse.createUser(data);
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const surveySubmit = async (req, res, next) => {
  const data = {
    surveyId: req.params.surveyId,
    userId: req.params.userId,
    questions: req.body.questions,
  };
  try {
    const result = await userResponse.surveySubmit(data);
    return res.send(result);
  } catch (error) {
    next(error);
  }
};

const userSurveyRecord = async (req, res, next) => {
  const surveyId = req.params.surveyId;
  try {
    const allRecord = await userResponse.userSurvey(surveyId);
    return res.send(allRecord);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSurvey,
  getSurvey,
  addSurvey,
  deleteSurvey,
  surveyStatus,
  getQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  addOption,
  deleteOption,
  userRegistor,
  surveySubmit,
  userSurveyRecord,
  updateSurveyTitle,
};
