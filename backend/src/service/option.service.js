const db = require("../models/index");
const { Questions, Option } = db;
const httpStatus = require("http-status");
const messageConstants = require("../constant/message");

const addOption = async (data) => {
  const { questionId, name } = data;
  const existingQuestion = await Questions.findOne({
    where: { id: questionId },
  });
  if (!existingQuestion) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.QUESTION_NOT_FOUND,
    };
    return error;
  }
  return await Option.create({
    questionId,
    name,
  });
};

const deleteOption = async (data) => {
  const { questionId, id } = data;
  const question = await Questions.findOne({ where: { id: questionId } });
  if (!question) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.QUESTION_NOT_FOUND,
    };
    return error;
  }

  const option = await Option.findOne({ where: { id } });
  if (!option) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: messageConstants.OPTION_NOT_FOUND,
    };
    return error;
  }
  await Option.destroy({ where: { id } });
  return {
    success: true,
  };
};

module.exports = {
  addOption,
  deleteOption,
};
