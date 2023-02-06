const db = require("../models/index");
const { Survey, Questions, Option, UserResponse } = db;
const httpStatus = require("http-status");
const messageConstants = require("../constant/message");
const questionService = require("../service/question.service");

const getAllSurvey = async () => {
  let allSurveyDetails = [];
  const allSurvey = await Survey.findAll({
    include: [
      {
        model: Questions,
        as: "questions",
      },
    ],
  });

  await Promise.all(
    allSurvey.map(async (survey) => {
      const { count, rows } = await UserResponse.findAndCountAll({
        where: {
          surveyId: survey.id,
        },
      });
      const surveyData = {
        id: survey.id,
        title: survey.title,
        status: survey.status,
        questions: survey.questions.length,
        totalSubmission: count,
      };
      allSurveyDetails.push(surveyData);
    })
  );

  return allSurveyDetails;
};

const getSurvey = async (id) => {
  const survey = await Survey.findOne({ where: { id } });
  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }
  return await Survey.findOne({
    where: { id },
    include: [
      {
        model: Questions,
        as: "questions",
        include: [
          {
            model: Option,
            as: "options",
          },
        ],
        order: [["createdAt", "ASC"]],
      },
    ],
  });
};

const updateSurveyTitle = async (data) => {
  const { surveyId, title } = data;
  const survey = await Survey.findOne({ where: { id: surveyId } });
  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }

  await Survey.update(
    { title },
    {
      where: {
        id: surveyId,
      },
    }
  );
  return await Survey.findOne({ where: { id: surveyId } });
};

const modifyStatus = async (surveyId) => {
  const survey = await Survey.findOne({ where: { id: surveyId } });
  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }
  await Survey.update(
    { status: survey.status ? false : true },
    { where: { id: surveyId } }
  );

  return await Survey.findOne({ where: { id: surveyId } });
};

const addSurvey = async (data) => {
  const { title, questions } = data;
  let survey = await Survey.findOne({
    where: {
      title,
    },
  });

  if (survey) {
    const error = {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: messageConstants.SURVEY_ALREADY_EXIST,
    };
    return error;
  }

  survey = await Survey.create({ title });

  Promise.all(
    questions.map(async (data) => {
      const { question, options } = data;
      const questionData = {
        surveyId: survey.id,
        question: question.title,
        isRequired: question.isRequired,
      };
      const newQuestion = await questionService.addQuestion(questionData);
      const optionList = options.map((option) => {
        return { questionId: newQuestion.id, name: option };
      });
      await Option.bulkCreate(optionList);
    })
  );
  return {
    success: true,
  };
};

const deleteSurvey = async (id) => {
  const survey = await Survey.findOne({ where: { id } });

  if (!survey) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.SURVEY_NOT_FOUND,
    };
    return error;
  }

  await Survey.destroy({ where: { id } });
  return {
    success: true,
  };
};

module.exports = {
  getAllSurvey,
  getSurvey,
  addSurvey,
  deleteSurvey,
  modifyStatus,
  updateSurveyTitle,
};
