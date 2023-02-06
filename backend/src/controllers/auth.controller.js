const authService = require("../service/auth.service");

const registration = async (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const registrationDetail = await authService.registor(data);
    return res.send(registrationDetail);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const data = { email: req.body.email, password: req.body.password };
  try {
    const loginDetail = await authService.login(data);
    return res.send(loginDetail);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
};
