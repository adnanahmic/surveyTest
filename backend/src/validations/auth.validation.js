const joi = require("joi");

const validator = {
  authRegistorDetail: {
    body: joi.object({
      firstName: joi.string().required().messages({
        "any.required": `FirstName is a required field`,
      }),
      lastName: joi.string().required().messages({
        "any.required": `LastName is a required field`,
      }),
      email: joi.string().email().required().messages({
        "any.required": `Email is a required field`,
      }),
      password: joi.string().required().messages({
        "any.required": `Password is a required field`,
      }),
    }),
  },
  authUserDetail: {
    body: joi.object({
      name: joi.string().required().messages({
        "any.required": `Name is a required field`,
      }),
      surname: joi.string().required().messages({
        "any.required": `SurName is a required field`,
      }),
      email: joi.string().email().required().messages({
        "any.required": `Email is a required field`,
      }),
    }),
  },
  authLoginDetail: {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
};

module.exports = validator;
