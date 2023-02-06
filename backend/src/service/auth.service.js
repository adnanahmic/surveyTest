const db = require("../models/index");
const { Admin } = db;
const messageConstants = require("../constant/message");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registor = async (data) => {
  let registorData;
  let token;
  const { firstName, lastName, email, password } = data;
  const existingAdmin = await Admin.findOne({ where: { email } });

  if (existingAdmin) {
    const error = {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: messageConstants.EMAIL_ALREADY_EXIST,
    };
    return error;
  }

  let encryptedPassword = await bcrypt.hash(password, messageConstants.SALT);
  registorData = await Admin.create({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
  });

  token = jwt.sign({ admin_id: registorData.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  registorData = await Admin.findOne({
    where: { id: registorData.id },
    attributes: {
      exclude: ["password"],
    },
  });

  return {
    success: true,
    registorData,
    token,
  };
};

const login = async (data) => {
  let token;
  const { email, password } = data;
  let authVerify = await Admin.findOne({ where: { email } });

  if (!authVerify) {
    const error = {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: messageConstants.ADMIN_NOT_FOUND,
    };
    return error;
  }
  const comparePassword = bcrypt.compareSync(
    password,
    authVerify.password,
    function (err, result) {
      if (err) {
        return false;
      }
      return result == true;
    }
  );

  if (!comparePassword) {
    const error = {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: messageConstants.INVALID_CREDENTIALS,
    };
    return error;
  }

  token = jwt.sign({ admin_id: authVerify.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  authVerify = await Admin.findOne({
    where: { id: authVerify.dataValues.id },
    attributes: {
      exclude: ["password"],
    },
  });

  return {
    success: true,
    message: messageConstants.LOGIN_SUCCESSFULLY,
    userData: authVerify,
    token,
  };
};

module.exports = {
  registor,
  login,
};
