const db = require("../models/index");
const { Survey, Questions } = db;
const httpStatus = require("http-status");
const messageConstants = require("../constant/message");

const getQuestion = async (data) => {
  const { surveyId, id } = data;
  const survey = await Survey.findOne({ where: { id: surveyId } });
  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }

  const question = await Questions.findOne({
    where: {
      surveyId,
      id,
    },
  });

  if (!question) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.QUESTION_NOT_FOUND,
    };
    return error;
  }
  return question;
};

const addQuestion = async (data) => {
  const { surveyId, question, isRequired } = data;
  const survey = await Survey.findOne({ where: { id: surveyId } });
  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }
  return await Questions.create({
    surveyId,
    question,
    isRequired,
  });
};

const updateQuestion = async (data) => {
  const { surveyId, id, question, isRequired } = data;
  const survey = await Survey.findOne({ where: { id: surveyId } });
  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }

  let existingQuestion = await Questions.findOne({ where: { id } });

  if (!existingQuestion) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.QUESTION_NOT_FOUND,
    };
    return error;
  }

  await Questions.update(
    { question, isRequired },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
  return await Questions.findOne({ where: { id } });
};

const deleteQuestion = async (data) => {
  const { surveyId, questionId } = data;
  const survey = await Survey.findOne({ where: { id: surveyId } });
  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }
  const question = await Questions.findOne({ where: { id: questionId } });
  if (!question) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.QUESTION_NOT_FOUND,
    };
    return error;
  }
  await Questions.destroy({ where: { id: questionId } });
  return {
    success: true,
  };
};

module.exports = {
  getQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
