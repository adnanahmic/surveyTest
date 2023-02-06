const db = require("../models/index");
const { User, Answer, Questions, Survey, Option, UserResponse } = db;
const messageConstants = require("../constant/message");
const httpStatus = require("http-status");

const createUser = async (data) => {
  const { surveyId, userDetail } = data;

  let user = await User.findOne({ where: { email: userDetail.email } });
  if (user) {
    const userRecord = await UserResponse.findOne({
      where: {
        userId: user.id,
        surveyId,
      },
    });

    if (userRecord) {
      const error = {
        status: httpStatus.UNPROCESSABLE_ENTITY,
        message: messageConstants.SURVEY_ALREADY_SUBMITTED,
      };
      return error;
    }
    return user;
  }

  if (user) {
    const error = {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: messageConstants.EMAIL_ALREADY_EXIST,
    };
    return error;
  }

  return await User.create(userDetail);
};

const surveySubmit = async (data) => {
  const { userId, surveyId, questions } = data;

  const existingUserResponse = await UserResponse.findOne({
    where: {
      userId,
      surveyId,
    },
  });

  if (existingUserResponse) {
    const error = {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: messageConstants.SURVEY_ALREADY_SUBMITTED,
    };
    return error;
  }

  const survey = await Survey.findOne({
    where: {
      id: surveyId,
    },
  });

  if (!survey && !survey.status) {
    const error = {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: messageConstants.SERVEY_IS_FOUND,
    };
    return error;
  }

  const questionsList = await Questions.findAll({
    where: {
      surveyId,
      isRequired: true,
    },
    attributes: ["id"],
  });

  const requestQuestionIds = questions.map((question) => question.question_id);

  let isValid = true;
  questionsList.map(({ id }) => {
    if (!requestQuestionIds.includes(id)) {
      isValid = false;
    }
  });

  if (!isValid) {
    return {
      status: false,
    };
  }

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.USER_NOT_FOUND,
    };
    return error;
  }

  const userResponse = await UserResponse.create({
    surveyId,
    userId: user.id,
  });

  if (userResponse) {
    const optionList = questions.map((data) => {
      return {
        userResponseId: userResponse.id,
        questionId: data.question_id,
        optionId: data.option_id,
      };
    });
    await await Answer.bulkCreate(optionList);
    return {
      success: true,
    };
  }
};

const userSurvey = async (surveyId) => {
  const survey = await Survey.findOne({
    where: {
      id: surveyId,
    },
  });

  const submission = await UserResponse.findAll({
    where: {
      surveyId,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "surname", "email"],
      },
      {
        model: Answer,
        as: "answers",
        attributes: ["id"],
        include: [
          {
            model: Questions,
            as: "question",
            attributes: ["question"],
          },
          {
            model: Option,
            as: "option",
            attributes: ["name"],
          },
        ],
      },
    ],
    attributes: {
      exclude: ["id", "updatedAt", "createdAt", "userId", "surveyId"],
    },
  });
  return {
    survey,
    submission,
  };
};

module.exports = {
  surveySubmit,
  createUser,
  userSurvey,
};
